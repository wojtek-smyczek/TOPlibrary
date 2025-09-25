import { myTodoListContainer } from "../index.js";
import { TodoTask, TodoList, TodoListContainer } from "./todo.js"
import { formatDistance, subDays } from "date-fns";
import { storageService } from "./storage.js";

export function pickAction() {
    const pick = prompt(
        "What do you want to do? \n 1 - Create new list \n 2 - Create new task \n 3 - Show all lists \n 4 - Delete all lists \n 5 - Exit"
    )

    const validInput = ['1', '2', '3', '4', '5'];
    if (!validInput.includes(pick)) {
        return null;
    }

    return parseInt(pick);
}

export function promptForNewTaskData() {
    const myTitle = prompt("Task title: ");
    const myDescription = prompt("Task description: ");
    const myDueDate = prompt("Due date: ");
    const myPriority = prompt("Task priority: ");

    return { myTitle, myDescription, myDueDate, myPriority };
}

export function promptForNewListData() {
    const title = prompt("New list: title.");

    if (title === null) {
        return null;
    }

    return title;
}

export function printNewTaskData(task) {
    const taskData = task.getData();

    if (!taskData) {
        console.log("No task data to show.");
        return;
    }
    console.log("---Task Details---");
    console.log(taskData.title);
    console.log(taskData.description);
    console.log(taskData.dueDate);
    console.log(taskData.priority);
}

export function promptForListChoiceOrNewCreation() {
    const choice = prompt("Press 1 if you want to pick existing list to insert your new todo. Press 2 if you want to create a new list.");

    if (choice === "1") {
        return "existing";
    } else if (choice === "2") {
        return "new";
    } else {
        return null;
    }
}

export function printAllList(listContainer) {
    const containerData = listContainer.getContainer();
    let output = "===Showing All Lists=== \n";

    if (containerData.length === 0) {
        output += "No lists available.";
        return { success: false, data: output };
    }

    containerData.forEach((list, index) => {
        output += `List: ${index + 1} \n`;
        output += `List - Title: ${list.title} \n`;
    })

    return { success: true, data: output };
}
// funkcja zwracajaca index elementu ktory chcemy wybrac
export function promptForListSelection(listContainer) {
    const myListContainer = listContainer.getContainer();
    if (myListContainer.length === 0) return null;


    myListContainer.forEach((list, index) => {
        alert(`${index + 1}. ${list.title}`);
    })

    const choice = prompt("Type the number of the list you want to select");
    const index = parseInt(choice) - 1;

    return index >= 0 && index < myListContainer.length ? index : null;
}





