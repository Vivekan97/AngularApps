import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '../_services/users-service.service';

import { UsersPageComponent } from './users-page.component';

import { BrowserModule } from '@angular/platform-browser';

// import {  HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatTableModule  } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPageComponent ],
      imports: [  
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        HttpClientModule, FormsModule, MatTooltipModule, MatProgressBarModule,
        MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule
      ],
      providers: [UsersService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it(`should render 'ADMIN UI PAGE'`,() =>{
    const fixture = TestBed.createComponent(UsersPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.querySelector("h2")?.textContent);
    expect(compiled.querySelector("h2")?.textContent).toContain("ADMIN UI PAGE");
  })

  it(`should create 'users-table'`,() =>{
    const fixture = TestBed.createComponent(UsersPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.);
    // expect(compiled.querySelector("h2")?.textContent).toContain("ADMIN UI PAGE");
  })
});
