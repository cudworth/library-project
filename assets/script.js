function Book(){
    this.fields = {title: 'text',
                    author: 'text',
                    pages: 'text',
                    read: 'checkbox'};
    this.set = function(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


Book.prototype.render = function(parent_node, display){   
    const toggle_btn = document.createElement('button')
    toggle_btn.textContent = 'TOGGLE READ';
    toggle_btn.addEventListener('click', () => this.toggleRead(display));

    const span = document.createElement('span');
    span.textContent = `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.read}`;

    parent_node.append(toggle_btn, span);
}


Book.prototype.toggleRead = function(display){
    (this.read)? this.read = false : this.read = true;
    display.render();

    localStorage.setItem('library', JSON.stringify(myLibrary));
}


function Library(){
    this.display = document.createElement('div');
    this.booklist = [];
    this.setParentNode = function(parent_node){
        this.parent_node = parent_node;
        this.parent_node.append(this.display);
    }
}

Library.prototype.render = function(){
    const library = this;
    const display = this.display;
    
    this.display.innerHTML = '';
    
    const new_btn = document.createElement('button');
    new_btn.textContent = 'NEW BOOK';
    new_btn.addEventListener('click', () => this.createForm());
    this.display.append(new_btn);

    this.booklist.forEach(function(book){

        const div = document.createElement('div');
        div.id = book;
        div.className = 'card';
        display.append(div);

        const remove_btn = document.createElement('button');
        remove_btn.textContent = 'REMOVE';
        remove_btn.addEventListener('click', () => library.remove(book));
        div.append(remove_btn);

        book.render(div, library);
    });
};


Library.prototype.createForm = function(){
    if(this.form){this.form.remove();};
    this.form = document.createElement('form');
    this.parent_node.insertBefore(this.form, this.display);
    
    const book = new Book(); //DUMMY BOOK TO OBTAIN FIELDS DATA

    const ul  = document.createElement('ul');

    const submit_btn = document.createElement('button');
    submit_btn.textContent = 'SUBMIT';
    submit_btn.type = 'button';
    submit_btn.addEventListener('click', e => this.add());

    this.form.append(ul, submit_btn);

    Object.keys(book.fields).forEach(function(key) {
        const li = document.createElement('li');
        ul.append(li);

        const label = document.createElement('label');
        const input = document.createElement('input');
        li.append(label, input);

        const id = `form_${key}`;

        label.textContent = `${key}: `;
        label.setAttribute('for', id);

        input.id = id;
        input.name = key;
        input.type = book.fields[key];
    });
};


Library.prototype.remove = function(book){
    const index = this.booklist.indexOf(book);
    this.booklist.splice(index, 1);
    this.render();

    localStorage.setItem('library', JSON.stringify(myLibrary));
}


Library.prototype.add = function(){
    const book = new Book;

    Object.keys(book.fields).forEach(function(key){
        const input = document.getElementById(`form_${key}`);
        switch (book.fields[key]){
            case 'text':
                book[key] = input.value;
                break;
            case 'checkbox':
                book[key] = input.checked;
                break;
        }
    });

    this.form.remove();
    this.booklist.unshift(book);
    this.render();

    localStorage.setItem('library', JSON.stringify(myLibrary));
}


function importLibrary () {
    const new_library = new Library();
    const library = JSON.parse(localStorage.getItem('library'));
    library.booklist.forEach(function(book){
        const new_book = new Book();
        new_book.set(book.title, book.author, book.pages, book.read);
        new_library.booklist.push(new_book);
    })
    return new_library;
}



let myLibrary;

if (localStorage.getItem('library')) {
    myLibrary = importLibrary();
    myLibrary.setParentNode(document.querySelector('body'));
    myLibrary.render();
} else {
    myLibrary = new Library();
    myLibrary.setParentNode(document.querySelector('body'));
    myLibrary.render();
}
