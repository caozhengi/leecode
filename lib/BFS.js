/**
 * 111. 二叉树的最小深度, BFS算法
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    let step = 0;
    let queue = [];

    if (root) {
        queue.push(root)
    }

    while (queue.length) {
        step++
        const length = queue.length;
        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            const left = node.left;
            const right = node.right;

            if (left === null && right === null) {
                return step;
            }

            left && queue.push(left)
            right && queue.push(right)
        }
    }

    return step;
};

/**
 * 752. 打开转盘锁
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
    const LENGTH = 4;       // 锁头长度4
    let visited = {};       // 访问过的节点
    let current = '0000';   // 当前密码
    let queue = [];         // 队列
    let step = 0;


    deadends.forEach((e) => visited[e] = true);

    // 指定的index 增加一位
    const add = (str, i) => {
        let n = str[i];
        n = `${Number(n) + 1}`
        if (n === '10') {
            n = '0';
        }
        return `${str.slice(0, i)}${n}${str.slice(i + 1, LENGTH)}`
    };

    // 指定的index减少一位
    const minus = (str, i) => {
        let n = str[i];
        n = `${Number(n) - 1}`
        if (n === '-1') {
            n = '9';
        }
        return `${str.slice(0, i)}${n}${str.slice(i + 1, LENGTH)}`
    }

    // 队列中添加第一个元素
    queue.push(current)

    while (queue.length) {
        const length = queue.length;
        for (let i = 0; i < length; i++) {
            const pass = queue.shift();

            // 找到了目标
            if (pass === target) {
                return step
            }

            // 访问过的节点不再继续处理
            if (visited[pass]) {
                continue
            }
            visited[pass] = true;

            // 4位密码锁每一个生成
            for (let j = 0; j < LENGTH; j++) {
                const addPass = add(pass, j);
                const minusPass = minus(pass, j);

                if (!visited[addPass]) {
                    queue.push(addPass)
                }

                if (!visited[minusPass]) {
                    queue.push(minusPass)
                }
            }
        }
        step++
    }

    return -1;
};


/**
 * 773. 滑动谜题
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
    const target = '123450';
    let visited = {};           // 访问过的节点
    let queue = [];             // 队列
    let step = 0;
    let current = `${board[0].join('')}${board[1].join('')}`;   // 当前密码

    // 相邻的index索引
    const neighbor = [
        [1, 3],
        [0, 4, 2],
        [1, 5],
        [0, 4],
        [3, 1, 5],
        [4, 2]
    ]

    // 获取移动0后的所有可能排列
    const getSwap = (str) => {
        const result = [];
        const index = str.indexOf('0');

        neighbor[index].forEach(i => {
            const list = str.split('');
            const tmp = list[index];
            list[index] = list[i];
            list[i] = tmp;
            result.push(list.join(''))
        })

        return result
    };

    // 队列中添加第一个元素
    queue.push(current)

    while (queue.length) {
        const length = queue.length;
        for (let i = 0; i < length; i++) {
            const node = queue.shift();

            // 找到了目标
            if (node === target) {
                return step
            }

            const list = getSwap(node);
            // 4位密码锁每一个生成
            for (let j = 0; j < list.length; j++) {
                const item = list[j];

                if (!visited[item]) {
                    visited[item] = true;
                    queue.push(item)
                }
            }
        }
        step++
    }

    return -1;
};

/**
 * 117. 填充每个节点的下一个右侧节点指针 II
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if(root === null){
        return null
    }

    const queue = [];             // 队列

    // 队列中添加第一个元素
    queue.push(root)

    while (queue.length) {
        const length = queue.length;

        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            if(i < length - 1){
                node.next = queue[0]
            }else{
                node.next = null
            }

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
    return root
};


/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
 var distanceK = function(root, target, k) {
    const graph = {};
    const queue = [];   // BFS遍历图的队列
    const visited = {}; // 记录走过的节点
    const result = [];  // 结果
    let step = 0;       // 记录步数

    // 遍历所有节点用于构建无向图
    const traverse = (node, parentNode = null) => {
        if(node === null){
            return
        }

        const val = node.val
        if(!graph[val]){
            graph[val] = [];
        }

        if(parentNode){
            graph[node.val].push(parentNode.val);
            graph[parentNode.val].push(val);
        }

        traverse(node.left, node)
        traverse(node.right, node)
    }

    // 开始遍历生成图
    traverse(root)

    // BFS遍历起点
    queue.push(target.val);
    visited[target.val] = true;

    // 开始BFS遍历
    while(queue.length){
        const length = queue.length;

        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            const list = graph[node];

            if(step === k){
                result.push(node);
                continue
            }

            for (let j = 0; j < list.length; j++) {
                const value = list[j];

                if(!visited[value]){
                    visited[value] = true;
                    queue.push(value);
                }
            }
        }

        step++
    }

    return result;
};