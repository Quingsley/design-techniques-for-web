/** @param {Node} rootNode
 * @returns {void}
 * */
function levelOrderTraversal(rootNode) {
  const queue = []; // Create an empty queue
  queue.push(rootNode); // Add the root node to the queue
  while (queue.length > 0) {
    const currentNode = queue.shift(); // Dequeue the front node from the queue

    // Log information about the current node
    console.log(`Node Type: ${currentNode.nodeType}, Node Name: ${currentNode.nodeName}`);

    // Enqueue child nodes (element nodes) into the queue
    if (currentNode.nodeType === Node.ELEMENT_NODE) {
      for (const childNode of currentNode.childNodes) {
        queue.push(childNode);
      }
    }
  }
}

// Start the traversal from the root of the DOM (usually <html>)
levelOrderTraversal(document.documentElement);
