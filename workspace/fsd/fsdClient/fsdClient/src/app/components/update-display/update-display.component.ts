import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-display',
  templateUrl: './update-display.component.html',
  styleUrls: ['./update-display.component.css']
})
export class UpdateDisplayComponent implements OnInit {

  constructor() { }
  @Input() displayItem : {name:string};

  @Output() selectedData  = new EventEmitter<any>();


  ngOnInit() {
    console.log(this.displayItem);
  }

  convertCamelToRegular(str:string){
    str = str.replace(/([A-Z])/g, ' $1');
    // uppercase the first character
    str = str.replace(/^./, function(str){ return str.toUpperCase(); });

    return str;
  }

  selectedCard(item){

  }

  delete(displayItem){
    this.selectedData.emit({displayItem:displayItem,action:'delete'});
  }

  edit(item){
    console.log(item);
    this.selectedData.emit(item);
  }

  getItem(item){
    if(item instanceof Array)
      return item.length;
      
    return item;
  }

}
