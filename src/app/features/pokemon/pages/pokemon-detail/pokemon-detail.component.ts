import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CapitalizePipe, CardComponent,CommonModule, MatIconModule],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string | null = null; 
  pokemonDetails: any = null; 
  evolutionChain:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokemonService,
  private router: Router

  ) {}

  ngOnInit(): void {
    this.pokemonName = this.route.snapshot.paramMap.get('id'); 
    this.getPokemonDetails();

  }
  navigateToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  private getPokemonDetails(): void {
    if (this.pokemonName) {
      this.pokeApiService.getPokemonInfo(this.pokemonName).subscribe({
        next: (details: any) => {
          this.pokemonDetails = details;
  
          this.pokeApiService.getPokemonSpeciesr(details.species.url).subscribe({
            next: (species: any) => {
              const evoUrl = species.evolution_chain.url;
  
              this.pokeApiService.getEvolutionChain(evoUrl).subscribe({
                next: (evolutionData: any) => {
                  this.extractEvolutionsFromChain(evolutionData.chain);
                },
                error: (err) => console.error('Error evolution chain:', err),
              });
            },
            error: (err) => console.error('Error species:', err),
          });
        },
        error: (error) => {
          console.error('Error fetching Pokémon details:', error);
        },
      });
    }
  }

  private extractEvolutionsFromChain(chain: any): void {
    const evolutions: string[] = [];
  
    const traverseChain = (node: any) => {
      evolutions.push(node.species.name);
      if (node.evolves_to.length) {
        node.evolves_to.forEach((child: any) => traverseChain(child));
      }
    };
  
    traverseChain(chain); 
  
    evolutions.forEach(name => {
      this.pokeApiService.getPokemonInfo(name).subscribe((poke: any) => {
        this.evolutionChain.push({
          name: poke.name,
          id: poke.id,
          image: poke.sprites.other?.['official-artwork']?.front_default || poke.sprites.front_default,
        });
      });
    });
  }
  
  
  
  
  
}