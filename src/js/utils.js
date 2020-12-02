const utils = (() => {
  const separator = ",";
  const patternTypes = { arrNum: "arrNum", num: "num", string: "string" };
  const regex = { num: /^[-+]?\d*\.?\d+$/, operation: /^\+|\-|\\|\^$/ };
  // const arrNum =

  function format(value, type) {
    if (!validate(value, type)) return null;

    switch (type) {
      case patternTypes.arrNum: {
        return value.split(separator).map((token) => +token);
      }
      case patternTypes.num: {
        return +value;
      }
      default: {
        return value;
      }
    }
  }

  function removeSpaces(str) {
    return str.replace(/\s/g, "");
  }

  function validate(value, type) {
    switch (type) {
      case patternTypes.arrNum: {
        return removeSpaces(value)
          .split(separator)
          .every((token) => regex.num.test(token));
      }
      case patternTypes.num: {
        return regex.num.test(removeSpaces(value));
      }
      case patternTypes.num: {
        return regex.operation.test(removeSpaces(value));
      }
      default: {
        return true;
      }
    }
  }

  return { validate, format };
})();
