import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, forkJoin } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { PokemonDetails } from '../../models/pokemon.model';

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
  this.isLoading = true;

  this.pokemonService.getPokemonList(this.pageSize, offset).subscribe({
    next: (pokemonList) => {
      console.log('Pokemon List:', pokemonList);
      const infoRequests = pokemonList.map((pokemon: PokemonDetails) =>
        this.pokemonService.getPokemonInfo(pokemon.name)
      );

      
      forkJoin(infoRequests).subscribe({
        next: (pokemonInfos:any) => {
          this.pokemonNames = pokemonInfos; 
          this.isLoading = false;
          this.totalPokemon = 1000;
        },
        error: (error) => {
          console.error('Error fetching detailed Pokémon info:', error);
          this.isLoading = false;
        },
      });
    },
    error: (error) => {
      console.error('Error fetching Pokémon list:', error);
      this.isLoading = false;
    },
  });
}


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchPokemonNames();
  }

  searchedPokemon: any = null;
  searchError: string = '';
  
  onSearchPokemon(term: string): void {
    const trimmedTerm = term?.trim().toLowerCase();
  
    if (!trimmedTerm) {
      this.searchedPokemon = null;
      this.searchError = '';
      this.fetchPokemonNames(); // ¡Recarga la lista completa!
      return;
    }
  
    this.pokemonService.getPokemonInfo(trimmedTerm).subscribe({
      next: (pokemon) => {
        this.searchedPokemon = pokemon;
        this.searchError = '';
      },
      error: () => {
        this.searchedPokemon = null;
        this.searchError = 'pokemon not found 😔';
      }
    });
  }
  
  



  
}