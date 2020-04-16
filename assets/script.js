let myLibrary = [];

addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', 40000, true);
addBookToLibrary('For Whom the Bell Tolls','Ernest Hemingway', 12, false);
addBookToLibrary('A River Runs Through It','Norman Maclean', 200, true)

render()

function appendChildren(element, children){
    children.forEach(child => element.appendChild(child));
}

function Book(title, author, pages, read) {
    this.title
    this.author
    this.pages
    this.read
    this.info = function(){
        if (this.read) {
            const read = 'has been read'
        } else {
            const read = 'not yet read'
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`
    }
}

function addBookToLibrary(title, author, pages, read) {
    book = new Book()
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    render();
}

function render() {
    const body = document.querySelector('body');
    body.innerHTML = '';

    const new_book_button = document.createElement('button');
    new_book_button.textContent = 'NEW BOOK'
    new_book_button.addEventListener('click', e => console.log(e));

    body.appendChild(new_book_button);
    
    myLibrary.forEach(function(e, index){
        div = document.createElement('div');
        div.id = `${index}`;
        div.className = 'card'

        const read_button = document.createElement('button')
        read_button.textContent = 'READ/UNREAD';
        read_button.addEventListener('click', e => console.log('read btn pressed'));

        const remove_button = document.createElement('button');
        remove_button.textContent = 'REMOVE';
        remove_button.addEventListener('click', e => removeBookFromLibrary(e.target.parentNode.id));

        const span = document.createElement('span')
        span.textContent = `Title: ${e.title}, Author: ${e.author}, Pages: ${e.pages}`;

        appendChildren(div, [read_button, remove_button, span]);
        body.appendChild(div);
    })
}
