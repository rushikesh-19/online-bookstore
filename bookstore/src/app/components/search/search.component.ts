import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  searchBooks(keyword:string){
    this._router.navigateByUrl('/search/'+keyword);

  }
}
