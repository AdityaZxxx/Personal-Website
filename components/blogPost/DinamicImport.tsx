"use client";

import dynamic from "next/dynamic";

export const GiscusComments = dynamic(
  () =>
    import("@/components/blogPost/GiscusComments").then(
      (mod) => mod.GiscusComments
    ),
  {
    ssr: false,
    loading: () => (
      <p className="text-center text-slate-400">Loading Comments...</p>
    ),
  }
);

export const TrakteerSupport = dynamic(
  () =>
    import("@/components/trakteer-support").then((mod) => mod.TrakteerSupport),
  {
    ssr: false,
    loading: () => (
      <div className="h-12 bg-slate-800 rounded-lg animate-pulse" />
    ),
  }
);
