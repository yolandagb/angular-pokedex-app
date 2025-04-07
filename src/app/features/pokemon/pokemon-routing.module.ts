import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: ':id', component: PokemonDetailComponent} // Ruta predeterminada para Pokémon
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}