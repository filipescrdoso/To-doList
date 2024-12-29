const pendentTasksBox = document.getElementById("pendentTasks");
const completedTasksBox = document.getElementById("completedTasks");
const addButton = document.getElementById("addButton");
const addInput = document.getElementById("create-input");

addButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', getAllTasks);

function addTask(event) {
//function that actually adds the whole task to the screen when a new one is submitted by the input

    event.preventDefault();
    const warning = document.getElementById("warning");
    let error = false;
    let localTasks;

    if(localStorage.getItem("tasks") != null) {
        localTasks = JSON.parse(localStorage.getItem("tasks"));
        
        localTasks.forEach(task => {
            //prevents the user from creating a task with the same description, which could cause inconvenient errors
            if(addInput.value == task.description) {
                warning.innerText = "A task with this description already exists!"
                warning.style.display = "block";
                error = true;
            }
        })
    }

    if(addInput.value == "") {
    //prevents to add a task without description
        warning.innerText = "This field cannot be empty!"
        warning.style.display = "block";
        error = true;
    }

    if(error !== true) {
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
    const taskParagraph = createElement("p");
    taskParagraph.innerText = description;
    taskDiv.appendChild(taskParagraph);

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
    spanCheckInput.addEventListener('click', () => {
        checkTask(taskDiv.children[0].innerText, taskDiv)
    })

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

function checkTask(description, taskElement) {
//checks and updates the status from a tasks in localStorage

    if(localStorage.getItem("tasks") !== null) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        
        let newTask;
        tasks.forEach(task => {
            if(task.description === description) {
                newTask = task;
                newTask.status = task.status === "pendent" ? "completed" : "pendent";
            }
        });

        deleteTaskLocal(description, taskElement);
        saveTaskLocal(newTask);
        buildTasks(newTask);
    }

}

function saveTaskLocal(newTask) {
//saves a new task in localStorage

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
//deletes a tasks from localStorage

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
