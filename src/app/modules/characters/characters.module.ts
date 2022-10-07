import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';

import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersDetailsComponent } from './components/characters-details/characters-details.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
  },
  {
    path: 'details/:id',
    component: CharactersDetailsComponent,
  },
];

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailsComponent,
    CharacterCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class CharactersModule {}
