import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClickOutsideDirective,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
