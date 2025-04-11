import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [MatCardModule,CommonModule],
})
export class CardComponent {
  @Input() pokemonNames: any[] = []; 
  ngOnChanges(): void {
    console.log('Pokemon Names:', this.pokemonNames);
  }
}