import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDialogComponent } from './skeleton-dialog.component';

describe('SkeletonDialogComponent', () => {
  let component: SkeletonDialogComponent;
  let fixture: ComponentFixture<SkeletonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkeletonDialogComponent]
    });
    fixture = TestBed.createComponent(SkeletonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
