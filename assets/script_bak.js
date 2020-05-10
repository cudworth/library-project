

function appendChildren(element, children){
    children.forEach(child => element.appendChild(child));
}


Book.prototype.update = function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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

function Library(){
    this.node = document.createElement('div');
    this.new_book_form = document.createElement('form');
    this.card_display = document.createElement('div');
    this.


    this.library;
}

Display.prototype.render = function () {
    node = this.node;
    node.innerHTML = '';

    const new_book_button = document.createElement('button');
    new_book_button.textContent = 'NEW BOOK'
    new_book_button.addEventListener('click', e => form.render());

    node.appendChild(new_book_button);
    
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


function Form(){
    this.node = document.createElement('form');

    this.fields = {
        title: 'text',
        author: 'text',
        pages: 'text',
        read: 'checkbox'
    };
}

Form.prototype.render = function(){
    
    const node = this.node;
    const fields = this.fields;
    node.innerHTML = '';

    const ul  = document.createElement('ul');
    node.appendChild(ul);

    Object.keys(fields).forEach(function(key) {

        const li = document.createElement('li');
        ul.appendChild(li);

        const label = document.createElement('label');
        li.appendChild(label);

        const input = document.createElement('input');
        li.appendChild(input);

        const id = `form_${key}`;

        label.textContent = `${key}: `;
        label.setAttribute('for', id);

        input.id = id;
        input.name = key;
        input.type = fields[key];
    });

    const button = document.createElement('button');
    button.textContent = 'SUBMIT';
    button.type = 'button';
    button.addEventListener('click', e => this.read());
    node.appendChild(button);
    
}

Form.prototype.read = function(){
    const fields = this.fields;

    const book = new Book();
    myLibrary.unshift(book);

    Object.keys(fields).forEach(function(key){
        const input = document.getElementById(`form_${key}`);
        if (fields[key] == 'text'){
            book[key] = input.value;
        } else {
            book[key] = input.checked;
        };
    });

    this.node.innerHTML = '';
    display.render();
}


let myLibrary = [];

const book1 = new Book();
const book2 = new Book();
book1.update('The Lord of the Rings', 'J.R.R. Tolkien', 40000, true);
book2.update('For Whom the Bell Tolls','Ernest Hemingway', 12, false);
myLibrary.push(book1);
myLibrary.push(book2);

console.log(myLibrary);

form = new Form;
display = new Display;

const body = document.querySelector('body')

body.appendChild(form.node);
body.appendChild(display.node);

display.library = myLibrary;
display.render();