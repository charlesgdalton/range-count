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

// Finally, benchmark your two functions for random sorted arrays of size 10, 100, ..., up to
//10,000,000. How does performance compare between the two functions?

const Benchmark = require('benchmark');

const main = () => {
    let a = [1, 1, 2, 4, 5, 5, 5, 7, 10, 10, 10, 10, 18, 18, 19, 320];
    let x = 18;

    let random1kArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 100));
    random1kArray.sort(function(a, b) { return a-b });
    let random1kX = Math.floor(Math.random() * 100);

    console.log(random1kArray);
    console.log(random1kX);

    // let occurrences = countOccurrences(x, a);
    // console.log(occurrences);

    // let lowIndex = findLowerBound(x, a, 0, a.length-1);
    // console.log(lowIndex)

    // let occurrences = countOccurrencesBinarySearch(x, a);
    // console.log(occurrences);

    // let linearBenchmark = new Benchmark('linear', function() {
    //     countOccurrencesLinearSearch(x, a);
    // });
    //
    // let binaryBenchmark = new Benchmark('binary', function() {
    //     countOccurrencesBinarySearch(x, a);
    // });
    var suite = new Benchmark.Suite;

    // add tests
    suite.add('RegExp#test', function() {
      /o/.test('Hello World!');
    })
    .add('String#indexOf', function() {
      'Hello World!'.indexOf('o') > -1;
    })
    .add('linear1k', function() {
        countOccurrencesLinearSearch(random1kX, random1kArray);
    })
    .add('binary1k', function() {
        countOccurrencesBinarySearch(random1kX, random1kArray);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
};
main();
