import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class AppService {
    apiKey:string = `6nt5d1nJHkqbkphe`;
    chatBotId:string = `​63906`;
    baseUrl:string = `https://www.personalityforge.com/api/chat/`;
    externalId:string = `Neerajpro`;
    message:string = ``;
    constructor(private http: Http){
        console.log("inside service call constructor");
    }
    sendMessageToChatBot(message){
        let userMessage = message ? message : this.message;
        const apiUrl:string = `${this.baseUrl}?apiKey=${this.apiKey}&message=${userMessage}&chatBotID=${this.chatBotId}&externalID=${this.externalId}`
        console.log(apiUrl);
        return this.http.get(apiUrl).map(this.extractData)
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
    }

    extractData(res){
        console.log(res.json());
        return res.json();
    }

}