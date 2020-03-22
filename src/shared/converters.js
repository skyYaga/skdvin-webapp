import moment from "moment";

const sortedJumpMonths = details => {
  if (typeof details.assignments === "undefined") {
    return [];
  }
  return [
    ...new Set(
      Object.keys(details.assignments)
        .filter(assignment => moment(assignment.date).isSameOrAfter(moment()))
        .map(date => moment(date).format("YYYY-MM"))
    )
  ].sort(function(a, b) {
    if (a === null) return 1;
    if (b === null) return -1;
    return moment(a).toDate() - moment(b).toDate();
  });
};

const sortedJumpdaysInMonth = (details, month) => {
  return Object.keys(details.assignments)
    .filter(date => moment(date).isSame(moment(month), "month"))
    .map(date => date)
    .sort(function(a, b) {
      if (a === null) return 1;
      if (b === null) return -1;
      return moment(a).toDate() - moment(b).toDate();
    });
};

export const converters = {
  sortedJumpMonths,
  sortedJumpdaysInMonth
};
