// 前缀树Map
class TireMapNode {
    constructor (val = null) {
        this.val = val
        this.children = new Map()
    }

    // 寻找对应的节点node
    getNode (key) {
        let node = this
        for (let i = 0; i < key.length; i++) {
            const char = key[i]
            if (!node.children.has(char)) {
                return null
            }
            node = node.children.get(char)
        }
        return node
    }

    // 找到该节点下所有的key
    getAllKeys (prefix = '') {
        const ans = []

        const traverse = (node, path = '') => {
            if (node === null) {
                return
            }

            if (node.val !== null) {
                ans.push(path)
            }

            for ([key, value] of this.children.entries()) {
                traverse(value, `${path}${key}`)
            }
        }

        traverse(this, prefix)
        return ans
    }
}

// 前缀树Map, 每一个节点都是TireMapNode的实例
class TireMap {
    constructor (count) {
        // 键值对的数量
        this.size = 0
        // 跟节点
        this.root = new TireMapNode()
    }

    /**
     * @param {string} key
     * @return {void}
     */
    insert (key) {

    }

    /**
     * 获取对应key的值
     * @param {string} key
     * @return {boolean}
     */
    get (key) {
        const node = this.root.getNode(key)
        return node === null ? null : node.val
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    containsKey (key) {
        return this.get(key) !== null
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    hasKeyWithPrefix (key) {
        return this.root.getNode(key) !== null
    }

    /**
     * 在所有的键中, 寻找query的最短前缀
     * @param {string} query
     * @returns {boolean}
     */
    shortestPrefixOf (query) {
        let node = this.root

        for (let i = 0; i < query.length; i++) {
            const char = query[i]
            if (!node.children.has(char)) {
                return ''
            }
            if (node.children.get(char).val !== null) {
                return query.slice(0, i)
            }
            node = node.children.get(char)
        }

        // 如果寻找完整个query, 且正好在query最后一个字符是一个键
        if (node !== null && node.val !== null) {
            return query
        }
        return ''
    }

    /**
     * 在所有的键中, 寻找query的最长前缀
     * @param {string} query
     * @returns {boolean}
     */
    longestPrefixOf (query) {
        let node = this.root
        let end = 0

        for (let i = 0; i < query.length; i++) {
            const char = query[i]
            if (!node.children.has(char)) {
                break
            }
            if (node.children.get(char).val !== null) {
                end = i
            }
            node = node.children.get(char)
        }

        // 如果寻找完整个query, 且正好在query最后一个字符是一个键
        if (node !== null && node.val !== null) {
            return query
        }

        return query.slice(0, end)
    }

    /**
     * 找到prefix下所有的key
     * @param {string} prefix
     * @returns {boolean}
     */
    keysWithPrefix (prefix) {
        let node = this.root.getNode(prefix)
        return node.getAllKeys()
    }

    /**
     * 找到pattern下所有的key, pattern中的 "." 可匹配任意字符
     * @param {string} pattern
     * @returns {boolean}
     */
    keysWithPattern (pattern) {
        const ans = []
        const traverse = (node, index, path) => {
            if (node === null) {
                return
            }

            if (index >= pattern.length && node.val !== null) {
                ans.push(path)
            }

            const char = pattern[index]
            for ([key, value] of this.children.entries()) {
                if (pattern.length === 0) {
                    traverse(value, index + 1, `${path}${key}`)
                } else {
                    if (char === '.' || key === char) {
                        traverse(value, index + 1, `${path}${key}`)
                    }
                }
            }
        }
        traverse(this.root, pattern, '')
        return node.getAllKeys()
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith = function (prefix) {

    }

    // 返回key的数量
    get size () {
        return this.size
    }
}
