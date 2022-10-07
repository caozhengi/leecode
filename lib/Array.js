/**
 * 88. 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
    // M所处理过的索引位置
    let index1 = m - 1
    let index2 = n - 1
    let last = m + n - 1

    // 循环nums2
    while (last >= 0) {
        const num1 = nums1[index1]
        const num2 = nums2[index2]
        if (num2 > num1 || index1 < 0) {
            nums1[last] = num2
            index2--
        } else {
            nums1[last] = num1
            index1--
        }
        last--
    }
}
