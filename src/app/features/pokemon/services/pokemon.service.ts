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


   getPokemonNames(limit: number): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}`).pipe(
      map((response: any) => {
        console.log('API Response:', response); 
        return response.results.map((pokemon: any) => pokemon.name);
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

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
  }
}