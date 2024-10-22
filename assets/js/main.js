const books = [];
const resultBooks = [];

const RENDER_EVENT = 'render-book';
const STORAGE_KEY = 'bookshelf-apps';
const SAVED_EVENT = 'saved-book';


function generateId() {
  return +new Date().getTime();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  };
}

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

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function findResultBookIndex(bookId) {
  for (const index in resultBooks) {
    if (resultBooks[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function findBookContain(bookTitle) {
  const titleUpper = bookTitle.toUpperCase();
    
  const resultBooks = books.filter((el) => el.title.toUpperCase().includes(titleUpper) ===  true);
  return resultBooks;
}

function saveBook() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function addBook() {
  const bookTitle = document.getElementById('bookFormTitle').value;
  const bookAuthor = document.getElementById('bookFormAuthor').value;
  const bookYear = document.getElementById('bookFormYear').value;
  const bookIsComplete = document.getElementById('bookFormIsComplete').checked;
    
  const generateID = generateId();
  const bookObject = generateBookObject(generateID, bookTitle, bookAuthor, Number(bookYear), bookIsComplete);
  books.push(bookObject);
    
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function editBook() {
  const idbook = document.getElementById("idbook").value;
  const titleUpdate = document.getElementById('titleUpdate').value;
  const updateAuthor = document.getElementById('updateAuthor').value;
  const updateYear = document.getElementById('updateYear').value;
  const updateIsCompleted = document.getElementById('updateIsCompleted').checked;
    
  const bookUpdate = books.filter((el) => el.id == idbook);

  bookUpdate[0].title = titleUpdate;
  bookUpdate[0].author = updateAuthor;
  bookUpdate[0].year = updateYear;
  bookUpdate[0].isComplete = updateIsCompleted;
    
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
    
}

function showForUpdate(bookId) {
  document.getElementById('editWrapper').hidden = false;
  document.getElementById('addBookWrapper').hidden = true;
  document.getElementById('titleUpdate').focus();
    
  const bookFilter = books.filter((el) => el.id === bookId);
    
  document.getElementById('idbook').value = bookFilter[0].id;
  document.getElementById('titleUpdate').value = bookFilter[0].title;
  document.getElementById('updateAuthor').value = bookFilter[0].author;
  document.getElementById('updateYear').value = bookFilter[0].year;
  document.getElementById('updateIsCompleted').checked = bookFilter[0].isComplete;
}


function addBookToComplete(bookId) {
  const bookTarget = findBook(bookId);
    
  if (bookTarget == null) {return;}
    
  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function undoBookFromComplete(bookId) {
  const bookTarget = findBook(bookId);
    
  if (bookTarget == null) {return;}
    
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function deleteBookFromShelf(bookId) {
  if (resultBooks.length) {
    const bookResultTarget = findResultBookIndex(bookId);
    if (bookResultTarget === -1) {return;}
    console.log(`bookResultTarget, ${bookResultTarget}`);
    resultBooks.splice(bookResultTarget, 1);
  }
    
  const bookTarget = findBookIndex(bookId);
  if (bookTarget === -1) {return;}
  console.log(`bookTarget, ${bookTarget}`);
  books.splice(bookTarget, 1);
    
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

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
  editButton.innerText = 'Edit';
  editButton.classList.add('edit-button');

  //  element tombol delete
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
  deleteButton.innerText = 'Hapus';
  deleteButton.classList.add('delete-button');
    
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
    completeButton.innerText = 'Belum selesai dibaca';

            
    completeButton.addEventListener('click', function () {
      undoBookFromComplete(bookObject.id);
    });
  }
  else {
    completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    completeButton.innerText = 'Selesai dibaca';
        
    completeButton.addEventListener('click', function () {
      addBookToComplete(bookObject.id);
    });
  }
    
  return container;
}

function searchBook() {
  const searchBookTitle = document.getElementById('searchBookTitle').value;
  document.getElementById('addBookWrapper').hidden = true;
    
  if (searchBookTitle !== '') {
    bookTarget = findBookContain(searchBookTitle);
    
    console.log(books);
    console.log(bookTarget);
    console.log(resultBooks);
    if (resultBooks.length) {
      resultBooks.length = 0;
    }
    if (bookTarget.length == 0) {return;}
    for (const bookItem of bookTarget) {
      //          resultBooks = []
      resultBooks.push(bookItem);
    }
    console.log(books);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
  else {
    alert('Masukkan judul Buku yang kamu cari');
    
  }
}

document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('editWrapper').hidden = true;
    
  const submitForm = document.getElementById('bookForm');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
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
    
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, function () {
    
  alert('Kamu berhasil menyimpan buku');
  //    console.log(localStorage.getItem(STORAGE_KEY));

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
