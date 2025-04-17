import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { mock, instance, when, verify, reset } from 'ts-mockito';
import { of } from 'rxjs';
import { PokemonDetails } from '../../models/pokemon.model';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockedPokemonService: PokemonService;
  let pokemonServiceMock: PokemonService;

  const mockPokemonList = [
    { name: 'bulbasaur' },
  ] as PokemonDetails[];

  const mockPokemonInfo = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
  };

  const mockPokemonSpecies = 'A seed Pokémon.';

  beforeEach(async () => {
    mockedPokemonService = mock(PokemonService);
    pokemonServiceMock = instance(mockedPokemonService);

    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    reset(mockedPokemonService);
  });

  it('should load Pokémon list on init', fakeAsync(() => {
    when(mockedPokemonService.getPokemonList(20, 0)).thenReturn(of(mockPokemonList));
    when(mockedPokemonService.getPokemonInfo('bulbasaur')).thenReturn(of(mockPokemonInfo));
    when(mockedPokemonService.getPokemonSpecies('bulbasaur')).thenReturn(of(mockPokemonSpecies));

    component.ngOnInit();
    verify(mockedPokemonService.getPokemonList(20, 0)).once();
    verify(mockedPokemonService.getPokemonInfo('bulbasaur')).once();
    verify(mockedPokemonService.getPokemonSpecies('bulbasaur')).once();
    

    expect(component.pokemonList.length).toBe(2);
    expect(component.pokemonList[0].name).toBe('bulbasaur');
    expect(component.isLoading).toBeFalse();
  }));
});
