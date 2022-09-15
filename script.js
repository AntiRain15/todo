//elems
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todoInput = todoForm.querySelector("input");

//vars
let toDos = [];
const TODOS_KEY = "todos";

//funcs
function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
    li.remove();
    saveTodos();
}

function todoFormSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    };
    toDos.push(newTodoObj);
    makeTodo(newTodoObj);
    saveTodos();
}

function makeTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

//codes
todoForm.addEventListener("submit", todoFormSubmit);
const savedTodoArr = localStorage.getItem(TODOS_KEY);
if (savedTodoArr !== null){
    const parsedTodos = JSON.parse(savedTodoArr);
    toDos = parsedTodos;
    parsedTodos.forEach(makeTodo);
}