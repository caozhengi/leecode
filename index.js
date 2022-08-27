const example = [
    // [4, 1, 2, 1, 2]
    covert2BinaryTree([-3])
    // covert2BinaryTree([-10, 9, 20, null, null, 15, 7])
    // covertList([9, 9, 9, 9, 9, 9, 9])
    // covert2BinaryTree([2, 1, 3, null, 4])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', maxPathSum(...example))

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

/**

['A', 'B', 'C', 'E']
['S', 'F', 'C', 'S']
['A', 'D', 'E', 'E']],

*/
