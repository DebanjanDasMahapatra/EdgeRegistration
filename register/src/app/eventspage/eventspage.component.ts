import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eventspage',
  templateUrl: './eventspage.component.html',
  styleUrls: ['./eventspage.component.css']
})
export class EventspageComponent implements OnInit {

  searchText: string = '';
  constructor(public _location: Location) { }

  ngOnInit() {
  }

}
