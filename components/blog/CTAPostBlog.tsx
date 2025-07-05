"use client";

import { ArrowRight, Bell, Layers, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { GradientButton } from "../ui/gradient-button";
const notifications = [
  {
    id: 1,
    icon: <Layers className="h-5 w-5" />,
    title: "New Blog Post",
    description: "Exploring the latest in web development trends.",
    time: "20m ago",
    subIcon: "✨",
  },
  {
    id: 2,
    icon: <ThumbsUp className="h-5 w-5" />,
    title: "Sharing My 2025 Journey",
    description: "Reflecting on my growth and experiences this year.",
    time: "1h ago",
    subIcon: "👋",
  },
  {
    id: 3,
    icon: <Bell className="h-5 w-5" />,
    title: "And many more!",
    description: "Join to get notified for all future content.",
    time: "Just now",
    subIcon: "🚀",
  },
];

type Notification = (typeof notifications)[0];

const NotificationCard = ({
  notification,
  className,
}: {
  notification: Notification;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-primary/80 bg-foreground p-4 shadow-md shadow-card-foreground ${className}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-primary">
        {notification.icon}
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary-foreground">
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground">{notification.time}</p>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {notification.description}
          </p>
          <span className="h-6 w-6 rounded-md object-cover text-center">
            {notification.subIcon}
          </span>
        </div>
      </div>
    </div>
  );
};

export function EnjoyingPostCTA({
  title = "Enjoying this post?",
}: {
  title?: string;
}) {
  return (
    <section className="w-full rounded-2xl border  p-8 md:p-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative flex h-56 w-full items-center justify-center space-y-10">
          <div
            className="absolute w-full max-w-sm transform-gpu rounded-xl transition-transform duration-500 pt-10 opacity-90"
            style={{
              transform:
                "rotate(-2deg) translateY(50px) translateX(-10px) scale(0.9)",
            }}
          >
            <NotificationCard notification={notifications[2]} />
          </div>
          <div
            className="absolute w-full max-w-sm transform-gpu rounded-xl transition-transform duration-500 opacity-90"
            style={{ transform: "rotate(3deg) translateY(-25px) scale(0.95)" }}
          >
            <NotificationCard notification={notifications[1]} />
          </div>
          <div className="relative w-full max-w-sm">
            <NotificationCard notification={notifications[0]} />
          </div>
        </div>

        <div className="text-left">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Don&apos;t miss out 😉. Get an email whenever I post, no spam.
          </p>

          <Link href="#subscribe-email" className="mt-6 inline-block">
            <GradientButton variant={"variant"} className="text-neutral-50">
              Subscribe Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 text-neutral-50" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
