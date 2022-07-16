// 验证二叉搜索树
var isValidBST = function (root) {
    let last = null;
    let result = true;

    const traversal = (node) => {
        if (!node) {
            return;
        }
        traversal(node.left)
        if (last !== null && node.val <= last) {
            result = false;
        }
        last = node.val;
        traversal(node.right)
    }

    traversal(root)
    return result
};

// 二叉搜索树查询
var searchBST = function (root, val) {
    if (!root) {
        return null
    }
    if (root.val === val) {
        return root
    }
    if (val < root.val) {
        return searchBST(root.left, val)
    }
    if (val > root.val) {
        return searchBST(root.right, val)
    }
};


// 二叉搜索树插入节点
var insertIntoBST = function (root, val) {
    if (root === null) {
        return new TreeNode(val);
    }

    if (val < root.val) {
        root.left = insertIntoBST(root.left, val)
    }

    if (val > root.val) {
        root.right = insertIntoBST(root.right, val)
    }
    return root
};


// 删除二叉搜索树中的节点
var deleteNode = function (root, key) {
    if (!root) {
        return null
    }

    if (root.val === key) {
        // 左右为空
        if (root.left === null && root.right === null) {
            return null
        }
        // 左为空
        if (root.left === null) {
            return root.right
        }
        // 右为空
        if (root.right === null) {
            return root.left
        }

        // 寻找右侧最小的左节点
        let minNode = root.right;
        while (minNode.left !== null) {
            parrent = minNode;
            minNode = minNode.left;
        }
        minNode.right = deleteNode(root.right, minNode.val)
        minNode.left = root.left
        return minNode
    }

    if (key < root.val) {
        root.left = deleteNode(root.left, key)
    }

    if (key > root.val) {
        root.right = deleteNode(root.right, key)
    }
    return root
};

// 从 1 到 n 互不相同的 （长度为 n 的序列）二叉搜索树 有多少种
var numTrees = function (n) {
    const result = new Array(n + 1).fill(0);
    result[0] = 1;
    result[1] = 1;

    for (let i = 2; i < n + 1; i++) {
        for (let j = 1; j < i; j++) {
            result[i] += result[j - 1] * result[i - j];
        }
    }

    return result[n]
};

// 生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
var generateTrees = function (n) {
    if (n === 0) {
        return []
    }

    const generate = (start, end) => {
        const result = [];

        if (start > end) {
            return [null];
        }

        if (start === end) {
            return [new TreeNode(start)];
        }

        for (let i = start; i <= end; i++) {
            const left = generate(start, i - 1);
            const right = generate(i + 1, end);

            for (let l = 0; l < left.length; l++) {
                for (let r = 0; r < right.length; r++) {
                    const root = new TreeNode(i);
                    root.left = left[l];
                    root.right = right[r];
                    result.push(root);
                }
            }
        }
        return result;
    }

    return generate(1, n);
};

// 一棵以 root 为根的 二叉树 ，返回 任意 二叉搜索子树的最大键值和。
var maxSumBST = function (root) {
    count = null;

    const traversal = (node) => {
        const result = {
            isBST: true,
            count: 0,
            max: null,
            min: null,
            node: null,
        }

        if (node === null || node.val === null) {
            return result;
        }

        const left = traversal(node.left)
        const right = traversal(node.right)

        if (result.max === null) {
            result.max = node.val;
        }

        if (result.min === null) {
            result.min = node.val;
        }

        // 判断是否BST
        if (
            left.isBST === false ||
            right.isBST === false ||
            left.max !== null && node.val <= left.max ||
            right.min !== null && node.val >= right.min
        ) {
            result.isBST = false
        } else {
            result.count = (node.val || 0) + left.count + right.count;
            result.node = node;
            right.max !== null && (result.max = Math.max(node.val, right.max));
            left.min !== null && (result.min = Math.min(node.val, left.min));

            if (count === null) {
                count = result.count
            } else {
                count = Math.max(count, result.count);
            }
        }
        return result;
    }

    traversal(root)
    return Math.max(count, 0)
};