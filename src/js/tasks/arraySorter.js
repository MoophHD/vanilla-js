const arraySorter = (() => {
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  function partition(arr, pivot, left, right) {
    let pivotValue = arr[pivot],
      partitionIndex = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        swap(arr, i, partitionIndex);
        partitionIndex++;
      }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
  }

  function quickSort(arr, left, right) {
    let len = arr.length;
    let pivot, partitionIndex;

    if (left === undefined || left === null) left = 0;
    if (right === undefined || right === null) right = len - 1;

    if (left < right) {
      pivot = right;
      partitionIndex = partition(arr, pivot, left, right);

      quickSort(arr, left, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
  }

  function bubbleSort(arr) {
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        if (arr[j - 1] > arr[j]) {
          let tmp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = tmp;
        }
      }
    }
    return arr;
  }

  function selectionSort(arr) {
    let minIdx, tmp;
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      minIdx = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;
    }
    return arr;
  }

  function insertionSort(arr) {
    let len = arr.length;
    let i, j, el;

    for (i = 1; i < len; i++) {
      el = arr[i];
      j = i;
      while (j > 0 && arr[j - 1] > el) {
        arr[j] = arr[j - 1];
        j--;
      }
      arr[j] = el;
    }

    return arr;
  }

  return { quickSort, bubbleSort, selectionSort, insertionSort };
})();
