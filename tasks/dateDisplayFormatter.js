Date.prototype.fromNow = function () {
  let date = this;
  let now = new Date();

  let dYears = now.getFullYear() - date.getFullYear();
  let dMonths = now.getMonth() - date.getMonth();
  let dDays = now.getDate() - date.getDate();

  if (dDays < 0) {
    dMonths--;
    dDays += new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

  if (dMonths < 0) {
    dYears--;
    dMonths += 12;
  }

  let message = "";
  if (dYears > 0) {
    message += `${dYears} years `;
  }

  if (dMonths > 0) {
    message += `${dMonths} months `;
  }

  if (dDays > 0) {
    message += `${dDays} days `;
  }

  if (message.length > 0) {
    message += "ago";
  } else {
    message = "Today";
  }

  return message;
};

const dateDisplayFormatter = (() => {
  const monthNamesLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthNamesNarrow = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function getMonthPattern(format) {
    if (format.indexOf("MMMM") != -1) {
      return "MMMM";
    } else if (format.indexOf("MMM") != -1) {
      return "MMM";
    } else if (format.indexOf("MM") != -1) {
      return "MM";
    } else {
      return null;
    }
  }

  function getDayPattern(format) {
    if (format.indexOf("DD") != -1) {
      return "DD";
    } else {
      return null;
    }
  }

  function getYearPattern(format) {
    if (format.indexOf("YYYY") != -1) {
      return "YYYY";
    } else if (format.indexOf("YY") != -1) {
      return "YY";
    } else {
      return null;
    }
  }

  function parseDay(input, inputFormat) {
    let day;
    let pattern = getDayPattern(inputFormat);
    if (pattern == "DD") {
      let dayIndex = inputFormat.indexOf("DD");
      day = +input.slice(dayIndex, dayIndex + 2);
    } else {
      return null;
    }

    return day;
  }

  function parseMonth(input, inputFormat) {
    let month;
    let pattern = getMonthPattern(inputFormat);

    switch (pattern) {
      case "MMMM":
        month = monthNamesLong.findIndex((name) => input.includes(name));
        break;
      case "MMM":
        month = monthNamesNarrow.findIndex((name) => input.includes(name));
        break;
      case "MM":
        let monthIndex = inputFormat.indexOf("MM");
        month = +input.slice(monthIndex, monthIndex + 2);
        break;
      default:
        break;
    }

    return month;
  }

  function parseYear(input, inputFormat) {
    let year, yearIndex;
    let pattern = getYearPattern(inputFormat);

    if (pattern == "YYYY") {
      yearIndex = inputFormat.indexOf("YYYY");
      year = +input.slice(yearIndex, yearIndex + 4);
    } else if (pattern == "YY") {
      yearIndex = inputFormat.indexOf("YY");
      year = +input.slice(yearIndex, yearIndex + 2);
    } else {
      return null;
    }

    return year;
  }

  function parseDate(input, inputFormat) {
    let day = parseDay(input, inputFormat);
    let month = parseMonth(input, inputFormat);
    let year = parseYear(input, inputFormat);

    return new Date(year, month - 1, day);
  }

  function formatDay(date, format) {
    let result = format.slice();
    let pattern = getDayPattern(format);

    if (pattern == "DD") {
      result = result.replace("DD", ("0" + date.getDate()).slice(-2));
    }

    return result;
  }

  function formatMonth(date, format) {
    let result = format.slice();
    let pattern = getMonthPattern(format);

    if (pattern == "MMMM") {
      result = result.replace("MMMM", monthNamesLong[date.getMonth()]);
    } else if (pattern == "MMM") {
      result = result.replace("MMM", monthNamesNarrow[date.getMonth()]);
    } else if (pattern == "MM") {
      result = result.replace("MM", ("0" + (date.getMonth() + 1)).slice(-2));
    }

    return result;
  }

  function formatYear(date, format) {
    let result = format.slice();
    let pattern = getYearPattern(format);

    if (pattern == "YYYY") {
      result = result.replace("YYYY", date.getFullYear());
    } else if (pattern == "YY") {
      result = result.replace("YY", date.getFullYear().toString().slice(-2));
    }

    return result;
  }

  function formatDate(date, outputFormat) {
    let result = outputFormat.slice();

    result = formatDay(date, result);
    result = formatMonth(date, result);
    result = formatYear(date, result);

    return result;
  }

  function format(
    input,
    inputFormat = "DDMMYYYY",
    outputFormat = "DD-MM-YYYY"
  ) {
    let date;
    if (typeof input == "string") {
      date = parseDate(input, inputFormat);
    } else {
      date = new Date(input);
    }

    return formatDate(date, outputFormat);
  }

  function fromNow(date, inputFormat) {
    return parseDate(date, inputFormat).fromNow();
  }

  return { format, parseDate, fromNow };
})();