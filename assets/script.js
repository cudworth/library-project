

function appendChildren(element, children){
    children.forEach(child => element.appendChild(child));
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if (this.read) {
            const read = 'has been read'
        } else {
            const read = 'not yet read'
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`
    }
}

Book.prototype.update = function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    display.render();
}


function removeFromLibrary(index) {
    myLibrary.splice(index, 1);
    
    display.render();
}

function toggleReadStatus(index) {
    if (myLibrary[index].read){
        myLibrary[index].read = false;
    } else {
        myLibrary[index].read = true;
    }

    display.render();
}

function Display(){
    this.node;
    this.library;
}

Display.prototype.render = function () {
    node = this.node;
    node.innerHTML = '';

    const new_book_button = document.createElement('button');
    new_book_button.textContent = 'NEW BOOK'
    new_book_button.addEventListener('click', e => console.log(e));

    this.node.appendChild(new_book_button);
    
    this.library.forEach(function(e, index){
        div = document.createElement('div');
        div.id = `${index}`;
        div.className = 'card'

        const read_button = document.createElement('button')
        read_button.textContent = 'READ/UNREAD';
        read_button.addEventListener('click', e => toggleReadStatus(e.target.parentNode.id));

        const remove_button = document.createElement('button');
        remove_button.textContent = 'REMOVE';
        remove_button.addEventListener('click', e => removeFromLibrary(e.target.parentNode.id));

        const span = document.createElement('span');

        (e.read)? read = 'Read' : read = 'Not Read';
        span.textContent = `Title: ${e.title}, Author: ${e.author}, Pages: ${e.pages}, ${read}`;

        appendChildren(div, [read_button, remove_button, span]);
        node.appendChild(div);
    })
}


let myLibrary = [];

myLibrary.push(new Book('The Lord of the Rings', 'J.R.R. Tolkien', 40000, true));
myLibrary.push(new Book('For Whom the Bell Tolls','Ernest Hemingway', 12, false));
myLibrary.push(new Book('A River Runs Through It','Norman Maclean', 200, true));

display = new Display;
display.node = document.querySelector('body');
display.library = myLibrary;
display.render();

