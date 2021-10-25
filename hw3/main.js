let task_list = [];
let former_type = "all";

class Task {
  constructor(name) {
    this.name = name;
    this.active = true;
    this.index = task_list.length;
  }
}

function LocalCreateElement(element_type, element_attr, inner_text) {
  inner_text = inner_text || null;

  let element = document.createElement(element_type);
  if (inner_text) element.innerText = inner_text;
  for (let key in element_attr) {
    element.setAttribute(key, element_attr[key]);
  }
  return element;
}

function ParseUnfinished() {
  let total = 0;
  for (let i = 0; i < task_list.length; i++) {
    if (task_list[i].active) total = total + 1;
  }
  let total_left = document.getElementsByClassName("todo-app__total")[0];
  if (total > 0) {
    total_left.innerText = total + " left(s)";
  } else if (total === 0) {
    total_left.innerText = "";
  }

  if (total < task_list.length) {
    let clear_btn = document.getElementsByClassName("todo-app__clean")[0];
    clear_btn.setAttribute("style", "display: flex;");
  } else {
    let clear_btn = document.getElementsByClassName("todo-app__clean")[0];
    clear_btn.setAttribute("style", "display: none;");
  }
}

function isChecked(node) {
  let sibling = node.parentNode.nextSibling;
  if (node.checked) {
    sibling.setAttribute(
      "style",
      "text-decoration: line-through;  opacity: 0.5;"
    );
    task_list[node.id].active = false;
  } else {
    sibling.setAttribute("style", "text-decoration: none; opacity: 1;");
    task_list[node.id].active = true;
  }
  ParseUnfinished();
}

function CreateNewListItem(name, index, status) {
  let inner_list = LocalCreateElement("li", { class: "todo-app__item" });

  let inner_checkbox = LocalCreateElement("div", {
    class: "todo-app__checkbox",
  });
  let checkbox_input = LocalCreateElement("input", {
    id: index,
    type: "checkbox",
    onclick: "isChecked(this)",
  });
  let checkbox_label = LocalCreateElement("label", { for: index });
  let textbox = LocalCreateElement(
    "h1",
    { class: "todo-app__item-detail" },
    name
  );
  let x_image = LocalCreateElement("img", {
    src: "./img/x.png",
    class: "todo-app__item-x",
    onclick: "DeleteTask(this)",
  });

  inner_checkbox.appendChild(checkbox_input);
  inner_checkbox.appendChild(checkbox_label);

  inner_list.appendChild(inner_checkbox);
  inner_list.appendChild(textbox);
  inner_list.appendChild(x_image);
  if (!status) checkbox_input.click();

  return inner_list;
}

function UpdateTaskList(type) {
  former_type = type;
  let todo_list = document.getElementById("todo-list");
  todo_list.innerHTML = "";
  for (let i = 0; i < task_list.length; i++) {
    let inner_task = CreateNewListItem(
      task_list[i].name,
      i,
      task_list[i].active
    );
    if (type === "all") {
      todo_list.appendChild(inner_task);
    } else if (type === "completed") {
      if (!task_list[i].active) todo_list.appendChild(inner_task);
    } else if (type === "active") {
      if (task_list[i].active) todo_list.appendChild(inner_task);
    }
  }
  let footer = document.getElementById("todo-footer");
  if (task_list.length === 0) {
    footer.setAttribute("style", "display: none;");
  } else {
    footer.setAttribute("style", "display: flex;");
  }
  let btn_list = document.getElementsByTagName("button");
  for (let i = 0; i < btn_list.length; i++) {
    // console.log(btn_list[i].innerText + "\n\n")
    let parent = btn_list[i].parentNode;
    // console.log(parent);
    if (type === btn_list[i].innerText.toLowerCase()) {
      btn_list[i].setAttribute("style", "border: 1px solid black;");
    } else {
      btn_list[i].setAttribute("style", "border: none;");
    }
  }
  ParseUnfinished();
}

function InsertTask(e) {
  if (e.keyCode === 13) {
    let input_box = document.getElementById("task-input");
    task_list.push(new Task(input_box.value));
		input_box.value="";
  }

  UpdateTaskList(former_type);
}

function DeleteTask(sign) {
  let parent = sign.parentNode;
  task_list.splice(parent.id, 1);
  UpdateTaskList(former_type);
}

function ClearCompleted() {
  task_list = task_list.filter(function (value) {
    return value.active === true;
  });
  UpdateTaskList(former_type);
}

function init() {
  let input_box = document
    .getElementById("task-input")
    .addEventListener("keyup", InsertTask);
  let footer = document.getElementById("todo-footer");
  footer.setAttribute("style", "display: none;");
}

init();
