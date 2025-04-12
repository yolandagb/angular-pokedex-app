import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule, CapitalizePipe],
})
export class CardComponent {
  @Input() pokemonList: any[] = [];
  @Input() pokemonDetails: any = null;
  constructor(private router: Router) { }
  ngOnInit(): void {
    if (this.pokemonList?.length && this.pokemonDetails) {;
    }
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}