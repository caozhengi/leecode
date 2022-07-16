/**
 * 动态规划相关问题
 * 动态规划，英文是Dynamic Programming，简称DP，擅长解决“多阶段决策问题”，
 * 利用各个阶段阶段的递推关系，逐个确定每个阶段的最优决策，并最终得到原问题的最优决策。
 *
 * 架框维思： 明确 Base Case -> 明确 "状态" -> 明确 "选择" -> 定义 DP数组/函数的含义
 */

/**
 * 322. 零钱兑换
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
    // 存储每次子问题的计算结果
    const memo = {}

    // 动态规划函数
    const dp = (amount) => {
    // 结果
        let result = Infinity

        // base case
        if (amount === 0) return 0
        if (amount < 0) return -1

        // 循环每个金额
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i]

            // 子问题需计算的amount
            const sumAmount = amount - coin

            // 子问题的计算结果
            let subProgramRsult

            // 优先用备忘录中的结果，否者重新计算
            if (memo[sumAmount]) {
                subProgramRsult = memo[sumAmount]
            } else {
                // 计算子问题的结果
                subProgramRsult = dp(amount - coin)
                memo[sumAmount] = subProgramRsult
            }

            // 如果子问题无解则跳过
            if (subProgramRsult === -1) {
                continue
            }

            // 在子问题中求最优解
            result = Math.min(result, subProgramRsult + 1)
        }

        return result === Infinity ? -1 : result
    }

    return dp(amount)
}

/**
 * 70. 爬楼梯
 * 一节
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
    const dp = new Array(n + 1).fill(0)

    for (let i = 0; i <= n; i++) {
    // base case
        if (i <= 2) {
            dp[i] = i
            continue
        }
        // 爬到第 n 级台阶的方法个数等于爬到 n - 1 的方法个数和爬到 n - 2 的方法个数之和。
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
}

/**
 * 221. 最大正方形
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = function (matrix) {
    const rowLength = matrix.length
    const colLength = matrix[0] ? matrix[0].length : 0

    let result = 0

    // 缓存结果的数组
    const dp = []
    matrix.forEach(e => dp.push(e.slice().map(e => Number(e))))

    // 遍历每一个行
    for (let row = 0; row < rowLength; row++) {
    // 遍历每行中每一列
        for (let col = 0; col < colLength; col++) {
            const value = dp[row][col]

            if (value === 0) {
                continue
            }

            const top = row > 0 ? dp[row - 1][col] : 0
            const left = col > 0 ? dp[row][col - 1] : 0
            const topLeft = row > 0 && col > 0 ? dp[row - 1][col - 1] : 0

            // 三个正方形区域取最小边长值, 因为当前是1，所以边长加1
            const current = Math.min(top, left, topLeft) + 1

            dp[row][col] = current

            result = Math.max(result, current)
        }
    }

    return result * result
}

/**
 * 91. 解码方法
 * @param {string} s
 * @return {number}
 */
const numDecodings = function (s) {
    const dp = new Array(s.length + 1).fill(0)
    dp[0] = 1

    // 当前数字是否可以解码
    const isValid = (num) => {
        num = Number(num)
        return num > 0 && num < 27
    }

    for (let i = 1; i <= s.length; i++) {
        // 第一种情况是我们使用了一个字符，即 s[i]进行解码，那么只要 s[i] !== 0, 它就可以被解码成 A∼I 中的某个字母。
        if (s[i - 1] !== '0') {
            dp[i] = dp[i - 1]
        }

        // 第二种情况是我们使用了两个字符，即 s[i-1]s[i−1] 和 s[i]s[i] 进行编码。
        if (i > 1 && s[i - 2] !== '0' && isValid(`${s[i - 2]}${s[i - 1]}`)) {
            dp[i] += dp[i - 2]
        }
    }

    return dp[s.length]
}

/**
 * 62. 不同路径
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
    // 备忘录
    const memo = {}

    // 定义：从 (0, 0) 到 (x, y) 有 dp(x, y) 条路径
    const dp = (x, y) => {
    // 起点路径为1
        if (x === 0 && y === 0) {
            return 1
        }
        // 超出范围不继续计算
        if (x < 0 || y < 0) {
            return 0
        }

        const key = `${x}-${y}`
        if (memo[key] === undefined) {
            memo[key] = dp(x - 1, y) + dp(x, y - 1)
        }
        // 状态转移方程：
        return memo[key]
    }

    // 因为起点为0，高度为m的最后一位为m - 1
    return dp(m - 1, n - 1)
}

/**
 * 63. 不同路径 II
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {

}

/**
 * 931. 下降路径最小和
 * @param {number[][]} matrix
 * @return {number}
 */
const minFallingPathSum = function (matrix) {

}
