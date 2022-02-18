function addBook(book) {
  const bookElement = document.createElement("li");
  bookElement.classList.add("book-item");
  bookElement.id = book.id;

  const bookTitleElement = document.createElement("h3");
  bookTitleElement.textContent = book.title;

  const bookAuthorElement = document.createElement("p");
  bookAuthorElement.textContent = "Penulis: " + book.author;

  const bookYearElement = document.createElement("p");
  bookYearElement.textContent = "Tahun: " + book.year;

  const actionElementHTML =
    '<div class="action">' +
    '<button class="action-btn move-btn btn success">' +
    '<img src="icons/' +
    (book.isComplete ? "open-book-50.png" : "book-50.png") +
    '" alt="move-book" class="icon icon--invert" />' +
    (book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca") +
    "</button>" +
    '<button class="action-btn edit-btn btn">' +
    '<img src="icons/edit-50.png" alt="edit-book" class="icon icon--invert" />' +
    "Edit" +
    "</button>" +
    '<button class="action-btn delete-btn btn danger">' +
    '<img src="icons/trash-50.png" alt="delete-book" class="icon icon--invert" />' +
    "Hapus" +
    "</button>" +
    "</div>";

  bookElement.appendChild(bookTitleElement);
  bookElement.appendChild(bookAuthorElement);
  bookElement.appendChild(bookYearElement);
  bookElement.innerHTML += actionElementHTML;

  if (book.isComplete) {
    completeShelf.appendChild(bookElement);
  } else {
    incompleteShelf.appendChild(bookElement);
  }
}

function deleteBook(bookElement) {
  const shelf = bookElement.parentElement;
  shelf.removeChild(bookElement);
}

function updateBook(bookElement, newBook) {
  const titleElement = bookElement.children[0];
  const authorElement = bookElement.children[1];
  const yearElement = bookElement.children[2];

  titleElement.textContent = newBook.title;
  authorElement.textContent = "Penulis: " + newBook.author;
  yearElement.textContent = "Tahun: " + newBook.year;
}

function moveBook(bookElement) {
  deleteBook(bookElement);
  const bookId = parseInt(bookElement.id);

  storage.updateItem(bookId, (book) => {
    book.isComplete = !book.isComplete;
    addBook(book);
  });
}

function updateEditForm(book) {
  editBookId.value = book.id;
  editBookTitle.value = book.title;
  editBookAuthor.value = book.author;
  editBookYear.value = book.year;
}

function popupConfirm(text) {
  popupText.textContent = text;
  popupModal.show();

  return new Promise((resolve, reject) => {
    popupForm.onsubmit = (e) => {
      e.preventDefault();
      popupModal.hide();
      resolve("resolved");
    };

    popupForm.onreset = (e) => {
      e.preventDefault();
      popupModal.hide();
      reject("rejected");
    };
  });
}
