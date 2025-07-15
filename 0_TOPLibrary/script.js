const myLibrary = [];

function Book(title, author, read = false) {
    let uuid = crypto.randomUUID();

    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.status = function () {
    return this.read ? "Read" : "Not read";
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
    card.dataset.uuid = book.uuid;

    card.innerHTML = `author: ${book.author} <br> title: ${book.title}`;

    const cardRemove = document.createElement("button");
    cardRemove.className = "cardRemove";
    cardRemove.innerHTML = 'Remove Book'

    cardRemove.addEventListener("click", function () {
        // usuwamy ksiazke z biblioteki
        const index = myLibrary.findIndex(function (b) {
            return b.uuid === book.uuid;
        })

        if (index !== -1) {
            myLibrary.splice(index, 1);
            card.remove();
            if ((myLibrary.length === 0)) {
                unhideNewBook();
            }

        }


    });

    const changeStatus = document.createElement('button');
    changeStatus.className = 'changeStatus';
    changeStatus.innerHTML = book.status();

    changeStatus.addEventListener("click", function () {
        book.read = !book.read;
        changeStatus.innerHTML = book.status();
    })



    card.appendChild(changeStatus);
    card.appendChild(cardRemove);
    document.body.appendChild(card);
}



addBookToLibrary('Stary', 'Hemingway');
addBookToLibrary('Poezja Wybrana', 'Milosz');

const unhideNewBook = function () {
    document.querySelectorAll('.newButton').forEach(b => b.style.display = '')
}

const removeAllButtons = function () {
    document.querySelectorAll('.showButton').forEach(button => button.style.display = 'none');
    document.querySelectorAll('.newButton').forEach(button => button.style.display = 'none');
}

const hideForm = function () {
    document.querySelectorAll('form').forEach(form => form.style.display = 'none');
}

const unhideForm = function () {
    document.querySelectorAll('form').forEach(form => form.style.display = '')
}

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {

    hideForm();
    // Use querySelector for single element or [0] to get first match
    const showButton = document.querySelector(".showButton");
    if (showButton) {
        showButton.addEventListener("click", function () {
            printLibrary();
            removeAllButtons();
        });

    }
});

const newBook = document.querySelector('.newButton');

newBook.addEventListener('click', function () {
    removeAllButtons();
    unhideForm();
})

const addBook = document.querySelector('.submitButton');
if (addBook) {
    addBook.addEventListener('click', function (e) {
        e.preventDefault(); //prevent from submission reload

        const title = document.querySelector('.title');
        const titleContent = title.value;

        const author = document.querySelector('.author');
        const authorContent = author.value;

        addBookToLibrary(titleContent, authorContent);
        hideForm();
        printLibrary();
        removeAllButtons();

    });

}