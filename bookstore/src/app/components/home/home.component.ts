import { Component, OnInit } from '@angular/core';
import { BookCategory } from 'src/app/common/book-category';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookCategories : BookCategory[];
  constructor(private _bookService:BookService) { }

  ngOnInit() {
    this.listBookCategories();
  }

  listBookCategories(){
    this._bookService.getBookCategories()
    .subscribe(
      data => this.bookCategories = data
    );
  }
}
