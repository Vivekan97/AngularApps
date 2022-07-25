import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersPageComponent } from './users-page/users-page.component';

import {  HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MatTableModule  } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
