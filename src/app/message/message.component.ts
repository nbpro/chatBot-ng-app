import { Component, OnInit,Input } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

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
    console.log(this.chatData);
  }
}
