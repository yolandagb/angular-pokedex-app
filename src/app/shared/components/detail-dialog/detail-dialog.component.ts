import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-dialog',
  standalone: true,
  imports: [CommonModule,CapitalizePipe],
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialogComponent {
  @Input() pokemonDetails: any = null;
  @Input() pokemonList: any = null;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.pokemonList?.length && this.pokemonDetails) {;
    }
}


}