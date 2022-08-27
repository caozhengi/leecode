// 链表节点
class ListNode {
    constructor (val = null, next = null) {
        this.val = val
        this.next = next
    }
}

// 数组转换为单链表
function covertList (array) {
    let current = new ListNode()
    const list = current
    const length = array.length

    for (let i = 0; i < length; i++) {
        current.val = array[i]

        if (i === length - 1) {
            return list
        }

        current.next = new ListNode()
        current = current.next
    }
}

/**
 * 2. 两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
    let n1 = l1
    let n2 = l2
    let tmp = 0
    const result = new ListNode()
    let p = result

    while (n1 !== null || n2 !== null) {
        const sum = Number(n1 ? n1.val : 0) + Number(n2 ? n2.val : 0) + tmp
        tmp = Math.floor(sum / 10)

        p.next = new ListNode(sum % 10)
        p = p.next

        n1 = n1 ? n1.next : null
        n2 = n2 ? n2.next : null
    }
    if (tmp > 0) {
        p.next = new ListNode(tmp)
    }
    return result.next
}

/**
 * 21. 合并两个有序链表
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = function (list1, list2) {
    let result = null; let resultCurrent
    let node1 = list1; let node2 = list2

    while (node1 || node2) {
        if (!result) {
            result = new ListNode()
            resultCurrent = result
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
            resultCurrent.val = node1.val
            node1 = node1.next
        } else {
            resultCurrent.val = node2.val
            node2 = node2.next
        }

        resultCurrent.next = new ListNode()
        resultCurrent = resultCurrent.next
    }
    return result
}

const add = function (arr) {
    const result = []
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        result[i] = mergeTwoLists(arr[2 * i], (arr[2 * i + 1] || null))
    }
    return result
}

/**
 * 23. 合并K个升序链表
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function (lists) {
    let temp = lists

    while (temp.length !== 1) {
        temp = add(temp)
    }

    return temp[0]
}

/**
 * 19. 删除链表的倒数第 N 个结点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
    let i = 0
    let beforeDeleteNode = new ListNode(null)
    const beforeStart = beforeDeleteNode
    let current = head
    beforeDeleteNode.next = head

    if (!head) {
        return null
    }

    while (current && current.next) {
        if (i >= n - 1) {
            beforeDeleteNode = beforeDeleteNode.next
        }
        current = current.next
        i++
    }

    beforeDeleteNode.next = beforeDeleteNode.next.next

    return beforeStart.next
}

/**
 * 876. 链表的中间结点
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {
    let slow = head
    let fast = head

    while (fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
    }

    if (fast.next) {
        return slow.next
    } else {
        return slow
    }
}

/**
 * 141. 环形链表
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function (head) {
    let slow = head
    let fast = head

    while (fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            return true
        }
    }
    return false
}
