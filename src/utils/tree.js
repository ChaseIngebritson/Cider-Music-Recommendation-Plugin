export function insertNode(node, nodeId, newNode) {
  if (node.nodeId === nodeId) { 
    node.children = newNode;
  } else if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      insertNode(node.children[i], nodeId, newNode);
    }
  }
}

export function removeChildren(node, nodeId) {
  if (node.nodeId === nodeId) { 
    node.children = [];
  } else if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      removeChildren(node.children[i], nodeId);
    }
  }
}

export function getAllIds(node) {
  const ids = new Set()
  ids.add(node.id)

  getAllIdsHelper(node)
  
  return ids

  function getAllIdsHelper (node) {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        ids.add(node.children[i].id)
        getAllIdsHelper(node.children[i]);
      }
    }
  }
}