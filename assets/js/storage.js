import { RENDER_EVENT, putBook } from './ui.js';
import { books, resultBooks, generateId, generateBookObject, findBook, findBookIndex, findResultBookIndex, findBookContain, addBook, editBook, showForUpdate, addBookToComplete, undoBookFromComplete, deleteBookFromShelf, searchBook } from './bookManager.js';


const STORAGE_KEY = 'bookshelf-apps';
const SAVED_EVENT = 'saved-book';

function isStorageExist() {
  if (typeof(Storage) === undefined) {
    alert('yaahh...browser Kamu tidak mendukung local Storage');
    return false;
  }
  return true;
}

function getLocalStorage() {
  const ShowData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(ShowData);
  return data;
}

function loadDataFromStorage() {
  const data = getLocalStorage();
    
  if (data != null) {
    for (const book of data) {
      books.push(book);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function saveBook() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}



export { STORAGE_KEY, SAVED_EVENT, isStorageExist, getLocalStorage, loadDataFromStorage, saveBook }