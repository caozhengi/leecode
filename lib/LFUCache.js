
/**
 * @param {number} capacity
 */
const LFUCache = function (capacity) {
    this.capacity = capacity // 最大容量
    this.keyNode = {} // key所对应的链表节点
    this.keyCounter = {} // key所对应的链表节点
    this.counterList = {} // key为使用次数，value为双链表
    this.size = 0 // 当前数据key的数量
    this.minCounter = 0 // 最小频次
}

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
    const node = this.keyNode[key]
    if (!node) {
        return -1
    }
    const counter = this.keyCounter[key]
    this.counterList[counter].delete(node)
    if (!this.counterList[counter + 1]) {
        this.counterList[counter + 1] = new DoubleLink()
    }
    this.counterList[counter + 1].push(node)
    this.keyCounter[key]++
    // 最小频次维护
    if (counter === this.minCounter && this.counterList[counter].isEmpty()) {
        this.minCounter++
    }
    return node.value
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
    if (this.capacity === 0) {
        return null
    }

    const node = new DLinkedNode(key, value)
    const oldNode = this.keyNode[key]
    if (key === 6 && value === 19) {
        debugger
    }
    if (oldNode) {
        // 已有节点的更新
        const counter = this.keyCounter[key]
        this.counterList[counter].delete(oldNode)
        if (!this.counterList[counter + 1]) {
            this.counterList[counter + 1] = new DoubleLink()
        }
        this.counterList[counter + 1].push(node)

        // 最小频次维护
        if (counter === this.minCounter &&
            this.counterList[counter].isEmpty()
        ) {
            this.minCounter++
        }
    } else if (this.size >= this.capacity) {
        // 已经达到最大节点
        const key = this.counterList[this.minCounter].head.next.key
        delete this.keyNode[key]
        delete this.keyCounter[key]
        this.counterList[this.minCounter].deleteFirst()
        this.counterList[1].push(node)
        this.minCounter = 1
    } else {
        // 新加入节点，最小频次为1
        this.size++
        this.minCounter = 1
        if (!this.counterList[1]) {
            this.counterList[1] = new DoubleLink()
        }
        this.counterList[1].push(node)
    }
    // 向链表最后增加节点
    this.keyNode[key] = node
    this.keyCounter[key] = (this.keyCounter[key] || 0) + 1
    return null
}
