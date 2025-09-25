import { TodoList, TodoTask } from "./todo.js";
import {
    promptForNewTaskData,
    promptForNewListData,
    promptForListChoiceOrNewCreation,
    promptForListSelection,
} from "./ui.js";


export function createNewTask() {
    const taskData = promptForNewTaskData();

    try {
        const newTask = new TodoTask(
            taskData.myTitle,
            taskData.myDescription,
            taskData.myDueDate,
            taskData.myPriority,
        );
        return { success: true, data: newTask };
    } catch (error) {
        console.error("Error creating task:", error);
        return { success: false, data: error };
    }
}

export function createNewList() {
    const title = promptForNewListData();

    if (!title) {
        // return null;
        return { success: false, data: "List creation cancelled or invalid title." }
    }

    try {
        const thisNewList = new TodoList(title);
        return { success: true, data: thisNewList };
    } catch (error) {
        return { success: false, data: error.message };
    }
}

export function addTaskToList(task, list) {
    if (!task) {
        return { success: false, data: "Cannot add null or undefined task" };
    }

    try {
        list.push(task);
        // returning the updated list
        return { success: true, data: list };
    } catch (error) {
        return { success: false, data: error };
    }
}

// 2 - Zapytaj go czy chce go dodac do instniajacej listy czy stworzyc nowa
export function insertTaskIntoList(task, listContainer) {
    const choice = promptForListChoiceOrNewCreation();

    if (choice === null) {
        return { success: false, data: "No input from the user." }
    }

    if (choice === "existing") {
        const indexToInsert = promptForListSelection(listContainer);

        if (indexToInsert === null || indexToInsert === undefined ||
            indexToInsert < 0 || indexToInsert >= listContainer.getContainer().length) {
            return { success: false, data: "Invalid index." };
        }

        const chosenList = listContainer.getContainer()[indexToInsert];
        chosenList.push(task);
        return { success: true, data: `Task: ${task.title} added to List: ${chosenList.title}` }


    } else if (choice === "new") {
        const newList = createNewList();

        if (!newList.success) {
            return { success: false, data: "Failed to create new list." };
        }
        newList.push(task);
        listContainer.push(newList);
        return { success: true, data: `Task: ${task.title} added to List: ${newList.data.title}` };

    } else {
        return { success: false, data: "Failed to create new list." };
    }
}


