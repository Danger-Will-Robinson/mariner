let storage = {};

let numbers = [1, 3, 4, 5, -1, -1, -2, -3, 3, 5]

// storage[-5] = 0;

// storage[-4] = 5;

// storage [-3] = 3;

// storage[-2] = 2

// storage [-1] = 2;



// storage[1] = 3;

// storage[2] = 4;

// storage[3] = 0;

// storage[4] = 0;

// storage[5] = 3; 


function countScores(scores) {
  for (var i = 0; i < scores.length; i++) {
    if (storage[scores[i]] === undefined) {
      storage[scores[i]] = 1
    } else {
      storage[scores[i]]++
    }
  }
}

let output = countScores(numbers);

console.log(output)





console.log(storage)