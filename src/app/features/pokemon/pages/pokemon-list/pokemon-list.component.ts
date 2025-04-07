import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  
})
export class PokemonListComponent implements OnInit {

  showCards: boolean = true
  pokemonNames: { name: string }[] = [];
  isLoading = true;

  totalPokemon: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;
 

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemonNames();
  
  }

  fetchPokemonNames(): void {
    const offset = this.currentPage * this.pageSize; 
    this.pokemonService.getPokemonList(this.pageSize, offset).subscribe({
      next: (pokemonList) => {
        console.log('Pokemon List:', pokemonList);
        this.pokemonNames = pokemonList;
        this.isLoading = false;
        this.totalPokemon = 1000; 
      },
      error: (error) => {
        console.error('Error fetching Pokémon names:', error);
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchPokemonNames(); // Recargar la lista de Pokémon con los nuevos parámetros de paginación
  }


  
}