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

  const taskNodes = document.querySelectorAll(".task");
  [...taskNodes].forEach((task) => {
    const taskName = task.id;

    const liveMethods = task.querySelectorAll(".task__live .task__method");
    const exampleMethods = task.querySelectorAll(
      ".task__example .task__method"
    );

    // attach actions on forms
    [...liveMethods].forEach((liveMethod) => {
      const methodName = liveMethod.dataset.methodName;
      const form = liveMethod.querySelector(".method__form");
      const output = liveMethod.querySelector(".task__output");

      if (!form) return;
      form.addEventListener("submit", (e) => {
        const inputs = [...e.target.querySelectorAll(".method__input")];

        // validate and format arguments
        const arguments = [];
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];

          // remove marker on focus
          input.addEventListener("focus", (e) => {
            const target = e.target;
            if (target.classList.contains("method__input--invalid")) {
              target.classList.remove("method__input--invalid");
            }
          });

          try {
            const type = input.dataset.type;
            const value = input.value;

            const formattedValue = utils.format(value, type);

            arguments.push(formattedValue);
          } catch (e) {
            if (!input.classList.contains("method__input--invalid")) {
              input.classList.add("method__input--invalid");
            }
            output.innerText = e.message;
            return;
          }
        }

        try {
          const methodResult = tasks[taskName][methodName](...arguments);

          output.innerText = methodResult;
        } catch (e) {
          output.innerText = e.message;
        }
      });
    });

    // run real actions on examples
    [...exampleMethods].forEach((exampleMethod) => {
      const methodName = exampleMethod.dataset.methodName;
      const form = exampleMethod.querySelector(".method__form");
      const output = exampleMethod.querySelector(".task__output");

      if (!form) return;

      const inputs = form.querySelectorAll(".method__input");
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
