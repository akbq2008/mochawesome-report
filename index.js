class Node {
    constructor(element, next) {
        this.element = element;// 要加入链表元素的值
        this.next = next;// 指向链表中下一个元素的指针
    }
}
function defaultEquals (a, b) {
    return a === b;
}
/**
 * 需要注意的是：链表是从表头开始迭代链表的
 */
module.exports =
    class LinkedList {
        constructor(equalsFn = defaultEquals) {
            this.equalsFn = equalsFn;// 判断相等的函数
            this.count = 0;
            this.head = undefined;// 头指针
        }
        /**
         *
         * @param {*} element 向链表尾部添加一个新元素。
         * 1. 表头添加节点
         * 2. 链表尾部添加节点
         */
        push (element) {
            var node = new Node(element);
            if (this.head == null) {
                this.head = node;
            } else {
                var current = this.head;
                while (current.next != null) {
                    current = current.next;
                }
                current.next = node;
            }
            this.count++;
        }
        /**
         *
         * @param {*} index
         * 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。
         *
         */
        getElementAt (index) {
            if (index >= 0 && index <= this.count) {
                var current = this.head;
                for (var i = 0; i < index && current != null; i++) {
                    current = current.next;
                }
                return current;
            }
            return undefined
        }
        /**
         *
         * @param {*} element
         * @param {*} index
         * 向链表的特定位置插入一个新元素。
         */
        insert (element, index) {
            if (index >= 0 && index <= this.count) {
                var node = new Node(element);
                if (index === 0) {
                    // this.head = node;// x
                    var current = this.head;
                    node.next = current;
                    this.head = node;
                } else {
                    var previows = this.getElementAt(index - 1);
                    // var current = previows.next;
                    // previows.next = node;
                    // node.next = current; //下面是简写
                    node.next = previows.next;// 这里原来指向的是current,即原来的下一个节点
                    previows.next = node;
                }
                this.count++;
                return true;
            }
            return false;
        }
        /**
         *
         * @param {*} index 从链表的特定位置移除一个元素。
         * 1.从头部删除
         * 2.从中间或者尾部删除（尾部为undefined）
         */
        removeAt (index) {
            // index不能等于this.count
            if (index >= 0 && index < this.count) {
                var current = this.head;
                if (index === 0) {
                    // this.head = this.head.next;
                    this.head = current.next;
                } else {
                    var previows = this.getElementAt(index - 1);
                    current = previows.next;
                    previows.next = current.next;
                }
                this.count--;
                return current.element;
            }
            return undefined;
        }
        /**
         *
         * @param {*} element 从链表中移除一个元素。
         */
        remove (element) {
            // var node = new Node(element);
            // if (this.indexOf(node.element) > -1) {
            //     this.removeAt(this.indexOf(node.element))
            //     console.log(this.indexOf(node.element), "!22");
            //     return this.indexOf(node.element);
            // }
            // return undefined;
            var index = this.indexOf(element);
            return this.removeAt(index)
        }
        /**
         *
         * @param {*} element 返回元素在链表中的索引。如果链表中没有该元素则返回-1。
         */
        indexOf (element) {
            var current = this.head;
            for (var i = 0; i < this.count, current != null; i++) {
                if (this.equalsFn(element, current.element)) {
                    return i;
                }
                current = current.next;
            }
            return -1;
        }
        /**
         * 如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false。
         */
        isEmpty () {
            return this.size() === 0;
        }
        /**
         * 返回链表包含的元素个数，与数组的 length 属性类似。
         */
        size () {
            return this.count;
        }
        /**
         * 获取头指针
         */
        getHead () {
            return this.head;
        }
        /**
         * 清空链表
         */
        clear () {
            this.count = 0;
            this.head = null;
        }
        /**
         * 返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值
         */
        toString () {
            if (this.head == null) {
                return '';
            }
            let objString = `${this.head.element}`;
            let current = this.head.next;
            for (let i = 1; i < this.size() && current != null; i++) {
                objString = `${objString},${current.element}`;
                current = current.next;
            }
            return objString;
        }
    }
