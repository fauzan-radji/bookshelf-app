const storage = new Storage_("bookshelf-app");
const addModal = new Modal("add-modal");
const editModal = new Modal("edit-modal");
const popupModal = new Modal("popup-modal");

if (storage.isEmpty) {
  // dumping data if book data is empty
  let index = 0;
  const intervalId = setInterval(() => {
    dumpdata[index].id = Date.now();
    dumpdata[index].isComplete = Math.random() >= 0.4;

    index++;
    if (index === dumpdata.length) {
      clearInterval(intervalId);
      storage.dump(dumpdata);

      for (let book of storage.items) {
        addBook(book);
      }
    }
  }, 13);
} else {
  for (let book of storage.items) {
    addBook(book);
  }
}
