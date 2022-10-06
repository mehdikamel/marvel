import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarvelApiService } from 'src/app/services/marvel-api.service';
import { MarvelApiMockService } from 'src/app/services/mock/marvel-api.mock.service';

import { CharactersListComponent } from './characters-list.component';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CharactersListComponent],
      providers: [
        { provide: MarvelApiService, useClass: MarvelApiMockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('getCharacters() should call marvelApiService and put res in characters and total', () => {
  //   spyOn(MarvelApiService, 'getCharactersList').and.returnValue(of({}));

  // });
});
