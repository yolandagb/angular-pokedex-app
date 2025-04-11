import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CapitalizePipe, CardComponent],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string | null = null; 
  pokemonDetails: any = null; 

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonName = this.route.snapshot.paramMap.get('id'); 
    this.getPokemonDetails();
  }

  private getPokemonDetails(): void {
    if (this.pokemonName) {
      this.pokeApiService.getPokemonInfo(this.pokemonName).subscribe({
        next: (details: any) => {
          console.log('Pokemon Details:', details);
          this.pokemonDetails = details;
        },
        error: (error) => {
          console.error('Error fetching Pokémon details:', error);
        },
      });
    }
  }
}