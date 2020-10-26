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

const arrayProcessingTool = { subSum, subSum2 };

return arrayProcessingTool