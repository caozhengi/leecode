
// 二叉树节点
class TreeNode {
    constructor (val = 0, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

// 把数组转换为二叉树
function covert2BinaryTreeComplate (data) {
    const length = data.length
    const treeNodeArray = new Array(length)

    const getParrent = i => Math.floor((i - 1) / 2)

    for (let index = 0; index < length; index++) {
        const value = data[index]
        const parrentIndex = getParrent(index)
        const node = new TreeNode(value)
        treeNodeArray[index] = node

        if (parrentIndex >= 0) {
            const parrentNode = treeNodeArray[parrentIndex]

            if (index % 2 === 1) {
                parrentNode.left = node
            } else {
                parrentNode.right = node
            }
        }
    }

    return treeNodeArray[0]
}

// 深度方式把数组转换成二叉树
function covert2BinaryTree (data) {
    const length = data.length

    // 空数据情况
    if (data.length === 0) {
        return null
    }

    // 根节点
    const root = new TreeNode(data[0])

    // 上一层的临时数组
    let temp = [root]
    // 当前层临时数组
    let currentLayer = []
    // 当前处理的索引
    let index = 1

    const creatNode = () => {
        const value = data[index++]
        return value === undefined || value === null ? null : new TreeNode(value)
    }

    while (temp.length) {
        const root = temp.shift()
        if (root !== null) {
            root.left = creatNode()
            root.right = creatNode()
            currentLayer.push(root.left)
            currentLayer.push(root.right)
        }

        if (temp.length === 0) {
            temp = currentLayer
            currentLayer = []
        }
    }
    return root
}

// 前序遍历
const preorderTraversal = (root) => {
    const result = []

    const traverse = (node) => {
        if (!node) {
            return null
        }
        result.push(node.val)
        traverse(node.left)
        traverse(node.right)
    }

    traverse(root)

    return result
}

// 中序遍历
const inorderTraversal = function (root) {
    const result = []

    const traversal = (node) => {
        if (!node) {
            return
        }
        traversal(node.left)
        result.push(node.val)
        traversal(node.right)
    }

    traversal(root)
    return result
}

// 后序遍历
const postorderTraversal = function (root) {
    const result = []

    const traversal = (node) => {
        if (!node) {
            return
        }
        traversal(node.left)
        traversal(node.right)
        result.push(node.val)
    }

    traversal(root)
    return result
}

// 广度优先遍历
const levelOrder = function (root) {
    const result = []

    if (!root) {
        return result
    }

    const traversal = (list) => {
        if (list.length === 0) {
            return
        }
        const tmp = []
        const current = []
        for (let i = 0; i < list.length; i++) {
            const node = list[i]
            current.push(node.val)
            node.left && tmp.push(node.left)
            node.right && tmp.push(node.right)
        }
        result.push(current)
        traversal(tmp)
    }

    traversal([root])
    return result
}

/**
 * 前序遍历序列化
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = function (root) {
    const result = []

    const traverse = (node) => {
        if (!node) {
            result.push('')
            return null
        }
        result.push(node.val)
        traverse(node.left)
        traverse(node.right)
    }

    traverse(root)
    return result.join(',')
}

/**
 * 前序遍历反序列化
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = function (data = '') {
    const list = data.split(',')
    let index = 0

    const build = () => {
        if (index >= list.length) {
            return null
        }

        const value = list[index]
        index++
        if (value === '') {
            return
        }
        const node = new TreeNode(value)
        node.left = build()
        node.right = build()
        return node
    }
    return build()
}
