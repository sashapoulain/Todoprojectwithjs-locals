window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listElement = document.querySelector("#tasks");

    form.addEventListener("submit", (e) => {
        const task = input.value.trim();
        if (task === "") {
            alert("Please enter a task");
            return;
        } else {
            // console.log("Task added");
            console.log(task);
            addtodos(task);
        }

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        //taskEl = taskDiv
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        //taskContentEl = contentDiv
        taskDiv.appendChild(contentDiv);
        listElement.appendChild(taskDiv);

        const contentInput = document.createElement("input");
        contentInput.classList.add("text");
        contentInput.type = "text";
        contentInput.value = task;
        input.value = "";
        contentDiv.setAttribute("readonly", "readonly");
        contentDiv.appendChild(contentInput);

        const actionsDiv = document.createElement("div");

        actionsDiv.classList.add("actions");
        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = "Edit";
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = "Delete";
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        taskDiv.appendChild(actionsDiv);

        //delete and edit button
        editButton.addEventListener("click", () => {
            if (editButton.innerText.toLowerCase() === "edit") {
                contentInput.removeAttribute("readonly");
                contentInput.focus();
                editButton.innerText = "Save";
            } else {
                contentInput.setAttribute("readonly", "readonly");
                editButton.innerText = "Edit";
            }
        });

        deleteButton.addEventListener("click", () => {
            if (confirm("Emin misin?")) {
                taskDiv.remove();
            }
        });
        e.preventDefault();
    });

    function addTasksToLocal() {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        return tasks;
    }

    function addtodos(task) {
        const tasks = addTasksToLocal();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});