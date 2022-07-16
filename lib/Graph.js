// 动态连通性
class UnionFind {
    constructor(count) {
        // 记录连通分量
        this.count = count;
        // 所有的根节点
        this.parent = [];
        // 初始时，所有的父节点指向自己
        for (let i = 0; i < count; i++) {
            this.parent[i] = i;
        }
    }
    // 返回某个节点的根节点
    findRoot(x) {
        // 找到根节点
        let root = x;
        while (this.parent[root] !== root) {
            root = this.parent[root]
        }

        // 然后把 x 到根节点之间的所有节点直接接到根节点下面
        while (this.parent[x] !== x) {
            const tmp = x;
            // 因为是用x来做while循环，所以需不断修改x的值，直到是根节点
            x = this.parent[x];
            // 让该节点指向根节点
            this.parent[tmp] = root
        }
        return root
    }
    // 连通 p 和 q
    union(p, q) {
        const rootP = this.findRoot(p);
        const rootQ = this.findRoot(q);

        if (rootP === rootQ) {
            return;
        }

        this.parent[rootQ] = rootP;
        this.count--
    }
    // 检查 p 和 q 是否连通
    isConnected(p, q) {
        const rootP = this.findRoot(p);
        const rootQ = this.findRoot(q);
        return rootP === rootQ
    }
    // 当前连通分量
    getCount() {
        return this.count
    }
}

// 题目797 寻找所有可能路径
var allPathsSourceTarget = function (graph) {
    const result = [];
    let path = [];

    const traverse = (current) => {
        path.push(current);
        const links = graph[current];

        for (let i = 0; i < links.length; i++) {
            const num = links[i]
            traverse(num);
        }

        if (current === graph.length - 1) {
            result.push(path.slice());
        }
        path.pop()
    }
    traverse(0)
    return result
};

// 题目207
var canFinish = function (numCourses, prerequisites) {
    let graph = new Array(numCourses).fill(0).map(() => new Array());
    // 记录已经走过的点
    let visited = [];
    // 记录每次遍历走过的路径
    let path = [];
    let hasCycle = false;

    // 根据依赖构建图
    for (let i = 0; i < prerequisites.length; i++) {
        const [a, b] = prerequisites[i];
        if (!graph[b]) {
            graph[b] = [];
        }
        graph[b].push(a)
    }

    const traverse = (current) => {
        // 当前遍历是否存在环
        if (path[current]) {
            hasCycle = true
            return
        }
        // 之前已经走过的点可以不用再走
        if (visited[current]) {
            return
        }
        visited[current] = true;
        path[current] = true;
        const links = graph[current] || [];

        for (let i = 0; i < links.length; i++) {
            const num = links[i]
            traverse(num);
        }
        path[current] = false;
    }

    for (let i = 0; i < graph.length; i++) {
        traverse(i)
        if (hasCycle) {
            return false
        }
    }

    return !hasCycle
};


// 题目210
var findOrder = function (numCourses, prerequisites) {
    let graph = new Array(numCourses).fill(0).map(() => new Array());
    // 对图后序遍历的数组
    let order = [];
    // 记录已经走过的点
    let visited = [];
    // 记录每次遍历走过的路径
    let path = [];
    let hasCycle = false;

    // 根据依赖构建图
    for (let i = 0; i < prerequisites.length; i++) {
        const [a, b] = prerequisites[i];
        if (!graph[b]) {
            graph[b] = [];
        }
        graph[b].push(a)
    }

    const traverse = (current) => {
        // 当前遍历是否存在环
        if (path[current]) {
            hasCycle = true
            return
        }
        // 之前已经走过的点可以不用再走
        if (visited[current]) {
            return
        }
        visited[current] = true;
        path[current] = true;
        const links = graph[current] || [];

        for (let i = 0; i < links.length; i++) {
            const num = links[i]
            traverse(num);
        }
        order.push(current);
        path[current] = false;
    }

    for (let i = 0; i < graph.length; i++) {
        traverse(i)
        if (hasCycle) {
            return []
        }
    }

    return order.reverse()
};

// 785
var isBipartite = function (graph) {
    // 对图后序遍历的数组
    let colorArr = new Array(graph.length).fill(0);
    // 记录已经走过的点
    let visited = [];
    let result = true;

    const traverse = (current, color) => {
        visited[current] = true;
        colorArr[current] = color;

        const links = graph[current];
        for (let i = 0; i < links.length; i++) {
            const node = links[i]

            if (!visited[node]) {
                traverse(node, -color);
            } else {
                if (colorArr[current] === colorArr[node]) {
                    result = false
                }
            }
        }
    }

    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            traverse(i, 1)
        }
    }

    return result
};

// 886. 可能的二分法
var possibleBipartition = function (n, dislikes) {
    let graph = new Array(n).fill(0).map(() => new Array());
    // 对图后序遍历的数组
    let colorArr = new Array(graph.length).fill(0);
    // 记录已经走过的点
    let visited = [];
    let result = true;

    // 根据依赖构建双向图
    for (let i = 0; i < dislikes.length; i++) {
        const [a, b] = dislikes[i];
        graph[a - 1].push(b - 1)
        graph[b - 1].push(a - 1)
    }

    const traverse = (current, color) => {
        visited[current] = true;
        colorArr[current] = color;

        const links = graph[current];
        for (let i = 0; i < links.length; i++) {
            const node = links[i]

            if (!visited[node]) {
                traverse(node, -color);
            } else {
                if (colorArr[current] === colorArr[node]) {
                    debugger
                    result = false
                }
            }
        }
    }

    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            traverse(i, 1)
        }
    }

    return result
};

// 116. 省份数量
var findCircleNum = function (isConnected) {
    const length = isConnected.length;
    const uf = new UnionFind(length);

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            const connected = isConnected[i][j]
            if (connected === 1) {
                uf.union(i, j);
            }
        }
    }

    return uf.count;
};

// 130. 被围绕的区域
var solve = function (board) {
    const width = board.length ? board[0].length : 0;
    const height = board.length;
    const invalid = width * height;  // 无效节点是所有节点数量+1， 也是UF的最大长度
    const uf = new UnionFind(width * height + 1);
    const around = [[0, -1], [0, 1], [1, 0], [-1, 0]]; // 用来获取周围4个点

    /**
     *   0  1  2  3
     *   4  5  6  7
     *   8  9  10 11
     *   12 13 14 15
     */

    const getNode = (m, n) => n * width + m;


    // 先遍上下两排
    for (let m = 0; m < width; m++) {
        if (board[0][m] === "O") {
            uf.union(getNode(m, 0), invalid)
            // console.log('union:',getNode(m, 0))
        }

        if (board[height - 1][m] === "O") {
            uf.union(getNode(m, height - 1), invalid)
            // console.log('union:',getNode(m, height - 1))
        }
    }

    // 在遍历左右两列
    for (let n = 1; n < height - 1; n++) {
        if (board[n][0] === "O") {
            uf.union(getNode(0, n), invalid)
            // console.log('union:', getNode(0, n))
        }

        if (board[n][width - 1] === "O") {
            uf.union(getNode(width - 1, n), invalid)
            // console.log('union:', getNode(width - 1, n))
        }
    }

    // 遍历矩阵内除四周外所有的元素，把所有的和四边为0的联通
    for (let n = 1; n < height - 1; n++) {
        for (let m = 1; m < width - 1; m++) {
            // 如果当前元素是 'O'
            if (board[n][m] === "O") {
                // 遍历上下左右四个元素
                for (let i = 0; i < around.length; i++) {
                    const [a, b] = around[i];
                    if (board[n + a][m + b] === "O") {
                        uf.union(getNode(m, n), getNode(m + b, n + a));
                    }
                }
            }
        }
    }

    // 遍历矩阵内除四周外所有的元素，把和四遍不联通的设置为X
    for (let n = 1; n < height - 1; n++) {
        for (let m = 1; m < width - 1; m++) {
            const node = getNode(m, n);
            if (!uf.isConnected(node, invalid)) {
                board[n][m] = 'X';
            }
        }
    }

    return board;
};

// 990. 等式方程的可满足性
var equationsPossible = function (equations) {
    const uf = new UnionFind(26);   // 一共26个字母

    // 先处理所有相等的表达式
    for (let i = 0; i < equations.length; i++) {
        const arr = equations[i].split('');
        const exp = arr[1]

        if (exp === '=') {
            const a = arr[0].charCodeAt() - 97;
            const b = arr[3].charCodeAt() - 97;
            uf.union(a, b);
        }
    }
    // 判断所有不想等的表达式是否冲突
    for (let i = 0; i < equations.length; i++) {
        const arr = equations[i].split('');
        const exp = arr[1]

        if (exp === '!') {
            const a = arr[0].charCodeAt() - 97;
            const b = arr[3].charCodeAt() - 97;
            if (uf.isConnected(a, b)) {
                return false
            }
        }
    }
    return true
};

// 1319. 连通网络的操作次数
var makeConnected = function (n, connections) {
    const uf = new UnionFind(n);
    let lines = 0;

    for (let i = 0; i < connections.length; i++) {
        const [a, b] = connections[i];
        // 记录多余出来的线
        if (uf.isConnected(a, b)) {
            lines++
        } else {
            uf.union(a, b);
        }
    }
    if (lines < uf.count - 1) {
        return -1
    }
    return uf.count - 1;
};

// 1584. 连接所有点的最小费用
var minCostConnectPoints = function (points) {
    const lines = [];
    let mst = 0;
    const uf = new UnionFind(points.length);

    // 生成每个边的权
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const x = points[i];
            const y = points[j];
            const weight = Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
            // lines.push([x, y, weight]);
            lines.push([i, j, weight]);
        }
    }

    // 对所有的边排序
    lines.sort((a, b) => a[2] - b[2]);

    // 循环边，
    for (let i = 0; i < lines.length; i++) {
        const [a, b, weight] = lines[i];
        if (uf.isConnected(a, b)) {
            continue
        } else {
            uf.union(a, b);
            mst += weight;
        }
    }
    return mst;
};

// 743. 网络延迟时间 Dijkstra算法
var networkDelayTime = function (times, n, k) {
    // 因为节点是从1开始，长度为n+1
    const graph = new Array(n + 1);

    // times转换为邻接表
    for (let i = 0; i < times.length; i++) {
        const [origin, target, weight] = times[i];
        if (!graph[origin]) {
            graph[origin] = [];
        }
        graph[origin].push([target, weight])
    }

    /**
     * Dijkstra算法
     */

    // 最小路径数组
    const pathMinWeight = new Array(graph.length).fill(Infinity);
    // 用于广度遍历
    const poll = new BinaryHeap([], (a, b) => b.distFromStart - a.distFromStart);   // 最小队列;

    // 初始化起始节点K
    pathMinWeight[k] = 0;
    // distance为起点到当前节点的权重和
    poll.push({ node: k, distFromStart: 0 });

    while (!poll.isEmpty()) {
        const { node, distFromStart } = poll.pop();

        // 如果不存在
        if (!graph[node]) {
            continue;
        }

        // 如果存在到达当前节点的路径更小的，可以不用继续走
        if (distFromStart > pathMinWeight[node]) {
            continue
        }

        // 循环当前节点的每个边
        for (let i = 0; i < graph[node].length; i++) {
            const [target, weight] = graph[node][i];

            // 之前路径到当前节点的权重和
            const pathWeight = distFromStart + weight;

            // 如果当前节点的路径权重和小于已经走过的
            if (pathWeight < pathMinWeight[target]) {
                pathMinWeight[target] = pathWeight
                // 放到待处理池中
                poll.push({ node: target, distFromStart: pathWeight })
            }

        }

    }

    // 在最短路径数组中找最大值
    let result = 0;
    for (let i = 1; i < pathMinWeight.length; i++) {
        const dist = pathMinWeight[i];

        if (dist === Infinity) {
            return -1
        }

        if (dist > result) {
            result = dist
        }

    }
    return result;
};


/**
 * 1631. 最小体力消耗路径
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
    const height = heights.length;
    const width = heights[0] ? heights[0].length : 0;

    // 获取四个方向的索引
    const gerNeighbors = (x, y) => {
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // 四个方向
        const neighbors = [];

        dirs.forEach(([h, w]) => {
            const hx = x + h;
            const wy = y + w;

            if (hx >= 0 && wy >= 0 && hx < height && wy < width) {
                neighbors.push([hx, wy])
            }
        })

        return neighbors;
    }

    /**
     * Dijkstra算法
     */

    // 最小路径矩阵
    const pathMinWeight = new Array(height).fill(0).map(() => new Array(width).fill(Infinity));
    // 用于广度遍历
    const poll = new BinaryHeap([], (a, b) => b.distFromStart - a.distFromStart);   // 最大队列;

    // 初始化起始节点K
    pathMinWeight[0][0] = 0;
    // distance为起点到当前节点的权重和
    poll.push({ x: 0, y: 0, distFromStart: 0 });

    while (!poll.isEmpty()) {
        const { x, y, distFromStart } = poll.pop();

        // 到达终点提前结束
        if (x === height - 1 && y === width - 1) {
            return distFromStart
        }

        // 如果存在到达当前节点的路径更小的，可以不用继续走
        if (distFromStart > pathMinWeight[x][y]) {
            continue
        }

        const neighbors = gerNeighbors(x, y)
        // 循环当前节点的每个边
        for (let i = 0; i < neighbors.length; i++) {
            const [nx, ny] = neighbors[i];
            const weight = Math.abs(heights[nx][ny] - heights[x][y]);

            // 之前路径到当前节点的权重和
            const pathWeight = Math.max(distFromStart, weight);

            // 如果当前节点的路径权重和小于已经走过的
            if (pathWeight < pathMinWeight[nx][ny]) {
                pathMinWeight[nx][ny] = pathWeight
                // 放到待处理池中
                poll.push({ x: nx, y: ny, distFromStart: pathWeight })
            }
        }

    }
    return -1
};


/**
 * 1514. 概率最大的路径
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start, end) {
    const graph = new Array(n).fill(0).map(() => []);

    // 生成图
    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];
        const rate = succProb[i];
        graph[from].push([to, rate]);
        graph[to].push([from, rate])
    }


    /**
     * Dijkstra算法
     */
    // 最小路径矩阵
    const pathMaxRate = new Array(n).fill(0);
    // 用于广度遍历
    const poll = new BinaryHeap([], (a, b) => b.rate - a.rate);   // 最大队列;

    // 初始化起始节点K
    pathMaxRate[start] = 1;
    // distance为起点到当前节点的权重和
    poll.push({ id: start, rate: 1 });

    while (!poll.isEmpty()) {
        const { id, rate } = poll.pop();

        // 到达终点提前结束
        if (id === end) {
            return rate
        }

        // 如果存在到达当前节点的路径成功率更小的，可以不用继续走
        if (rate < pathMaxRate[id]) {
            continue
        }

        // 循环当前节点的每个边
        for (let i = 0; i < graph[id].length; i++) {
            const [target, curRate] = graph[id][i];

            // 之前路径到当前节点的权重和
            const pathRate = rate * curRate;

            // 如果当前节点的路径权重和小于已经走过的
            if (pathRate > pathMaxRate[target]) {
                pathMaxRate[target] = pathRate
                // 放到待处理池中
                poll.push({ id: target, rate: pathRate })
            }

        }

    }
    return 0
};