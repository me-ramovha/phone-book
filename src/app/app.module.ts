import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PhoneBookData } from './services/phone-book-data';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UpdateContactComponent } from './modal/update-contact/update-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    NavbarComponent,
    UpdateContactComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(PhoneBookData),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[UpdateContactComponent]
})
export class AppModule { }
