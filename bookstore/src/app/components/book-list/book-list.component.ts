import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/service/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  
  currentCategoryId:number = 1;
  previousCategory:number = 1;
  searchMode: boolean = false;
  
  //new properties for server side paging
  currentPage:number = 1;
  pageSize:number = 5;
  totalRecords:number = 0;


  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute,
              private _cartService:CartService,
              _config: NgbPaginationConfig) { 
                _config.maxSize = 3;
                _config.boundaryLinks = true;
              }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe( () => {
          this.listBooks();
      }
    );
  }

  listBooks(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      //do search work
      this.handleSearchBooks();
    } else {
      //display books based on category
      this.handleListBooks();
    }
  }

  handleListBooks(){
    const hasCategoryId:boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){
    this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
    this.currentCategoryId = 1;
    }
     
    
    if(this.previousCategory != this.currentCategoryId){
      this.currentPage = 1;
    }

    this.previousCategory = this.currentCategoryId;

    this._bookService.getBooks(this.currentCategoryId, 
                                this.currentPage - 1 , 
                                this.pageSize)
                                .subscribe(this.processPaginate());
  }

  handleSearchBooks(){
    const keyword:string = this._activatedRoute.snapshot.paramMap.get('keyword')
    
    this._bookService.searchBooks(keyword,this.currentPage - 1,this.pageSize,).subscribe(this.processPaginate());
  }

  updatePageSize(pageSize:number){
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processPaginate(){
    return data => {
      this.books = data._embedded.books;
      //page number start from 1 index
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(book:Book){
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }


}
