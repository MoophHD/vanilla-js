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
      default: {
        return -1;
      }
    }
  }

  function memo(func) {
    let cache = {};

    return function () {
      let key = JSON.stringify(arguments);
      if (cache[key]) {
        return cache[key];
      } else {
        let val = func.apply(this, arguments);
        cache[key] = val;

        return val;
      }
    };
  }

  return { calc: memo(calc), memo };
})();
