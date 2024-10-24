import { STORAGE_KEY, SAVED_EVENT, isStorageExist, getLocalStorage, loadDataFromStorage, saveBook } from './storage.js';
import { books, resultBooks, generateId, generateBookObject, findBook, findBookIndex, findResultBookIndex, findBookContain, addBook, editBook, showForUpdate, addBookToComplete, undoBookFromComplete, deleteBookFromShelf, searchBook } from './bookManager.js';



const RENDER_EVENT = 'render-book';

function putBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookObject.title;
    
  const textAuthor = document.createElement('p');
  textAuthor.innerText = 'Penulis: ' + bookObject.author;
    
  const textYear = document.createElement('p');
  textYear.innerText = 'Tahun: ' + bookObject.year;
    
  const container = document.createElement('div');
    
  container.classList.add('book-container');
  
  const teksContainer = document.createElement('div');
  teksContainer.classList.add('teks-container');
    
  teksContainer.append(textTitle, textAuthor, textYear);
    
  container.append(teksContainer);
    
    
  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-button');

    
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  
  //  element tombol edit
  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  const iconEdit = document.createElement('i');
  iconEdit.classList.add('fa-solid', 'fa-pen');
  editButton.append(iconEdit);

  //  element tombol delete
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  const iconDelete = document.createElement('i');
  iconDelete.classList.add('fa-solid', 'fa-trash-can');
  deleteButton.append(iconDelete);
    
    
  buttonContainer.append(completeButton, editButton, deleteButton);
  container.append(buttonContainer);

  
  deleteButton.addEventListener('click', function () {
    deleteBookFromShelf(bookObject.id);
  });
    
  editButton.addEventListener('click', function () {
    showForUpdate(bookObject.id);
    
  });
    
  if (bookObject.isComplete) {
    completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    const iconButton = document.createElement('i');
    iconButton.classList.add('fa-solid', 'fa-arrow-right-from-bracket');
    completeButton.append(iconButton);
            
    completeButton.addEventListener('click', function () {
      undoBookFromComplete(bookObject.id);
    });
  }
  else {
    completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    const iconButton = document.createElement('i');
    iconButton.classList.add('fa-solid', 'fa-arrow-right-to-bracket');
    completeButton.append(iconButton);
      
        
    completeButton.addEventListener('click', function () {
      addBookToComplete(bookObject.id);
    });
  }
    
  return container;
}



export { RENDER_EVENT, putBook };