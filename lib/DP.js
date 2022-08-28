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
    const rowLength = obstacleGrid.length
    const colLength = obstacleGrid[0] ? obstacleGrid[0].length : 0

    // 备忘录
    const memo = {}

    // 定义：从 (0, 0) 到 (x, y) 有 dp(x, y) 条路径
    const dp = (x, y) => {
        // 遇到阻碍返回0
        if (x >= 0 && y >= 0 && obstacleGrid[x][y] === 1) {
            return 0
        }
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
    return dp(rowLength - 1, colLength - 1)
}

/**
 * 139. 单词拆分
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict) {
    // 备忘录，记录从index开始后的字符是否能用字典拼接出来，避免重复计算
    const memo = new Array(s.length + 1).fill(-1)

    // 指定的单词是否能用字典拼接出来
    const dp = (index) => {
        const str = s.slice(index)

        if (memo[index] !== -1) {
            return memo[index] === 1
        }

        if (str === '') {
            return true
        }

        for (let i = 0; i < wordDict.length; i++) {
            const word = wordDict[i]

            if (str.slice(0, word.length) === word) {
                if (dp(index + word.length) === true) {
                    memo[index] = 1
                    return true
                }
            }
        }
        memo[index] = 0
        return false
    }
    return dp(0)
}

/**
 * 931. 下降路径最小和
 * @param {number[][]} matrix
 * @return {number}
 */
const minFallingPathSum = function (matrix) {
    const rowLength = matrix.length
    const colLength = matrix[0] ? matrix[0].length : 0

    // 记录每个点之后的下降路径最小和，key为 ${row}-${col}
    const memo = {}

    // 返回
    const dp = (rowIndex, colIndex) => {
        // 备忘录的key
        const key = `${rowIndex}-${colIndex}`
        // 优先返回备忘录的结果
        if (memo[key] !== undefined) {
            return memo[key]
        }
        // 超过最后一行时，返回0
        if (rowIndex >= rowLength) {
            return 0
        }

        // 结果列表
        const tmp = []
        const colStart = Math.max(0, colIndex - 1)
        const colEnd = Math.min(colLength - 1, colIndex + 1)

        // 计算下一行相邻的
        for (let i = colStart; i <= colEnd; i++) {
            tmp.push(dp(rowIndex + 1, i))
        }

        // 找到最小的路径
        const min = Math.min(...tmp)
        const current = matrix[rowIndex][colIndex]
        const result = current + min
        memo[key] = result
        return result
    }

    return Math.min(...matrix[0].map((value, colIndex) => dp(0, colIndex)))
}

/**
 * 1696. 跳跃游戏 VI
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxResult = function (nums, k) {
    // 单调队列
    const queue = new MonotoneDecreaseQueue()
    // 备忘录
    const dp = new Array(nums.length)

    dp[0] = nums[0]
    queue.push(dp[0])

    for (let i = 1; i < nums.length; i++) {
        // i的最大值等于  dp[i-k] 到 dp[i-i] 中所有的最大值
        dp[i] = queue.top + nums[i]

        // 维护窗口装着 dp[i-1..i-k]
        if (dp[i - k] === queue.top) {
            queue.pop()
        }

        queue.push(dp[i])
    }

    return dp[nums.length - 1]
}

/**
 * 72. 编辑距离
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance73 = function (word1, word2) {
    const memo = {}

    // word1[0-i] 和 word2[0-j] 的最少操作数
    const dp = (i, j) => {
        // base case  当一侧的索引到头时候，另外单词没处理的字符可以全部删除
        if (i < 0) return j + 1
        if (j < 0) return i + 1

        // 判断备忘录中是否有结果
        const key = `${i}-${j}`
        if (memo[key] !== undefined) {
            return memo[key]
        }

        //   'are'
        // 'horse'

        if (word1[i] === word2[j]) {
            // 如果当前索引的两个字符相同，继续处理
            return dp(i - 1, j - 1)
        } else {
            memo[key] = Math.min(
                dp(i - 1, j) + 1, // 删除word1中的一个字符，i索引像前
                dp(i, j - 1) + 1, // word1新增一个字符
                dp(i - 1, j - 1) + 1 // 替换，两个索引都向前
            )
            return memo[key]
        }
    }

    return dp(word1.length - 1, word2.length - 1)
}

/**
 * 300. 最长递增子序列 简称: LIS
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function (nums) {
    // 以i结尾的递增序列最大长度, 最小为1
    const dp = new Array(nums.length).fill(1)
    // 结果
    let result = 0

    for (let i = 0; i < nums.length; i++) {
        // 在i之前找到一个结尾比i小的
        for (let j = i; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        result = Math.max(result, dp[i])
    }
    return result
}

/**
 * 300. 最长递增子序列 简称: LIS， 二分查找法，效率更高
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS_ (nums) {
    // 一共有多少个堆
    let piles = 0
    // 数组长度
    const n = nums.length
    // 每个堆的最小值
    const top = []
    for (let i = 0; i < n; i++) {
        // 要处理的扑克牌
        const num = nums[i]

        let left = 0
        let right = piles

        // 二分查找插入位置
        while (left < right) {
            const mid = Math.floor((left + right) / 2)

            if (top[mid] >= num) {
                right = mid
            } else {
                left = mid + 1
            }
        }
        // 没有找到合适的堆，新建一堆
        if (left === piles) piles++
        // 把这张牌放到牌堆顶
        top[left] = num
    }

    // 牌堆数就是 LIS 长度
    return piles
}

/**
 * 354. 俄罗斯套娃信封问题 TODO 需要重新思考
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = function (envelopes) {
    // 对w进行升序排序，w相同时 对h降序排序
    envelopes.sort(([aw, ah], [bw, bh]) => {
        if (aw === bw) {
            return bh - ah
        } else {
            return aw - bw
        }
    })

    // 包含第i个信封时，最多能套几个信封
    const dp = new Array(envelopes.length).fill(1)

    // 结果
    let result = 0

    for (let i = 0; i < envelopes.length; i++) {
        // 在i之前找到一个结尾比i小的
        for (let j = i; j >= 0; j--) {
            if (envelopes[i][1] > envelopes[j][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        result = Math.max(result, dp[i])
    }
    return result
}

/**
 * 53. 最大子数组和
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
    // 以i结尾，最大子数组的和为dp[i]
    const dp = nums.slice()
    let result = nums[0]

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]
        dp[i] = Math.max(num, num + dp[i - 1])
        result = Math.max(dp[i], result)
    }
    return result
}

/**
 * 1143. 最长公共子序列
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
    const memo = {} // 备忘录

    // text1[0-i] 和 text2[0-j] 的 最长公共子序列
    const dp = (i, j) => {
        // base case,  当有一个索引达到终点时，不会有公共子序列
        if (i < 0 || j < 0) return 0

        // 从备忘录里查找是否有计算过的数据
        const key = `${i}-${j}`
        if (memo[key] !== undefined) {
            return memo[key]
        }

        // 如果两个字符相等
        if (text1[i] === text2[j]) {
            return dp(i - 1, j - 1) + 1
        } else {
            memo[key] = Math.max(
                dp(i - 1, j), // text1向前一位
                dp(i, j - 1), // text2向前一位
                dp(i - 1, j - 1) // 两个都向前一位
            )
            return memo[key]
        }
    }

    return dp(text1.length - 1, text2.length - 1)
}

/**
 * 583. 两个字符串的删除操作
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2) {
    const memo = {} // 备忘录

    // 使 word1[0-i] 和 word2[0-j] 相同所需的最小步数
    const dp = (i, j) => {
        // base case,  当有一个索引达到终点时，另外一个剩下的字符需全部删除
        if (i < 0) return j + 1
        if (j < 0) return i + 1

        // 从备忘录里查找是否有计算过的数据
        const key = `${i}-${j}`
        if (memo[key] !== undefined) {
            return memo[key]
        }

        // 如果两个字符相等
        if (word1[i] === word2[j]) {
            return dp(i - 1, j - 1)
        } else {
            memo[key] = Math.min(
                dp(i - 1, j) + 1, // 删除word1一个字符
                dp(i, j - 1) + 1 // 删除word2一个字符
            )
            return memo[key]
        }
    }

    return dp(word1.length - 1, word2.length - 1)
}

/**
 * 712. 两个字符串的最小ASCII删除和
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum = function (s1, s2) {
    const memo = {} // 备忘录

    // 使 s1[0-i] 和 s2[0-j] 相同所需的最小步数
    const dp = (i, j) => {
        // base case,  当有一个索引达到终点时，另外一个剩下的字符需全部相加
        if (i < 0) {
            let sum = 0
            for (let index = 0; index <= j; index++) {
                sum += s2[index].charCodeAt()
            }
            return sum
        }
        if (j < 0) {
            let sum = 0
            for (let index = 0; index <= i; index++) {
                sum += s1[index].charCodeAt()
            }
            return sum
        }

        // 从备忘录里查找是否有计算过的数据
        const key = `${i}-${j}`
        if (memo[key] !== undefined) {
            return memo[key]
        }

        // 如果两个字符相等
        if (s1[i] === s2[j]) {
            return dp(i - 1, j - 1)
        } else {
            memo[key] = Math.min(
                dp(i - 1, j) + s1[i].charCodeAt(), // 删除s1一个字符
                dp(i, j - 1) + s2[j].charCodeAt() // 删除s2一个字符
            )
            return memo[key]
        }
    }

    return dp(s1.length - 1, s2.length - 1)
}

/**
 * 10. 正则表达式匹配
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
    // 备忘录
    const memo = {}

    // 从 s[i] 和 p[j] 开始，是否可以匹配
    const dp = (i, j) => {
        // base case  同时都达到的末尾，证明匹配成功
        if (i >= s.length && j >= p.length) {
            return true
        }

        // 从备忘录里查找是否有计算过的数据
        const key = `${i}-${j}`
        if (memo[key] !== undefined) {
            return memo[key]
        }

        // 如果下一个字符是*  匹配0或者多次当前字符
        if (p[j + 1] === '*') {
            // 用*匹配0次
            if (dp(i, j + 2) === true) {
                return true
            }

            // 用*匹配 1+ 次
            for (let k = i; k <= s.length; k++) {
                // 从i之后的字符有和p[j]不一样的 并且 p[j] 不是 '.'
                if (s[k] !== p[j] && p[j] !== '.') {
                    break
                }
                // 剩下的场景都是有 s[i]+ 有多个字符都是p[j]的
                if (dp(k + 1, j + 2) === true) {
                    return true
                }
            }
        }

        // 如果两个字符相等
        if (s[i] === p[j]) {
            return dp(i + 1, j + 1)
        }

        // 如果当前通配符是'.'  并且s[i]存在
        if (p[j] === '.' && i <= s.length - 1) {
            return dp(i + 1, j + 1)
        }

        memo[key] = false
        return memo[key]
    }
    return dp(0, 0)
}

/**
 * 416. 分割等和子集  背包问题变形
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = function (nums) {
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
    }

    // 因为nums里都是正整数，如果所有数的合无法被2整除，说明无法分割
    if (sum % 2 !== 0) {
        return false
    }

    // 子集的所有数的合应该为sum/2
    sum = sum / 2

    // dp[i][j] 选择i个元素，是否可以把j的背包填满
    const dp = new Array(nums.length + 1).fill(0).map(() => new Array(sum + 1))

    // base case, 不选择元素  无法填满非0大小的背包
    dp[0] = new Array(sum + 1).fill(false)

    // base case, 任意前i的元素，都可以一个不选，填满大小为0的背包
    dp.forEach(e => { e[0] = true })

    // i为第i-1个元素，j为背包大小
    for (let i = 1; i <= nums.length; i++) {
        for (let j = 1; j <= sum; j++) {
            // dp[i][j] 的意思为  在数量为i个元素中随意挑选，和等于j
            if (j < nums[i - 1]) {
                // 背包的容量不够时, 无法把当前元素放进去背包，结果取决于相同背包大小的上一个元素
                dp[i][j] = dp[i - 1][j]
            } else {
                // 不选择nums[i] 是否能填满取决于 相同背包大小的上一个元素
                // 选择nums[i]  是否能填满取决于 上一个状态时，和为j-nums[i - 1] 是否为true
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
            }
        }
    }

    return dp[nums.length][sum]
}

/**
 * 518. 零钱兑换 II (双维数组)
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_ = function (amount, coins) {
    // dp[i][j] 选择前i个元素，有几种方法可以把大小为j的背包填满
    const dp = new Array(coins.length + 1).fill(0).map(() => new Array(amount + 1))

    // base case, 不选择元素  无法填满非0大小的背包
    dp[0] = new Array(amount + 1).fill(0)

    // base case, 任意前i的元素，都可以一个不选，填满大小为0的背包
    dp.forEach(e => { e[0] = 1 })

    // i为第i-1个元素，j为背包大小
    for (let i = 1; i <= coins.length; i++) {
        // 当前金币的金额，
        const coin = coins[i - 1]

        for (let j = 1; j <= amount; j++) {
            // dp[i][j] 的意思为  在数量为i个元素中随意挑选，和等于j
            if (j < coin) {
                // 背包的容量不够时, 无法把当前元素放进去背包，结果取决于 相同背包 大小的上一个元素
                dp[i][j] = dp[i - 1][j]
            } else {
                // 结果取决于 选取当前金币 和 不选当前金币 的结果之和
                // 不选择的结果为 相同背包大小的上一个元素
                // 选择的结果为 选择当前金币，和为j-coin，因为可重复选取，所以是dp[i]
                dp[i][j] = dp[i - 1][j] + dp[i][j - coin]
            }
        }
    }
    return dp[coins.length][amount]
}
/**
 * 518. 零钱兑换 II (单维数组)
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change = function (amount, coins) {
    // dp[i]为  当合为i时， 选取的金币的数量的可能性之合
    const dp = new Array(amount + 1).fill(0)

    // base case, 只有当不选取任何硬币时，金额之和才为 0，只有 1种硬币组合
    dp[0] = 1

    // 原理为，从包含第一个金币开始计算，dp数组的结果
    for (let i = 0; i < coins.length; i++) {
        // 当前金币的金额，
        const coin = coins[i]
        // 因为如果j<coin, 当前金额无法被添加到可能中
        for (let j = coin; j <= amount; j++) {
            // 当选择当前金币时，结果为 当前的可能性 叠加 大小为j-coin的可能性
            dp[j] += dp[j - coin]
        }
    }

    return dp[amount]
}

/**
 * 121. 买卖股票的最佳时机 (非动态规划解法)
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_I = function (prices) {
    let min = prices[0]
    let max = prices[0]

    let result = 0

    for (const price of prices) {
        if (price < min) {
            min = price
            max = price
        } else {
            max = price
            result = Math.max(result, max - min)
        }
    }
    return result
}

/**
 * 121. 买卖股票的最佳时机 (动态规划解法)
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_I_DP = function (prices) {
    // dp[i][m] = 最大收益   i为天数，m为是否持仓
    const dp = new Array(prices.length).fill(0).map(
        () => new Array(2).fill(0)
    )
    // base case, 只要在第一天买入，当前收益为 -price
    dp[0][1] = -prices[0]

    for (let i = 1; i < prices.length; i++) {
        // 当前价格
        const price = prices[i]

        // 当次持仓，分为  买入股票（不是dp[i - 1][0] - price 是因为dp[i - 1][0]可能包含之前有买入且卖出的） 和 昨天持仓，当次什么都不做
        dp[i][1] = Math.max(-price, dp[i - 1][1])

        // 当次不持仓，分为 昨天持仓 当次卖出， 和 上一次不持仓，当次什么都不做
        dp[i][0] = Math.max(dp[i - 1][1] + price, dp[i - 1][0])
    }

    return dp[prices.length - 1][0]
}

/**
 * 122. 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_II = function (prices) {
    // dp[i][m] = 最大收益   i为天数，m为是否持仓
    const dp = new Array(prices.length).fill(0).map(
        () => new Array(2).fill(0)
    )
    // base case, 只要在第一天买入，当前收益为 -price
    dp[0][1] = -prices[0]

    for (let i = 1; i < prices.length; i++) {
        // 当前价格
        const price = prices[i]

        // 当次持仓，分为  昨天不持仓 买入股票 和 昨天持仓，当次什么都不做
        dp[i][1] = Math.max(dp[i - 1][0] - price, dp[i - 1][1])

        // 当次不持仓，分为 昨天持仓 当次卖出， 和 上一次不持仓，当次什么都不做
        dp[i][0] = Math.max(dp[i - 1][1] + price, dp[i - 1][0])
    }

    return dp[prices.length - 1][0]
}

/**
 * 309. 最佳买卖股票时机含冷冻期
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_309 = function (prices) {
    // dp[i][m] = 最大收益   i为天数，m为是否持仓
    const dp = new Array(prices.length).fill(0).map(
        () => new Array(2).fill(0)
    )
    // base case, 只要在第一天买入，当前收益为 -price
    dp[0][1] = -prices[0]

    for (let i = 1; i < prices.length; i++) {
        // 当前价格
        const price = prices[i]

        // 当次持仓，分为  昨天不持仓 买入股票 和 昨天持仓，当次什么都不做
        if (i > 2) {
            // 存在冷静期的场景
            dp[i][1] = Math.max(dp[i - 2][0] - price, dp[i - 1][1])
        } else {
            // 不存在冷静期， 因有冷静期限制 i===2时，不可能0买入1卖出，所以不持仓买入股票为-price
            dp[i][1] = Math.max(-price, dp[i - 1][1])
        }

        // 当次不持仓，分为 昨天持仓 当次卖出， 和 上一次不持仓，当次什么都不做
        dp[i][0] = Math.max(dp[i - 1][1] + price, dp[i - 1][0])
    }

    return dp[prices.length - 1][0]
}

/**
 * 714. 买卖股票的最佳时机含手续费
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
const maxProfit_714 = function (prices, fee) {
    // dp[i][m] = 最大收益   i为天数，m为是否持仓
    const dp = new Array(prices.length).fill(0).map(
        () => new Array(2).fill(0)
    )
    // base case, 只要在第一天买入，当前收益为 -price
    dp[0][1] = -prices[0]

    for (let i = 1; i < prices.length; i++) {
        // 当前价格
        const price = prices[i]

        // 当次持仓，分为  昨天不持仓 买入股票 和 昨天持仓，当次什么都不做
        dp[i][1] = Math.max(dp[i - 1][0] - price, dp[i - 1][1])

        // 当次不持仓，分为 昨天持仓 当次卖出， 和 上一次不持仓，当次什么都不做
        dp[i][0] = Math.max(dp[i - 1][1] + price - fee, dp[i - 1][0])
    }

    return dp[prices.length - 1][0]
}

/**
 * 123. 买卖股票的最佳时机 III
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_123 = function (prices, k = 2) {
    // dp[i][j][m] = 最大收益   i为天数，j为最多交易次数，m为是否持仓， 买入时交易次数+1
    const dp = new Array(prices.length).fill(0).map(
        () => new Array(k + 1).fill(0).map(
            () => new Array(2).fill(0)
        )
    )
    // base case 第0天，如果持仓，无论最多交易几次，只能买入一次，此时收益为-prices[0]
    for (let j = 1; j < dp[0].length; j++) {
        dp[0][j][1] = -prices[0]
    }

    // 因为i和j从1开始， 所以basecase中需考虑 i和j为0的情况，j为0，没有买入，最大收益为0
    for (let i = 1; i < prices.length; i++) {
        // 当前价格
        const price = prices[i]
        // 循环买入卖出次数
        for (let j = 1; j <= k; j++) {
            // 当次持仓，分为上次空仓当次买入， 和 上一次持仓，当次什么都不做
            dp[i][j][1] = Math.max(dp[i - 1][j - 1][0] - price, dp[i - 1][j][1])

            // 当次不持仓，分为上次持仓当次卖出， 和 上一次不持仓，当次什么都不做
            dp[i][j][0] = Math.max(dp[i - 1][j][1] + price, dp[i - 1][j][0])

            // console.log(`==第${i + 1}天，最多${j}次交易，当前持仓==`, dp[i][j][1], dp[i - 1][j - 1][0] - price, dp[i - 1][j][1])
            // console.log(`==第${i + 1}天，最多${j}次交易，当前空仓==`, dp[i][j][0], dp[i - 1][j][0] + price, dp[i - 1][j][0])
        }
    }

    return dp[prices.length - 1][k][0]
}

/**
 * 188. 买卖股票的最佳时机 IV
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (k, prices) {
    if (!prices.length) {
        return 0
    }
    // dp[i][j][m] = 最大收益   i为天数，j为最多交易次数，m为是否持仓， 买入时交易次数+1
    const dp = new Array(prices.length).fill(0).map(
        () => new Array(k + 1).fill(0).map(
            () => new Array(2).fill(0)
        )
    )
    // base case 第0天，如果持仓，无论最多交易几次，只能买入一次，此时收益为-prices[0]
    for (let j = 1; j < dp[0].length; j++) {
        dp[0][j][1] = -prices[0]
    }

    // 因为i和j从1开始， 所以basecase中需考虑 i和j为0的情况，j为0，没有买入，最大收益为0
    for (let i = 1; i < prices.length; i++) {
        // 当前价格
        const price = prices[i]
        // 循环买入卖出次数
        for (let j = 1; j <= k; j++) {
            // 当次持仓，分为上次空仓当次买入， 和 上一次持仓，当次什么都不做
            dp[i][j][1] = Math.max(dp[i - 1][j - 1][0] - price, dp[i - 1][j][1])

            // 当次不持仓，分为上次持仓当次卖出， 和 上一次不持仓，当次什么都不做
            dp[i][j][0] = Math.max(dp[i - 1][j][1] + price, dp[i - 1][j][0])

            // console.log(`==第${i + 1}天，最多${j}次交易，当前持仓==`, dp[i][j][1], dp[i - 1][j - 1][0] - price, dp[i - 1][j][1])
            // console.log(`==第${i + 1}天，最多${j}次交易，当前空仓==`, dp[i][j][0], dp[i - 1][j][0] + price, dp[i - 1][j][0])
        }
    }

    return dp[prices.length - 1][k][0]
}

/**
 * 198. 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
const rob_I = function (nums) {
    // 状态  第几个房间, 是否抢夺
    // dp[i][j = 1 | 0 ] 意思为  第i间屋子 当前是否打劫，的最大金额
    const dp = new Array(nums.length).fill(0).map(() => [0, 0])

    // base case, 第一个房间就抢劫
    dp[0][1] = nums[0]

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]
        // 当前房间抢劫 分为两种情况
        if (i === 1) {
            // 当第二个房间时，第一个房间只能不抢劫，当前金额为num
            dp[i][1] = num
        } else {
            // 上个房间不抢劫，上上的房间抢劫，上上个房间不抢劫
            dp[i][1] = Math.max(dp[i - 2][0], dp[i - 2][1]) + num
        }

        // 当前房间不抢劫 = max( 上个房间抢劫，上个房间不抢劫)
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
    }

    return Math.max(...dp[nums.length - 1])
}

/**
 * 213. 打家劫舍 II
 * @param {number[]} nums
 * @return {number}
 */
const rob_II = function (nums) {
    // 针对只有一个的情况
    if (nums.length === 1) {
        return nums[0]
    }

    const robRange = (nums) => {
        if (!nums.length) {
            return 0
        }
        // 状态  第几个房间, 是否抢夺
        // dp[i][j = 1 | 0 ] 意思为  第i间屋子 当前是否打劫，的最大金额
        const dp = new Array(nums.length).fill(0).map(() => [0, 0])

        // base case, 第一个房间就抢劫
        dp[0][1] = nums[0]

        for (let i = 1; i < nums.length; i++) {
            const num = nums[i]
            // 当前房间抢劫 分为两种情况
            if (i === 1) {
            // 当第二个房间时，第一个房间只能不抢劫，当前金额为num
                dp[i][1] = num
            } else {
            // 上个房间不抢劫，上上的房间抢劫，上上个房间不抢劫
                dp[i][1] = Math.max(dp[i - 2][0], dp[i - 2][1]) + num
            }

            // 当前房间不抢劫 = max( 上个房间抢劫，上个房间不抢劫)
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
        }

        return Math.max(...dp[nums.length - 1])
    }

    return Math.max(
        robRange(nums.slice(0, nums.length - 1)),
        robRange(nums.slice(1, nums.length))
    )
}

/**
 * 337. 打家劫舍 III
 * @param {TreeNode} root
 * @return {number}
 */
const rob = function (root) {
    const dp = (root) => {
        // result[0] 不抢的结果， result[1] 抢的结果
        const result = [0, 0]
        if (root === null) {
            return result
        }

        const left = dp(root.left)
        const right = dp(root.right)

        // 根节点不抢，两个子节点可以抢 也可以 不抢
        result[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
        // 根节点抢，两个子节点只能不抢
        result[1] = left[0] + right[0] + root.val
        return result
    }

    // 获取跟节点抢和不抢的最大值
    return Math.max(...dp(root))
}

/**
 * 486. 预测赢家
 * @param {number[]} nums
 * @return {boolean}
 */
const PredictTheWinner = function (nums) {
    const length = nums.length

    if (length === 1) return true

    // dp[start][end]{'A' | 'B'} = 从start-end，先手和后手获取到的分数
    const dp = new Array(length).fill(0).map(
        () => new Array(length).fill(0).map(
            () => ({ first: 0, second: 0 })
        )
    )

    // base case, 当选择访问只剩下一个时，先手分数都是当前数值
    for (let i = 0; i < length; i++) {
        dp[i][i].first = nums[i]
    }

    // 状态转移方程
    for (let start = length - 2; start >= 0; start--) {
        for (let end = start + 1; end < length; end++) {
            // 先手分先选start 或 先选end
            dp[start][end].first = Math.max(
                dp[start + 1][end].second + nums[start],
                dp[start][end - 1].second + nums[end]
            )

            // 剩下两种场景，因先手会选择最大的，两种场景中最小的为后手的实际值
            dp[start][end].second = Math.min(
                dp[start + 1][end].first,
                dp[start][end - 1].first
            )
        }
    }

    return dp[0][length - 1].first >= dp[0][length - 1].second
}

/**
 * 877. 石子游戏（和486题解法完全一致）
 * @param {number[]} piles
 * @return {boolean}
 */
const stoneGame = function (piles) {
    // 和486题解法完全一致，不再重复代码
}

/**
 * 64. 最小路径和
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (matrix) {
    const rowLength = matrix.length
    const colLength = matrix[0] ? matrix[0].length : 0

    // 记录每个点之后的下降路径最小和，key为 ${row}-${col}
    const memo = {}

    // 返回当前点到终点的最小距离
    const dp = (rowIndex, colIndex) => {
        // 备忘录的key
        const key = `${rowIndex}-${colIndex}`
        // 优先返回备忘录的结果
        if (memo[key] !== undefined) {
            return memo[key]
        }

        // 结果列表
        const tmp = []

        if (rowIndex < rowLength - 1) {
            tmp.push(dp(rowIndex + 1, colIndex))
        }

        if (colIndex < colLength - 1) {
            tmp.push(dp(rowIndex, colIndex + 1))
        }

        // 找到最小的路径
        const min = tmp.length ? Math.min(...tmp) : 0
        const current = matrix[rowIndex][colIndex]
        const result = current + min
        memo[key] = result
        return result
    }

    return dp(0, 0)
}

/**
 * 887. 鸡蛋掉落  TODO二分查找的方法需重新思考
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
const superEggDrop = function (k, n) {
    // 记录每个点之后的下降路径最小和，key为 ${row}-${col}
    const memo = {}

    // 返回最小尝试次数
    const dp = (k, n) => {
        // 备忘录的key
        const key = `${k}-${n}`
        // 优先返回备忘录的结果
        if (memo[key] !== undefined) {
            return memo[key]
        }

        // base case 当只剩下一个鸡蛋的时候，操作次数为n
        if (k === 1) {
            return n
        }
        // base case 已经不需要继续选择了
        if (n === 0) {
            return 0
        }

        // 结果列表
        const tmp = []

        let low = 1
        let high = n

        // 用二分查找法优化
        while (low + 1 < high) {
            const mid = Math.floor((low + high) / 2)
            // 碎了
            const t1 = dp(k - 1, mid - 1)
            // 没有碎
            const t2 = dp(k, n - mid)

            if (t1 < t2) {
                low = mid
            } else if (t1 > t2) {
                high = mid
            } else {
                low = high = mid
            }
        }
        memo[key] = 1 + Math.min(
            Math.max(dp(k - 1, low - 1), dp(k, n - low)),
            Math.max(dp(k - 1, high - 1), dp(k, n - high))
        )

        // 如果还有鸡蛋, n为鸡蛋的数量，所以从1开始，最大为n
        // for (let i = 1; i <= n; i++) {
        //     // 因为f在任何位置都有可能，所以要按照最坏的（最大）可能的来计算
        //     tmp.push(Math.max(
        //         // 没碎
        //         dp(k, n - i),
        //         // 碎掉
        //         dp(k - 1, i - 1)
        //     ))
        // }

        // 在所有可能的结果中取最小值
        // memo[key] = Math.min(...tmp) + 1
        return memo[key]
    }

    return dp(k, n)
}

/**
 * 174. 地下城游戏
 * @param {number[][]} dungeon
 * @return {number}
 */
const calculateMinimumHP = function (dungeon) {
    const rowLength = dungeon.length
    const colLength = dungeon[0] ? dungeon[0].length : 0

    // 记录每个点之后的下降路径最小和，key为 ${row}-${col}
    const memo = {}

    // 从指定的点到终点的最小生命值
    const dp = (rowIndex, colIndex) => {
        // 备忘录的key
        const key = `${rowIndex}-${colIndex}`
        // 优先返回备忘录的结果
        if (memo[key] !== undefined) {
            return memo[key]
        }
        const current = dungeon[rowIndex][colIndex]

        // base case 终点的值
        if (rowIndex === rowLength - 1 && colIndex === colLength - 1) {
            return current
        }

        // 结果列表
        const tmp = []

        if (rowIndex < rowLength - 1) {
            tmp.push(dp(rowIndex + 1, colIndex))
        }

        if (colIndex < colLength - 1) {
            tmp.push(dp(rowIndex, colIndex + 1))
        }

        const max = Math.max(...tmp)

        // 找到最小的路径
        if (current < 0 && max > 0) {
            memo[key] = current
        } else {
            memo[key] = current + max
        }
        console.log(key, memo[key])
        return memo[key]
    }

    const result = dp(0, 0)
    return result < 0 ? -result + 1 : 1
}

/**
 * 514. 自由之路
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
const findRotateSteps = function (ring, key) {
    // 构造以字母为key，索引组成的数组为值的 hashmap
    const dist = {}
    for (let i = 0; i < ring.length; i++) {
        const key = ring[i]
        if (dist[key] === undefined) {
            dist[key] = []
        }
        dist[key].push(i)
    }

    // 备忘录
    const memo = {}

    /**
     * @param {*} ringIndex 当前转盘指向12点的索引
     * @param {*} keyIndex 当前所需要拼的单词字符索引
     * @return 最小步数
     */
    const dp = (ringIndex, keyIndex) => {
        // 备忘录的key
        const memoKey = `${ringIndex}-${keyIndex}`
        // 优先返回备忘录的结果
        if (memo[memoKey] !== undefined) {
            return memo[memoKey]
        }

        // base case 超出边界，已经完成了key
        if (keyIndex > key.length - 1) {
            return 0
        }

        // 需完成的字符
        const char = key[keyIndex]
        // 可能的走法
        const stepList = []

        for (let i = 0; i < dist[char].length; i++) {
            const targetIndex = dist[char][i]
            const minLoopStep = Math.min(
                // 逆时针移动
                Math.abs(targetIndex - ringIndex),
                // 顺时针移动
                ring.length - Math.abs(targetIndex - ringIndex)
            )
            stepList.push(dp(targetIndex, keyIndex + 1) + minLoopStep)
        }

        memo[memoKey] = Math.min(...stepList) + 1
        return memo[memoKey]
    }

    return dp(0, 0)
}

/**
 * 787. K 站中转内最便宜的航班
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
const findCheapestPrice = function (n, flights, src, dst, k) {
    // 备忘录
    const memo = {}
    // 访问过的航班
    const visited = [src]

    const map = {}
    for (let i = 0; i < flights.length; i++) {
        const [from, to, weight] = flights[i]
        if (map[from] === undefined) {
            map[from] = {}
        }
        map[from][to] = weight
    }

    /**
     * @param {*} from 启始点
     * @param {*} times 剩余中专次数
     * @return 最小花费
     */
    const dp = (from, times) => {
        // 备忘录的key
        const key = `${from}-${times}`
        // 优先返回备忘录的结果
        if (memo[key] !== undefined) {
            return memo[key]
        }
        // 当没有中转次数，且还没有到达目的地时
        if (times < 0) {
            return Infinity
        }

        const weightList = []
        for (const to in map[from]) {
            const weight = map[from][to]
            // 达到目的地的情况
            if (Number(to) === dst) {
                weightList.push(weight)
            } else {
                // 中转的情况
                weightList.push(dp(to, times - 1) + weight)
            }
        }

        memo[key] = Math.min(...weightList)
        return memo[key]
    }

    const result = dp(src, k)
    return result === Infinity ? -1 : result
}

/**
 * 55. 跳跃游戏
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function (nums) {
    const memo = {}

    // 从当前索引 能否达到终点
    const dp = (i) => {
        if (memo[i] !== undefined) {
            return memo[i]
        }
        if (i === nums.length - 1) {
            return true
        }

        const num = nums[i]
        for (let j = 1; j <= num; j++) {
            if (dp(i + j)) {
                return true
            }
        }
        memo[i] = false
        return false
    }
    return dp(0)
}

/**
 * 85. 最大矩形
 * @param {character[][]} matrix
 * @return {number}
 */
let maximalRectangle = function (matrix) {
    const rowCount = matrix.length
    const colCount = matrix[0] ? matrix[0].length : 0

    // 每个元素是当前点的最大宽高[width,height]
    const dp = new Array(rowCount).fill(0).map(() => new Array(colCount))

    // 最大面积
    let maxArea = 0

    // base case
    dp[rowCount - 1][colCount - 1] = matrix[rowCount - 1][colCount - 1]

    // base case
    for (let row = rowCount - 2; row >= 0; row--) {
        const num = matrix[row][colCount - 1]
        dp[row][colCount - 1] = [0]
    }
    // base case
    // for (let col = colCount - 2; col >= 0; col--) {
    // }

    // 循环矩阵
    for (let row = rowCount - 1; row >= 0; row--) {
        for (let col = colCount - 1; col >= 0; col--) {
            const num = matrix[row][col]

            if (num === '0') {
                dp[row][col] = [0, 0]
                continue
            }

            // 右侧的点
            const right = col === colCount - 1 ? [1, 1] : dp[row][col + 1]
            // 下面的点
            const bottom = row === rowCount - 1 ? [1, 1] : dp[row + 1][col]

            const area = [
                Math.min(right[0] + 1, bottom[0]),
                Math.min(right[1], bottom[1] + 1)
            ]
            // const area = [
            //     Math.min(right[0] + 1, Math.max(bottom[0], 1)),
            //     Math.min(Math.max(right[1], 1), bottom[1] + 1)
            // ]
            // const area = [
            //     Math.max(Math.min(right[0], bottom[0]), 1),
            //     Math.max(Math.min(right[1], bottom[1]), 1)
            // ]
            dp[row][col] = area
            maxArea = Math.max(maxArea, area[0] * area[1])
        }
    }

    console.log(dp)

    return maxArea
}
