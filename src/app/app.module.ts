import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot([{ path: "", component: AppComponent}])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
