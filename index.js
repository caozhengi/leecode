const example = [
    3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
    0, 2, 1
    // covert2BinaryTree([2, 1, 3, null, 4])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', findCheapestPrice(...example))

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

// 'abcde'
// 0,3 Math.abs(a-b)
// 0+3  a+length-b  3 length
