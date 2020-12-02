(() => {
  const tasks = {
    dateDisplayFormatter,
    textFormatter,
    stringCalculator,
    binaryConverter,
    arrayProcessingTool,
    arraySorter,
    cachingCalculator,
  };

  function parseValue(value) {
    if (/^\[.+\]$/.test(value)) {
      value = value
        .slice(1, value.length - 1)
        .split(",")
        .map((num) => num.trim());

      return value;
    }

    if (!isNaN(value)) {
      return +value;
    }

    return value;
  }

  const taskNodes = document.querySelectorAll(".task");
  [...taskNodes].forEach((task) => {
    const taskName = task.id;

    const liveMethods = task.querySelectorAll(".task__live .task__method");
    const exampleMethods = task.querySelectorAll(
      ".task__example .task__method"
    );

    [...liveMethods].forEach((liveMethod) => {
      const methodName = liveMethod.dataset.methodName;
      const form = liveMethod.querySelector(".method__form");
      const output = liveMethod.querySelector(".task__output");

      if (!form) return;
      // submit listeners
      form.addEventListener("submit", (e) => {
        const inputs = [...e.target.querySelectorAll(".method__input")];

        // validate and format arguments
        const arguments = [];
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];
          const type = input.dataset.type;
          const value = input.value;

          const formattedValue = utils.format(value, type);

          if (formattedValue === null) {
            output.innerText = "Incorrect value, must be " + type;
            return;
          }

          arguments.push(formattedValue);
        }

        output.innerText = tasks[taskName][methodName](...arguments);
      });
    });

    // run real actions on examples
    [...exampleMethods].forEach((exampleMethod) => {
      const methodName = exampleMethod.dataset.methodName;
      const form = exampleMethod.querySelector(".method__form");
      const output = exampleMethod.querySelector(".task__output");

      if (!form) return;

      const inputs = form.querySelectorAll('.method__input');
      const arguments = [];
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const type = input.dataset.type;
        const value = input.value;

        const formattedValue = utils.format(value, type);

        if (formattedValue === null) {
          output.innerText = "Incorrect value, must be " + type;
          return;
        }

        arguments.push(formattedValue);
      }

      output.innerText = tasks[taskName][methodName](...arguments);
    });

    // copy example inputs on click
    const exampleInputs = [
      ...document.querySelectorAll(".method__input--example"),
    ];

    exampleInputs.forEach((input) => {
      input.addEventListener("click", (e) => {
        e.target.select();
        document.execCommand("copy");
      });
    });
  });
})();
