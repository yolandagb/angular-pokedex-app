import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}


  /**
   * Fetches a list of Pokemon names from the API.
   * @param limit The number of Pokemon names to fetch.
   * @returns An observable containing an array of Pokemon names.
   */
  getPokemonNames(limit: number): Observable<{ name: string }[]> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}`).pipe(
      map((response: any) => {
        console.log('API Response:', response); // Verifica la respuesta
        return response.results.map((pokemon: any) => ({ name: pokemon.name }));
      }),
      catchError((error) => {
        console.error('Error fetching pokemon names', error);
        return of([]);
      })
    );
  }
  


  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response: any) => response.results),
        catchError((error) => {
          console.error('Error fetching pokemon list', error);
          return of([]);
        })
      );
  }
  /**
   * Fetches detailed information about a specific Pokemon by its name.
   * @param name The name of the Pokemon to fetch.
   * @returns An observable containing the detailed information of the Pokemon.
   */  
  getPokemonInfo(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`).pipe(
      catchError((error) => {
        console.error(`Error fetching info for pokemon ${name}:`, error);
        return of({});
      })
    );
  }
}