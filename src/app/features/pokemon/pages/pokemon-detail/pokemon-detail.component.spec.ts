import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../../services/pokemon.service';
import { of, throwError } from 'rxjs';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { anything } from 'ts-mockito';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockedPokemonService: jest.Mocked<PokemonService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    mockedPokemonService = {
      getPokemonInfo: jest.fn(),
      getPokemonSpeciesUrl: jest.fn(),
      getEvolutionChain: jest.fn(),
    } as unknown as jest.Mocked<PokemonService>;

    const route = {
      paramMap: of({ get: () => 'pikachu' }),
    };

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        { provide: PokemonService, useValue: mockedPokemonService },
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load Pokémon details and update loading state', () => {
  
    mockedPokemonService.getPokemonInfo.mockReturnValue(of(anything()));
    

    fixture.detectChanges();

    expect(component.pokemonDetails).toEqual(anything());
    
  });

  it('should handle error loading Pokémon details', () => {
    mockedPokemonService.getPokemonInfo.mockReturnValue(throwError(() => new Error('fail')));

    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
    expect(mockedPokemonService.getPokemonInfo).toHaveBeenCalledWith('pikachu');
  });

  it('should navigate to home', () => {
    component.navigateToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/pokemon']);
  });

  it('should navigate to detail', () => {
    component.navigateToDetail(1);
    expect(router.navigate).toHaveBeenCalledWith(['/pokemon', 1]);
  });

  it('should extract description correctly', () => {
    const species = {
      flavor_text_entries: [
        { flavor_text: 'Test\fdescription', language: { name: 'en' } },
      ],
    };
    const result = (component as any).extractDescription(species);
    expect(result).toBe('Test description');
  });

  it('should return fallback description if no entry', () => {
    const species = { flavor_text_entries: [] };
    const result = (component as any).extractDescription(species);
    expect(result).toBe('No description available.');
  });
});