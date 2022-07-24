// 归并排序
const mergeSort1 = function (nums) {
    const tmp = new Array(nums.length)
    // 合并两个数组
    const sort = (nums, l, r) => {
        if (l === r) {
            return
        }

        const mid = Math.floor((l + r) / 2)
        sort(nums, l, mid)
        sort(nums, mid + 1, r)

        // 给tmp初始化数据
        for (let i = l; i <= r; i++) {
            tmp[i] = nums[i]
        }

        let indexL = l
        let indexR = mid + 1

        for (let i = l; i <= r; i++) {
            const num1 = tmp[indexL]
            const num2 = tmp[indexR]

            if (indexL === mid + 1) {
                nums[i] = tmp[indexR]
                indexR++
            } else if (indexR === r + 1) {
                nums[i] = tmp[indexL]
                indexL++
            } else if (num1 <= num2) {
                nums[i] = tmp[indexL]
                indexL++
            } else {
                nums[i] = tmp[indexR]
                indexR++
            }
        }
    }
    sort(nums, 0, nums.length - 1)
    return nums
}

// 快速排序, 有临时数组tmp版本
const quicksort_tmp = function (nums) {
    const tmp = new Array(nums.length)
    // 合并两个数组
    const sort = (nums, l, r) => {
        if (l >= r) {
            return
        }

        // 快排的中间点
        const pivot = nums[l]

        // 给tmp初始化数据
        for (let i = l; i <= r; i++) {
            tmp[i] = nums[i]
        }

        let low = l
        let high = r

        console.log('=======', pivot, l, r, nums.slice(l, r + 1))
        for (let i = l + 1; i <= r; i++) {
            console.log(tmp[i])
            const num = tmp[i]
            if (num <= pivot) {
                nums[low++] = num
            } else {
                nums[high--] = num
            }
        }
        nums[low] = pivot
        console.log('-------', pivot, l, r, nums.slice(l, r + 1))

        sort(nums, l, low - 1)
        sort(nums, low + 1, r)
    }

    sort(nums, 0, nums.length - 1)
    return nums
}

// 快速排序，无临时数组版本
const quicksort = function (nums) {
    const swap = (arr, i, j) => {
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }

    // 合并两个数组
    const sort = (nums, l, r) => {
        if (l >= r) {
            return
        }

        // 快排的中间点
        const pivot = nums[l]

        // 4 6 2 7 1 3
        let low = l + 1
        let high = r
        // console.log('=======', pivot, l, r, nums.slice(l, r + 1))
        while (low <= high) {
            while (nums[low] <= pivot) {
                low++
            }
            while (nums[high] > pivot) {
                high--
            }
            if (low > high) {
                break
            }
            swap(nums, low, high)
        }
        // console.log('-------1', pivot, l, r, nums.slice(l, r + 1))
        swap(nums, l, high)
        // console.log('-------2', pivot, l, r, nums.slice(l, r + 1))

        sort(nums, l, high - 1)
        sort(nums, high + 1, r)
    }

    sort(nums, 0, nums.length - 1)
    return nums
}
