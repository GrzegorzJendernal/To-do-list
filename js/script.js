{
    const helloWorld = () => {
        console.log("Hej! Życzę miłego sprawdzania mojej pracy domowej. :)");
    };

    let tasks = [];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleHideDone = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const bindDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-taskDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-taskRemove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindButtonEvents = () => {
        const hideDone = document.querySelector(".js-hideDoneTasks");
        const doneAll = document.querySelector(".js-doneAll");

        if (hideDone) {
            hideDone.addEventListener("click", toggleHideDone);
        };

        if (doneAll) {
            doneAll.addEventListener("click", markAllDone);
        };
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__task${task.done && hideDoneTasks ? " list__task--hidden" : ""}">
                <button class="list__button list__button--done js-taskDone">${task.done ? "✔" : ""}</button>
                <span${task.done ? " class=\"list__task--done\"" : ""}>${task.content}</span>
                <button class="list__button list__button--remove js-taskRemove">🗑</button>
             </li>`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "";
        if (tasks.length > 0) {
            htmlButtons += `
            <button class="main__button js-hideDoneTasks">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button> 
            <button class="main__button js-doneAll" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
        };
        document.querySelector(".js-buttons").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindDoneEvents();
        bindButtonEvents();
    };

    const resetInput = (inputElement) => {
        inputElement.value = "";
        inputElement.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        const inputElement = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            resetInput(inputElement);
            return;
        };

        addNewTask(newTaskContent);
        resetInput(inputElement);
    };

    const init = () => {
        helloWorld();

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}