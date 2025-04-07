import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>(); // Emite el término de búsqueda
  searchControl = new FormControl(); // Control del campo de búsqueda

  constructor() {
    // Escucha los cambios en el campo de búsqueda
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged()) // Espera 300ms y evita valores repetidos consecutivos
      .subscribe((value) => {
        this.search.emit(value); // Emite el término de búsqueda
      });
  }
}