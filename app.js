// PROMPT: Consider the problem of counting occurrences of a given value x within a sorted array a.
// For example, if x = 5 and a = [1, 1, 2, 4, 5, 5, 7, 9], then the count is 2.

// Write a function that solves this problem by performing a linear scan.

const countOccurrencesLinearSearch = (x, a) => {
    let count = 0;

    for (let i = 0; i < a.length; i++) {
        if (a[i] == x) {
            count++;
        }
    }

    return count;
};

const countOccurrencesLinearSearchTestDrive = () => {
    let a = [1, 1, 2, 4, 5, 5, 7, 9];
    let x = 5;

    let response = countOccurrencesLinearSearch(x, a);
    console.log('Linear Search');
    console.log('---');
    console.log('Array: ', a);
    console.log('Value: ', x);
    console.log('Occurrences', response);
    console.log();
};
countOccurrencesLinearSearchTestDrive();

// Next, write a function that solves this problem by performing two binary searches.

const countOccurrencesBinarySearch = (x, a) => {
    let lowerIndex = findLowerBound(x, a, 0, a.length-1);
    let upperIndex = findUpperBound(x, a, 0, a.length-1);

    if (lowerIndex < 0 || upperIndex < 0) {
        return 0;
    } else {
        return (upperIndex - lowerIndex + 1);
    }
};

const findUpperBound = (x, a, left, right) => {
    let target = Math.floor((left + right) / 2);

    // console.log(`Target: ${target}, Value: ${a[target]}, Value at target+1: ${a[target+1]}`);

    if (target == a.length-1 && a[target] == x) {
        return target;
    } else if (left > right) {
        return -1;
    } else if (a[target] == x) {
        if (a[target+1] > x) {
            return target;
        } else {
            return findUpperBound(x, a, target + 1, right);
        }
        return target;
    } else if (a[target] < x) {
        return findUpperBound(x, a, target + 1, right);
    } else {
        return findUpperBound(x, a, left, target - 1);
    }
};

const findLowerBound = (x, a, left, right) => {
    let target = Math.floor((left + right) / 2);

    // console.log(`Target: ${target}, Value: ${a[target]}, Value at target-1: ${a[target-1]}`);

    if (target == 0 && a[target] == x) {
        return target
    } else if (left > right) {
        return -1;
    } else if (a[target] == x && a[target-1] < x) {
        return target;
    } else if (a[target] < x) {
        return findLowerBound(x, a, target + 1, right);
    } else {
        return findLowerBound(x, a, left, target - 1)
    }
};

const countOccurrencesBinarySearchTestDrive = () => {
    let a = [1, 1, 2, 4, 5, 5, 7, 9];
    let x = 5;

    let response = countOccurrencesBinarySearch(x, a);
    console.log('Binary Search');
    console.log('---');
    console.log('Array: ', a);
    console.log('Value: ', x);
    console.log('Occurrences', response);
    console.log();
};
countOccurrencesBinarySearchTestDrive();

// Finally, benchmark your two functions for random sorted arrays of size 10, 100, ..., up to
// 10,000,000. How does performance compare between the two functions?

const Benchmark = require('benchmark');

const benchmarkFunctions = () => {
    let arraySize = 10;

    while (arraySize <= 10000000) {
        console.log(`Benchmark with array size ${arraySize}`);
        let randomArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * (Math.log2(arraySize) * 3)));
        randomArray.sort((a, b) => { return a-b });
        // possible values for the randomly generated array will range from 0 to the (log2 of the array size) * 3. E.g. array of length 10 can have from 0-9, length 100 can have 0-19, length 1000 can have 0-29 etc.
        let randomX = Math.floor(Math.random() * (Math.log2(arraySize) * 3));

        var suite = new Benchmark.Suite;

        suite.add('Linear Search', function() {
            countOccurrencesLinearSearch(randomX, randomArray);
        })
        .add('Binary Search', function() {
            countOccurrencesBinarySearch(randomX, randomArray);
        })
        .on('cycle', function(event) {
          console.log(String(event.target));
        })
        .on('complete', function() {
          console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        // run async
        .run({ 'async': false });

        arraySize *= 10; // multiplies arraySize by 10 before going into next iteration
    }
}
benchmarkFunctions();
