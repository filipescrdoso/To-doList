const pendentTasksBox = document.getElementById("pendentTasks");
const completedTasksBox = document.getElementById("completedTasks");
const addButton = document.getElementById("addButton");
const addInput = document.getElementById("create-input");

let lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
let taskObjModel = {
    description: lorem,
    status: null
};

addButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', getAllTasks);

function addTask(event) {
//actually creates a task when a new task

    event.preventDefault();
    
    if(addInput.value == "") {
        const warning = document.getElementById("warning");
        warning.style.display = "block";
    } else {
        const newTask = createTaskObj();
        warning.style.display = "none";
        buildTasks(newTask);
    }
}

function getAllTasks() {
//generates all the taks when the DOM is loaded

    if(localStorage.getItem("tasks") !== null) {
        let tasks = [];
        tasks = JSON.parse(localStorage.getItem("tasks"));

        tasks.forEach(task => {
            buildTasks(task);
        });
    }
}

function buildTasks({ description, status }) {
//builds each task when it's called

    const task = generateTask(description);

    if(status == "pendent" || status == null) {
        pendentTasksBox.appendChild(task);
    }
    else {
        completedTasksBox.appendChild(task);
        task.classList.add("completed");
    }
}

function generateTask(description) {
//creates the HTML elements that will be displayed on the page, this function is called by "buildTask()"

    const taskDiv = createElement("div", "task");
    const taskLi = createElement("li");
    taskLi.innerText = description;
    taskDiv.appendChild(taskLi);

    const divSpan = createElement("span", "task-buttons");
    const spanDeleteButton = createElement("button", "delete", "<i class='bx bx-trash'></i>");
    divSpan.appendChild(spanDeleteButton);
    const spanCheckInput = createElement("input");
    spanCheckInput.type = "checkbox";
    divSpan.appendChild(spanCheckInput);
    taskDiv.appendChild(divSpan);

    spanDeleteButton.addEventListener('click', () => {
        //function added to delete THIS task when the delete button is pressed
        deleteTaskLocal(taskDiv.children[0].innerText, taskDiv);
    })
    // spanCheckInput.addEventListener('click', () => {
    //     checkTask(taskDiv.children[0].innerText, taskDiv)
    // })

    return taskDiv;
}

function createTaskObj() {
//catchs the values from input and create a new task obj that will be used by "buildTasks()", and saved by "saveTaskLocal()"

    let desc = addInput.value;
    addInput.value = "";

    const newTask = {
        description: desc,
        status: "pendent"
    };

    saveTaskLocal(newTask);
    return newTask;
}

// function checkTask(description, taskDiv) {

//     if(localStorage.getItem("tasks") !== null) {
//         let tasks = JSON.parse(localStorage.getItem("tasks"));
        
//         tasks.forEach(task => {
//             if(task.description === description) {
                
//             }
//         });
//     }

// }

function saveTaskLocal(newTask) {
//saves the new task in local storage

    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskLocal(description, taskElement) {
//deletes the tasks from localStorage

    if(localStorage.getItem("tasks") !== null) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        
        let newTasks = tasks.filter(desc => desc.description != description)
        
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        taskElement.remove();
    }
}

function createElement(tagName, className, innerHtml) {
//creates the HTML elements

    const newEl = document.createElement(tagName);
    if(className != '') {
        newEl.classList.add(className);
    }
    if (innerHtml != null) {
        newEl.innerHTML = innerHtml;
    }

    return newEl;
}


function reset() {
    localStorage.clear();
}
