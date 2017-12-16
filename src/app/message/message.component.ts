import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  _ref:any;   
  constructor() { }

  @Input() data;
  ngOnInit() {
    console.log(this.data);
  }
  removeObject(){
    this._ref.destroy();
  }  
}
