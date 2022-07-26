import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersService } from './users-service.service';
import { User } from '../_models/user';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain valid base url', 
    ()  =>  {
      expect(service.getUsersUrl).toBeTruthy();
    }
    
  )

  it(`should return value from Observable`, 
    (done: DoneFn) => {
      service.getUsers().subscribe(
        value => {
          expect(value).toBeInstanceOf(Array);
          // console.log(value);
          done();
        }
      )
    }
  )
});
