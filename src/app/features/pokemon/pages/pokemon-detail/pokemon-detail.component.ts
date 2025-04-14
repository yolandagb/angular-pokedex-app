import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DetailDialogComponent } from 'src/app/shared/components/detail-dialog/detail-dialog.component';
import { SkeletonDialogComponent } from 'src/app/shared/components/skeleton-dialog/skeleton-dialog.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CapitalizePipe, CardComponent, CommonModule, MatIconModule, SkeletonDialogComponent, DetailDialogComponent],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string | null = null;
  pokemonDetails: any = null;
  evolutionChain: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonName = params.get('id');
      if (this.pokemonName) {
        this.isLoading = true;
        this.pokemonDetails = null;
        this.evolutionChain = [];
        this.getPokemonDetails();
      }
    });
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  navigateToHome() {
    this.router.navigate(['/pokemon']);
  }

  private getPokemonDetails(): void {
    if (this.pokemonName) {
      this.pokemonService.getPokemonInfo(this.pokemonName).subscribe({
        next: (details: any) => {
          this.pokemonDetails = details;

          this.pokemonService.getPokemonSpeciesr(details.species.url).subscribe({
            next: (species: any) => {
              const evoUrl = species.evolution_chain.url;

              this.pokemonService.getEvolutionChain(evoUrl).subscribe({
                next: (evolutionData: any) => {
                  this.extractEvolutionsFromChain(evolutionData.chain);
                  this.isLoading = false;
                },
                error: (err) => {
                  console.error('Error evolution chain:', err);
                  this.isLoading = false;
                },
              });
            },
            error: (err) => {
              console.error('Error evolution chain:', err);
              this.isLoading = false;
            },
          });
        },
        error: (err) => {
          console.error('Error evolution chain:', err);
          this.isLoading = false;
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
      this.pokemonService.getPokemonInfo(name).subscribe((poke: any) => {
        this.evolutionChain.push({
          name: poke.name,
          id: poke.id,
          image: poke.sprites.other?.['official-artwork']?.front_default || poke.sprites.front_default,
        });
      });
    });
  }





}