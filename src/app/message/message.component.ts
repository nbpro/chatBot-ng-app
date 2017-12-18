import { Component, OnInit,Input } from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageComponent implements OnChanges {

  _ref:any;   
  constructor() { }

  @Input() childData;
  @Input() chatData;
  ngOnInit() {
    console.log(this.childData);
  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.childData;
    this.chatData = name.currentValue;
  }
}
