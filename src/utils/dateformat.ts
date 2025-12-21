import { formatDistanceToNow, parseISO } from "date-fns";

export function timeAgo(date: Date | string) {
  // Ensure we have a Date object
  const d = typeof date === "string" ? parseISO(date) : date;

  return formatDistanceToNow(d, {
    addSuffix: true,
    roundingMethod: "floor",
  }).replace(/^about /, "");}
