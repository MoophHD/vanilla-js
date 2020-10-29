const tasks = {
  dateDisplayFormatter,
};

const taskNodes = document.querySelectorAll(".task");

[...taskNodes].forEach((task) => {
  const taskName = task.id;
  const liveMethods = task.querySelectorAll(".task__method");

  [...liveMethods].forEach((liveMethod) => {
    const methodName = liveMethod.id;
    const inputs = [...liveMethod.querySelectorAll("input")];
    const output = liveMethod.querySelector(".live__output");

    inputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        const inputs = [...e.target.parentElement.querySelectorAll("input")];
        const arguments = inputs.map((input) =>
          input.value ? input.value : input.placeholder
        );

        output.innerText = tasks[taskName][methodName](...arguments);
      });
    });
  });
});
