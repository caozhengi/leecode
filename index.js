const example = [
    '456',
    '77'
    // covert2BinaryTree([2, 1, 3, null, 4, null, 7])
    // covertList([4, 2, 1, 3])
    // covert2BinaryTree([-10, 9, 20, null, null, 15, 7])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
const result = addStrings(...example)

console.log('Result: ', result)
document.querySelector('#result').innerHTML = JSON.stringify(result, undefined, 4)

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
