task_list = [];
class Task {
  constructor(name) {
    this.name = name;
    this.active = true;
    this.index = task_list.length;
  }
}

function localCreateElement(element_type, element_attr, inner_text) {
	inner_text = inner_text || null;

  let element = document.createElement(element_type);
	if (inner_text)
		element.innerText = inner_text;
  for (let key in element_attr) {
    element.setAttribute(key, element_attr[key]);
  }
  return element;
}

function parseUnfinished() {

}

function isChecked(node) {
	let sibling = node.parentNode.nextSibling;
	if (node.checked) {
		sibling.setAttribute("style", "text-decoration: line-through;  opacity: 0.5;")
		task_list[node.id].active = false; 
	}
	else
		sibling.setAttribute("style", "text-decoration: none; opacity: 1;")
		task_list[node.id].active = true;
}

function createNewListItem(name, index) {
  let inner_list = localCreateElement("li", { class: "todo-app__item" });

  let inner_checkbox = localCreateElement("div", { class: "todo-app__checkbox" });
  let checkbox_input = localCreateElement("input", { id: index, type: "checkbox", onclick: "isChecked(this)" });
  let checkbox_label = localCreateElement("label", { for: index });
	let textbox = localCreateElement("h1", {class: "todo-app__item-detail"}, name)
	let x_image = localCreateElement("img", {src: "./img/x.png", class: "todo-app__item-x"});

	inner_checkbox.appendChild(checkbox_input);
	inner_checkbox.appendChild(checkbox_label);
	
	inner_list.appendChild(inner_checkbox);
	inner_list.appendChild(textbox);
	inner_list.appendChild(x_image);

	return inner_list;
}

function UpdateTaskList() {
  let todo_list = document.getElementById("todo-list");
  todo_list.innerHTML = "";
  for (let i = 0; i < task_list.length; i++) {
		let inner_task = createNewListItem(task_list[i].name, i);
    // let inner_task = document.createElement("li");
    // inner_task.setAttribute("class", "todo-app__item");
    // inner_task.innerHTML =
      // '<div class="todo-app__checkbox"><input id="2" type="checkbox"><label for="2"></div>' +
    // task_list[i].name +
      // '<img src="./img/x.png" class="todo-app__item-x">';

    todo_list.appendChild(inner_task);
  }
}

function InsertTask(e) {
  if (e.keyCode === 13) {
    let input_box = document.getElementById("task-input");
    task_list.push(new Task(input_box.value));
  }
  UpdateTaskList();
}

function init() {
  let input_box = document
    .getElementById("task-input")
    .addEventListener("keyup", InsertTask);
}

init();
