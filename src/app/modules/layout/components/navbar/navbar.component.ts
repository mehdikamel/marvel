import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from 'src/app/interfaces/character';
import { MarvelApiService } from 'src/app/services/marvel-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  favouritesCharacters$!: Observable<Character[]>;

  constructor(
    public readonly marvelApiService: MarvelApiService,
    public readonly router: Router
  ) {}

  ngOnInit(): void {
    this.favouritesCharacters$ = this.marvelApiService.favouritesCharacters$;
  }

  onSelectCharacter(character: Character): void {
    this.router.navigateByUrl('characters/details/' + character.id, {
      state: { character: character },
    });
  }
}
