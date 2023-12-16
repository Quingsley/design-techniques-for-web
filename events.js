const eventTarget = document.getElementById("test-event");

const myEvent = new Event("build");

eventTarget.addEventListener("build", e => {
  console.log(e);
});

eventTarget.dispatchEvent(myEvent);

// with some data
const eventTarget1 = document.getElementById("element1");
const myEvent1 = new CustomEvent("build1", { detail: eventTarget1.dataset.time });

eventTarget1.addEventListener("build1", e => {
  console.log(e.detail);
});

eventTarget1.dispatchEvent(myEvent1);

//demo
const form = document.querySelector("form");
const textArea = document.querySelector("textarea");

const someEvent = new CustomEvent("someEvent", {
  bubbles: true,
  detail: {
    text: () => textArea.value,
  },
});

form.addEventListener("someEvent", e => {
  console.log(e.detail.text().length);

  //show a red border radius on the textarea if length < 10
  if (e.detail.text().length < 10) {
    textArea.style.borderRadius = "5px";
    textArea.style.border = "2px solid red";
  }
});

textArea.addEventListener("input", e => e.target.dispatchEvent(someEvent));
