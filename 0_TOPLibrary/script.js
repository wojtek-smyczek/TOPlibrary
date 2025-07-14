const myLibrary = [];

function Book(title, author, read = false) {
    let uuid = crypto.randomUUID();

    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.read = read;


}

function addBookToLibrary(title, author, read = false) {

    const book = new Book(title, author, read);

    myLibrary.push(book);
}

function printLibrary() {
    // Clear existing cards first to avoid duplicates
    document.querySelectorAll('.card').forEach(card => card.remove());

    myLibrary.forEach((book) => createCard(book));
}

function createCard(book) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `author: ${book.author} <br> title: ${book.title}`;

    document.body.appendChild(card);
}

addBookToLibrary('Stary', 'Hemingway');
addBookToLibrary('Poezja Wybrana', 'Milosz');

addBookToLibrary('Stary', 'Hemingway');
addBookToLibrary('Poezja Wybrana', 'Milosz');

addBookToLibrary('Stary', 'Hemingway');
addBookToLibrary('Poezja Wybrana', 'Milosz');

addBookToLibrary('Stary', 'Hemingway');
addBookToLibrary('Poezja Wybrana', 'Milosz');



// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Use querySelector for single element or [0] to get first match
    const showButton = document.querySelector(".showButton");
    if (showButton) {
        showButton.addEventListener("click", function () {
            printLibrary();
            document.querySelector('.showButton').remove();
        });

    }
});

// const showButton = document.getElementsByClassName("showButton");
// showButton.addEventListener("click", () => { printLibrary() })