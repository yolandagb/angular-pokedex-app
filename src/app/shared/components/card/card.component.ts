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
  imports: [MatCardModule,CommonModule,CapitalizePipe],
})
export class CardComponent {
  @Input() pokemonNames: any[] = []; 
  constructor(private router: Router) {}

  navigateToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]); 
  }
}