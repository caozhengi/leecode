// 二插堆，可选为最大堆最小堆
class BinaryHeap {
    constructor (array = [], cmp = (a, b) => a - b) {
        // 比较模式
        this.cmp = cmp
        this.data = array.sort(this.cmp)
    }

    // 获取当前节点的左节点
    static getLeft (i) {
        return 2 * i + 1
    }

    // 获取当前节点的右节点
    static getRight (i) {
        return 2 * i + 2
    }

    // 获取当前节点父节点
    static getParent (i) {
        return Math.floor((i - 1) / 2)
    }

    // 获取当前数量
    get size () {
        return this.data.length
    }

    // 整个树结构最后一个节点
    get lastIndex () {
        return this.size - 1
    }

    // 当前树结构最后一个节点
    get lastBranchIndex () {
        return Math.floor((this.lastIndex - 1) / 2)
    }

    // 交换两个节点
    swap (a, b) {
        const tmp = this.data[a]
        this.data[a] = this.data[b]
        this.data[b] = tmp
    }

    // 对比两个节点, 返回是否符合
    compare (a, b) {
        return this.cmp(this.data[a], this.data[b]) < 0
    }

    // 让底部的数据上浮，保持数据堆化
    swim (i) {
        let parent = BinaryHeap.getParent(i)
        while (parent >= 0 && this.compare(i, BinaryHeap.getParent(i))) {
            this.swap(i, parent)
            i = parent
            parent = BinaryHeap.getParent(parent)
        }
    }

    // 让指定的数据下沉，保持数据堆化
    sink (i = 0) {
        const l = BinaryHeap.getLeft(i) // 左侧索引
        const r = BinaryHeap.getRight(i) // 右侧索引

        // 当前需要被交换的数据
        let needChange = i

        // 处理左侧
        if (l < this.size && this.compare(l, needChange)) {
            needChange = l
        }

        // 处理右侧
        if (r < this.size && this.compare(r, needChange)) {
            needChange = r
        }

        // 当前节点就是最大节点，不需要交换
        if (needChange === i) {
            return
        }

        this.swap(i, needChange)
        this.sink(needChange)
    }

    // 插入数据
    push (value) {
        this.data.push(value)
        this.swim(this.lastIndex)
        // console.log('binaryHeap', this.data)
    }

    // 删除最大的
    pop () {
        this.swap(0, this.lastIndex)
        const result = this.data.pop()
        this.sink()
        // console.log('binaryHeap', this.data)
        return result
    }

    // 当前堆顶的值
    top () {
        return this.data[0] || null
    }

    // 当前队列是否为空
    isEmpty () {
        return this.size === 0
    }
}

// 295. 数据流的中位数
const MedianFinder = function () {
    this.maxHeap = new BinaryHeap([], (a, b) => a - b) // 最大队列
    this.minHeap = new BinaryHeap([], (a, b) => b - a) // 最小队列
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    if (this.maxHeap.size === 0) {
        this.maxHeap.push(num)
        return
    }

    // 放在minHeap中
    if (this.maxHeap.size > this.minHeap.size) {
        this.maxHeap.push(num)
        this.minHeap.push(this.maxHeap.pop())
    } else {
        this.minHeap.push(num)
        this.maxHeap.push(this.minHeap.pop())
    }
    console.log(num, this.maxHeap.data, this.minHeap.data)
}

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    const max = this.maxHeap.top()
    const min = this.minHeap.top()

    if (!this.maxHeap.size) {
        return null
    }

    if (this.maxHeap.size > this.minHeap.size) {
        return max
    } else {
        return (max + min) / 2
    }
}
