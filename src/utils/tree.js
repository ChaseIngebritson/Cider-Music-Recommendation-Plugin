export function insertNode(node, nodeId, newNode) {
  if (node.nodeId === nodeId) { 
    node.children = newNode;
  } else if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      insertNode(node.children[i], nodeId, newNode);
    }
  }
}