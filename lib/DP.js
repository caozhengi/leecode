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
 * 354. 俄罗斯套娃信封问题
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
 * 121. 买卖股票的最佳时机
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {

}
