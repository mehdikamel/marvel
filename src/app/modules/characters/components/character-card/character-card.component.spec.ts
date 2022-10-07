import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Character } from '../../../../interfaces/character';
import { MarvelApiService } from '../../../../services/marvel-api.service';
import { MarvelApiMockService } from '../../../../services/mock/marvel-api.mock.service';
import { CharacterCardComponent } from './character-card.component';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CharacterCardComponent],
      providers: [
        { provide: MarvelApiService, useClass: MarvelApiMockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  const dummyCharacter: Character = {
    id: 1,
    name: 'Thor',
    description: 'string',
    modified: new Date(),
    resourceURI: 'string',
    urls: [],
    thumbnail: { path: 'thor', extension: 'png' },
    comics: {
      available: 10,
      returned: 10,
      collectionURI: 'string',
      items: [],
    },
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSelectCharacter() should navigate to characters/details/1', () => {
    const router = TestBed.inject(Router);
    const spyOnRouter = jest.spyOn(router, 'navigate');
    component.character = dummyCharacter;
    component.onSelectCharacter();
    expect(spyOnRouter).toHaveBeenCalledWith([
      'characters',
      'details',
      component.character.id,
    ]);
  });
});
