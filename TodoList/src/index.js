import './styles.css';
import { createDefaultTodo, createNewTodo, TodoList, TodoTask, TodoListContainer } from "./modules/todo.js";
import { createNewList, createNewTask, insertTaskIntoList } from "./modules/todoService.js"
import { pickAction, promptForListChoice, promptForListChoiceOrNewCreation, promptForListSelection, printAllList } from "./modules/ui.js";
import { storageService } from "./modules/storage.js";

export const myTodoListContainer = new TodoListContainer;


// 1 - Zapytaj uzytkownika co chce zrobic
function main() {
    let shouldContinue = true;
    const savedData = storageService.getData();
    if (savedData) {
        alert(`Projects and todos: ${JSON.stringify(savedData, null, 2)}`);
    }

    while (shouldContinue) {
        const initialChoice = pickAction();

        storageService.getData();

        switch (initialChoice) {
            case 1:
                const newList = createNewList();

                myTodoListContainer.push(newList.data);
                storageService.saveData(myTodoListContainer.getData());

                const newListTitle = newList.data.getData().title;
                alert(`Created list: ${newListTitle}`);
                break;
            case 2:
                const newTask = createNewTask();

                if (newTask.data === null) {
                    throw new Error("Unable to create new task.");
                }

                insertTaskIntoList(newTask.data, myTodoListContainer);
                storageService.saveData(myTodoListContainer.getData());
                break;
            case 3:

                const printAllListOutput = printAllList(myTodoListContainer);

                alert(printAllListOutput.data);
                break;
            case 4:
                // Ask for confirmation

                const confirmDelete = confirm("Are you sure you want to delete ALL lists? This cannot be undone!");

                if (confirmDelete) {
                    // Clear from storage
                    storageService.deleteData();

                    // Clear from memory
                    myTodoListContainer.clearAll();

                    alert("All lists have been deleted!");
                } else {
                    alert("Deletion cancelled.");
                }
                break;

            case 5:

                shouldContinue = false;

                break;

            default:
                console.log("Invalid option or no option selected.");
                break;
        }
    }
}

// main(); 