/**
 * 岛屿相关问题
 * 主要思路为 DFS/BFS 遍历而为数组
 */

/**
 * 200. 岛屿数量
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands_backup = function (grid) {
    const rowCount = grid.length;
    const colCount = grid[0] ? grid[0].length : 0;

    // 记录已经走过的点
    let visited = new Array(rowCount).fill(0).map(() => new Array(colCount).fill(false));

    // 四个方向
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let islandsNumber = 0;

    /**
     * @param {*} 第几行
     * @param {*} 第几列
     * @returns 
     */
    const traverse = (row, col) => {
        if (visited[row][col]) {
            return false
        }
        visited[row][col] = true;

        if (grid[row][col] === '0') {
            return false
        }

        dirs.forEach(([rowOffset, colOffset]) => {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (nextRow >= 0 && nextCol >= 0 && nextRow < rowCount && nextCol < colCount) {
                traverse(nextRow, nextCol)
            }
        })
        return true
    }

    // 遍历而为数组
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            const current = traverse(row, col)
            if (current) {
                islandsNumber += 1;
            }
        }
    }

    return islandsNumber
};

/**
 * 200. 岛屿数量 (无需记录visited)
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const rowCount = grid.length;
    const colCount = grid[0] ? grid[0].length : 0;

    // 四个方向
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let islandsNumber = 0;

    /**
     * @param {*} 第几行
     * @param {*} 第几列
     * @returns 
     */
    const traverse = (row, col) => {
        if (grid[row][col] === '0') {
            return
        }
        grid[row][col] = '0'

        dirs.forEach(([rowOffset, colOffset]) => {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (nextRow >= 0 && nextCol >= 0 && nextRow < rowCount && nextCol < colCount) {
                traverse(nextRow, nextCol)
            }
        })
    }

    // 遍历而为数组
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (grid[row][col] === '1') {
                islandsNumber += 1
                traverse(row, col)
            }
        }
    }

    return islandsNumber
};


/**
 * 1254. 统计封闭岛屿的数目
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
    const rowCount = grid.length;
    const colCount = grid[0] ? grid[0].length : 0;

    // 四个方向
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let islandsNumber = 0;

    /**
     * @param {*} 第几行
     * @param {*} 第几列
     * @returns 
     */
    const traverse = (row, col) => {
        if (grid[row][col] === 1) {
            return
        }
        grid[row][col] = 1

        dirs.forEach(([rowOffset, colOffset]) => {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (nextRow >= 0 && nextCol >= 0 && nextRow < rowCount && nextCol < colCount) {
                traverse(nextRow, nextCol)
            }
        })
    }

    // 遍历贴近岸边的陆地
    for (let col = 0; col < colCount; col++) {
        // 处理第一行
        traverse(0, col)
        // 处理最后一行
        traverse(rowCount - 1, col)
    }
    for (let row = 1; row < rowCount - 1; row++) {
        // 处理第一列
        traverse(row, 0)
        // 处理最后一列
        traverse(row, colCount - 1)
    }

    // 遍历而为数组
    for (let row = 1; row < rowCount - 1; row++) {
        for (let col = 1; col < colCount - 1; col++) {
            if (grid[row][col] === 0) {
                islandsNumber += 1
                traverse(row, col)
            }
        }
    }

    return islandsNumber
};


/**
 * 1020. 飞地的数量
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
    const rowCount = grid.length;
    const colCount = grid[0] ? grid[0].length : 0;

    // 四个方向
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let islandsNumber = 0;

    /**
     * @param {*} 第几行
     * @param {*} 第几列
     * @returns 
     */
    const traverse = (row, col) => {
        if (grid[row][col] === 0) {
            return
        }
        grid[row][col] = 0

        dirs.forEach(([rowOffset, colOffset]) => {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (nextRow >= 0 && nextCol >= 0 && nextRow < rowCount && nextCol < colCount) {
                traverse(nextRow, nextCol)
            }
        })
    }

    // 遍历贴近岸边的陆地
    for (let col = 0; col < colCount; col++) {
        // 处理第一行
        traverse(0, col)
        // 处理最后一行
        traverse(rowCount - 1, col)
    }
    for (let row = 1; row < rowCount - 1; row++) {
        // 处理第一列
        traverse(row, 0)
        // 处理最后一列
        traverse(row, colCount - 1)
    }

    // 遍历而为数组
    for (let row = 1; row < rowCount - 1; row++) {
        for (let col = 1; col < colCount - 1; col++) {
            if (grid[row][col] === 1) {
                islandsNumber += 1
            }
        }
    }

    return islandsNumber
};


/**
 * 695. 岛屿的最大面积
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    const rowCount = grid.length;
    const colCount = grid[0] ? grid[0].length : 0;

    // 四个方向
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let maxArea = 0;      // 最大面积
    let tmp = 0;          // 存储每次遍历的临时结果

    /**
     * @param {*} 第几行
     * @param {*} 第几列
     * @returns 
     */
    const traverse = (row, col) => {
        if (grid[row][col] === 0) {
            return
        }
        grid[row][col] = 0
        tmp++

        dirs.forEach(([rowOffset, colOffset]) => {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (nextRow >= 0 && nextCol >= 0 && nextRow < rowCount && nextCol < colCount) {
                traverse(nextRow, nextCol)
            }
        })
    }

    // 遍历数组
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (grid[row][col] === 1) {
                tmp = 0;
                traverse(row, col)

                // 当前结果和最大的岛屿数量做对比
                if (tmp > maxArea) {
                    maxArea = tmp
                }
            }
        }
    }

    return maxArea
};


/**
 * 1905. 统计子岛屿
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {

    const rowCount = grid2.length;
    const colCount = grid2[0] ? grid2[0].length : 0;

    // 四个方向
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let islandsNumber = 0;      // 最大面积
    let isContain = true;          // 存储每次遍历的临时结果

    /**
     * @param {*} 第几行
     * @param {*} 第几列
     * @returns 
     */
    const traverse = (row, col) => {
        if (grid2[row][col] === 0) {
            return
        }
        if (grid1[row][col] === 0) {
            isContain = false;
        }
        grid2[row][col] = 0

        dirs.forEach(([rowOffset, colOffset]) => {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (nextRow >= 0 && nextCol >= 0 && nextRow < rowCount && nextCol < colCount) {
                traverse(nextRow, nextCol)
            }
        })
    }

    // 遍历数组
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (grid2[row][col] === 1) {
                isContain = true;
                traverse(row, col)

                // 当前结果和最大的岛屿数量做对比
                if (isContain) {
                    islandsNumber++
                }
            }
        }
    }

    return islandsNumber
};