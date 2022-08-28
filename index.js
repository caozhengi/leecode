const example = [
    // [['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]
    // [['0', '0', '0'], ['0', '0', '0'], ['1', '1', '1']]
    covert2BinaryTree([1, 3, 2, 5]),
    covert2BinaryTree([2, 1, 3, null, 4, null, 7])
    // covertList([4, 2, 1, 3])
    // covert2BinaryTree([-10, 9, 20, null, null, 15, 7])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', mergeTrees(...example))

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
