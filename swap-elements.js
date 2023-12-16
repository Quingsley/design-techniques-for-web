/**
 *
 * @param {HTMLElement} element1
 * @param {HTMLElement} element2
 * @returns {void}
 */
function swapElements(element1, element2) {
  // Check if both elements are valid
  if (!element1 || !element2) {
    console.error("Invalid elements provided for swapping.");
    return;
  }

  // Get the parent node of the first element
  const parent1 = element1.parentNode;
  // Clone the first element to preserve its content and attributes
  const element1Clone = element1.cloneNode(true);

  // Get the parent node of the second element
  const parent2 = element2.parentNode;
  // Clone the second element to preserve its content and attributes
  const element2Clone = element2.cloneNode(true);

  // Replace the first element with the second element's clone
  parent1.replaceChild(element2Clone, element1);
  // Replace the second element with the first element's clone
  parent2.replaceChild(element1Clone, element2);
}

// Example usage:
const element1 = document.getElementById("element1");
const element2 = document.getElementById("element2");

// Swap the elements
swapElements(element1, element2);
