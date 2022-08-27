// 搜索算法相关

/**
 * 33. 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search_33 = function (nums, target) {
    let start = 0
    let end = nums.length - 1

    // [4, 5, 6, 7, 0, 1, 2],

    while (start <= end) {
        const mid = Math.floor((start + end) / 2)

        // console.log('-------', nums[mid], nums.slice(start, end + 1))

        if (nums[mid] === target) {
            return mid
        }
        if (start === end) {
            return -1
        }

        /**
         * nums[mid] >= nums[start]  说明左侧是顺序的
         *
         * 当旋转的情况, 最小值 小于 右侧,
         *
         * 如果左侧顺序, 并且target >= nums[start] && target <= nums[mid]
         *
         */

        // 左侧是顺序的
        if (nums[mid] >= nums[start]) {
            // 如果在左侧范围
            if (target >= nums[start] && target <= nums[mid]) {
                end = mid
            } else {
                start = mid + 1
            }
        // 如果右侧是顺序的
        } else {
            // 如果在右侧侧范围
            if (target > nums[mid] && target <= nums[end]) {
                start = mid + 1
            } else {
                end = mid
            }
        }
    }
}

/**
 * 704. 二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search1 = function (nums, target, start = 0) {
    const length = nums.length
    const middleIndex = Math.floor(length / 2)
    const middleNum = nums[middleIndex]

    console.log(nums, target, start)

    // 空数组
    if (!length) {
        return -1
    }

    // 相等的时候
    if (middleNum === target) {
        return start + middleIndex
    }

    if (middleNum > target) {
        const index = search(nums.slice(0, middleIndex), target, start)
        return index
    }

    if (middleNum < target) {
        const index = search(nums.slice(middleIndex + 1, length), target, middleIndex + start + 1)
        return index
    }
}

/**
 * 704. 二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        console.log(left, right)

        const middleIndex = Math.floor((left + right) / 2)
        const middleNum = nums[middleIndex]

        // 相等的时候
        if (middleNum === target) {
            return middleIndex
        }

        if (middleNum > target) {
            right = middleIndex - 1
        }

        if (middleNum < target) {
            left = middleIndex + 1
        }
    }
    return -1
}

const searchLeft = function (nums, target) {
    let left = 0
    let right = nums.length - 1

    let result = -1

    while (left <= right) {
        console.log(left, right)

        const middleIndex = Math.floor((left + right) / 2)
        const middleNum = nums[middleIndex]

        // 左侧搜索
        if (middleNum >= target) {
            if (middleNum === target) {
                result = middleIndex
            }

            right = middleIndex - 1
        }

        // 右侧搜索
        if (middleNum < target) {
            left = middleIndex + 1
        }
    }
    return result
}

const searchRight = function (nums, target) {
    let left = 0
    let right = nums.length - 1

    let result = -1

    while (left <= right) {
        console.log(left, right)

        const middleIndex = Math.floor((left + right) / 2)
        const middleNum = nums[middleIndex]

        // 左侧搜索
        if (middleNum > target) {
            right = middleIndex - 1
        }

        // 右侧搜索
        if (middleNum <= target) {
            if (middleNum === target) {
                result = middleIndex
            }
            left = middleIndex + 1
        }
    }
    return result
}

/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) {
    const left = searchLeft(nums, target)
    const right = searchRight(nums, target)
    return [left, right]
}
