import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Character } from '../../../../interfaces/character';
import { MarvelApiService } from '../../../../services/marvel-api.service';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss'],
})
export class CharactersDetailsComponent implements OnInit {
  destroyed$ = new Subject<boolean>();

  characterId!: number;
  character!: Character;
  comicsList$!: Observable<any>;
  loading: boolean = true;

  constructor(
    private readonly marvelApiService: MarvelApiService,
    public readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.characterId = params['id'];
      this.getCharacter();
      this.getComicsList();
    });
  }

  getCharacter() {
    this.marvelApiService
      .getCharacter(this.characterId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => (this.character = res),
      });
  }

  getComicsList() {
    this.comicsList$ = this.marvelApiService.getComicsListByCharacter(
      this.characterId
    );
  }

  onClickFavourite() {
    if (!this.checkCharacterIsInFavourites()) {
      this.marvelApiService.addFavouriteCharacter(this.character);
    } else {
      this.marvelApiService.removeFavouriteCharacter(this.character.id);
    }
  }

  checkCharacterIsInFavourites(): boolean {
    return this.marvelApiService.isPresentInFavourites(this.character.id);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true), this.destroyed$.complete();
  }
}
