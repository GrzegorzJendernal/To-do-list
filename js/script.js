{
    const helloWorld = () => {
        console.log("Hej! Życzę miłego sprawdzania mojej pracy domowej. :)");
    };

    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-taskRemove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-taskDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
    <li class="list__task">
    <button class="list__button js-taskDone">${task.done ? "✔" : ""}</button>
    <span${task.done ? " class=\"list__task--done\"" : ""}>${task.content}</span>
    <button class="list__button list__button--remove js-taskRemove">🗑</button>
    </li>`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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