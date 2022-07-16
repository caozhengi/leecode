// 双链表节点
class DLinkedNode{
    constructor(key = null, value = null){
        this.key = key
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLink{
    constructor(key = null, value = null){
        this.head = new DLinkedNode;
        this.tail = new DLinkedNode;
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }
    // 添加到最后
    push(node){
        const last = this.tail.prev;
        last.next = node;
        node.prev = last;
        node.next = this.tail;
        this.tail.prev = node;
        this.size += 1;
    }
    // 删除某个节点
    delete(node){
        node.prev.next = node.next;
        node.next.prev = node.prev
        this.size -= 1;
    }
    // 删除某个节点
    deleteLast(){
        this.delete(this.tail.prev)
    }
    // 删除某个节点
    deleteFirst(){
        this.delete(this.head.next)
    }
    // 是否空节点
    isEmpty(){
        return this.size === 0;
    }
    // 打印所有节点
    print(){
        let current = this.head;
        let arr = [];
        while (current) {
            arr.push(current);
            current = current.next;
        }
        console.log(arr);
    }
}