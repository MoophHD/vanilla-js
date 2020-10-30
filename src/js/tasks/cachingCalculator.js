const cachingCalculator = (() => {
  function calc(num1, num2, operation) {
    switch (operation) {
      case "+": {
        return num1 + num2;
      }
      case "-": {
        return num1 - num2;
      }
      case "*": {
        return num1 * num2;
      }
      case "/": {
        return num1 / num2;
      }
      case "^": {
        return num1 ** num2;
      }
      default: {
        return -1;
      }
    }
  }

  function memo(func) {
    let cache = {};

    return function () {
      let key = JSON.stringify(
        arguments,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      );
      if (cache[key]) {
        return cache[key];
      } else {
        let val = func.apply(this, arguments);
        cache[key] = val;

        return val;
      }
    };
  }

  const cachedCalc = memo(calc);

  function getCalcPerformance(num1, num2, operation) {
    num1 = BigInt(num1);
    num2 = BigInt(num2);

    performance.mark("users-start");
    cachedCalc(num1, num2, operation);
    performance.mark("users-end");

    performance.measure("users", "users-start", "users-end");

    const usersEntries = performance.getEntriesByName("users");

    return usersEntries[usersEntries.length - 1].duration;
  }

  return { calc: cachedCalc, memo, getCalcPerformance };
})();
