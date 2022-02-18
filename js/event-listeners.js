// Add Button
addButton.addEventListener("click", () => {
  addModal.show();
});

// Filter Input
filterInput.addEventListener("input", () => {
  [completeShelf, incompleteShelf].forEach((shelf) => (shelf.innerHTML = ""));

  const inputValue = filterInput.value;
  const books = storage.filterItems((item) => {
    return (
      item.title.toLowerCase().includes(inputValue) ||
      item.author.toLowerCase().includes(inputValue) ||
      item.year.toLowerCase().includes(inputValue)
    );
  });
  books.forEach((book) => {
    addBook(book);
  });
});

// Shelves
[completeShelf, incompleteShelf].forEach((shelf) => {
  shelf.addEventListener("click", (e) => {
    if (e.target.classList.contains("action-btn")) {
      const bookElement = e.target.parentElement.parentElement;
      const bookId = parseInt(bookElement.id);

      if (e.target.classList.contains("move-btn")) {
        // if move button clicked
        moveBook(bookElement);
      } else if (e.target.classList.contains("delete-btn")) {
        // if delete button clicked
        popupConfirm("Apakah Anda yakin menghapus buku ini?")
          .then(() => {
            deleteBook(bookElement);
            storage.deleteItem(bookId);
          })
          .catch(console.log);
      } else if (e.target.classList.contains("edit-btn")) {
        const book = storage.getItem(bookId);
        updateEditForm(book);
        editModal.show();
      }
    }
  });
});

// Add Modal
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const year = inputYear.value;
  const isComplete = inputIsComplete.checked;

  const book = {
    id: Date.now(),
    title,
    author,
    year,
    isComplete,
  };

  storage.addItem(book);
  addBook(book);

  inputForm.reset();
});

inputForm.addEventListener("reset", () => {
  addModal.hide();
});

// Edit Modal
editBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookId = parseInt(editBookId.value);
  const bookElement = document.getElementById(bookId);
  const newBook = {
    title: editBookTitle.value,
    author: editBookAuthor.value,
    year: editBookYear.value,
  };
  storage.updateItem(bookId, (book) => {
    let isChanged = false;
    for (let key in newBook) {
      if (book[key] !== newBook[key]) {
        book[key] = newBook[key];
        isChanged = true;
      }
    }

    if (isChanged) {
      updateBook(bookElement, book);
    }
  });

  editBookForm.reset();
});

editBookForm.addEventListener("reset", () => {
  editModal.hide();
});
