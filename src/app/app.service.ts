import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
    ComponentFactoryResolver,
    Inject,
    ReflectiveInjector
  } from '@angular/core';
import { MessageComponent } from './message/message.component';
  

@Injectable()

export class AppService {
    apiKey:string = `6nt5d1nJHkqbkphe`;
    chatBotId:string = `​63906`;
    baseUrl:string = `https://www.personalityforge.com/api/chat/`;
    externalId:string = `Neerajpro`;
    message:string = ``;
    rootViewContainer= null;
    constructor(private http: Http,@Inject(ComponentFactoryResolver) private factoryResolver){
        console.log("inside service call constructor");
    }
    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
      }
    sendMessageToChatBot(message){
        let userMessage = message ? message : this.message;
        const apiUrl:string = `${this.baseUrl}?apiKey=${this.apiKey}&message=${userMessage}&chatBotID=${this.chatBotId}&externalID=${this.externalId}`
        return this.http.get(apiUrl).map(this.extractData)
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    extractData(res){
        return res.json();
    }
    addDynamicComponent() {
        const factory = this.factoryResolver.resolveComponentFactory(MessageComponent)
        const component = factory.create(this.rootViewContainer.parentInjector)
        this.rootViewContainer.insert(component.hostView)
      }

}