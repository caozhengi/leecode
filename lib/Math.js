/**
 * 数学算法
 */

/**
 * 204. 计数质数
 * @param {number} n
 * @return {number}
 */
const countPrimes = function (n) {
    const isPrime = new Array(n).fill(true)

    for (let i = 2; i * i < n; i++) {
        if (isPrime[i] === true) {
            for (let j = i; j * i <= n; j++) {
                isPrime[i * j] = false
            }
        }
    }

    // 因为0和1不是质数，所以从2开始算
    return isPrime.slice(2, n).filter(e => e === true).length
}

/**
 * 172. 阶乘后的零
 * @param {number} n
 * @return {number}0
 */
const trailingZeroes = function (n) {
    let count = 0
    let divisor = 5

    while (divisor <= n) {
        count += Math.floor(n / divisor)
        divisor *= 5
    }

    return count
}

/**
 * 793. 阶乘函数后 K 个零
 * @param {number} k
 * @return {number}
 */
const preimageSizeFZF = function (k) {
    const serchRight = () => {
        let max = Number.MAX_SAFE_INTEGER
        let min = 0

        while (min < max) {
            const mid = Math.floor((min + max) / 2)
            const midResult = trailingZeroes(mid)
            if (midResult > k) {
                max = mid
            } else if (midResult < k) {
                min = mid + 1
            } else {
                min = mid + 1
            }
        }
        return min
    }
    const serchLeft = () => {
        let max = Number.MAX_SAFE_INTEGER
        let min = 0

        while (min < max) {
            const mid = Math.floor((min + max) / 2)
            const midResult = trailingZeroes(mid)
            if (midResult > k) {
                max = mid
            } else if (midResult < k) {
                min = mid + 1
            } else {
                max = mid
            }
        }
        return min
    }
    return serchRight() - serchLeft()
}
/**
 *
 * 382. 链表随机节点
 */
class Solution_382 {
    // @param {ListNode} head
    constructor (head) {
        this.head = head
    }

    // return {number}
    getRandom () {
        let i = 1
        let node = this.head
        let result
        while (node !== null) {
            if (Math.floor(Math.random() * i) === i - 1) {
                result = node.val
            }
            node = node.next
            i++
        }
        return result
    }
}

/**
 * 398. 随机数索引
 * @param {number[]} nums
 */
class Solution_398 {
    // @param {number[]} nums
    constructor (nums) {
        this.nums = nums
    }

    // @param {number} target
    pick (target) {
        let i = 1
        let result

        for (let index = 0; index < this.nums.length; index++) {
            const num = this.nums[index]
            if (num !== target) {
                continue
            }
            if (Math.floor(Math.random() * i) === i - 1) {
                result = index
            }
            i++
        }
        return result
    }
}

/**
 * 645. 错误的集合
 * @param {number[]} nums
 * @return {number[]}
 */
const findErrorNums = function (nums) {
    let repeat // 重复的数
    let corret // 丢失的数
    for (let i = 0; i < nums.length; i++) {
        const num = Math.abs(nums[i])
        if (nums[num - 1] >= 0) {
            nums[num - 1] *= -1
        } else {
            repeat = num
        }
    }
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        if (num >= 0) {
            corret = i + 1
        }
    }
    return [repeat, corret]
}

/**
 * 134. 加油站
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
const canCompleteCircuit = function (gas, cost) {
    let sum = 0
    let minSum = 0
    let start = 0
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i]
        sum += diff
        if (sum < minSum) {
            start = i + 1
            minSum = sum
        }
    }
    if (sum < 0) {
        return -1
    }
    return start === gas.length ? 0 : start
}

/**
 * 1. 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum_1 = function (nums, target) {
    const length = nums.length

    for (let i = 0; i < length; i++) {
        const a = nums[i]
        for (let j = i + 1; j < length; j++) {
            const b = nums[j]

            if (a + b === target) {
                return [a, b]
            }
        }
    }
}

/**
 * 两数之和之变种， 返回两个值，而不是索引, 且可能存在多个组合
 * @param {number[]} nums, 排序好的数组
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target, needSort = true) {
    let start = 0
    let end = nums.length - 1
    const result = []

    // 对nums进行排序
    needSort && nums.sort((a, b) => a - b)

    while (start < end) {
        const left = nums[start]
        const right = nums[end]
        const sum = left + right
        if (sum < target) {
            while (start < end && nums[start] === left) start++
        }
        if (sum > target) {
            while (start < end && nums[end] === right) end--
        }
        if (sum === target) {
            result.push([nums[start], nums[end]])
            while (start < end && nums[start] === left) start++
            while (start < end && nums[end] === right) end--
        }
    }
    return result
}

/**
 * 15. 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums, target = 0, needSort = true) {
    const length = nums.length
    let index = 0
    const result = []

    // 对nums进行排序
    needSort && nums.sort((a, b) => a - b)

    while (index < length - 1) {
        const num = nums[index]

        const twoSumSesult = twoSum(nums.slice(index + 1), target - num, false)
        twoSumSesult.forEach(e => result.push([num, ...e]))

        while (index < length - 1 && nums[index] === num) {
            index++
        }
    }
    return result
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = function (nums, target, needSort = true) {
    const length = nums.length
    let index = 0
    const result = []

    // 对nums进行排序
    needSort && nums.sort((a, b) => a - b)

    while (index < length - 1) {
        const num = nums[index]

        const threeSumSesult = threeSum(nums.slice(index + 1), target - num, false)
        threeSumSesult.forEach(e => result.push([num, ...e]))

        while (index < length - 1 && nums[index] === num) {
            index++
        }
    }
    return result
}

/**
 * 1288. 删除被覆盖区间
 * @param {number[][]} intervals
 * @return {number}
 */
const removeCoveredIntervals = function (intervals) {
    // 按照start从小到大排序
    intervals.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1]
        }
        return a[0] - b[0]
    })

    // 初始化范围
    // let start = intervals[0][0]
    let end = intervals[0][1]
    let result = intervals.length

    for (let i = 1; i < intervals.length; i++) {
        const [iStart, iEnd] = intervals[i]
        if (iStart >= end) {
            // 完全不重合
            // start = iStart
            end = iEnd
        } else if (iEnd > end) {
            // 重合一部分
            end = iEnd
        } else {
            // 覆盖
            result--
        }
    }

    return result
}

/**
 * 56. 合并区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
    // 按照start从小到大排序
    intervals.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1]
        }
        return a[0] - b[0]
    })

    // 初始化范围
    let start = intervals[0][0]
    let end = intervals[0][1]
    const result = []

    for (let i = 1; i < intervals.length; i++) {
        const [iStart, iEnd] = intervals[i]

        // 被上一个覆盖，可以抛弃
        if (iEnd <= end) {
            continue
        }

        // 和上一个相交
        if (iStart <= end) {
            end = iEnd
        }

        // 和上一个不重合
        if (iStart >= end) {
            result.push([start, end])
            start = iStart
            end = iEnd
        }
    }
    result.push([start, end])

    return result
}

/**
 * 986. 区间列表的交集
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const intervalIntersection = function (firstList, secondList) {
    const ans = []
    let i = 0
    let j = 0

    while (i < firstList.length && j < secondList.length) {
        const [firstStart, firstEnd] = firstList[i]
        const [secondStart, secondEnd] = secondList[j]

        // 不相交
        if (firstStart > secondEnd) {
            j++
            continue
        }

        // 不相交
        if (secondStart > firstEnd) {
            i++
            continue
        }

        // 相交
        if (firstEnd <= secondEnd) {
            ans.push([Math.max(firstStart, secondStart), firstEnd])
            i++
            continue
        }

        // 相交
        if (secondEnd <= firstEnd) {
            ans.push([Math.max(firstStart, secondStart), secondEnd])
            j++
            continue
        }
    }
    return ans
}

/**
 * 241. 为运算表达式设计优先级 (分治算法)
 * @param {string} expression
 * @return {number[]}
 */
const diffWaysToCompute = function (expression) {
    const operator = new Set(['+', '-', '*'])
    const memo = {}

    // 计算可能的结果
    const calculate = (expression) => {
        if (memo[expression] !== undefined) {
            return memo[expression]
        }

        const ans = []
        for (let i = 0; i < expression.length; i++) {
            const char = expression[i]
            if (operator.has(char)) {
                const left = calculate(expression.slice(0, i))
                const right = calculate(expression.slice(i + 1, expression.length))
                for (let l = 0; l < left.length; l++) {
                    for (let r = 0; r < right.length; r++) {
                        const lv = Number(left[l])
                        const rv = Number(right[r])
                        if (char === '+') {
                            ans.push(lv + rv)
                        }
                        if (char === '-') {
                            ans.push(lv - rv)
                        }
                        if (char === '*') {
                            ans.push(lv * rv)
                        }
                    }
                }
            }
        }
        memo[expression] = ans.length ? ans : [expression]
        return memo[expression]
    }
    return calculate(expression)
}

/**
 * 1024. 视频拼接
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */
const videoStitching = function (clips, time) {
    // 按照start从小到大排序
    clips.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1]
        }
        return a[0] - b[0]
    })

    let ans = 1
    let [start, end] = clips[0]
    let tmpEnd = end

    let i = 1
    while (i < clips.length) {
        // 当前结束点已经超出目标的情况
        if (start <= 0 && end >= time) {
            return ans
        }

        const [left, right] = clips[i]
        if (left === clips[i - 1][0]) {
            i++
            continue
        }

        console.log('=======', i, left, right)

        // 在上个区间内
        if (left <= end) {
            tmpEnd = Math.max(tmpEnd, right)
            i++
        }
        // 超出了区间
        if (left > end) {
            if (left > tmpEnd) {
                return -1
            }
            end = tmpEnd
            ans++
        }
    }

    if (tmpEnd > end) {
        end = tmpEnd
        ans++
    }

    return start <= 0 && end >= time ? ans : -1
}

/**
 * 659. 分割数组为连续子序列
 * @param {number[]} nums
 * @return {boolean}
 */
const isPossible = function (nums) {
    const list = [[nums[0]]]

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]

        // 比最后一个元素大于1, 重新起一个队列
        if (num > nums[i - 1] + 1) {
            list.push([num])
            continue
        }
        if (num === list[0][list[0].length - 1]) {
            list.push([num])
            continue
        }

        let isFill = false
        for (let j = list.length - 1; j >= 0; j--) {
            const arr = list[j]
            if (num === arr[arr.length - 1] + 1) {
                arr.push(num)
                isFill = true
                break
            }
        }
        if (!isFill) {
            list.push([num])
        }
    }
    for (let i = 0; i < list.length; i++) {
        if (list[i].length < 3) {
            return false
        }
    }
    return true
}

/**
 * 391. 完美矩形
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const isRectangleCover = function (rectangles) {
    // 顶点的集合
    const points = new Set()
    // 所有矩形的面积和
    let totalArea = 0
    // 目标矩形的坐标
    let [X1, Y1, X2, Y2] = rectangles[0]

    for (let i = 0; i < rectangles.length; i++) {
        const [x1, y1, x2, y2] = rectangles[i]
        // 计算最终目标矩形的左下角和右上角
        X1 = Math.min(X1, x1)
        Y1 = Math.min(Y1, y1)
        X2 = Math.max(X2, x2)
        Y2 = Math.max(Y2, y2)

        // 所有矩形的面积和
        totalArea += (x2 - x1) * (y2 - y1)

        // 四个顶点
        const pointList = [[x1, y1], [x1, y2], [x2, y2], [x2, y1]]
        for (let j = 0; j < pointList.length; j++) {
            const [x, y] = pointList[j]
            const key = `${x}_${y}`
            if (points.has(key)) {
                points.delete(key)
            } else {
                points.add(key)
            }
        }
    }

    // 如果面积不想等,一定无法成为完美矩形
    if ((X2 - X1) * (Y2 - Y1) !== totalArea) {
        return false
    }
    // 非4个顶点,
    if (points.size !== 4) {
        return false
    }

    // 剩下的四个顶点应该和目标矩形顶点相符
    if (!points.has(`${X1}_${Y1}`)) return false
    if (!points.has(`${X1}_${Y2}`)) return false
    if (!points.has(`${X2}_${Y2}`)) return false
    if (!points.has(`${X2}_${Y1}`)) return false

    return true
}
