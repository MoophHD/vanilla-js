(() => {
  const tasks = {
    dateDisplayFormatter,
    textFormatter,
    stringCalculator,
    binaryConverter
  };

  const taskNodes = document.querySelectorAll(".task");
  [...taskNodes].forEach((task) => {
    const taskName = task.id;

    const liveMethods = task.querySelectorAll(".task__live .task__method");
    const exampleMethods = task.querySelectorAll(".task__example .task__method");

    [...liveMethods].forEach((liveMethod) => {
      const methodName = liveMethod.dataset.methodName;
      const inputs = [...liveMethod.querySelectorAll(".method__input")];
      const output = liveMethod.querySelector(".task__output");

      inputs.forEach((input) => {
        input.addEventListener("change", (e) => {
          const inputs = [
            ...e.target.parentElement.querySelectorAll(".method__input"),
          ];
          const arguments = inputs.map((input) => input.value);
          output.innerText = tasks[taskName][methodName](...arguments);
        });
      });
    });

    [...exampleMethods].forEach((exampleMethod) => {
      const methodName = exampleMethod.dataset.methodName;
      const inputs = [...exampleMethod.querySelectorAll(".method__input")];
      const output = exampleMethod.querySelector(".task__output");

      const arguments = inputs.map((input) =>
        input.value ? input.value : input.getAttribute("placeholder")
      );

      output.innerText = tasks[taskName][methodName](...arguments);
    });

    // copy example inputs
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
