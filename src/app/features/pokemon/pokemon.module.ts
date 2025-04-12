// filepath: /src/app/features/pokemon/pokemon.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { HttpClient } from '@angular/common/http';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [CommonModule, RouterModule, PokemonRoutingModule, PokemonDetailComponent, MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent, MatPaginatorModule,
    SearchBarComponent, SkeletonLoaderComponent],
})
export class PokemonModule { }