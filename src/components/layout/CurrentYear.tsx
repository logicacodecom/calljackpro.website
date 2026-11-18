"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Year is read in the browser only, so prerendered pages never show a stale build-time year. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
