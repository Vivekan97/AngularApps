import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersService } from './_services/users-service.service';

import { BrowserModule } from '@angular/platform-browser';

import {  HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatTableModule  } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, UsersPageComponent
      ],
      providers: [UsersService],
      imports: [
        BrowserModule, BrowserAnimationsModule,
        HttpClientModule, FormsModule, MatTooltipModule, MatProgressBarModule,
        MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Admin UI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Admin UI');
  });

  it('should render page header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled);
    expect(compiled.querySelector('h2')?.textContent).toContain('ADMIN UI PAGE');
  });

  it(`should render the footer`, () =>  {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')?.textContent).toContain("Developed using Angular Material and Bootstrap.")
  })
});
