import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DetailDialogComponent } from '../../../../shared/components/detail-dialog/detail-dialog.component';
import { SkeletonDialogComponent } from '../../../../shared/components/skeleton-dialog/skeleton-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize.pipe';
@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CapitalizePipe, CommonModule, SkeletonDialogComponent, DetailDialogComponent, MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string | null = null;
  pokemonDetails: any = null;
  evolutionChain: any[] = [];
  isLoading = true;

   description = '';
   stats: any[] = [];
   abilities: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonName = params.get('id');
      if (this.pokemonName) {
        this.resetState();
        this.loadPokemonData();
      }
    });
  }

  navigateToAbout(): void {
    window.open('https://pokeapi.co/', '_blank');
  }

  private resetState(): void {
    this.isLoading = true;
    this.pokemonDetails = null;
    this.evolutionChain = [];
    this.stats = [];
    this.abilities = [];
    this.description = '';
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  navigateToHome() {
    this.router.navigate(['/pokemon']);
  }

  private loadPokemonData(): void {
    this.pokemonService.getPokemonInfo(this.pokemonName!).subscribe({
      next: (details) => {
        this.pokemonDetails = details;
        this.stats = details.stats;
        this.abilities = details.abilities.map((a: any) => a.ability.name);

        this.loadSpeciesData(details.species.url);
      },
      error: (err) => this.handleError(err, 'Error loading Pokémon details'),
    });
  }

  private loadSpeciesData(url: string): void {
    this.pokemonService.getPokemonSpeciesUrl(url).subscribe({
      next: (species:any) => {
        this.description = this.extractDescription(species);
        this.loadEvolutionChain(species.evolution_chain.url);
      },
      error: (err) => this.handleError(err, 'Error loading species data'),
    });
  }

  private loadEvolutionChain(url: string): void {
    this.pokemonService.getEvolutionChain(url).subscribe({
      next: (data: any) => {
        this.extractEvolutionsFromChain(data.chain);
        this.isLoading = false;
      },
      error: (err) => this.handleError(err, 'Error loading evolution chain'),
    });
  }


  private extractDescription(species: any): string {
    const entry = species.flavor_text_entries.find((e: any) => e.language.name === 'en');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
  }

  private extractEvolutionsFromChain(chain: any): void {
    const evolutions: string[] = [];

    const traverseChain = (node: any): void => {
      evolutions.push(node.species.name);
      node.evolves_to.forEach(traverseChain);
    };

    traverseChain(chain);

    evolutions.forEach(name => {
      this.pokemonService.getPokemonInfo(name).subscribe(poke => {
        this.evolutionChain.push({
          name: poke.name,
          id: poke.id,
          image: poke.sprites.other?.['official-artwork']?.front_default || poke.sprites.front_default,
        });
      });
    });
  }


  private handleError(error: any, msg: string): void {
    console.error(msg, error);
    this.isLoading = false;
  }



}





