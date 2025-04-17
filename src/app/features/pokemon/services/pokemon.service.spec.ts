import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { instance, mock, when, verify } from 'ts-mockito';
import { of, throwError } from 'rxjs';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = mock(HttpClient);

    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        { provide: HttpClient, useValue: instance(mockHttpClient) },
      ],
    });

    service = TestBed.inject(PokemonService);
  });

  it('should fetch a list of Pokémon names', () => {
    const mockResponse = {
      results: [
        { name: 'pikachu' },
        { name: 'bulbasaur' },
        { name: 'charmander' },
      ],
    };

    when(mockHttpClient.get(`${service['apiUrl']}/pokemon?limit=3`)).thenReturn(of(mockResponse));

    service.getPokemonNames(3).subscribe((names) => {
      expect(names).toEqual([
        { name: 'pikachu' },
        { name: 'bulbasaur' },
        { name: 'charmander' },
      ]);
    });

    verify(mockHttpClient.get(`${service['apiUrl']}/pokemon?limit=3`)).once();
  });

  it('should handle errors when fetching Pokémon names', () => {
    when(mockHttpClient.get(`${service['apiUrl']}/pokemon?limit=3`)).thenReturn(
      throwError(() => new Error('Network error'))
    );

    service.getPokemonNames(3).subscribe((names) => {
      expect(names).toEqual([]);
    });

    verify(mockHttpClient.get(`${service['apiUrl']}/pokemon?limit=3`)).once();
  });

  it('should fetch Pokémon details', () => {
    const mockDetails = { name: 'pikachu', stats: [], abilities: [] };

    when(mockHttpClient.get(`${service['apiUrl']}/pokemon/pikachu`)).thenReturn(of(mockDetails));

    service.getPokemonInfo('pikachu').subscribe((details) => {
      expect(details).toEqual(mockDetails);
    });

    verify(mockHttpClient.get(`${service['apiUrl']}/pokemon/pikachu`)).once();
  });

  it('should handle errors when fetching Pokémon details', () => {
    when(mockHttpClient.get(`${service['apiUrl']}/pokemon/pikachu`)).thenReturn(
      throwError(() => new Error('Network error'))
    );

    service.getPokemonInfo('pikachu').subscribe((details) => {
      expect(details).toEqual({});
    });

    verify(mockHttpClient.get(`${service['apiUrl']}/pokemon/pikachu`)).once();
  });
});