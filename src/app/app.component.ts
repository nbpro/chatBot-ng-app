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
import { ApplicationRef } from '@angular/core';
import { EmbeddedViewRef } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    private appRef: ApplicationRef
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

  @ViewChild('parent',{read:ViewContainerRef})  parent:ViewContainerRef;
  // @ViewChildren('parent',{read:ViewContainerRef})  container:QueryList<ElementRef>
  // @ViewChildren('parent') container:QueryList<MessageComponent>;

  addComponent(){    
    let comp = this._cfr.resolveComponentFactory(MessageComponent);
        let expComponent = this.parent.createComponent(comp);
        expComponent.instance._ref = this.dataToBePassed;
  }

  
  
}
