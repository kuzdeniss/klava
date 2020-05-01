import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {CommonModule} from '@angular/common';
import {TextsService} from './shared/services/texts.service';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    TextsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
