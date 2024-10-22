import { STORAGE_KEY, SAVED_EVENT, isStorageExist, getLocalStorage, loadDataFromStorage, saveBook } from './storage.js';
import { books, resultBooks, generateId, generateBookObject, findBook, findBookIndex, findResultBookIndex, findBookContain, addBook, editBook, showForUpdate, addBookToComplete, undoBookFromComplete, deleteBookFromShelf, searchBook } from './bookManager.js';



const RENDER_EVENT = 'render-book';

function putBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.setAttribute('data-testid', 'bookItemTitle');
  textTitle.innerText = bookObject.title;
    
  const textAuthor = document.createElement('p');
  textAuthor.setAttribute('data-testid', 'bookItemAuthor');
  textAuthor.innerText = 'Penulis: ' + bookObject.author;
    
  const textYear = document.createElement('p');
  textYear.setAttribute('data-testid', 'bookItemYear');
  textYear.innerText = 'Tahun: ' + bookObject.year;
    
  const container = document.createElement('div');
  container.setAttribute('data-bookid', `${bookObject.id}`);
  container.setAttribute('data-testid', 'bookItem');
    
  container.classList.add('book-container');
    
  container.append(textTitle, textAuthor, textYear);
    
    
  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-button');

    
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  
  //  element tombol edit
  const editButton = document.createElement('button');
  editButton.setAttribute('data-testid', 'bookItemEditButton');
  editButton.classList.add('edit-button');
  const iconEdit = document.createElement('i');
  iconEdit.classList.add('fa-solid', 'fa-pen');
  editButton.append(iconEdit);

  //  element tombol delete
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
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