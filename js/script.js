{
    const helloWorld = () => {
        console.log("Hej! Życzę miłego sprawdzania mojej pracy domowej. :)");
    };

    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
    <li
    ${task.done ? "class=\"list__taskDone\"" : ""}
    >
    <button class="list__button js-taskDone">✔</button>
    ${task.content}
    <button class="list__button list__button--remove js-taskRemove">🗑</button>
    </li>`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        helloWorld();

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}