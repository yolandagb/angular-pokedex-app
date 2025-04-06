import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonNames: string[] = []; // Lista de nombres de Pokémon
  isLoading = true; // Indicador de carga

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemonNames();
  }

  fetchPokemonNames(): void {
    const limit = 20; // Número de Pokémon a obtener

    this.pokemonService.getPokemonNames(limit).subscribe({
      next: (names) => {
        console.log('Pokemon Names:', names);
        this.pokemonNames = names;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon names:', error);
        this.isLoading = false;
      },
    });
  }
}