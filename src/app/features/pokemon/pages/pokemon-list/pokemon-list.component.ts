import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  showCards: boolean = true
  pokemonNames: { name: string }[] = [];
  isLoading = true;
 

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemonNames();
  
  }

    fetchPokemonNames(): void {
    const limit = 20; // Número de Pokémon a obtener
  
    this.pokemonService.getPokemonNames(limit).subscribe({
      next: (names) => {
        console.log('Pokemon Names:', names);
        this.pokemonNames = names.map((pokemon: any) => ({
          name: pokemon.name,
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon names:', error);
        this.isLoading = false;
      },
    });
  }


  
}