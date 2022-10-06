import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character, CharacterListResponse } from 'src/app/interfaces/character';

@Injectable()
export class MarvelApiMockService {
  getCharactersList(
    limit: number,
    offset: number
  ): Observable<CharacterListResponse> {
    return of({
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
    });
  }

  getCharacter(characterId: number): Observable<Character> {
    return of({
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
    });
  }

  getComicsListByCharacter(characterId: number): Observable<any> {
    return of([
      {
        id: 1,
        name: 'Avengers 1',
      },
      {
        id: 2,
        name: 'Avengers 2',
      },
    ]);
  }

  isPresentInFavourites(characterId: number): boolean {
    return characterId === 1 ? true : false;
  }
}
