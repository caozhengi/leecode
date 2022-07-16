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
var coinChange = function (coins, amount) {
    // 存储每次子问题的计算结果
    const memo = {};

    // 动态规划函数
    const dp = (amount) => {
        // 结果
        let result = Infinity;

        // base case
        if (amount === 0) return 0;
        if (amount < 0) return - 1;

        // 循环每个金额
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];

            // 子问题需计算的amount
            const sumAmount = amount - coin;

            // 子问题的计算结果
            let subProgramRsult;

            // 优先用备忘录中的结果，否者重新计算
            if (memo[sumAmount]) {
                subProgramRsult = memo[sumAmount]
            } else {
                // 计算子问题的结果
                subProgramRsult = dp(amount - coin);
                memo[sumAmount] = subProgramRsult;
            }

            // 如果子问题无解则跳过
            if (subProgramRsult === -1) {
                continue
            }

            // 在子问题中求最优解
            result = Math.min(result, subProgramRsult + 1)
        }

        return result === Infinity ? -1 : result;
    }

    return dp(amount)
};


/**
 * 70. 爬楼梯
 * 一节
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    let dp = new Array(n + 1).fill(0);

    for (let i = 0; i <= n; i++) {
        // base case
        if (i <= 2) {
            dp[i] = i;
            continue
        }
        // 爬到第 n 级台阶的方法个数等于爬到 n - 1 的方法个数和爬到 n - 2 的方法个数之和。
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n]
};


/**
 * 221. 最大正方形
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    const rowLength = matrix.length;
    const colLength = matrix[0] ? matrix[0].length : 0;

    let result = 0;

    // 缓存结果的数组
    const dp = [];
    matrix.forEach(e => dp.push(e.slice().map(e => Number(e))));

    // 遍历每一个行
    for (let row = 0; row < rowLength; row++) {
        // 遍历每行中每一列
        for (let col = 0; col < colLength; col++) {
            const value = dp[row][col];

            if (value === 0) {
                continue;
            }

            const top = row > 0 ? dp[row - 1][col] : 0;
            const left = col > 0 ? dp[row][col - 1] : 0
            const topLeft = row > 0 && col > 0 ? dp[row - 1][col - 1] : 0;

            // 三个正方形区域取最小边长值, 因为当前是1，所以边长加1
            const current = Math.min(top, left, topLeft) + 1;

            dp[row][col] = current;

            result = Math.max(result, current);

        }
    }

    return result * result
};

/**
 * 91. 解码方法
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    const dp = new Array(s.length + 1);

};