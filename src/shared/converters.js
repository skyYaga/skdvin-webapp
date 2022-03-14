import { DateTime } from "luxon";

const sortedJumpMonths = (details) => {
  if (typeof details.assignments === "undefined") {
    return [];
  }
  return [
    ...new Set(
      Object.keys(details.assignments)
        .filter((date) => DateTime.fromISO(date) >= DateTime.now())
        .map((date) => DateTime.fromISO(date).toFormat("yyyy-MM"))
    ),
  ].sort(function (a, b) {
    if (a === null) return 1;
    if (b === null) return -1;
    return DateTime.fromISO(a).toJSDate() - DateTime.fromISO(b).toJSDate();
  });
};

const sortedJumpdaysInMonth = (details, month) => {
  return Object.keys(details.assignments)
    .filter((date) =>
      DateTime.fromISO(date).hasSame(DateTime.fromISO(month), "month")
    )
    .map((date) => date)
    .sort(function (a, b) {
      if (a === null) return 1;
      if (b === null) return -1;
      return DateTime.fromISO(a).toJSDate() - DateTime.fromISO(b).toJSDate();
    });
};

export const converters = {
  sortedJumpMonths,
  sortedJumpdaysInMonth,
};
