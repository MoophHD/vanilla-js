const utils = (() => {
  const separator = ",";
  const patternTypes = {
    arrNum: "arrNum",
    arrString: "arrString",
    num: "num",
    string: "string",
  };
  const regex = { num: /^[-+]?\d*\.?\d+$/, operation: /^\+|\-|\\|\^$/ };

  function format(value, type) {
    if (!type) return value;

    if (!validate(value, type))
      throw new Error("Validation error, must be " + type);

    switch (type) {
      case patternTypes.arrNum: {
        return value.split(separator).map((token) => +token);
      }
      case patternTypes.num: {
        return +value;
      }
      case patternTypes.arrString: {
        return value.split(separator);
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
        console.log(`check num`);
        return regex.num.test(removeSpaces(value));
      }
      case patternTypes.operation: {
        return regex.operation.test(removeSpaces(value));
      }
      default: {
        return true;
      }
    }
  }

  return { validate, format };
})();
