const example = [
    5,
    [1, 2, 5]
    // [[46, 89], [50, 53], [52, 68], [72, 45], [77, 81]]
    // [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    // covert2BinaryTree([1,2,3,4,5,null,7])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', canPartition(...example))

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
