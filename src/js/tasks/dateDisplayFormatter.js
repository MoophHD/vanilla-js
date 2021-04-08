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
  const tokenPattern = {
    MMMM: "MMMM",
    MMM: "MMM",
    MM: "MM",
    DD: "DD",
    YYYY: "YYYY",
    YY: "YY",
  };

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
    if (format.indexOf(tokenPattern.MMMM) != -1) {
      return tokenPattern.MMMM;
    } else if (format.indexOf(tokenPattern.MMM) != -1) {
      return tokenPattern.MMM;
    } else if (format.indexOf(tokenPattern.MM) != -1) {
      return tokenPattern.MM;
    } else {
      return null;
    }
  }

  function getDayPattern(format) {
    if (format.indexOf(tokenPattern.DD) != -1) {
      return tokenPattern.DD;
    } else {
      return null;
    }
  }

  function getYearPattern(format) {
    if (format.indexOf(tokenPattern.YYYY) != -1) {
      return tokenPattern.YYYY;
    } else if (format.indexOf(tokenPattern.YY) != -1) {
      return tokenPattern.YY;
    } else {
      return null;
    }
  }

  function parseDay(input, inputFormat) {
    let day;
    let pattern = getDayPattern(inputFormat);
    if (pattern == tokenPattern.DD) {
      let dayIndex = inputFormat.indexOf(tokenPattern.DD);
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
      case tokenPattern.MMMM:
        month = monthNamesLong.findIndex((name) => input.includes(name));
        break;
      case tokenPattern.MMM:
        month = monthNamesNarrow.findIndex((name) => input.includes(name));
        break;
      case tokenPattern.MM:
        let monthIndex = inputFormat.indexOf(tokenPattern.MM);
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

    if (pattern == tokenPattern.YYYY) {
      yearIndex = inputFormat.indexOf(tokenPattern.YYYY);
      year = input.slice(yearIndex, yearIndex + 4);
    } else if (pattern == tokenPattern.YY) {
      yearIndex = inputFormat.indexOf(tokenPattern.YY);
      year = input.slice(yearIndex, yearIndex + 2);
    } else {
      return null;
    }

    return +year;
  }

  function parseDate(input, inputFormat) {
    validateInput(input, inputFormat);

    let day = parseDay(input, inputFormat);
    let month = parseMonth(input, inputFormat);
    let year = parseYear(input, inputFormat);

    return new Date(year, month - 1, day);
  }

  function validateInput(input, format) {
    //eg 05 October 2012, DD MMMM YYYY
    if (format.indexOf(tokenPattern.MMMM) != -1) {
      const tokenStart = format.indexOf(tokenPattern.MMMM);

      const month = monthNamesLong[parseMonth(input, "MMMM")];

      input = input.replace(month, "");
      format = format.replace(tokenPattern.MMMM, "");
    }

    if (input.length !== format.length)
      throw new Error("Input doesn't match the provided format");
  }

  function formatDay(date, format) {
    let result = format.slice();
    let pattern = getDayPattern(format);

    if (pattern == tokenPattern.DD) {
      result = result.replace(
        tokenPattern.DD,
        ("0" + date.getDate()).slice(-2)
      );
    }

    return result;
  }

  function formatMonth(date, format) {
    let result = format.slice();
    let pattern = getMonthPattern(format);

    if (pattern == tokenPattern.MMMM) {
      result = result.replace(
        tokenPattern.MMMM,
        monthNamesLong[date.getMonth()]
      );
    } else if (pattern == tokenPattern.MMM) {
      result = result.replace(
        tokenPattern.MMM,
        monthNamesNarrow[date.getMonth()]
      );
    } else if (pattern == tokenPattern.MM) {
      result = result.replace(
        tokenPattern.MM,
        ("0" + (date.getMonth() + 1)).slice(-2)
      );
    }

    return result;
  }

  function formatYear(date, format) {
    let result = format.slice();
    let pattern = getYearPattern(format);

    if (pattern == tokenPattern.YYYY) {
      result = result.replace(tokenPattern.YYYY, date.getFullYear());
    } else if (pattern == tokenPattern.YY) {
      result = result.replace(
        tokenPattern.YY,
        date.getFullYear().toString().slice(-2)
      );
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
    validateInput(input, inputFormat);
    const date = parseDate(input, inputFormat);

    return formatDate(date, outputFormat);
  }

  function fromNow(date, inputFormat) {
    return parseDate(date, inputFormat).fromNow();
  }

  return { format, parseDate, fromNow };
})();
