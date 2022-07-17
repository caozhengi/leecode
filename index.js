const example = [
    [1, -1, -2, 4, -7, 3],
    2
    // covert2BinaryTree([1,2,3,4,5,null,7])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', maxResult(...example))

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
