import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Character } from '../../../../interfaces/character';
import { MarvelApiService } from '../../../../services/marvel-api.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  destroyed$ = new Subject<boolean>();

  characters!: Character[];
  limit: number = 20;
  offset: number = 100;
  total: number = 0;

  constructor(private readonly marvelApiService: MarvelApiService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.marvelApiService
      .getCharactersList(this.limit, this.offset)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.characters = res.data.results;
          this.total = res.data.total;
        },
        error: (e) => console.error(e),
      });
  }

  onChangePagePrev(): void {
    this.offset -= this.limit;
    this.getCharacters();
    this.scrollToTop();
  }

  onChangePageNext(): void {
    this.offset += this.limit;
    this.getCharacters();
    this.scrollToTop();
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true), this.destroyed$.complete();
  }
}
