class Book {
    constructor(title, author, read = false) {
        this.uuid = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.read = read;
    }

    status() {
        return this.read ? "Read" : "Not read";
    }

    toggleRead() {
        this.read = !this.read;
        return this.status();
    }
}

class LibraryUI {
    constructor(library) {
        this.library = library;
        this.initEventListeners();
        this.hideForm();
    }

    initEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const showButton = document.querySelector(".showButton");
            if (showButton) {
                showButton.addEventListener("click", () => {
                    this.printLibrary();
                    this.removeAllButtons();
                });
            }

            const newBookButton = document.querySelector('.newButton');
            if (newBookButton) {
                newBookButton.addEventListener('click', () => {
                    this.removeAllButtons();
                    this.unhideForm();
                });
            }

            const addBookButton = document.querySelector('.submitButton');
            if (addBookButton) {
                addBookButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleAddBook();
                });
            }
        });
    }

    handleAddBook() {
        const title = document.querySelector('.title').value;
        const author = document.querySelector('.author').value;

        if (title && author) {
            const book = new Book(title, author);
            this.library.addBook(book);
            this.hideForm();
            this.printLibrary();
            this.removeAllButtons();
        }
    }

    createCard(book) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.uuid = book.uuid;

        card.innerHTML = `author: ${book.author} <br> title: ${book.title}`;

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.className = "cardRemove";
        removeButton.textContent = 'Remove Book';

        removeButton.addEventListener("click", () => {
            this.library.removeBook(book.uuid);
            card.remove();
            if (this.library.books.length === 0) {
                this.unhideNewBook();
            }
        });

        // Status button
        const statusButton = document.createElement('button');
        statusButton.className = 'changeStatus';
        statusButton.textContent = book.status();

        statusButton.addEventListener("click", () => {
            statusButton.textContent = book.toggleRead();
        });

        card.appendChild(statusButton);
        card.appendChild(removeButton);
        document.body.appendChild(card);
    }

    printLibrary() {
        // Clear existing cards first to avoid duplicates
        document.querySelectorAll('.card').forEach(card => card.remove());
        this.library.books.forEach(book => this.createCard(book));
    }

    unhideNewBook() {
        document.querySelectorAll('.newButton').forEach(b => b.style.display = '');
    }

    removeAllButtons() {
        document.querySelectorAll('.showButton').forEach(button => button.style.display = 'none');
        document.querySelectorAll('.newButton').forEach(button => button.style.display = 'none');
    }

    hideForm() {
        document.querySelectorAll('form').forEach(form => form.style.display = 'none');
    }

    unhideForm() {
        document.querySelectorAll('form').forEach(form => form.style.display = '');
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(uuid) {
        this.books = this.books.filter(book => book.uuid !== uuid);
    }
}


const library = new Library();
const libraryUI = new LibraryUI(library);

// Add some initial books
// library.addBook(new Book('Stary', 'Hemingway'));
// library.addBook(new Book('Poezja Wybrana', 'Milosz'));