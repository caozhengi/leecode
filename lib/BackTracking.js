/**
 * 回溯算法集合
 * 主要思路为 DFS(深度优先搜索)
 */

/**
 * 46. 全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    // 结果
    const res = []
    // 记录节点是否有被使用
    const used = new Array(nums.length).fill(false)
    // 走过的路径
    const track = []

    // 回溯
    const backTrack = () => {
        // 如果到了最后一个节点，保存记录
        if (track.length === nums.length) {
            res.push(track.slice())
            return
        }

        for (let i = 0; i < nums.length; i++) {
            // 排除不合法的选择
            if (used[i]) {
                continue
            }
            // 做选择
            track.push(nums[i])
            used[i] = true

            // 进入下一层
            backTrack()

            // 取消选择
            used[i] = false
            track.pop()
        }
    }

    backTrack()
    return res
}

/**
 * 51. N 皇后
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
    // 结果
    const res = []
    // 走过的路径
    const board = new Array(n).fill(0).map(() => new Array(n).fill('.'))
    // 当前位置是否可放置皇后
    const isValid = (row, col) => {
        /**
            . . . .
            . . Q .
            . . . .
            . . . .
         */

        // 上方
        for (let i = 0; i < row; i++) {
            const cur = board[i][col]
            if (cur === 'Q') {
                return false
            }
        }

        // 左上方
        for (let i = 1; i <= Math.min(row, col); i++) {
            const cur = board[row - i][col - i]
            if (cur === 'Q') {
                return false
            }
        }

        // 右上方
        for (let i = 1; i <= Math.min(row, n - col - 1); i++) {
            const cur = board[row - i][col + i]
            if (cur === 'Q') {
                return false
            }
        }

        return true
    }

    // 回溯
    const backTrack = (row) => {
        // console.log(JSON.stringify(board).replace(/\],\[/g,']\n['))
        // 如果走过了最后一个行，证明前面N行都可以放置一个皇后
        if (row === n) {
            const tmp = []
            board.forEach(e => tmp.push(e.join('')))
            res.push(tmp)
            return
        }

        for (let col = 0; col < board[row].length; col++) {
            // 排除不合法的选择
            if (!isValid(row, col)) {
                continue
            }
            // 做选择
            board[row][col] = 'Q'

            // 进入下一层
            backTrack(row + 1)

            // 取消选择
            board[row][col] = '.'
        }
    }

    backTrack(0)
    return res
}

/**
 * 698. 划分为k个相等的子集
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const canPartitionKSubsets = function (nums, k) {
    let sum = 0
    nums.forEach(n => sum += n)

    // 如果子集数量小于数组长度，元素不够无法平分
    if (k > nums.length) {
        return false
    }

    // 如果总数无法整除子集数量，无法平分
    if (sum % k !== 0) {
        return false
    }

    // const used = new Array(nums.length).fill(0);      // 每个数是否用过
    let used = 0 // 用二进制位枚举的方式来表达每一位的状态
    const bucket = new Array(k).fill(0) // 每个桶的的数量和
    const target = sum / k // 每个桶目标的数量和
    const memo = {} // 缓存used不同的组合方式是否===target

    // 回溯
    const backTrack = (bucketIndex, start) => {
        // 如果所有的桶都处理完了，因为target = sum / k，且每个桶都 === target，所以是成功的
        if (bucketIndex === k) {
            return true
        }

        // 如果当前桶满了，继续装下一个桶
        if (bucket[bucketIndex] === target) {
            // 让下一个桶从0开始选数字，因为之前选过的数字有一些是被continue，没有用过的
            const res = backTrack(bucketIndex + 1, 0)
            memo[used] = res
            return res
        }

        // 如果存在缓存，直接返回缓存结果
        if (memo[used] !== undefined) {
            return memo[used]
        }

        for (let i = start; i < nums.length; i++) {
            const num = nums[i]
            // 排除不合法的选择
            // if (used[i]) {
            if ((used >> i) & 1 === 1) {
                continue
            }
            // 如果当前元素和 大于 目标值，继续下一个循环
            if (bucket[bucketIndex] + num > target) {
                continue
            }

            // 做选择
            bucket[bucketIndex] += num
            // used[i] = 1;
            used |= 1 << i

            // console.log('----', bucket[bucketIndex], num, used)

            // 进入下一层
            if (backTrack(bucketIndex, start + 1)) {
                return true
            };

            // 取消选择
            bucket[bucketIndex] -= num
            // used[i] = 0;
            used ^= 1 << i
        }
        return false
    }

    return backTrack(0, 0)
}

/**
 * 78. 子集
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
    const res = []
    const track = []

    // 回溯
    const backTrack = (start) => {
        res.push(track.slice())

        for (let i = start; i < nums.length; i++) {
            const num = nums[i]
            track.push(num)

            // 进入下一层
            backTrack(i + 1)

            track.pop()
        }
    }

    backTrack(0)
    return res
}

/**
 * 77. 组合
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
    const res = []
    const track = []

    // 回溯
    const backTrack = (start) => {
        if (track.length === k) {
            res.push(track.slice())
            return
        }

        for (let i = start; i <= n; i++) {
            // 做选择
            track.push(i)

            // 进入下一层
            backTrack(i + 1)

            // 取消选择
            track.pop()
        }
    }

    backTrack(1)
    return res
}

/**
 * 90. 子集 II
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function (nums) {
    const res = []
    const track = []
    nums.sort((a, b) => a - b)

    // 回溯
    const backTrack = (start) => {
        res.push(track.slice())
        for (let i = start; i < nums.length; i++) {
            const num = nums[i]

            if (i > start && num === nums[i - 1]) {
                continue
            }

            track.push(num)

            // 进入下一层
            backTrack(i + 1)

            track.pop()
        }
    }

    backTrack(0)
    return res
}

/**
 * 40. 组合总和 II
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function (candidates, target) {
    const res = []
    const track = []
    let sum = 0

    // 对candidates排序，避免相同数字
    candidates.sort((a, b) => a - b)

    // 回溯
    const backTrack = (start) => {
        if (sum === target) {
            res.push(track.slice())
        }

        if (sum > target) {
            return
        }

        for (let i = start; i < candidates.length; i++) {
            const num = candidates[i]

            // 剪枝，去掉排序后并且相同数值的后续逻辑
            if (i > start && num === candidates[i - 1]) {
                continue
            }

            // 做选择
            track.push(num)
            sum += num

            // 进入下一层
            backTrack(i + 1)

            // 取消选择
            track.pop()
            sum -= num
        }
    }

    backTrack(0)
    return res
}

/**
 * 47. 全排列 II
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function (nums) {
    const used = new Array(nums.length).fill(false)
    const res = []
    const track = []

    // 对nums排序，避免相同数字
    nums.sort((a, b) => a - b)

    // 回溯
    const backTrack = () => {
        if (track.length === nums.length) {
            res.push(track.slice())
            return
        }

        for (let i = 0; i < nums.length; i++) {
            const num = nums[i]

            if (used[i]) {
                continue
            }

            const tmp = track.slice()
            tmp.push(num)

            // 剪枝，如果前面一个相同元素被使用过
            if (i > 0 && num === nums[i - 1] && used[i - 1]) {
                continue
            }

            // 做选择
            track.push(num)
            used[i] = true

            // 进入下一层
            backTrack()

            // 取消选择
            track.pop()
            used[i] = false
        }
    }

    backTrack()
    return res
}

/**
 * 39. 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) {
    const res = []
    const track = []
    let sum = 0

    // 回溯
    const backTrack = (start) => {
        if (sum === target) {
            res.push(track.slice())
        }

        if (sum > target) {
            return
        }

        for (let i = start; i < candidates.length; i++) {
            const num = candidates[i]

            // 做选择
            track.push(num)
            sum += num

            // 进入下一层
            backTrack(i)

            // 取消选择
            track.pop()
            sum -= num
        }
    }

    backTrack(0)
    return res
}

/**
 * 216. 组合总和 III
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
const combinationSum3 = function (k, n) {
    const res = []
    const track = []
    let sum = 0

    // 回溯
    const backTrack = (start) => {
        if (sum === n && track.length === k) {
            res.push(track.slice())
        }

        if (sum > n) {
            return
        }

        if (track.length > k) {
            return
        }

        for (let i = start; i <= 9; i++) {
            // 做选择
            track.push(i)
            sum += i

            // 进入下一层
            backTrack(i + 1)

            // 取消选择
            track.pop()
            sum -= i
        }
    }

    backTrack(1)
    return res
}

/**
 * 22. 括号生成
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
    const result = []

    // 回溯
    const backTrack = (str, left, right) => {
        // 右括号数量不能大于左括号
        if (right > left) {
            return
        }

        // 左括号不能大于n个
        if (left > n) {
            return
        }

        // 左右各n个
        if (str.length >= n * 2) {
            result.push(str)
            return
        }

        // 放一个左括号
        backTrack(str + '(', left + 1, right)

        // 放一个右括号
        backTrack(str + ')', left, right + 1)
    }

    backTrack('', 0, 0)
    return result
}
