var mergeTwoLists = function (list1, list2) {
    let result = null, resultCurrent;
    let node1 = list1, node2 = list2;

    while (node1 || node2) {
        if (!result) {
            result = new ListNode();
            resultCurrent = result;
        }
        if (node1 === null) {
            resultCurrent.val = node2.val
            resultCurrent.next = node2.next
            return result
        }

        if (node2 === null) {
            resultCurrent.val = node1.val
            resultCurrent.next = node1.next
            return result
        }

        if (node1.val <= node2.val) {
            resultCurrent.val = node1.val;
            node1 = node1.next
        } else {
            resultCurrent.val = node2.val
            node2 = node2.next
        }

        resultCurrent.next = new ListNode()
        resultCurrent = resultCurrent.next;
    }
    return result;
};

var add = function (arr) {
    const result = []
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        result[i] = mergeTwoLists(arr[2 * i], (arr[2 * i + 1] || null))
    }
    return result
}

var mergeKLists = function (lists) {
    let temp = lists;

    while (temp.length !== 1) {
        temp = add(temp)
    }

    return temp[0];
};

var removeNthFromEnd = function (head, n) {
    let i = 0;
    let beforeDeleteNode = new ListNode(null);
    let beforeStart = beforeDeleteNode;
    let current = head;
    beforeDeleteNode.next = head;

    if (!head) {
        return null
    }

    while (current && current.next) {
        if (i >= n - 1) {
            beforeDeleteNode = beforeDeleteNode.next;
        }
        current = current.next;
        i++
    }

    beforeDeleteNode.next = beforeDeleteNode.next.next

    return beforeStart.next
};


var middleNode = function (head) {
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    if (fast.next) {
        return slow.next
    } else {
        return slow
    }
};


var hasCycle = function (head) {
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true
        }
    }
    return false
};

var getIntersectionNode = function (headA, headB) {
    let currentA = headA;
    let currentB = headB;
    let hasExchangedA = false;
    let hasExchangedB = false;

    if (!currentA || !currentB) {
        return null
    }

    while (!currentA !== currentB) {
        // 已经交换过，但是仍然走到了尽头
        if (hasExchangedA && hasExchangedB && (!currentA.next || !currentB.next)) {
            return null
        }

        if (!currentA.next) {
            hasExchangedA = true;
            currentA = headB
        }
        if (!currentB.next) {
            hasExchangedB = true;
            currentB = headA
        }
        currentA = currentA.next
        currentB = currentB.next
    }

    return currentA;
};




var deleteDuplicates = function (head) {
    let slow = head;
    let slowHead = slow;
    let fast = head;

    if (!head) {
        return null
    }

    while (fast !== null) {
        if (fast.val !== slow.val) {
            slow.next = fast
            slow = slow.next;
        }
        fast = fast.next;
        console.log(slow, fast)
    }
    slow.next = null;
    return slowHead
};


var removeElement = function (nums, val) {
    let length = nums.length;
    let slow = 0;
    let fast = 0;
    while (fast !== length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    nums.splice(slow + 1, length - slow);
    console.log(nums);
    return slow + 1
};


var moveZeroes = function (nums) {
    let length = nums.length;
    let slow = 0;
    let fast = 0;

    while (fast !== length) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast]
            slow++
            if (fast !== slow) {

            }
            nums[fast] = nums[slow];
        }
        fast++
    }
    console.log(nums);
};

var twoSum = function (numbers, target) {
    const length = numbers.length;
    let slow = 0;
    let fast = length - 1;

    while (fast > slow) {
        const num = numbers[slow] + numbers[fast]
        if (num === target) {
            return [slow + 1, fast + 1]
        } else if (num > target) {
            fast--
        } else {
            slow++
        }
        console.log(slow, fast)
    }
    // if(slow === fast){
    //     fast ++
    // }
};

var reverseString = function (s) {
    const length = s.length;
    let slow = 0;
    let fast = length - 1;
    let tmp;

    while (fast > slow) {
        tmp = s[fast];
        s[fast] = s[slow];
        s[slow] = tmp;
        fast--
        slow++
    }
};

var maxPalindromeLength = function (s, l, r) {
    const length = s.length;

    if (l !== r && s[l] !== s[r]) {
        return ''
    }

    while (l >= 0 && r < length) {
        if (s[l] !== s[r]) {
            break
        }
        l--
        r++
    }
    return s.slice(l + 1, r);
}
var longestPalindrome = function (s) {
    const length = s.length;
    let result = '';

    for (let i = 0; i < length; i++) {
        let center = maxPalindromeLength(s, i, i);
        let double = maxPalindromeLength(s, i, i + 1);

        if (center.length > result.length) {
            result = center;
        }

        if (double.length > result.length) {
            result = double;
        }
    }
    // console.log('====',max, left, right, s.slice(left, right))
    return result
};


var minWindow = function (s, t) {

};

// 滑动窗口
var sliddingWindow1 = function (all, target) {
    let left = 0;
    let right = 0;
    let result = '';
    const hashMap = {
    }

    // 用目标给 hashMap 初始化
    for (let i = 0; i < target.length; i++) {
        let char = target[i];
        hashMap[char] = (hashMap[char] || 0) + 1
    }

    // 所有的hashmap需要的字符串是否满足
    const isAllSet = function () {
        for (const key in hashMap) {
            if (hashMap[key] > 0) {
                return false
            }
        }
        return true
    }

    hashMap[all[left]] && hashMap[all[left]]--

    while (right < all.length && left < all.length) {
        if (isAllSet()) {
            const currentResult = all.slice(left, right + 1);
            if (currentResult.length === target.length) {
                return currentResult;
            }
            if (result === '') {
                result = currentResult;
            }
            if (currentResult.length < result.length) {
                result = currentResult;
            }
            hashMap[all[left]] !== undefined && hashMap[all[left]]++
            left++
        } else {
            right++
            hashMap[all[right]] !== undefined && hashMap[all[right]]--
        }
        console.log(all.slice(left, right + 1))
    }
    return result
}


// 滑动窗口
var sliddingWindow = function (all, target) {
    let left = 0;
    let right = 0;
    let result = '';
    const hashMap = new Map();

    // 用目标给 hashMap 初始化
    for (let i = 0; i < target.length; i++) {
        const char = target[i];
        const currentNumber = hashMap.get(char) || 0;
        hashMap.set(char, currentNumber + 1)
    }

    // 需要满足的种类，用于快速判断
    let needType = hashMap.size;

    const updateNeed = (char, offset) => {
        if (!hashMap.has(char)) {
            return
        }

        const num = hashMap.get(char);
        hashMap.set(char, num - offset);

        // 座侧移动1
        if (offset === -1 && num === 0) {
            needType += 1
        }
        // 右侧移动1
        if (offset === 1 && num === 1) {
            needType -= 1
        }
    }

    while (right <= all.length && left < all.length) {
        console.log(all.slice(left, right), needType, hashMap)
        if (needType === 0) {
            const currentResult = all.slice(left, right);
            if (currentResult.length === target.length) {
                // return currentResult;
            }
            if (result === '') {
                result = currentResult;
            }
            if (currentResult.length < result.length) {
                result = currentResult;
            }
            updateNeed(all[left], -1)
            left++
        } else {
            updateNeed(all[right], 1)
            right++
        }
    }
    return result
}


var checkInclusion = function (target, all) {
    let left = 0;
    let right = 0;
    let result = '';
    const hashMap = new Map();

    // 用目标给 hashMap 初始化
    for (let i = 0; i < target.length; i++) {
        const char = target[i];
        const currentNumber = hashMap.get(char) || 0;
        hashMap.set(char, currentNumber + 1)
    }

    // 需要满足的种类，用于快速判断
    let needType = hashMap.size;

    const updateNeed = (char, offset) => {
        if (!hashMap.has(char)) {
            return
        }

        const num = hashMap.get(char);
        hashMap.set(char, num - offset);

        // 座侧移动1
        if (offset === -1 && num === 0) {
            needType += 1
        }
        // 右侧移动1
        if (offset === 1 && num === 1) {
            needType -= 1
        }
    }

    while (right <= all.length && left < all.length) {
        console.log(all.slice(left, right), needType, hashMap)
        if (needType === 0) {
            const currentResult = all.slice(left, right);
            if (currentResult.length === target.length) {
                return true;
            }
            if (result === '') {
                result = currentResult;
            }
            if (currentResult.length < result.length) {
                result = currentResult;
            }
            updateNeed(all[left], -1)
            left++
        } else {
            updateNeed(all[right], 1)
            right++
        }
    }
    return false
};


var findAnagrams = function (all, target) {
    let left = 0;
    let right = 0;
    let result = [];
    const hashMap = new Map();

    // 用目标给 hashMap 初始化
    for (let i = 0; i < target.length; i++) {
        const char = target[i];
        const currentNumber = hashMap.get(char) || 0;
        hashMap.set(char, currentNumber + 1)
    }

    // 需要满足的种类，用于快速判断
    let needType = hashMap.size;

    const updateNeed = (char, offset) => {
        if (!hashMap.has(char)) {
            return
        }

        const num = hashMap.get(char);
        hashMap.set(char, num - offset);

        // 座侧移动1
        if (offset === -1 && num === 0) {
            needType += 1
        }
        // 右侧移动1
        if (offset === 1 && num === 1) {
            needType -= 1
        }
    }

    while (right <= all.length && left < all.length) {
        console.log(all.slice(left, right), needType, hashMap)
        if (needType === 0) {
            const currentResult = all.slice(left, right);
            if (currentResult.length === target.length) {
                result.push(left)
            }
            updateNeed(all[left], -1)
            left++
        } else {
            updateNeed(all[right], 1)
            right++
        }
    }
    return result
};


// 滑动窗口
var lengthOfLongestSubstring1 = function (all) {
    let left = 0;
    let right = 0;
    let result = '';
    const hashMap = new Map();

    // 重复字符串的数量
    let repetitionNumber = 0;

    const updateRepetitionNumber = (char, offset) => {
        const num = hashMap.get(char) || 0;
        hashMap.set(char, num + offset);

        // 左侧移动1
        if (offset === -1 && num === 2) {
            repetitionNumber -= 1
        }
        // 右侧移动1
        if (offset === 1 && num === 1) {
            repetitionNumber += 1
        }
    }

    while (right <= all.length && left < all.length) {
        console.log(all.slice(left, right), repetitionNumber, hashMap)
        if (repetitionNumber === 0) {
            const currentResult = all.slice(left, right);
            if (result === '') {
                result = currentResult;
            }
            if (currentResult.length > result.length) {
                result = currentResult;
            }
            updateRepetitionNumber(all[right], 1)
            right++
        } else {
            updateRepetitionNumber(all[left], -1)
            left++
        }
    }
    return result.length
}


// 滑动窗口
var lengthOfLongestSubstring = function (all) {
    let left = 0;
    let right = 0;
    let result = '';
    const hashMap = new Map();

    const updateHashMap = (char, offset) => {
        const num = hashMap.get(char) || 0;
        hashMap.set(char, num + offset);
    }

    while (right <= all.length && left < all.length) {
        console.log(all.slice(left, right), "|", all[right], hashMap)

        const currentResult = all.slice(left, right);
        if (currentResult.length > result.length) {
            result = currentResult;
        }

        if (right < 1 || (hashMap.get(all[right]) || 0) < 1) {
            updateHashMap(all[right], 1)
            right++
        } else {
            updateHashMap(all[left], -1)
            left++
        }
    }
    return result.length
}

// 二分查找
var search1 = function (nums, target, start = 0) {
    const length = nums.length;
    const middleIndex = Math.floor(length / 2);
    const middleNum = nums[middleIndex];

    console.log(nums, target, start)

    // 空数组
    if (!length) {
        return -1
    }

    // 相等的时候
    if (middleNum === target) {
        return start + middleIndex
    }

    if (middleNum > target) {
        const index = search(nums.slice(0, middleIndex), target, start);
        return index
    }

    if (middleNum < target) {
        const index = search(nums.slice(middleIndex + 1, length), target, middleIndex + start + 1);
        return index
    }
};

// 二分查找
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        console.log(left, right)

        const middleIndex = Math.floor((left + right) / 2);
        const middleNum = nums[middleIndex];

        // 相等的时候
        if (middleNum === target) {
            return middleIndex
        }

        if (middleNum > target) {
            right = middleIndex - 1;
        }

        if (middleNum < target) {
            left = middleIndex + 1
        }
    }
    return -1
};

var searchLeft = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    let result = -1;

    while (left <= right) {
        console.log(left, right)

        const middleIndex = Math.floor((left + right) / 2);
        const middleNum = nums[middleIndex];

        // 左侧搜索
        if (middleNum >= target) {
            if (middleNum === target) {
                result = middleIndex
            }

            right = middleIndex - 1;
        }

        // 右侧搜索
        if (middleNum < target) {
            left = middleIndex + 1
        }
    }
    return result
};

var searchRight = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    let result = -1;

    while (left <= right) {
        console.log(left, right)

        const middleIndex = Math.floor((left + right) / 2);
        const middleNum = nums[middleIndex];

        // 左侧搜索
        if (middleNum > target) {
            right = middleIndex - 1;
        }

        // 右侧搜索
        if (middleNum <= target) {
            if (middleNum === target) {
                result = middleIndex
            }
            left = middleIndex + 1
        }
    }
    return result
};

var searchRange = function (nums, target) {
    const left = searchLeft(nums, target)
    const right = searchRight(nums, target)
    return [left, right]
};

var getHour = function (piles, num) {
    let hour = 0;
    for (const pile of piles) {
        hour += Math.ceil(pile / num);
    }
    return hour;
}

var minEatingSpeed = function (piles, target) {
    let left = 0;
    let right = piles[0];

    for (const pile of piles) {
        if (right < pile) {
            right = pile;
        }
    }


    while (left <= right) {
        const middleNum = Math.floor((left + right) / 2);
        // 当前数量下，需要的时间
        const hour = getHour(piles, middleNum);

        console.log(left, right, middleNum, hour, target);

        if (hour === target) {
            right = middleNum
        }

        // 当前的时间大于目标， 吃的快一些
        if (hour > target) {
            left = middleNum + 1
        }

        // 当前的时间小于目标，吃的慢一些
        if (hour <= target) {
            right = middleNum - 1;
        }
    }
    return left
};

var getDays = function (weights, num) {
    let days = 1;
    let current = num;
    for (const pile of weights) {
        if (current >= pile) {
            current -= pile;
        } else {
            current = num - pile
            days += 1;
        }
    }
    return days;
}

var shipWithinDays = function (weights, days) {
    let left = 0;
    let right = weights[0];

    for (const pile of weights) {
        right += pile;
        if (pile > left) {
            left = pile;
        }
    }

    while (left <= right) {
        const middleNum = Math.floor((left + right) / 2);
        // 当前数量下，需要的时间
        const current = getDays(weights, middleNum);

        console.log(left, right, middleNum, current, days);

        if (current === days) {
            right = middleNum
        }

        // 当前的时间大于目标， 吃的快一些
        if (current > days) {
            left = middleNum + 1
        }

        // 当前的时间小于目标，吃的慢一些
        if (current <= days) {
            right = middleNum - 1;
        }
    }
    return left
};


var advantageCount1 = function (nums1, nums2) {
    let p1 = 0;
    let p2 = 0;
    let length = nums1.length;
    let result = [];
    let tmp = [];
    let sortNums1 = nums1.sort((a, b) => a - b);
    let sortNums2 = [];
    let map = {}

    // 保存num2每个数字的顺序
    for (let i = 0; i < nums2.length; i++) {
        sortNums2.push(nums2[i])
        const element = nums2[i];
        if (!map[element]) {
            map[element] = [];
        }
    }
    sortNums2.sort((a, b) => a - b);

    while (p1 < length && p2 < length) {
        const sortNum1 = sortNums1[p1];
        const sortNum2 = sortNums2[p2];

        if (sortNum1 <= sortNum2) {
            tmp.push(sortNum1)
            p1++
        } else {
            map[sortNum2].push(sortNum1)
            p1++
            p2++
        }

    }

    for (const num2 of nums2) {
        if (map[num2].length) {
            result.push(map[num2].shift())
        } else {
            result.push(tmp.pop())
        }
    }
    return result
};

var advantageCount = function (nums1, nums2) {
    let p1 = 0;
    let p2 = 0;
    let length = nums1.length;
    let result = new Array(length).fill(null);
    let sortNums2 = [];
    let map = {}

    // 保存num2每个数字的顺序
    for (let i = 0; i < nums2.length; i++) {
        sortNums2.push(nums2[i])
        const element = nums2[i];
        if (!map[element]) {
            map[element] = [];
        }
        map[element].push(i)
    }

    // 给nums1排序
    nums1.sort((a, b) => a - b);
    // 给nums2排序
    sortNums2.sort((a, b) => a - b);

    let maxp2 = length - 1;
    while (p1 < length) {
        const sortNum1 = nums1[p1];
        const sortNum2 = sortNums2[p2];

        if (sortNum1 <= sortNum2) {
            const maxNum2 = sortNums2[maxp2];
            const maxNum2Index = map[maxNum2].shift();
            // 当前sortNum1用不上，可以放到结果数组最后
            result[maxNum2Index] = sortNum1;
            maxp2--
        } else {
            const index = map[sortNum2].shift()
            result[index] = sortNum1;
            p2++
        }
        p1++
    }

    return result
};

var reverseList1 = function (head) {
    let first = head;
    while (head.next) {
        const tmp = first;
        first = head.next;
        head.next = head.next.next;
        first.next = tmp;

        // current = first;
        console.log(first.val, head.val)
    }
    return first
};

var reverseList = function (head) {
    if (!head || !head.next) {
        return head
    }

    const last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last
};

let successor = null;
var reverseN = function (head, n) {
    if (n === 1) {
        successor = head.next
        return head
    }

    const last = reverseN(head.next, n - 1);
    head.next.next = head;
    head.next = successor;
    return last
};

var reverseBetween = function (head, m, n) {
    if (m === 1) {
        return reverseN(head, n)
    }
    head.next = reverseBetween(head.next, m - 1, n - 1);
    return head
};


var isValid = function (s) {
    const dict = {
        '(': ')',
        '[': ']',
        '{': '}',
    }
    const arr = [];

    for (const char of s) {
        const last = arr[arr.length - 1];
        if (dict[last] !== char) {
            arr.push(char)
        } else {
            arr.pop()
        }
    }
    return arr.length === 0
};


var minAddToMakeValid = function (s) {
    const arr = []
    const dict = {
        '(': ')',
    }

    for (const char of s) {
        const last = arr[arr.length - 1];
        if (dict[last] !== char) {
            arr.push(char)
        } else {
            arr.pop()
        }
    }
    return arr.length
};

var minInsertions1 = function (s) {
    const arr = []
    const length = s.length;
    let left = 0;
    let right = 0;

    for (let i = 0; i < length; i++) {
        const char = s[i];
        const last2 = arr[i - 2];
        const last1 = arr[i - 1];

        // if(i<2){
        //     arr.push(char)
        //     continue
        // }

        if (`${last2}${last1}${char}` === '())') {
            arr.pop();
            arr.pop();
            left--
            right--
        } else {
            arr.push(char)
            if (char === '(') {
                left++
            } else {
                right++
            }
        }

    }

    return left * 2 + right
};

var minInsertions = function (s) {
    let left = 0;
    let need = 0;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const next = s[i + 1];

        // 当前是左括号
        if (char === '(') {
            left++

            // 当前是右括号
        } else {
            if (left === 0) {
                left++
                need++
            }
            // 已经有左侧了
            if (next === ')') {
                left--
                i++
            } else {
                left--
                need++
            }
        }
    }

    return left * 2 + need
};

var nextGreaterElement = function (nums1, nums2) {
    const dist = {};
    const arr = [];
    const result = [];


    for (let i = nums2.length - 1; i >= 0; i--) {
        const num = nums2[i];
        while (arr.length > 0 && arr[arr.length - 1] < num) {
            arr.pop();
        }
        dist[num] = arr.length ? arr[arr.length - 1] : -1;
        arr.push(num);
    }
    for (const num of nums1) {
        result.push(dist[num])
    }
    return result
};

var dailyTemperatures = function (temperatures) {
    const arr = [];
    const result = [];

    for (let i = temperatures.length - 1; i >= 0; i--) {
        const num = temperatures[i];

        console.log(i, tmp)
        while (arr.length > 0 && arr[arr.length - 1].num <= num) {
            arr.pop();
        }
        result[i] = arr.length ? arr[arr.length - 1].i - i : 0;
        arr.push({ num, i });
    }
    return result
};

var nextGreaterElements = function (nums) {
    const arr = [];
    const result = [];
    const length = nums.length;


    for (let i = length * 2 - 1; i >= 0; i--) {
        const index = i % length;
        const num = nums[index];

        console.log(index)
        while (arr.length > 0 && arr[arr.length - 1] <= num) {
            arr.pop();
        }
        result[index] = arr.length ? arr[arr.length - 1] : -1;
        arr.push(num);
    }
    return result
};

// var maxSlidingWindow = function(nums, k) {
//     const arr = [];
//     const result = [];
//     const length = nums.length;


//     for (let index = length - 1; index >= 0; index--) {
//         const num = nums[index];

//         while (arr.length > 0 && arr[arr.length - 1] <= num) {
//             arr.pop();
//         }
//         if(index < length - 3){
//             result.push([0]);
//         }
//         arr.push(num);
//     }
//     return result

// };

var maxSlidingWindow = function (nums, k) {
    const arr = [];
    const result = [];
    const length = nums.length;

    for (let index = 0; index < length; index++) {
        const num = nums[index];

        while (arr.length > 0 && num > arr[arr.length - 1]) {
            arr.pop();
        }
        arr.push(num);

        if (index >= k - 1) {
            const needDelete = nums[index - k];
            if (index >= k && needDelete === arr[0]) {
                arr.shift();
            }
            result.push(arr[0])
        }

    }
    return result
};

var removeDuplicateLetters = function (s) {
    const hashCount = {}; //当前已有的字母出现的个数
    const alreadyHashCount = {}; //当前已有的字母出现的个数
    const length = s.length;
    const arr = [];

    // 记录每个字母出现的次数
    for (const char of s) {
        hashCount[char] = (hashCount[char] || 0) + 1;
    }

    for (let index = 0; index < length; index++) {
        const char = s[index];

        hashCount[char] -= 1;

        if (!alreadyHashCount[char]) {
            while (
                arr.length > 0 &&
                char.charCodeAt() < arr[arr.length - 1].charCodeAt() &&
                hashCount[arr[arr.length - 1]] > 0
            ) {
                const delChar = arr.pop();
                alreadyHashCount[delChar]--
            }
            arr.push(char);
            alreadyHashCount[char] = (alreadyHashCount[char] || 0) + 1;
        }
    }
    return arr.join('')
};


var RandomizedSet = function () {
    this.indexHash = {};
    this.arr = new Array();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    if (this.indexHash[val] !== undefined) {
        return false
    }
    this.arr.push(val)
    this.indexHash[val] = this.arr.length - 1;
    return true
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    if (this.indexHash[val] === undefined) {
        return false
    }
    const index = this.indexHash[val];
    const lastIndex = this.arr.length - 1;
    const lastVal = this.arr[lastIndex];

    this.indexHash[lastVal] = index;
    this.arr[index] = lastVal;
    delete this.indexHash[val];
    this.arr.pop();
    return true
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    const length = this.arr.length;
    const index = Math.floor(Math.random() * length)
    return this.arr[index]
};

var Solution = function (n, blacklist) {
    this.length = n - blacklist.length;
    this.map = new Map();

    // 维护当前处理的位数
    let last = n - 1;

    // 初始化hash
    for (const num of blacklist) {
        this.map.set(num, null);
    }

    for (const num of blacklist) {
        if (num < this.length && last > this.length) {
            // 只处理不在黑名单中的数据
            while (this.map.has(last)) {
                last--
            }
            this.map.set(num, last);
            last--
        }
    }
};

/**
 * @return {number}
 */
Solution.prototype.pick = function () {
    const index = Math.floor(Math.random() * this.length)
    const num = this.map.get(index);
    return num || index
};


// const heap = new Heap([27, 16, 19, 14, 14, 13, 18],'max');
// heap.pop();
// console.log('=======',heap.data)


var calculate = function (s) {
    const operation = (s) => {
        const cache = [];
        let numberString = '';
        let sign = '+';
        let result = 0;
        let processLength = 0;

        for (let index = 0; index < s.length; index++) {
            const char = s[index]
            const isNumber = /[0-9]/.test(char);

            // 如果当前是数字，拼接道数字字符串缓存中
            if (isNumber) {
                numberString += char;
            }

            // 递归的方式处理括号内的内容
            if (char === '(') {
                const { processLength, result } = operation(s.slice(index + 1));
                // 转化成字符串是为了后面numberString.length判断有效
                numberString = String(result);
                // 跳过已经处理过的内容
                index += (processLength + 1);
            }

            // 如果不是数字 或到了最后一位  则入栈，
            if (!isNumber || index === s.length - 1) {
                if (numberString.length > 0) {
                    if (sign === '+') {
                        cache.push(Number(numberString))
                    }
                    if (sign === '-') {
                        cache.push(-Number(numberString))
                    }
                    if (sign === '*') {
                        cache.push(cache.pop() * Number(numberString))
                    }
                    if (sign === '/') {
                        // cache.push(cache.pop() / Number(numberString))
                        cache.push(parseInt(cache.pop() / Number(numberString)))
                    }
                }

                // 排除掉空格
                if (char !== ' ') {
                    sign = char;
                }
                numberString = '';
            }

            if (char === ')') {
                processLength = index;
                break;
            }
        }

        while (cache.length) {
            result += cache.pop();
        }

        return {
            result,
            processLength
        }
    }

    const result = operation(s).result;
    return parseInt(result)

};


// var flatten = function(root) {
//     let result = new TreeNode();
//     let head = result;


//     const traverse = (node)=>{
//         if(!node){
//             return null
//         }

//         head.right = node;
//         head = head.right;

//         traverse(node.left)
//         traverse(node.right)
//     }

//     traverse(root)

//     root = result.right;
// };



var flatten = function (node) {
    if (!node) {
        return null
    }

    const left = flatten(node.left);
    const right = flatten(node.right);


    console.log('=========', node, left, right)

    if (left) {
        let leftLast = left;
        while (leftLast.right) {
            leftLast = leftLast.right;
        }
        leftLast.right = right;
        node.right = left;
        // node.right.right = leftLast;
        // node.right.right = tmp;
        node.left = null
    }

    return node
};


var connect = function (root) {

    const traverse = (node1, node2) => {
        if (!node1 && !node2) {
            return null
        }

        traverse(node1.left, node1.right)
        traverse(node2.left, node2.right)
        traverse(node1.right, node2.left)


        // node1.left.next = node1.right
        // node2.left.next = node2.right
        // node1.right.next = node2.left
    }
    traverse(root.left, root.right)
    return root
};

var constructMaximumBinaryTree1 = function (nums) {
    const length = nums.length;
    const nodeArray = new Array(length);
    let result = null;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const node = new TreeNode(num);
        nodeArray[i] = node;

        // 第一个不做处理
        if (i === 0) {
            result = node;
            continue;
        }

        let k = i - 1;
        let lastNode = nodeArray[k];

        if (num < nums[k]) {
            lastNode.right = node
            continue
        }

        // 去找之前的节点哪个个比当前节点大
        while (k >= 0 && nums[k] < num) {
            k--
        }

        // 当前的节点是最大的
        if (k === -1) {
            node.left = result;
            result = node;

            // index为K或当前节点是最大的
        } else {
            nodeArray[k].right = node;
            node.left = nodeArray[k + 1]
        }
    }
    return result
};


var constructMaximumBinaryTree = function (nums) {
    const build = (nums) => {
        if (!nums.length) {
            return null;
        }

        // 寻找最大数
        let maxIndex = 0;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > nums[maxIndex]) {
                maxIndex = i;
            }
        }

        const node = new TreeNode(nums[maxIndex]);
        node.left = build(nums.slice(0, maxIndex));
        node.right = build(nums.slice(maxIndex + 1));
        return node
    }

    return build(nums);
};

var buildTree1 = function (preorder, inorder) {

    const build = (preorder, inorder) => {
        if (!preorder.length || !inorder.length) {
            return null;
        }

        const head = preorder[0];
        const index = inorder.indexOf(head);

        const node = new TreeNode(head);
        node.left = build(preorder.slice(1, 1 + index), inorder.slice(0, index));
        node.right = build(preorder.slice(1 + index), inorder.slice(index + 1));

        return node
    }

    return build(preorder, inorder);
};

var buildTree = function (inorder, postorder) {

    const build = (inorder, postorder) => {
        if (!postorder.length) {
            return null;
        }

        const head = postorder[postorder.length - 1];
        const index = inorder.indexOf(head);

        const node = new TreeNode(head);
        node.left = build(inorder.slice(0, index), postorder.slice(0, index));
        node.right = build(inorder.slice(index + 1), postorder.slice(index, postorder.length - 1));

        return node
    }

    return build(inorder, postorder);
};

var constructFromPrePost = function (preorder, postorder) {
    const build = (preorder, postorder) => {
        if (!preorder.length) {
            return '';
        }

        const head = preorder[0];
        const left = preorder[1];
        const index = postorder.indexOf(left);

        const node = new TreeNode(head);
        node.left = build(preorder.slice(1, index + 2), postorder.slice(0, index + 1));
        node.right = build(preorder.slice(index + 2), postorder.slice(index + 1, postorder.length - 1));

        return node
    }

    return build(preorder, postorder);
};

var sortArray = function (nums) {
    // 合并两个数组
    const mergeSort = (nums, l, r) => {
        if (l === r) {
            return [nums[l]];
        }

        const mid = Math.floor((l + r) / 2);

        const nums1 = mergeSort(nums, l, mid);
        const nums2 = mergeSort(nums, mid + 1, r);

        const result = [];
        let index1 = 0;
        let index2 = 0;

        while (index1 < nums1.length || index2 < nums2.length) {
            const num1 = nums1[index1];
            const num2 = nums2[index2];

            if (num1 <= num2 || index2 >= nums2.length) {
                result.push(num1);
                index1++;
                continue
            }
            if (num2 <= num1 || index1 >= nums1.length) {
                result.push(num2);
                index2++;
                continue
            }
        }
        return result;
    }

    return mergeSort(nums, 0, nums.length - 1);
};


var countSmaller = function (nums) {
    const tmp = new Array(nums.length);
    const count = new Array(nums.length).fill(0);
    const numberIndex = []; // 维护数组排序过程中index的书序
    const tmpIndex = [];

    for (let i = 0; i < nums.length; i++) {
        numberIndex.push(i);
    }

    // 归并排序 合并两个数组
    const mergeSort = (nums, l, r) => {
        if (l === r) {
            return;
        }

        const mid = Math.floor((l + r) / 2);
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);

        // 排序之前缓存数据，因为排序过程中会对原数据进行修改，无法保存原数据
        for (let i = l; i <= r; i++) {
            tmp[i] = nums[i];
            tmpIndex[i] = numberIndex[i];
        }

        let indexL = l;
        let indexR = mid + 1;

        // 1 3 2  4
        // console.log('=======', tmp.slice(l, r + 1), num1, l, mid + 1, r)

        for (let i = l; i <= r; i++) {
            const num1 = tmp[indexL];
            const num2 = tmp[indexR];
            console.log('------', numberIndex, indexL, indexR)

            if (indexL === mid + 1) {
                nums[i] = tmp[indexR];
                numberIndex[i] = tmpIndex[indexR]
                indexR++
            } else if (indexR === r + 1) {
                nums[i] = tmp[indexL];
                numberIndex[i] = tmpIndex[indexL]
                count[numberIndex[i]] += indexR - mid - 1;
                indexL++
            } else if (num1 <= num2) {
                nums[i] = tmp[indexL];
                numberIndex[i] = tmpIndex[indexL]
                count[numberIndex[i]] += indexR - mid - 1;
                indexL++
            } else {
                nums[i] = tmp[indexR];
                numberIndex[i] = tmpIndex[indexR]
                indexR++
            }
        }
    }

    mergeSort(nums, 0, nums.length - 1);
    console.log('=========', count)
    return nums
};

var reversePairs = function (nums) {
    const tmp = new Array(nums.length);
    let count = 0;

    // 合并两个数组
    const mergeSort = (nums, l, r) => {
        if (l === r) {
            return;
        }

        const mid = Math.floor((l + r) / 2);
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);

        console.log('=======', l, mid, r, nums.slice(l, mid + 1), nums.slice(mid + 1, r + 1))
        // 456 123

        for (let j = mid + 1; j <= r; j++) {
            for (let i = l; i <= mid; i++) {
                const numl = nums[i];
                const numr = nums[j];
                if (numl > numr * 2) {
                    console.log('------', nums.slice(l, mid + 1), nums.slice(mid + 1, r + 1))
                    count += mid - i + 1;
                    break
                }
            }
        }

        // 给tmp初始化数据
        for (let i = l; i <= r; i++) {
            tmp[i] = nums[i];
        }

        let indexL = l;
        let indexR = mid + 1;

        for (let i = l; i <= r; i++) {
            const num1 = tmp[indexL];
            const num2 = tmp[indexR];

            if (indexL === mid + 1) {
                nums[i] = tmp[indexR];
                indexR++
            } else if (indexR === r + 1) {
                nums[i] = tmp[indexL];
                indexL++
            } else if (num1 <= num2) {
                nums[i] = tmp[indexL];
                indexL++
            } else {
                nums[i] = tmp[indexR];
                indexR++
            }

        }
    }

    mergeSort(nums, 0, nums.length - 1);
    return count
};


var countRangeSum = function (nums, lower, upper) {
    const tmp = new Array(nums.length);
    const preSum = new Array(nums.length + 1).fill(0);
    let count = 0;

    // preSum[0] = nums[0];
    for (let i = 0; i < nums.length; i++) {
        preSum[i + 1] = preSum[i] + nums[i];
    }

    // 合并两个数组
    const mergeSort = (nums, l, r) => {
        if (l === r) {
            return;
        }

        const mid = Math.floor((l + r) / 2);
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);

        console.log('=======', l, mid, r, nums.slice(l, mid + 1), nums.slice(mid + 1, r + 1))

        // 计算区间
        let start = mid + 1;
        let end = mid + 1;
        for (let i = l; i <= mid; i++) {
            debugger
            while (start <= r && nums[start] - nums[i] < lower) {
                start++
            }
            while (end <= r && nums[end] - nums[i] <= upper) {
                end++
            }
            console.log('------', nums[i], start, end)
            count += end - start;
        }

        // 给tmp初始化数据
        for (let i = l; i <= r; i++) {
            tmp[i] = nums[i];
        }

        let indexL = l;
        let indexR = mid + 1;

        for (let i = l; i <= r; i++) {
            const num1 = tmp[indexL];
            const num2 = tmp[indexR];

            if (indexL === mid + 1) {
                nums[i] = tmp[indexR];
                indexR++
            } else if (indexR === r + 1) {
                nums[i] = tmp[indexL];
                indexL++
            } else if (num1 <= num2) {
                nums[i] = tmp[indexL];
                indexL++
            } else {
                nums[i] = tmp[indexR];
                indexR++
            }
        }
    }

    mergeSort(preSum, 0, preSum.length - 1);
    return count
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    let lo = 0;
    let hi = nums.length - 1;
    k = nums.length - k;

    const swap = (arr, i, j) => {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    // 合并两个数组
    const sort = (nums, l, r) => {
        if (l >= r) {
            return l;
        }

        // 快排的中间点
        const pivot = nums[l];

        let low = l + 1;
        let high = r
        while (low <= high) {
            while (nums[low] <= pivot) {
                low++
            }
            while (nums[high] > pivot) {
                high--
            }
            if (low > high) {
                break;
            }
            swap(nums, low, high);
        }
        swap(nums, l, high);
        return high;
    }

    while (lo <= hi) {
        const p = sort(nums, lo, hi);
        if (p > k) {
            hi = p - 1;
        } else if (p < k) {
            lo = p + 1;
        } else {
            return nums[p]
        }
    }
    return -1;
};

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

const example = [
    "12"
    // covert2BinaryTree([1,2,3,4,5,null,7])
];

console.log('param', ...example);
// const example = covertList([1,1,2]); 
console.log("Result: ", numDecodings(...example));


/** 
let obj = null;
example[0].forEach((key, index) => {
    if(index === 0){
        obj = new MedianFinder(...example[1][0]);
        return
    }
    console.log(obj[key](...example[1][index]));
})
*/








