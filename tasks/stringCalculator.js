const stringCalculator = (() => {
  function negate(str) {
    if (str[0] == "-") {
      str = str.slice(1);
    } else {
      str = "-" + str;
    }

    return str;
  }

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  // removes zeroes from both sides of a string
  function trimZeroes(str) {
    return str.replace(/(^|(?<=\-))0+/, "").replace(/\..+0+$/, "");
  }

  // returns true if str1 < str2
  function isSmaller(str1 = "", str2 = "") {
    let len1 = str1.length;
    let len2 = str2.length;

    if (len1 != len2) return len1 < len2;

    for (let i = 0; i < len1; i++) {
      if (+str1[i] < +str2[i]) {
        return true;
      }
    }

    return false;
  }

  function substructIntegers(str1 = "", str2 = "") {
    let str = "";
    str1 = reverseString(str1);
    str2 = reverseString(str2);
    let len1 = str1.length;
    let len2 = str2.length;

    let sub;
    let carry = 0;
    for (let i = 0; i < len2; i++) {
      sub = str1[i] - str2[i] - carry;

      if (sub < 0) {
        sub += 10;
        carry = 1;
      } else {
        carry = 0;
      }

      str += sub;
    }

    for (let i = len2; i < len1; i++) {
      sub = str1[i] - carry;

      if (sub < 0) {
        sub += 10;
        carry = 1;
      } else {
        carry = 0;
      }

      str += sub;
    }

    return trimZeroes(reverseString(str));
  }

  function addIntegers(str1 = "", str2 = "") {
    //str2 must be > str1
    if (str1.length > str2.length) {
      [str1, str2] = [str2, str1];
    }

    let str = "";
    str1 = reverseString(str1);
    str2 = reverseString(str2);
    let len1 = str1.length;
    let len2 = str2.length;

    let carry = 0;
    let sum = 0;
    for (let i = 0; i < len1; i++) {
      sum = parseInt(str1[i]) + parseInt(str2[i]) + carry;
      str += sum % 10;

      carry = ~~(sum / 10);
    }

    for (let i = len1; i < len2; i++) {
      sum = parseInt(str2[i]) + carry;
      str += sum % 10;

      carry = ~~(sum / 10);
    }

    if (carry > 0) {
      str += carry;
    }

    return reverseString(trimZeroes(str));
  }

  function add(str1 = "", str2 = "") {
    // purposefully made a slightly inefficient if statement to improve readability
    if (str1.indexOf(".") != -1 && str2.indexOf(".") != -1) {
      let [beforeDot1, afterDot1] = str1.split(".");
      let [beforeDot2, afterDot2] = str2.split(".");

      let sumBeforeDot = addIntegers(beforeDot1, beforeDot2);
      let sumAfterDot = addIntegers(afterDot1, afterDot2);

      if (sumAfterDot.length > Math.max(afterDot1.length, afterDot2.length)) {
        sumBeforeDot = addIntegers("1", sumBeforeDot);
        sumAfterDot = sumAfterDot.slice(1);
      }

      return sumBeforeDot + "." + sumAfterDot;
    } else if (str1.indexOf(".") != -1) {
      let [beforeDot, afterDot] = str1.split(".");
      return addIntegers(beforeDot, str2) + "." + afterDot;
    } else if (str2.indexOf(".") != -1) {
      let [beforeDot, afterDot] = str2.split(".");
      return addIntegers(str1, beforeDot) + "." + afterDot;
    } else {
      return addIntegers(str1, str2);
    }
  }

  function substruct(str1 = "", str2 = "") {
    let isNegative = false;
    // str1 must be > str2
    if (isSmaller(str1, str2)) {
      [str1, str2] = [str2, str1];
      isNegative = true;
    }

    let result = "";
    // purposefully made a slightly inefficient if statement to improve readability
    if (str1.indexOf(".") != -1 && str2.indexOf(".") != -1) {
      let [beforeDot1, afterDot1] = str1.split(".");
      let [beforeDot2, afterDot2] = str2.split(".");

      let sumBeforeDot, sumAfterDot;
      if (isSmaller(afterDot2, afterDot1)) {
        sumBeforeDot = substructIntegers(beforeDot1, beforeDot2);
        sumAfterDot = substructIntegers(afterDot1, afterDot2);
      } else {
        sumBeforeDot = substructIntegers(
          substructIntegers(beforeDot1, "1"),
          beforeDot2
        );
        // 1 + afterDot1 - afterDot2
        sumAfterDot = substructIntegers(
          addIntegers("1" + "0".repeat(afterDot1.length), afterDot1),
          afterDot2
        );
      }
      result = sumBeforeDot + "." + sumAfterDot;
    } else if (str1.indexOf(".") != -1) {
      let [beforeDot, afterDot] = str1.split(".");
      result = substructIntegers(beforeDot, str2) + "." + afterDot;
    } else if (str2.indexOf(".") != -1) {
      let [beforeDot, afterDot] = str2.split(".");
      beforeDot = substructIntegers(substructIntegers(str1, "1"), beforeDot);
      afterDot = substructIntegers("1" + "0".repeat(afterDot.length), afterDot);
      result = beforeDot + "." + afterDot;
    } else {
      result = substructIntegers(str1, str2);
    }

    return isNegative ? negate(result) : result;
  }

  return { add, substruct };
})();
