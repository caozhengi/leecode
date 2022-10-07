
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

/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
let isSymmetric = function (root) {
    const dfs = (left, right) => {
        // 两边都为null
        if (left === null && right === null) {
            return true
        }
        // 只有一遍为null
        if (left === null || right === null) {
            return false
        }

        // 两个节点的值不相等
        if (left.val !== right.val) {
            return false
        }

        return dfs(left.left, right.right) && dfs(left.right, right.left)
    }
    return dfs(root.left, root.right)
}

/**
 * 124. 二叉树中的最大路径和
 * @param {TreeNode} root
 * @return {number}
 */
let maxPathSum = function (root) {
    let result = -Infinity

    // 包含root节点的,最大和路径
    const maxSum = (node) => {
        if (node === null) {
            return 0
        }

        // 左侧最大贡献值
        // 只有在最大贡献值大于 0 时，才会选取对应子节点
        const leftSum = Math.max(maxSum(node.left), 0)

        // 右侧最大贡献值
        const rightSum = Math.max(maxSum(node.right), 0)

        // 包含当前节点的的最大贡献值,
        const nodeSum = node.val + leftSum + rightSum

        result = Math.max(result, nodeSum)

        // 如果包含当前节点, 左右只能选一个
        return node.val + Math.max(leftSum, rightSum)
    }

    maxSum(root)

    return result
}

/**
 * 617. 合并二叉树
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
let mergeTrees = function (root1, root2) {
    const merge = (node1, node2) => {
        if (node1 === null && node2 === null) {
            return null
        }

        if (node1 === null) {
            return node2
        }

        if (node2 === null) {
            return node1
        }

        node1.val += node2.val
        node1.left = merge(node1.left, node2.left)
        node1.right = merge(node1.right, node2.right)
        return node1
    }

    return merge(root1, root2)
}

/**
 * 112. 路径总和
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
let hasPathSum = function (root, targetSum) {
    let result = false

    const backTrack = (node, num) => {
        if (node === null) {
            return
        }

        const sum = num + node.val

        // 没有叶子结点, 且和为目标值
        if (sum === targetSum && node.left === null && node.right === null) {
            result = true
            return
        }

        if (node.left) {
            backTrack(node.left, sum)
        }

        if (node.right) {
            backTrack(node.right, sum)
        }
    }
    backTrack(root, 0)

    return result
}
