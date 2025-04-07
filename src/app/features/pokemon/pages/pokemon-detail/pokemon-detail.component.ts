import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CapitalizePipe],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string | null = null; // Nombre del Pokémon obtenido de la ruta
  pokemonDetails: any = null; // Detalles del Pokémon

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonName = this.route.snapshot.paramMap.get('id'); // Obtiene el nombre o ID del Pokémon desde la URL
    this.getPokemonDetails();
  }

  private getPokemonDetails(): void {
    if (this.pokemonName) {
      this.pokeApiService.getPokemonInfo(this.pokemonName).subscribe({
        next: (details: any) => {
          this.pokemonDetails = details;
          this.pokemonDetails.height = details?.height * 10; // Convierte la altura a cm
          this.pokemonDetails.weight = details?.weight / 10; // Convierte el peso a kg
          this.pokemonDetails.types = details?.types.map(
            (typeInfo: any) => typeInfo?.type?.name // Extrae los nombres de los tipos
          );
        },
        error: (error) => {
          console.error('Error fetching Pokémon details:', error);
        },
      });
    }
  }
}