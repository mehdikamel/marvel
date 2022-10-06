import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { Character, CharacterListResponse } from '../interfaces/character';
import { MarvelApiService } from './marvel-api.service';

describe('MarvelApiService', () => {
  let service: MarvelApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [MarvelApiService],
    });

    service = TestBed.inject(MarvelApiService);
    httpMock = TestBed.get(HttpTestingController);

    let store: any = {};

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string => store[key] || null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => (store[key] = <string>value)
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyCharacterListResponse: CharacterListResponse = {
    code: 200,
    status: 'ok',
    data: {
      results: [
        {
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
        },
        {
          id: 2,
          name: 'Iron man',
          description: 'string',
          modified: new Date(),
          resourceURI: 'string',
          urls: [],
          thumbnail: { path: 'iron', extension: 'png' },
          comics: {
            available: 20,
            returned: 10,
            collectionURI: 'string',
            items: [],
          },
        },
      ],
      count: 2,
      limit: 2,
      offset: 2,
      total: 10,
    },
  };

  const dummyCharacterResponse = {
    code: 200,
    status: 'ok',
    data: {
      results: [
        {
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
        },
      ],
      count: 1,
      limit: 0,
      offset: 0,
      total: 1,
    },
  };

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

  const dummyComicListResponse = {
    code: 200,
    status: 'ok',
    data: {
      results: [
        {
          id: 1,
          name: 'Avengers 1',
        },
        {
          id: 2,
          name: 'Avengers 2',
        },
      ],
      count: 2,
      limit: 0,
      offset: 0,
      total: 2,
    },
  };

  const dummyComicList = [
    {
      id: 1,
      name: 'Avengers 1',
    },
    {
      id: 2,
      name: 'Avengers 2',
    },
  ];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCharactersList() should return data', () => {
    service.getCharactersList(2, 2).subscribe((res) => {
      expect(res).toEqual(dummyCharacterListResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}characters?limit=2&offset=2&${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyCharacterListResponse);
  });

  it('getCharacter() should return transformed data', () => {
    service.getCharacter(1).subscribe((res) => {
      expect(res).toEqual(dummyCharacter);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}characters/1?${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyCharacterResponse);
  });

  it('getComicsListByCharacter() should return transformed data', () => {
    service.getComicsListByCharacter(1).subscribe((res) => {
      expect(res).toEqual(dummyComicList);
    });

    const now = new Date().toISOString().split('T')[0];
    const req = httpMock.expectOne(
      `${environment.apiUrl}characters/1/comics?limit=3&dateRange=0001-01-01,${now}&orderBy=onsaleDate&${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyComicListResponse);
  });

  it('addFavouriteCharacter() should add a character on favourite list if character is not on the list', () => {
    service.addFavouriteCharacter(dummyCharacter);
    expect(localStorage.getItem('favourites')).toBe(
      JSON.stringify([dummyCharacter])
    );
  });
});
