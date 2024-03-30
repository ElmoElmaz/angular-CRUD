import { Component } from '@angular/core';

import { Book } from '../../models/book'
import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

books: Book[] = [];
selectedBook: Book = new Book();
showConfirmationDialog: boolean = false; 
actionType: string = '';


constructor(private bookService: BookService) {

} 
ngOnInit(): void { 
this.getBooks();
}

getBooks(): void {
  this.bookService.getBooks().subscribe(book => (this.books = book))
}
selectBook(book: Book) :void { 
this.selectedBook = { ...book };

}
updateBook(childResult: boolean): void { 
  if(childResult){ 
    this.bookService.updateBook(this.selectedBook).subscribe(
      (response) => {
        console.log('Book Updated' ,response)
        this.getBooks();
      },
      (error) => {
        console.error('Error updating Book') ,error
      }
    );
    this.clearSelection();
    this.showConfirmationDialog = false 
  } 
  else { 
    this.showConfirmationDialog = false
    }
}

confirmUpdateBook(): void { 
    this.actionType = 'edit'
    this.showConfirmationDialog = true;
  }



clearSelection(): void { 
  this.selectedBook = new Book();
}
addBook(childResult: boolean): void {
if(childResult){ 
    this.bookService.addBook(this.selectedBook).subscribe(
      (response) => {
        console.log('Added book:' ,response);
        this.getBooks();
      },
      (error) => {
        console.error('Error adding book:' , error);
      }
    );
    this.clearSelection();
    this.showConfirmationDialog = false 
  } else { 
    this.showConfirmationDialog = false
    this.clearSelection();
    }
  }

confirmAddBook(): void {
  if(this.selectedBook.title == ""){
    this.showConfirmationDialog = false;
  }
  else {
    this.actionType = 'add'
    this.showConfirmationDialog = true;
  }
}

handleAction(childResult: boolean): void { 
if(this.actionType == 'add'){
this.addBook(childResult);
}
if(this.actionType == 'edit'){
  this.updateBook(childResult)
}
if(this.actionType == 'delete') {
  this.deleteBook(childResult)
}
}

deleteBook(childResult: boolean) : void {
  if(childResult){ 
    this.bookService.deleteBook(this.selectedBook._id).subscribe(
      (response) => {
        console.log('Book deleted' ,response);
        this.getBooks(); 
      },
        (error) => {
          console.error('Error deleting book' ,error)
       }
    )
    this.clearSelection();
    this.showConfirmationDialog = false 
  } 
  else{
    this.showConfirmationDialog = false 
    this.clearSelection();
  }
}
confirmDeleteBook(book: Book){
  this.selectedBook._id = book._id
  this.selectedBook.title = book.title
  this.actionType = 'delete'
  this.showConfirmationDialog = true; 
}
}

 



