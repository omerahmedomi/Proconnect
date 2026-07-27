import { formatDistanceToNow, formatDistanceToNowStrict, parseISO } from "date-fns";

export function timeAgo(date: Date | string) {
  // Ensure we have a Date object
  const d = typeof date === "string" ? parseISO(date) : date;

  return formatDistanceToNow(d, {
    addSuffix: true,
  }).replace(/^about /, "");}


  export function formatRelativeTime(date: any) {
    const result = formatDistanceToNowStrict(date);

    // Split the result into value and unit (e.g., "10" and "minutes")
    const [value, unit] = result.split(" ");


    const unitMap: Record<string, string> = {
      seconds: "s",
      second: "s",
      minutes: "m",
      minute: "m",
      hours: "h",
      hour: "h",
      days: "d",
      day: "d",
      weeks: "w",
      week: "w",
      months: "mo",
      month: "mo",
      years: "y",
      year: "y",
    };

    // Return the short format if a match is found, otherwise return the original result
    return unitMap[unit] ? `${value}${unitMap[unit]}` : result;
  }
