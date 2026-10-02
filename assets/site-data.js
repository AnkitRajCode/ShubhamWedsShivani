window.WEDDING_DATA = {
  bride: "Shivani",
  groom: "Shubham",
  venue: "Nahargarh Palace, Ranopur",
  dates: {
    dayOne: "2026-11-21",
    dayTwo: "2026-11-22",
    rsvpBy: "2026-11-25",
    countdownTime: "13:00:00+05:30",
  },
};

(() => {
  const { bride, groom, venue, dates } = window.WEDDING_DATA;
  const parseDate = (value) => new Date(`${value}T00:00:00Z`);
  const formatDate = (value, options) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(
      parseDate(value),
    );
  const ordinal = (value) => {
    const day = Number(value.slice(-2));
    const suffix =
      day % 100 >= 11 && day % 100 <= 13
        ? "th"
        : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
    return `${day}${suffix}`;
  };
  const shortDate = (value) =>
    formatDate(value, { day: "numeric", month: "short" });
  const longDate = (value) =>
    formatDate(value, { day: "numeric", month: "long", year: "numeric" });
  const weekdayDate = (value, shortMonth = false, shortWeekday = false) =>
    formatDate(value, {
      weekday: shortWeekday ? "short" : "long",
      day: "numeric",
      month: shortMonth ? "short" : "long",
      year: "numeric",
    });
  const replacements = new Map([
    ["Kamayani", bride],
    ["Ankit", groom],
    ["Nahargarh Palace, Ranthambore", venue],
    ["31 Oct & 1 Nov 2026", `${shortDate(dates.dayOne)} & ${shortDate(dates.dayTwo)} ${dates.dayTwo.slice(0, 4)}`],
    ["31 October & 1 November 2026", `${longDate(dates.dayOne).replace(/ \d{4}$/, "")} & ${longDate(dates.dayTwo)}`],
    ["Friday, 31 October 2026", weekdayDate(dates.dayOne)],
    ["Saturday, 1 November 2026", weekdayDate(dates.dayTwo)],
    ["Friday, 31 Oct 2026", weekdayDate(dates.dayOne, true)],
    ["Saturday, 1 Nov 2026", weekdayDate(dates.dayTwo, true)],
    ["Fri, 31 Oct", weekdayDate(dates.dayOne, true, true).replace(/, \d{4}$/, "")],
    ["Sat, 1 Nov", weekdayDate(dates.dayTwo, true, true).replace(/, \d{4}$/, "")],
    ["31 October 2026", longDate(dates.dayOne)],
    ["1 November 2026", longDate(dates.dayTwo)],
    ["31 Oct", shortDate(dates.dayOne)],
    ["1 Nov", shortDate(dates.dayTwo)],
    ["1st October 2026", `${ordinal(dates.rsvpBy)} ${formatDate(dates.rsvpBy, { month: "long", year: "numeric" })}`],
  ]);
  const replacementPattern = new RegExp(
    [...replacements.keys()]
      .sort((left, right) => right.length - left.length)
      .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "g",
  );
  const replaceValues = (value) =>
    value.replace(replacementPattern, (match) => replacements.get(match));

  const applyWeddingData = () => {
    const walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest("script, style")) continue;
      node.nodeValue = replaceValues(node.nodeValue);
    }
    document.querySelectorAll("*").forEach((element) => {
      for (const attribute of element.attributes) {
        attribute.value = replaceValues(attribute.value);
      }
    });
    document.querySelectorAll("[data-wedding-date='range-ordinal']").forEach((element) => {
      element.textContent = `${ordinal(dates.dayOne)} ${formatDate(dates.dayOne, { month: "short" })} & ${ordinal(dates.dayTwo)} ${formatDate(dates.dayTwo, { month: "short", year: "numeric" })}`;
    });
    document.querySelectorAll("[data-wedding-date='rsvp']").forEach((element) => {
      element.textContent = `${ordinal(dates.rsvpBy)} ${formatDate(dates.rsvpBy, { month: "long", year: "numeric" })}`;
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyWeddingData, { once: true });
  } else {
    applyWeddingData();
  }
})();