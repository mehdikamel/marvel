import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersDetailsComponent } from './modules/characters/components/characters-details/characters-details.component';
import { CharactersListComponent } from './modules/characters/components/characters-list/characters-list.component';

const routes: Routes = [
  { path: 'characters', component: CharactersListComponent },
  { path: 'characters/details/:id', component: CharactersDetailsComponent },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
