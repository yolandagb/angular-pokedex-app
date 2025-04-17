import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of Pokemon names from the API.
   * @param limit The number of Pokemon names to fetch.
   */
  getPokemonNames(limit: number): Observable<{ name: string }[]> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}`).pipe(
      map(response => response.results.map((pokemon: Pokemon) => ({ name: pokemon.name }))),
      catchError(error => {
        console.error('Error fetching pokemon names', error);
        return of([]);
      })
    );
  }

  /**
   * Fetches a paginated list of Pokemon from the API.
   * @param limit The number of Pokemon to fetch per page.
   * @param offset The starting index for fetching.
   */
  getPokemonList(limit: number, offset: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map(response => response.results),
      catchError(error => {
        console.error('Error fetching pokemon list', error);
        return of([]);
      })
    );
  }

  /**
   * Fetches detailed information about a specific Pokemon.
   * @param name The name of the Pokemon.
   */
  getPokemonInfo(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`).pipe(
      catchError(error => {
        console.error(`Error fetching info for pokemon ${name}:`, error);
        return of({});
      })
    );
  }

  /**
   * Fetches species info and returns a description in English.
   * @param name The name of the Pokemon.
   */
  getPokemonSpecies(name: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/pokemon-species/${name}`).pipe(
      map(response => {
        const entry = response.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        return entry ? entry.flavor_text : 'No description available';
      }),
      catchError(error => {
        console.error(`Error fetching species info for pokemon ${name}:`, error);
        return of('No description available');
      })
    );
  }

  /**
   * Fetches species data from a full URL.
   * @param url The full URL to the species endpoint.
   */
  getPokemonSpeciesr(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error fetching species data from URL:', error);
        return of({});
      })
    );
  }

  /**
   * Fetches evolution chain from a given URL.
   * @param url The full URL to the evolution chain endpoint.
   */
  getEvolutionChain(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error fetching evolution chain:', error);
        return of({});
      })
    );
  }
}
