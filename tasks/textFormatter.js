const textWrapEnum = Object.freeze({
  WORD: "WORD",
  LETTER: "LETTER",
  SENTENCE: "SENTENCE",
});

const textFormatter = (() => {
  function getNextLine(proposedLine, wrapType) {
    switch (wrapType) {
      case textWrapEnum.SENTENCE: {
        let lastPeriodIndex = proposedLine.lastIndexOf(".");

        // if a sentence doesn't fit the line wrap it by word
        if (lastPeriodIndex != -1) {
          return proposedLine.slice(0, lastPeriodIndex);
        }
      }
      case textWrapEnum.WORD: {
        let lastSpaceIndex = proposedLine.lastIndexOf(" ");

        if (lastSpaceIndex != -1) {
          return proposedLine.slice(0, lastSpaceIndex);
        }
      }
      case textWrapEnum.LETTER: {
        return proposedLine;
      }
      default: {
        return proposedLine;
      }
    }
  }

  function divideIntoLines(text = "", lineLength, lineCount, wrapType) {
    let remainingText = text.slice();
    let lines = [];
    let nextLine;
    let proposedLine = remainingText.slice(0, lineLength);

    while (
      remainingText.length > proposedLine.length &&
      proposedLine.length == lineLength &&
      lines.length < lineCount
    ) {
      nextLine = getNextLine(proposedLine, wrapType);
      lines.push(nextLine);
      remainingText = remainingText.slice(nextLine.length);

      if (remainingText[0] == ".") remainingText = remainingText.slice(1);
      remainingText = remainingText.trim();

      proposedLine = remainingText.slice(0, lineLength);
    }

    lines.push(proposedLine);
    return lines;
  }

  return function (text = "", lineLength, lineCount, wrapType) {
    //if there's linecount but no line len, calculate max line len
    if (lineCount && !lineLength) lineLength = ~~(text.length / lineCount);
    if (!lineCount) lineCount = Infinity;

    const lines = divideIntoLines(text, lineLength, lineCount, wrapType);
    return lines.join("\n");
  };
})();