import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    RouterModule.forRoot([{ path: "", component: AppComponent}])
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents:[MessageComponent]
})
export class AppModule { }
