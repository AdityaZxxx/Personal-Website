import { createClient, type RedisClientType } from "redis";

interface RedisConfig {
  username?: string;
  password?: string;
  socket: {
    host: string;
    port: number;
    tls?: boolean;
    connectTimeout?: number;
    keepAlive?: number;
  };
}

class RedisClient {
  private client: RedisClientType;
  private static instance: RedisClient;
  private isInitialized = false;
  private retryAttempts = 0;
  private readonly maxRetries = 5;
  private readonly retryDelay = 5000; // 5 seconds

  private constructor(private config: RedisConfig) {
    this.client = createClient({
      ...config,
      socket: {
        ...config.socket,
        reconnectStrategy: (attempts) => {
          this.retryAttempts = attempts;
          if (attempts > this.maxRetries) {
            console.error("Max reconnection attempts reached");
            return new Error("Max reconnection attempts reached");
          }
          return Math.min(attempts * 1000, this.retryDelay);
        },
      },
    });

    this.registerEventHandlers();
  }

  public static getInstance(config: RedisConfig): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(config);
    }
    return RedisClient.instance;
  }

  private registerEventHandlers(): void {
    this.client.on("error", (err) => {
      console.error(`Redis Client Error: ${err.message}`);
    });

    this.client.on("connect", () => {
      console.info("Connecting to Redis...");
      this.retryAttempts = 0;
    });

    this.client.on("ready", () => {
      console.info("Redis connection established");
      this.isInitialized = true;
    });

    this.client.on("reconnecting", () => {
      console.warn(
        `Attempting to reconnect to Redis (attempt ${this.retryAttempts + 1}/${this.maxRetries})`
      );
    });

    this.client.on("end", () => {
      console.warn("Redis connection ended");
      this.isInitialized = false;
    });
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.client.connect();

      // Connection test
      await this.client.set("connection:test", "ok", { EX: 10 });
      const testResult = await this.client.get("connection:test");

      if (testResult !== "ok") {
        throw new Error("Redis connection test failed");
      }

      console.info("Redis connection verified");
    } catch (error) {
      console.error(
        `Redis initialization failed: ${error instanceof Error ? error.message : String(error)}`
      );
      throw error;
    }
  }

  public async checkRateLimit(
    identifier: string,
    options: { limit: number; window: number; prefix?: string }
  ): Promise<{ limited: boolean; remaining: number }> {
    if (!this.isInitialized) {
      console.warn("Redis not initialized - skipping rate limit check");
      return { limited: false, remaining: options.limit };
    }

    const key = `${options.prefix || "rate_limit"}:${identifier}`;

    try {
      const [current, ttl] = await this.client
        .multi()
        .incr(key)
        .ttl(key)
        .exec();

      if (current === 1) {
        await this.client.expire(key, options.window);
      }

      const remaining = Math.max(0, options.limit - Number(current));
      return {
        limited: Number(current) > options.limit,
        remaining,
      };
    } catch (error) {
      console.error(
        `Rate limit check failed: ${error instanceof Error ? error.message : String(error)}`
      );
      return { limited: false, remaining: options.limit };
    }
  }

  public async shutdown(): Promise<void> {
    if (!this.isInitialized) return;

    try {
      await this.client.quit();
      console.info("Redis client gracefully shutdown");
    } catch (error) {
      console.error(
        `Error shutting down Redis client: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      this.isInitialized = false;
    }
  }

  // Health check method
  public async healthCheck(): Promise<boolean> {
    if (!this.isInitialized) return false;

    try {
      await this.client.ping();
      return true;
    } catch {
      return false;
    }
  }
}

// Configuration and Singleton setup
const redisConfig: RedisConfig = {
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    tls: process.env.REDIS_TLS === "true",
    connectTimeout: 10000, // 10 seconds
    keepAlive: 5000, // 5 seconds
  },
};

const redis = RedisClient.getInstance(redisConfig);

// Initialize on startup (for server-side usage)
if (typeof window === "undefined") {
  redis.initialize().catch((err) => {
    console.error(
      `Failed to initialize Redis: ${err instanceof Error ? err.message : String(err)}`
    );
  });
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  await redis.shutdown();
});

process.on("SIGINT", async () => {
  await redis.shutdown();
});

export { redis as default, RedisClient };
