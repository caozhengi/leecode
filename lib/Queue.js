/**
 * 队列相关
 */

/**
 * 单调递减队列, 队列首位为最大值，如 [3, 2, 1]
 * 单调队列是一种主要用于解决滑动窗口类问题的数据结构
 * 在长度为 n 的序列中，求每个长度为 m 的区间的区间最值。它的时间复杂度是 O(n)
 * 单调队列的基本思想是，维护一个双向队列（deque），遍历序列，仅当一个元素可能成为某个区间最值时才保留它。
 */
class MonotoneDecreaseQueue {
    constructor () {
        this.list = []
    }

    // 添加数据
    add (num) {
        while (this.list.length && this.list[this.list.length - 1] < num) {
            this.list.pop()
        }
        this.list.push(num)
    }

    // 从队头移除数据, 如果需要移除的数据是当前队列中的极数值则移除
    remove (num) {
        if (this.list.length && this.list[0] === num) {
            this.list.shift()
        }
    }

    // 获取队列头部
    get top () {
        return this.list.length ? this.list[0] : undefined
    }
}

/**
 * 单调递增队列，队列首位为最小值，如 [1, 2, 3]
 * 单调队列是一种主要用于解决滑动窗口类问题的数据结构
 * 在长度为 n 的序列中，求每个长度为 m 的区间的区间最值。它的时间复杂度是 O(n)
 * 单调队列的基本思想是，维护一个双向队列（deque），遍历序列，仅当一个元素可能成为某个区间最值时才保留它。
 */
class MonotoneIncreaseQueue {
    constructor () {
        this.list = []
    }

    // 添加数据
    add (num) {
        while (this.list.length && this.list[this.list.length - 1] > num) {
            this.list.pop()
        }
        this.list.push(num)
    }

    // 从队头移除数据, 如果需要移除的数据是当前队列中的极数值则移除
    remove (num) {
        if (this.list.length && this.list[0] === num) {
            this.list.shift()
        }
    }

    // 获取队列头部
    get top () {
        return this.list.length ? this.list[0] : undefined
    }
}
