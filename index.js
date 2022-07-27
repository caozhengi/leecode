const example = [
    [1, 5, 2]
    // covert2BinaryTree([2, 1, 3, null, 4])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', PredictTheWinner(...example))

/**
let obj = null;
example[0].forEach((key, index) => {
    if(index === 0){
        obj = new MedianFinder(...example[1][0]);
        return
    }
    console.log(obj[key](...example[1][index]));
})
*/
