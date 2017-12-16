import { Component ,ChangeDetectionStrategy} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppService } from './app.service';
import { Input } from '@angular/core/src/metadata/directives';

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
    private appService: AppService){
        console.log("inside app constructor--- i am intialisde");
  }

  ngOnInit(){
  }

  sendMessageToChatServer(userMsg){
    const returnedData = this.appService.sendMessageToChatBot(userMsg).subscribe();
    console.log(returnedData);
  }
}
