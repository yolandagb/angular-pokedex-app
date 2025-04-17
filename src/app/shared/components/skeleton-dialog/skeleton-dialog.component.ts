import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-dialog.component.html',
  styleUrls: ['./skeleton-dialog.component.scss']
})
export class SkeletonDialogComponent {
  @Input() statCount: number = 0;
  @Input() showStats: boolean = false; 
  @Input() imageHeight: string = '100px'; 

}
