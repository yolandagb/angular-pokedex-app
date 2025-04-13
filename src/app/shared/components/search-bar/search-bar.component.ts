import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,MatIconModule,CommonModule],
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');
  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.search.emit(value?.trim().toLowerCase());
      });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.search.emit('');
  }
  
}
