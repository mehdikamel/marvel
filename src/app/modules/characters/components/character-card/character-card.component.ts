import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character';
import { MarvelApiService } from 'src/app/services/marvel-api.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: Character;

  constructor(
    private readonly marvelApiService: MarvelApiService,
    public readonly router: Router
  ) {}

  ngOnInit(): void {}

  onSelectCharacter(): void {
    this.router.navigate(['characters', 'details', this.character.id]);
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
}
