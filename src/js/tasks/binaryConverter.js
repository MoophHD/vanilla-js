const binaryConverter = (() => {
  function decToChar(dec) {
    return dec > 9 ? String.fromCharCode(dec + 55) : "" + dec;
  }

  function charToDec(ch) {
    return isNaN(ch) && typeof ch == "string"
      ? ch.charCodeAt(0) - 55
      : parseInt(ch);
  }

  function decFrom(vec = [], baseFrom = 2) {
    return vec
      .reverse()
      .reduce((acc, curr, ind) => acc + curr * baseFrom ** ind, 0);
  }

  function fromDec(dec = 0, baseTo = 2) {
    let vecTo = [];
    let rem = 0;
    while (dec != 0) {
      rem = dec % baseTo;
      dec = ~~(dec / baseTo);

      vecTo.push(decToChar(rem));
    }

    return vecTo.reverse();
  }

  //baseFrom => decimal => baseTo
  //up to 36 base
  function convert(vec = [], baseFrom = 10, baseTo = 2) {
    if (typeof vec == "string") vec = parseArrayFromString(vec);

    baseTo = +baseTo;
    baseFrom = +baseFrom;
    vec = vec.map((n) => ("" + n).toUpperCase());
    vec = vec.map((n) => charToDec(n));

    let dec = decFrom(vec, baseFrom);

    return fromDec(dec, baseTo);
  }

  function binToDec(vec) {
    return decFrom(vec, 2);
  }

  function decToBin(vec) {
    return fromDec(parseInt(vec.join("")), 2);
  }

  return { convert, binToDec, decToBin };
})();
