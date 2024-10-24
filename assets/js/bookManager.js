import { RENDER_EVENT, putBook } from './ui.js';
import { STORAGE_KEY, SAVED_EVENT, isStorageExist, getLocalStorage, loadDataFromStorage, saveBook } from './storage.js';

const books = [];
const resultBooks = [];


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

function clearInput() {
  document.getElementById('bookFormTitle').value = '';
  document.getElementById('bookFormAuthor').value = '';
  document.getElementById('bookFormYear').value = '';
  document.getElementById('bookFormIsComplete').checked = false;
    
  document.getElementById('bookFormSubmit').innerText = 'Masukkan Buku ke rak Belum selesai dibaca';
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
  document.getElementById('editWrapper').style.display = 'block';
  document.getElementById('addBookWrapper').style.display = 'none';

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
  swal({
    title: "Yakin mau hapus?",
    icon: "warning",
    buttons: ["Batal", "iya, Hapus!"],
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        if (resultBooks.length) {
          const bookResultTarget = findResultBookIndex(bookId);
          if (bookResultTarget === -1) {return;}
          resultBooks.splice(bookResultTarget, 1);
        }
    
        const bookTarget = findBookIndex(bookId);
        if (bookTarget === -1) {return;}
        books.splice(bookTarget, 1);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveBook();
      }
    });

}

function searchBook() {
  const searchBookTitle = document.getElementById('searchBookTitle').value;
    
  if (searchBookTitle !== '') {
      
    const booksTarget = findBookContain(searchBookTitle);
      
    //      cek apakah form edit aktif dengan isi valuenya, jika ada hapus, hilangkan form edit dan tampilkan form add
    const idBook = document.getElementById('idbook').value;
    if (idBook !== '') {
      clearInput();
      document.getElementById('editWrapper').style.display = 'none';
      document.getElementById('addBookWrapper').style.display = 'block';
    }
    
    //      cek hasil pencarian sebelumnya. jika ada, kosongkan
    if (resultBooks.length) {
      resultBooks.length = 0;
    }
      
    if (booksTarget.length == 0) {
      swal({
        text: "maaf, tidak ada judul buku yang kamu cari",
        icon: "warning",
      });
      return;
    }
    document.getElementById('addBookWrapper').style.display = 'none';
    for (const bookItem of booksTarget) {
      resultBooks.push(bookItem);
    }
  }
  else {
    if (resultBooks.length) {
      resultBooks.length = 0;
      document.getElementById('editWrapper').style.display = 'none';
    }
    document.getElementById('editWrapper').style.display = 'none';
    document.getElementById('addBookWrapper').style.display = 'block';
    clearInput();
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}



export { books, resultBooks, generateId, generateBookObject, findBook, findBookIndex, findResultBookIndex, findBookContain, clearInput, addBook, editBook, showForUpdate, addBookToComplete, undoBookFromComplete, deleteBookFromShelf, searchBook };