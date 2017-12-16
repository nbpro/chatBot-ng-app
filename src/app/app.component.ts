import { Component ,ChangeDetectionStrategy} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppService } from './app.service';
import { Input } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { Inject} from '@angular/core'
import { ViewChild } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Chat Bot Application';
  private apiUrl = 'https://www.personalityforge.com/api/chat';
  private userMsg:string='';
  dataToBePassed = {
    name : `${this.userMsg}`,
    message  : 'Neerajpro',
    imgSrc : 'http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f321?s=32'
  }
  
  constructor(
    private http : Http,
    private router : Router,
    private appService: AppService,
    private _cfr: ComponentFactoryResolver,
  ){
    console.log("inside app constructor");
  }

  ngOnInit(){

  }

  sendMessageToChatServer(userMsg){
    this.userMsg = userMsg;
     // pass user input data to component
     this.dataToBePassed = {
      message : `${this.userMsg}`,
      name  : 'Neerajpro',
      imgSrc :`http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f321?s=32`
    }
  // call the coponent to show user data
     this.addComponent();

    let returnedData = this.appService.sendMessageToChatBot(userMsg).subscribe((returnedData)=>{
      this.constructChatMessageFromBot(returnedData);
    })
  }

  constructChatMessageFromBot(data:any):void{
      if(data && data['success']){
        let botName = data['message'] && data['message']['chatBotName'];
        let message = data['message'] && data['message']['message'];
        this.dataToBePassed={
          name :`${botName}`,
          message:`${message}`,
          imgSrc: `http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32`
        }
        // call the component to add bot data
        this.addComponent();
      }
  }

  @ViewChild('parent',{read:ViewContainerRef}) container:ViewContainerRef;

  addComponent(){    
    var comp = this._cfr.resolveComponentFactory(MessageComponent);
    var expComponent = this.container.createComponent(comp);
    expComponent.instance._ref = expComponent;
  }
}
