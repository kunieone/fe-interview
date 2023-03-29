class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseBetween(head, m, n) {
  if (!head) {
    return null;
  }

  const dummy = new ListNode(-1);
  dummy.next = head;
  let pre = dummy; // 指向第 m-1 个节点
  for (let i = 0; i < m - 1; i++) pre = pre.next;

  let cur = pre.next; // 指向第 m 个节点
  for (let i = m; i < n; i++) {
    const nxt = cur.next;
    cur.next = nxt.next;
    nxt.next = pre.next;
    pre.next = nxt;
  }

  return dummy.next;
}

// Test Cases

const node5 = new ListNode(5);
const node4 = new ListNode(4, node5);
const node3 = new ListNode(3, node4);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);

console.log(reverseBetween(node1, 2, 4)); // Output: ListNode {val: 1, next: ListNode {val: 4, next: ListNode {val: 3, next: ListNode {val: 2, next: ListNode {val: 5, next: null}}}}}
console.log(reverseBetween(node1, 1, 5)); // Output: ListNode {val: 5, next: ListNode {val: 2, next: ListNode {val: 3, next: ListNode {val: 4, next: ListNode {val: 1, next: null}}}}}
