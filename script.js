/** @param {Node} node
 * @param {number} depth
 * @returns {void}
 * */
function listDOM(node, depth) {
  // Indent based on the depth of the node
  const indent = "  ".repeat(depth);

  // Print the node's details
  console.log(`${indent}Node Type: ${node.nodeType}, Node Name: ${node.nodeName}`);

  // If the node is an element, traverse its children
  if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      listDOM(childNode, depth + 1);
    }
  }
}

// Start the traversal from the root of the DOM (usually <html>)
listDOM(document.documentElement, 0); // depth first search

//* 1 The listDOM function takes two parameters: node and depth. node is the current node being processed, and depth indicates the depth in the DOM tree.

//* 2 It first indents the output based on the depth to make the structure more readable.

//* 3 It then logs information about the current node, such as its node type and node name.

//* 4 If the current node is an element node (i.e., it's an HTML element), the function recursively calls itself for each child node of that element. This recursion ensures that the traversal goes deeper into the DOM tree, exploring all nested elements and their children.

//* 5 The traversal starts from the root of the DOM tree, which is typically the <html> element, by calling listDOM(document.documentElement, 0)
