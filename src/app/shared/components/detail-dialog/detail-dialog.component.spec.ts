import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailDialogComponent } from './detail-dialog.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('DetailDialogComponent', () => {
  let component: DetailDialogComponent;
  let fixture: ComponentFixture<DetailDialogComponent>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, DetailDialogComponent, CapitalizePipe],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});