import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
      
      ],
      providers: [
        { provide: Router, useValue: routerMock }, 
      ],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the pokemon detail page on navigateToDetail', () => {
    const pokemonId = 1;

    component.navigateToDetail(pokemonId);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/pokemon', pokemonId]);
  });


});