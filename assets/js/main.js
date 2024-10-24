import { RENDER_EVENT, putBook } from './ui.js';
import { STORAGE_KEY, SAVED_EVENT, isStorageExist, getLocalStorage, loadDataFromStorage, saveBook } from './storage.js';
import { books, resultBooks, generateId, generateBookObject, findBook, findBookIndex, findResultBookIndex, findBookContain, clearInput, addBook, editBook, showForUpdate, addBookToComplete, undoBookFromComplete, deleteBookFromShelf, searchBook } from './bookManager.js';



document.addEventListener('DOMContentLoaded', function () {
    
  const submitForm = document.getElementById('bookForm');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
    clearInput();
  });
    
  const editbookForm = document.getElementById('editbookForm');
  editbookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    editBook();
  });
    
  const submitSearch = document.getElementById('searchBook');
  submitSearch.addEventListener('submit', function (event) {
    event.preventDefault();
    searchBook();
  });
    
  const checkCompleted = document.getElementById('bookFormIsComplete');
    

  checkCompleted.addEventListener('change', function (event) {
    const checked = event.target.checked;
    if (checked) {
      document.getElementById('bookFormSubmit').innerText = 'Masukkan Buku ke rak Selesai dibaca';
    }
    else {
      document.getElementById('bookFormSubmit').innerText = 'Masukkan Buku ke rak Belum selesai dibaca';
    }

  });
    
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, function () {
  swal({
    icon: "success",
  });
});

document.addEventListener(RENDER_EVENT, function () {
  const unreadBookList = document.getElementById('incompleteBookList');
  unreadBookList.innerHTML = '';
    
  const donereadBookList = document.getElementById('completeBookList');
  donereadBookList.innerHTML = '';
    
  //    cek apakah array dari result pencarian tidak kosong
  if (resultBooks.length !== 0) {
    for (const bookItem of resultBooks) {
      const bookElement = putBook(bookItem);
        
      if (!bookItem.isComplete) {
        unreadBookList.append(bookElement);
      }
      else {
        donereadBookList.append(bookElement);
      }
    }
    
  }
  else {
    for (const bookItem of books) {
      const bookElement = putBook(bookItem);
        
      if (!bookItem.isComplete) {
        unreadBookList.append(bookElement);
      }
      else {
        donereadBookList.append(bookElement);
      }
    }
  }
});
