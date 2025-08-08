"use client";

import { getGuestbookEntries } from "@/lib/sanity/queries";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { GuestbookEntry } from "./GuestbookEntry";

const BATCH_SIZE = 10;

export function GuestbookList({ initialEntries }: { initialEntries: any[] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [offset, setOffset] = useState(BATCH_SIZE);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  const loadMoreEntries = async () => {
    const newEntries = await getGuestbookEntries(offset, BATCH_SIZE);
    if (newEntries.length > 0) {
      setEntries((prev) => [...prev, ...newEntries]);
      setOffset((prev) => prev + BATCH_SIZE);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreEntries();
    }
  }, [inView, hasMore]);

  return (
    <div className="mt-12 space-y-4 divide-y divide-neutral-800">
      {entries.map((entry) => (
        <GuestbookEntry key={entry._id} entry={entry} />
      ))}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          <p className="text-neutral-500">Loading more...</p>
        </div>
      )}
    </div>
  );
}
