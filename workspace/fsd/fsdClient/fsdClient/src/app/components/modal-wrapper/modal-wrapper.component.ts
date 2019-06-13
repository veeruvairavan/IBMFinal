import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }

  @Input() datas:[];
  @Input() field:string;
  @Output() selectedData = new EventEmitter<any>();

  ngOnInit() {
  }

  onSelect(data){
    this.selectedData.emit(data);
    this.activeModal.close(this);
  }

}
