import { Component, OnInit } from '@angular/core';

// Service
import { DataApiService } from './../../services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private DataApi: DataApiService) {}

  ngOnInit() {
    this.getListBook();
  }

  getListBook() {
    // this.DataApi.getAllBooks().subscribe(books => console.log(books));
  }
}
