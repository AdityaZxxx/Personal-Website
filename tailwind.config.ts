import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray[700]"),
            "--tw-prose-headings": theme("colors.gray[900]"),
            "--tw-prose-links": theme("colors.primary[600]"),
            "--tw-prose-bold": theme("colors.gray[900]"),
            "--tw-prose-counters": theme("colors.gray[500]"),
            "--tw-prose-bullets": theme("colors.gray[400]"),
            "--tw-prose-hr": theme("colors.gray[200]"),
            "--tw-prose-quotes": theme("colors.gray[900]"),
            "--tw-prose-quote-borders": theme("colors.primary[300]"),
            "--tw-prose-captions": theme("colors.gray[500]"),
            "--tw-prose-code": theme("colors.gray[900]"),
            "--tw-prose-pre-code": theme("colors.gray[200]"),
            "--tw-prose-pre-bg": theme("colors.gray[800]"),
            "--tw-prose-th-borders": theme("colors.gray[300]"),
            "--tw-prose-td-borders": theme("colors.gray[200]"),
            "--tw-prose-invert-body": theme("colors.gray[300]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-links": theme("colors.primary[400]"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.gray[400]"),
            "--tw-prose-invert-bullets": theme("colors.gray[600]"),
            "--tw-prose-invert-hr": theme("colors.gray[700]"),
            "--tw-prose-invert-quotes": theme("colors.gray[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.primary[700]"),
            "--tw-prose-invert-captions": theme("colors.gray[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.gray[300]"),
            "--tw-prose-invert-pre-bg": theme("colors.gray[800]"),
            "--tw-prose-invert-th-borders": theme("colors.gray[600]"),
            "--tw-prose-invert-td-borders": theme("colors.gray[700]"),
            maxWidth: "75ch",
            lineHeight: theme("lineHeight.relaxed"),
            "h1, h2, h3, h4, h5, h6": {
              scrollMarginTop: theme("spacing.24"),
              fontWeight: theme("fontWeight.semibold"),
            },
            h1: { fontSize: theme("fontSize.4xl") },
            h2: { fontSize: theme("fontSize.3xl") },
            h3: { fontSize: theme("fontSize.2xl") },
            p: {
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.6"),
            },
            img: {
              borderRadius: theme("borderRadius.lg"),
              boxShadow: theme("boxShadow.md"),
            },
            code: {
              fontWeight: "normal",
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.md"),
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            pre: {
              lineHeight: theme("lineHeight.normal"),
            },
          },
        },
        lg: {
          css: {
            lineHeight: theme("lineHeight.relaxed"),
            h1: { fontSize: theme("fontSize.5xl") },
            h2: { fontSize: theme("fontSize.4xl") },
            h3: { fontSize: theme("fontSize.3xl") },
          },
        },
      }),
      backgroundImage: {
        gradient: "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-vertical":
          "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
