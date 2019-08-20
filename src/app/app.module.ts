import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { AppStoreService } from './app-store.service';
import { ChatHeaderComponent } from './chat/header/header.component';
import { ChatWindowComponent } from './chat/window/window.component';
import { ChatInputComponent } from './chat/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatWindowComponent,
    ChatInputComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppStoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
