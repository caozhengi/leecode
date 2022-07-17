const LRUCache = function (capacity) {
    this.capacity = capacity // 最大容量
    this.hash = {} // key所对应的链表节点
    this.size = 0 // 当前数据key的数量
    this.doubleLink = new DoubleLink()
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.hash[key]
    if (!node) {
        return -1
    }
    this.doubleLink.delete(node)
    this.doubleLink.push(node)
    return node.value
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const node = new DLinkedNode(key, value)
    const oldNode = this.hash[key]
    if (oldNode) {
        this.doubleLink.delete(oldNode)
    } else if (this.size >= this.capacity) {
        delete this.hash[this.doubleLink.head.next.key]
        this.doubleLink.deleteFirst()
    } else {
        this.size++
    }
    this.doubleLink.push(node)
    // 向链表最后增加节点
    this.hash[key] = node
}
