const example = [
    [1, 2, 3, 3, 4, 5]
    // 10
    // covert2BinaryTree([2, 1, 3, null, 4])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', isPossible(...example))

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
// [-4, -1, -1, 0, 1, 2]
