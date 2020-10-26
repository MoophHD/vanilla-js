const arrayProcessingTool = (() => {
  // Kadane’s Algorith, O(n)
  function subSum(arr) {
    let sum = 0;
    let max = 0;
    for (num of arr) {
      // its better to take current num alone instead of tugging it with the previous sum
      if (num > sum + num) {
        sum = num;
      } else {
        sum += num;
      }

      max = Math.max(max, sum);
    }

    return max;
  }

  // O(n^2)
  function subSum2(arr) {
    let sum = 0;
    let max = sum;

    for (let i = 0; i < arr.length; i++) {
      for (let j = i; j < arr.length; j++) {
        sum += arr[j];
        max = Math.max(max, sum);
      }

      sum = 0;
    }

    return max;
  }

  const search = {
    max: (arr) => arr.sort((a, b) => b - a)[0],
    min: (arr) => arr.sort((a, b) => a - b)[0],
    median: (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length,
  };

  function selectionTask(arr) {
    if (arr.length == 1) return [arr[0]];

    let len = 1;
    let maxLen = 1;
    let maxLenLastIndex = 0;
    let lastNum = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > lastNum) {
        len++;
      } else {
        maxLen = Math.max(maxLen, len);
        maxLenLastIndex = i;

        len = 1;
      }
      lastNum = arr[i];
    }

    return arr.slice(maxLenLastIndex - maxLen, maxLenLastIndex);
  }

  return { subSum, subSum2, search, selectionTask };
})();
