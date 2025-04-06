// filepath: /src/app/features/pokemon/pokemon.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [CommonModule,RouterModule,PokemonRoutingModule],
})
export class PokemonModule {}