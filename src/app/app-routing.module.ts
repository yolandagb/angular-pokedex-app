import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './features/pokemon/pages/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' }, 
  { path: 'pokemon', loadChildren: () => import('./features/pokemon/pokemon.module').then(m => m.PokemonModule) },
  { path: '**', redirectTo: 'pokemon' }, 
  { path: 'detail/:id', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    
  ],
})
export class AppRoutingModule {}