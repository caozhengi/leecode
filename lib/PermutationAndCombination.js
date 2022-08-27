// 排列组合相关题目

/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
    let ans = ['']
    const dist = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z']
    }

    if (digits.length === 0) {
        return []
    }

    for (let i = 0; i < digits.length; i++) {
        const num = digits[i]
        const tmp = ans.slice()
        ans = []

        for (let j = 0; j < tmp.length; j++) {
            for (let k = 0; k < dist[num].length; k++) {
                const str = tmp[j]
                const char = dist[num][k]
                ans.push(`${str}${char}`)
            }
        }
    }
    return ans
}

/**
 * 31. 下一个排列
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = function (nums) {
    const length = nums.length
    let reverseIndex = 0

    const swap = (i, j) => {
        const tmp = nums[i]
        nums[i] = nums[j]
        nums[j] = tmp
    }

    // 翻转从i之后的数据
    const reverse = (i) => {
        let start = i
        let end = length - 1
        while (start < end) {
            swap(start, end)
            start++
            end--
        }
    }

    // 从后往前找, 遇到 [n]<[n+1]时候, 在n+1...length找到比n大的最小值,  和n交换,剩下的按照由小到大排序
    for (let i = length - 1; i > 0; i--) {
        const num = nums[i]
        if (nums[i - 1] < num) {
            for (let j = length - 1; j >= i; j--) {
                if (nums[j] > nums[i - 1]) {
                    swap(i - 1, j)
                    break
                }
            }
            reverseIndex = i
            break
        }
    }
    reverse(reverseIndex)
    return nums
}

/**
 * 49. 字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    const dist = {}
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i]
        const key = str.split('').sort().join('')
        if (dist[key] === undefined) {
            dist[key] = []
        }
        dist[key].push(str)
    }
    return Object.values(dist)
}
