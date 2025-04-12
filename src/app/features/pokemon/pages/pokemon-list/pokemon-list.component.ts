import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { PokemonDetails } from '../../models/pokemon.model';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any;
  isLoading = false;

  totalPokemon: number = 1000; 
  pageSize: number = 20;
  currentPage: number = 0;

  searchedPokemon: any = null;
  searchError: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.isLoading = true;
    const offset = this.currentPage * this.pageSize;

    this.pokemonService.getPokemonList(this.pageSize, offset).subscribe({
      next: (results) => {
        const details$ = results.map((pokemon: PokemonDetails) =>
          this.pokemonService.getPokemonInfo(pokemon.name).pipe(
            switchMap((info) =>
              this.pokemonService.getPokemonSpecies(pokemon.name).pipe(
                map((species) => ({ ...info, description: species }))
              )
            )
          )
        );

        forkJoin(details$).subscribe({
          next: (data) => {
            this.pokemonList = data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading Pokémon details', err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error fetching Pokémon list:', err);
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadPokemonList();
  }

  goToFirstPage(): void {
    this.currentPage = 0;
    this.loadPokemonList();
  }

  goToLastPage(): void {
    const lastPage = Math.floor(this.totalPokemon / this.pageSize);
    this.currentPage = lastPage;
    this.loadPokemonList();
  }

  onSearchPokemon(term: string): void {
    const search = term.trim().toLowerCase();
    if (!search) {
      this.searchedPokemon = null;
      this.searchError = '';
      this.loadPokemonList();
      return;
    }

    const match = this.pokemonList.find((p: any) => p.name.toLowerCase().includes(search));

    if (match) {
      this.searchedPokemon = match;
      this.searchError = '';
    } else {
      this.searchedPokemon = null;
      this.searchError = `Pokémon "${term}" no encontrado 😔`;
    }
  }
}
