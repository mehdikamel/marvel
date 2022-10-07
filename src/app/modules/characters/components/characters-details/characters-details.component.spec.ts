import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MarvelApiService } from '../../../../services/marvel-api.service';
import { MarvelApiMockService } from '../../../../services/mock/marvel-api.mock.service';
import { CharactersDetailsComponent } from './characters-details.component';

describe('CharactersDetailsComponent', () => {
  let component: CharactersDetailsComponent;
  let fixture: ComponentFixture<CharactersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CharactersDetailsComponent],
      providers: [
        { provide: MarvelApiService, useClass: MarvelApiMockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
