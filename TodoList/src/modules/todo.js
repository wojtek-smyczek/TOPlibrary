export class TodoTask {
    constructor(title, description, dueDate, priority, completed = false) {
        if (!title) {
            throw 'Title cant be empty';
        }
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;

        const priorityValues = ["low", "medium", "high"];

        if (!priorityValues.includes(priority)) {
            throw 'Priority must be one of: low, medium, high.';
        }
        this.priority = priority;

        this.completed = completed;

    }

    getData() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            completed: this.completed
        }
    }
}

export class TodoList {
    constructor(title) {
        this.title = title;
        this.items = [];
    }

    push(el) {
        this.items.push(el);
        return this;
    }

    remove(el) {
        const toRemove = this.items.findIndex((element) => element === el);
        if (toRemove === -1) {
            throw "Element to be removed not found";
        }
        this.items.splice(toRemove, 1);
    }

    getData() {

        return {
            title: this.title,
            items: this.items.map((el => el.getData())),
        }
    }
}

export class TodoListContainer {
    constructor() {
        this.container = [];
    }

    getContainer() {
        return this.container;
    }

    push(todoList) {
        this.container.push(todoList);
    }

    remove(todoList) {
        const toRemoveIndex = this.container.findIndex(el => el === todoList);
        this.container.splice(toRemoveIndex, 1);
    }

    clearAll() {
        this.container.length = 0;
    }

    getData() {
        return {
            lists: this.container.map(el => el.getData()),
        }
    }
}

