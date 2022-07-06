//genel div card
const card = document.querySelector(".card.row");
//cardın altındaki ilk card-body
const cardBody1 = document.querySelectorAll(".card-body")[0];
//cardın altındaki ikinci card-body
const cardBody2 = document.querySelectorAll(".card-body")[1];
//form id: todo-form
const form = document.querySelector("#todo-form");
//formun içindeki input
const formInput = document.querySelector("#todo");
//todoekleyinbutonu
const button = document.querySelector(".btn.btn-danger");
//cardbody2 nin içindeki input
const filterInput = document.querySelector("#filter");
//cardbody2 nin içindeki ul
const ulList = document.querySelector(".list-group");
//cardbody2 nin içindeki tüm taskları temizle a sı
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  cardBody2.addEventListener("click", deleteTodo);
  filterInput.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm("Hepsini silicem. Emin misin?")) {
    while (ulList.firstElementChild != null) {
      ulList.removeChild(ulList.firstElementChild);
    }
    localStorage.removeItem("todos");
  } else {
    alert("hufflepuff then");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach((listItem) => {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromLocalStorage(
      e.target.parentElement.parentElement.textContent
    );
    showAlert("info", "Todo silindi...");
  }
}

function deleteTodoFromLocalStorage(deletetodo) {
  let todos = getTodoToLocalStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodoToLocalStorage();

  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = formInput.value.trim();
  formInput.value = "";

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin...");
  } else {
    addTodoToUI(newTodo);
    addTodoToLocalStorage(newTodo);
    showAlert("success", "Todo başarıyla eklendi...");
  }

  e.preventDefault();
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  cardBody1.appendChild(alert);
  setTimeout(function () {
    alert.remove();
  }, 2000);
}

function addTodoToUI(newTodo) {
  const liList = document.createElement("li");
  liList.className = "list-group-item d-flex justify-content-between";
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  liList.appendChild(document.createTextNode(newTodo));
  liList.appendChild(link);
  ulList.appendChild(liList);
}

function getTodoToLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToLocalStorage(newTodo) {
  todos = getTodoToLocalStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
