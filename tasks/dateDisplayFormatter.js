const dateDisplayFormatter = (() => {
  function parseFormat(input, inputFormat) {
    let dayIndex = inputFormat.indexOf("DD");
    let day = +input.slice(dayIndex, dayIndex + 2);
    let monthIndex = inputFormat.indexOf("MM");
    let month = +input.slice(monthIndex, monthIndex + 2);

    let yearIndex, year;
    if (inputFormat.indexOf("YYYY") == -1) {
      yearIndex = inputFormat.indexOf("YY");
      year = +input.slice(yearIndex, yearIndex + 2);
    } else {
      yearIndex = inputFormat.indexOf("YYYY");
      year = +input.slice(yearIndex, yearIndex + 4);
    }

    return new Date(year, month - 1, day);
  }

  function formatDate(date, outputFormat) {
    let result = outputFormat.slice();

    result = result.replace("DD", ("0" + date.getDate()).slice(-2));
    result = result.replace("MM", ("0" + (date.getMonth() + 1)).slice(-2));

    if (outputFormat.indexOf("YYYY") == -1) {
      result = result.replace("YY", date.getFullYear().toString().slice(-2));
    } else {
      result = result.replace("YYYY", date.getFullYear());
    }

    return result;
  }

  function format(
    input,
    inputFormat = "DDMMYYYY",
    outputFormat = "DD-MM-YYYY"
  ) {
    let date;

    if (typeof input == "string") {
      date = parseFormat(input, inputFormat);
    } else {
      date = new Date(input);
    }

    return formatDate(date, outputFormat);
  }

  return { format };
})();

let result = dateDisplayFormatter.format("20130431", "YYYYMMDD", "MM-DD-YYYY")