import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bound',
  templateUrl: './bound.component.html',
  styleUrls: ['./bound.component.css']
})
export class BoundComponent implements OnInit {

  title = "original title";

  constructor() { }

  ngOnInit() {
  }

}
