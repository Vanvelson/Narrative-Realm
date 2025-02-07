const booksContainer = document.getElementById('books');
const addButton = document.getElementById('add-btn');
const titleInput = document.getElementById('book-title');
const descInput = document.getElementById('book-desc');

let books = [];

function renderBooks() {
  booksContainer.innerHTML = '';
  books.forEach((book, index) => {
    const bookItem = document.createElement('li');
    bookItem.className = 'book-item';

    const bookDetails = document.createElement('span');
    bookDetails.innerHTML = `<strong>${book.title}:</strong> ${book.description}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editBook(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteBook(index);

    const switchBtn = document.createElement('button');
    switchBtn.textContent = 'Switch';
    switchBtn.className = 'switch';
    switchBtn.onclick = () => switchBook(index);

    bookItem.appendChild(bookDetails);
    bookItem.appendChild(editBtn);
    bookItem.appendChild(deleteBtn);
    bookItem.appendChild(switchBtn);

    booksContainer.appendChild(bookItem);
  });
}

function addBook() {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title && description) {
    books.push({ title, description });
    titleInput.value = '';
    descInput.value = '';
    renderBooks();
  } else {
    alert('Please enter both a title and description.');
  }
}

function editBook(index) {
  const book = books[index];
  const newTitle = prompt('Edit Title:', book.title);
  const newDescription = prompt('Edit Description:', book.description);

  if (newTitle !== null && newDescription !== null) {
    books[index] = { title: newTitle.trim(), description: newDescription.trim() };
    renderBooks();
  }
}

function deleteBook(index) {
  books.splice(index, 1);
  renderBooks();
}

function switchBook(index) {
  if (index < books.length - 1) {
    [books[index], books[index + 1]] = [books[index + 1], books[index]];
    renderBooks();
  } else {
    alert('This book is already the last in the list.');
  }
}

addButton.addEventListener('click', addBook);