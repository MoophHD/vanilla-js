Array.prototype.reIndexOf = function (rx) {
  for (var i in this) {
    if (this[i].toString().match(rx)) {
      return i;
    }
  }
  return -1;
};

Array.prototype.clean = function () {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
};

const stringCalculator = (() => {
  function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }

  const associativity = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
  };

  //Shunting-yard algorithm
  function infixToPostfix(infix) {
    let outputQueue = [];
    let operatorStack = [];
    let operators = {
      "^": {
        precedence: 4,
        associativity: associativity.RIGHT,
      },
      "*": {
        precedence: 3,
        associativity: associativity.LEFT,
      },
      "/": {
        precedence: 3,
        associativity: associativity.LEFT,
      },
      "+": {
        precedence: 2,
        associativity: associativity.LEFT,
      },
      "-": {
        precedence: 2,
        associativity: associativity.LEFT,
      },
    };

    infix = infix.replace(/\s+/g, "");
    infix = infix.split(/([\+\-\*\/\^\(\)])/).clean();

    for (let i = 0; i < infix.length; i++) {
      let token = infix[i];

      if (isNumeric(token)) {
        outputQueue.push(token);
      } else if ("^*/+-".indexOf(token) !== -1) {
        let o1 = token;
        let o2 = operatorStack[operatorStack.length - 1];
        while (
          "^*/+-".indexOf(o2) !== -1 &&
          ((operators[o1].associativity === associativity.LEFT &&
            operators[o1].precedence <= operators[o2].precedence) ||
            (operators[o1].associativity === associativity.RIGHT &&
              operators[o1].precedence < operators[o2].precedence))
        ) {
          outputQueue.push(operatorStack.pop());
          o2 = operatorStack[operatorStack.length - 1];
        }
        operatorStack.push(o1);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
      }
    }

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
    return outputQueue;
  }

  function solveBinaryOperation(num1, num2, operation) {
    num1 = +num1;
    num2 = +num2;
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
        throw new Error("Unsopported operator");
      }
    }
  }

  // solve reverse polish notation (postfix)
  function solveRPN(expression) {
    let operationInd = +expression.reIndexOf(/\+|\-|\*|\/|\^/);

    let operation = expression[operationInd];
    let num1 = expression[operationInd - 2];
    let num2 = expression[operationInd - 1];

    if (expression.length == 1) return expression[0];

    let result = solveBinaryOperation(num1, num2, operation);

    return solveRPN([
      ...expression.slice(0, operationInd - 2),
      result,
      ...expression.slice(operationInd + 1),
    ]);
  }

  function parse(expression) {
    return solveRPN(infixToPostfix(expression));
  }

  return { parse };
})();
