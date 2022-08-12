const add = document.querySelector(".add__button");
const content = document.querySelector(".task__content");
const task = document.querySelector(".add__task");
const counter = document.querySelector(".counter");
const clear = document.querySelector(".info__clear");
const taskText = document.querySelector(".task__text");
let count = 0;

counter.textContent = 0;

function handKeyPress(event) {
  if (event.code == "Enter") {
    addTask();
  }
}

function addTask() {
  if (task.value.trim() == "") return;
  createDelateElement(task.value);
  task.value = "";
  taskText.style.display = "none";
}

add.onclick = addTask;

//create and delate todo
function createDelateElement(value) {
  count++;
  const div = document.createElement("li");
  const btn = document.createElement("button");
  div.classList.add("tasks");
  div.textContent = value;
  content.appendChild(div);
  btn.classList.add("del");
  btn.textContent = "X";
  div.appendChild(btn);

  //delete todo
  btn.addEventListener("click", (e) => {
    count--;
    counter.textContent = count;
    div.remove();
    if (count == 0) {
      taskText.style.display = "block";
    }
  });

  //togle class active
  div.addEventListener("click", (e) => {
    div.classList.toggle("active");
  });
  counter.textContent = count;

  //dra & dropp
  if (content.children.length > 0) {
    const taskElements = content.querySelectorAll(".tasks");

    for (const task of taskElements) {
      task.draggable = true;
    }

    content.addEventListener(`dragstart`, (evt) => {
      evt.target.classList.add(`selected`);
    });

    content.addEventListener(`dragend`, (evt) => {
      evt.target.classList.remove(`selected`);
    });

    const getNextElement = (cursorPosition, currentElement) => {
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter =
        currentElementCoord.y + currentElementCoord.height / 2;
      const nextElement =
        cursorPosition < currentElementCenter
          ? currentElement
          : currentElement.nextElementSibling;
      return nextElement;
    };

    content.addEventListener("dragover", (evt) => {
      evt.preventDefault();

      const activeElement = content.querySelector(".selected");
      const currentElement = evt.target;

      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains("tasks");
      if (!isMoveable) {
        return;
      }

      const nextElement = getNextElement(evt.clientY, currentElement);

      if (
        (nextElement && activeElement === nextElement.previousElementSibling) ||
        activeElement === nextElement
      ) {
        return;
      }

      content.insertBefore(activeElement, nextElement);
    });
  }
}

//delete all todo
clear.addEventListener("click", (e) => {
  content.textContent = "";
  count = 0;
  counter.textContent = count;
  taskText.style.display = "block";
});
