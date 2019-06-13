import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  @Output() selectedData = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onSearch(event,searchField){
    this.selectedData.emit({searchText:event.target.value,
                            searchField:searchField});
  }

}
