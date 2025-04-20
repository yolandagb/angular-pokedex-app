import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { mock, instance, when, verify, reset } from 'ts-mockito';
import { of, throwError } from 'rxjs';
import { PokemonDetails } from '../../models/pokemon.model';
import { PageEvent } from '@angular/material/paginator';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockedPokemonService: PokemonService;


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
    mockedPokemonService = instance(mockedPokemonService);

    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [
        { provide: PokemonService, useValue: mockedPokemonService },
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

    expect(component.pokemonList.length).toBe(1);
    expect(component.pokemonList[0].name).toBe('bulbasaur');
    expect(component.isLoading).toBeFalsy();

    verify(mockedPokemonService.getPokemonInfo('bulbasaur')).once();
    verify(mockedPokemonService.getPokemonSpecies('bulbasaur')).once();
    verify(mockedPokemonService.getPokemonList(20, 0)).once();
  }));

  it('should handle search successfully', () => {
    component.pokemonList = [
      { name: 'charmander' } as PokemonDetails,
      { name: 'pikachu' } as PokemonDetails,
    ];

    component.onSearchPokemon('Pika');

    expect(component.searchedPokemon?.name).toBe('pikachu');
    expect(component.searchError).toBe('');
  });

  it('should show error when searched Pokémon is not found', () => {
    component.pokemonList = [{ name: 'squirtle' } as PokemonDetails];

    component.onSearchPokemon('mewtwo');

    expect(component.searchedPokemon).toBeNull();
    expect(component.searchError).toBe('Pokémon "mewtwo" not found.');
  });


  it('should reset search if input is empty', fakeAsync(() => {
    when(mockedPokemonService.getPokemonList(20, 0)).thenReturn(of(mockPokemonList));
    when(mockedPokemonService.getPokemonInfo('bulbasaur')).thenReturn(of(mockPokemonInfo));
    when(mockedPokemonService.getPokemonSpecies('bulbasaur')).thenReturn(of(mockPokemonSpecies));

    component.onSearchPokemon('');
    tick();

    expect(component.searchedPokemon).toBeNull();
    expect(component.searchError).toBe('');
    expect(component.pokemonList.length).toBe(1);
  }));

  it('should update page and load new Pokémon on pagination change', fakeAsync(() => {
    when(mockedPokemonService.getPokemonList(10, 10)).thenReturn(of(mockPokemonList));
    when(mockedPokemonService.getPokemonInfo('bulbasaur')).thenReturn(of(mockPokemonInfo));
    when(mockedPokemonService.getPokemonSpecies('bulbasaur')).thenReturn(of(mockPokemonSpecies));

    const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };

    component.onPageChange(event);
    tick();

    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.pokemonList.length).toBe(1);
  }));

  it('should handle errors from getPokemonList', fakeAsync(() => {
    when(mockedPokemonService.getPokemonList(20, 0)).thenReturn(throwError(() => new Error('Network error')));

    component.ngOnInit();
    tick();

    expect(component.isLoading).toBe(false);
    expect(component.pokemonList).toEqual([]);
  }));

  it('should handle errors from Pokémon detail fetch', fakeAsync(() => {
    when(mockedPokemonService.getPokemonList(20, 0)).thenReturn(of(mockPokemonList));
    when(mockedPokemonService.getPokemonInfo('bulbasaur')).thenReturn(throwError(() => new Error('Oops')));
    
    component.ngOnInit();
    tick();

    expect(component.isLoading).toBe(false);
    expect(component.pokemonList).toEqual([]);
  }));

});
