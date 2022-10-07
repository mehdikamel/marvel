import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Character, CharacterListResponse } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class MarvelApiService {
  API_URL = environment.apiUrl;
  API_KEY = environment.apiKey;

  localStorage: Storage;
  favouritesCharacters!: Character[];
  favouritesCharacters$ = new BehaviorSubject<Character[]>([]);

  constructor(
    private readonly http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.localStorage = window.localStorage;
    this.favouritesCharacters = this.getFavouriteCharacters();
    this.favouritesCharacters$.next(this.getFavouriteCharacters());
  }

  getCharactersList(
    limit: number,
    offset: number
  ): Observable<CharacterListResponse> {
    return this.http.get<CharacterListResponse>(
      `${this.API_URL}characters?limit=${limit}&offset=${offset}&${this.API_KEY}`
    );
  }

  getCharacter(characterId: number): Observable<Character> {
    return this.http
      .get<Character>(
        `${this.API_URL}characters/${characterId}?${this.API_KEY}`
      )
      .pipe(
        map((res: any) => {
          return res.data.results[0];
        })
      );
  }

  getComicsListByCharacter(characterId: number): Observable<any> {
    const now = new Date().toISOString().split('T')[0];
    return this.http
      .get<any>(
        this.API_URL +
          `characters/${characterId}/comics?limit=3&dateRange=0001-01-01,${now}&orderBy=onsaleDate&${this.API_KEY}`
      )
      .pipe(
        map((data: any) => {
          return data.data.results;
        })
      );
  }

  addFavouriteCharacter(character: Character): void {
    if (this.favouritesCharacters.length < 5) {
      const found = this.favouritesCharacters.find(
        (el) => el.id === character.id
      );
      if (!found) {
        this.favouritesCharacters.push(character);
        this.localStorage.setItem(
          'favourites',
          JSON.stringify(this.favouritesCharacters)
        );
        this.favouritesCharacters$.next(this.favouritesCharacters);
      }
    } else {
      this.openSnackBar();
    }
  }

  removeFavouriteCharacter(characterId: number): void {
    this.favouritesCharacters = this.favouritesCharacters.filter(
      (el) => el.id !== characterId
    );
    this.localStorage.setItem(
      'favourites',
      JSON.stringify(this.favouritesCharacters)
    );
    this.favouritesCharacters$.next(this.favouritesCharacters);
  }

  getFavouriteCharacters(): Character[] {
    return JSON.parse(this.localStorage.getItem('favourites') || '[]');
  }

  isPresentInFavourites(characterId: number): boolean {
    return !!this.favouritesCharacters.find((el) => el.id === characterId);
  }

  openSnackBar() {
    this._snackBar.open(
      `You can't add it to yout favourites list. The max number of favourite is 5.`,
      'Close',
      { horizontalPosition: 'right', duration: 5000 }
    );
  }
}
