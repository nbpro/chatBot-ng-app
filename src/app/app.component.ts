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
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  title = 'Chat Bot Application';
  private apiUrl = 'https://www.personalityforge.com/api/chat';
  
  constructor(
    private http : Http,
    private router : Router,
    private appService: AppService,
    private _cfr: ComponentFactoryResolver
  ){
    console.log("inside app constructor--- i am intialisde");
  }

  ngOnInit(){
  }

  sendMessageToChatServer(userMsg){
    let returnedData = this.appService.sendMessageToChatBot(userMsg).subscribe((returnedData)=>{
      this.constructChatMessageFromBot(returnedData);
    })
  }

  constructChatMessageFromBot(data:any):void{
      if(data && data['success']){
        let botName = data['message'] && data['message']['chatBotName'];
        let message = data['message'] && data['message']['message'];
        let chatContent = `<div class="chat-message clearfix">
        
        <img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32">

        <div class="chat-message-content clearfix">
          
          <span class="chat-time">13:37</span>

          <h5>${botName}</h5>

          <p>${message}</p>

        </div>`;
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
