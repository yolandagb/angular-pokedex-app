import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' }, // Redirige a la página de Pokémon
  { path: 'pokemon', loadChildren: () => import('./features/pokemon/pokemon.module').then(m => m.PokemonModule) },
  { path: '**', redirectTo: 'pokemon' }, // Redirige cualquier ruta no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    
  ],
})
export class AppRoutingModule {}