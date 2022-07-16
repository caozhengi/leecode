// 链表节点
class ListNode{
    constructor(val = null, next = null){
        this.val = val;
        this.next = next;
    }
}

// 数组转换为单链表
function covertList(array){
    let current = new ListNode();
    const list = current;
    const length = array.length;

    for (let i = 0; i < length; i++) {
        current.val = array[i];

        if(i === length - 1){
            return list
        }

        current.next = new ListNode()
        current = current.next;
    }
}
