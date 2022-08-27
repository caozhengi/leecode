const example = [
    [2, 0, 2, 1, 1, 0]
    // 5
    // covertList([9, 9, 9, 9, 9, 9, 9])
    // covert2BinaryTree([2, 1, 3, null, 4])
]

console.log('param', ...example)
// const example = covertList([1,1,2]);
console.log('Result: ', sortColors(...example))

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

// 1, 2, 3, 4, 5
// 2, 1, 3, 4, 5

//     [5, 1, 9, 6, 8, 4, 7, 2, 5]
//     [5, 1, 9, 6, 8, 4, 7, 2, 3]
// 5
// 从后往前找, 遇到 [n]<[n+1]时候, 在n+1...length找到比n大的最小值,  和n交换,剩下的按照由小到大排序

// 3,5,4,1
