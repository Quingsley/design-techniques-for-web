// Get the input element where you want to simulate typing
const inputElement = document.getElementById("simulate");
const btn = document.querySelector("button");

/**
 *Function to simulate typing
 * @param {string} text
 */
function simulateTyping(text) {
  // Clear the input element
  inputElement.value = "";

  // Split the text into individual characters
  const characters = text.split("");

  inputElement.focus();

  // Iterate through each character and create a keypress event
  characters.forEach((char, index) => {
    setTimeout(() => {
      inputElement.value += char;
      const keyPressEvent = new KeyboardEvent("keypress", {
        key: char,
      });
      inputElement.dispatchEvent(keyPressEvent);

      // For the last character, also trigger an input event
      if (index === characters.length - 1) {
        const inputEvent = new Event("input", { bubbles: true });
        inputElement.dispatchEvent(inputEvent);
      }
    }, index * 500);
  });
}

inputElement.addEventListener("keypress", e => console.log(e.key));

btn.addEventListener("click", e => {
  e.preventDefault();

  const keyboardCharacters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const randomIndex = Math.floor(Math.random() * keyboardCharacters.length);
  const randomCharacter = keyboardCharacters[randomIndex];
  const randomWord = `${keyboardCharacters.slice(randomIndex, Math.floor(Math.random() * keyboardCharacters.length))}${randomCharacter}`;
  simulateTyping(randomWord);
});
