import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { instance, mock, when, verify, anything } from 'ts-mockito';
import { of, throwError } from 'rxjs';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockPokemonService: PokemonService;
  let mockActivatedRoute: ActivatedRoute;
  let mockRouter: Router;

  beforeEach(() => {
    mockPokemonService = mock(PokemonService);
    mockActivatedRoute = mock(ActivatedRoute);
    mockRouter = mock(Router);

    TestBed.configureTestingModule({
      imports: [PokemonDetailComponent], 
      providers: [
        { provide: PokemonService, useValue: instance(mockPokemonService) },
        { provide: ActivatedRoute, useValue: instance(mockActivatedRoute) },
        { provide: Router, useValue: instance(mockRouter) },
      ],
    });

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load Pokémon data successfully', () => {

    const mockPokemonDetails = {
      name: 'pikachu',
      stats: [{ base_stat: 50 }],
      abilities: [{ ability: { name: 'static' } }],
      species: { url: 'mock-species-url' },
    };
    const mockEvolutionChain = {
      chain: { species: { name: 'pichu' }, evolves_to: [{ species: { name: 'pikachu' } }] },
    };

    when(mockPokemonService.getPokemonInfo('pikachu')).thenReturn(of(mockPokemonDetails));
    when(mockPokemonService.getEvolutionChain('mock-evolution-chain-url')).thenReturn(of(mockEvolutionChain));

    when(mockActivatedRoute.paramMap).thenReturn(of({ get: () => 'pikachu' } as any));

    component.ngOnInit();

    expect(component.pokemonDetails).toEqual(mockPokemonDetails);
    expect(component.description).toBe('Electric mouse Pokémon.');
    expect(component.evolutionChain.length).toBe(2); 
    expect(component.isLoading).toBeFalse();

    verify(mockPokemonService.getPokemonInfo('pikachu')).once();
    verify(mockPokemonService.getEvolutionChain('mock-evolution-chain-url')).once();
  });

  it('should handle error when loading Pokémon data', () => {
    when(mockPokemonService.getPokemonInfo('pikachu')).thenReturn(throwError(() => new Error('Error fetching Pokémon')));

   
    expect(component.isLoading).toBeFalse();
  
    verify(mockPokemonService.getPokemonInfo('pikachu')).once();
  });
});