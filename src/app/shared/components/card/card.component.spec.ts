
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { mock, instance } from 'ts-mockito';
import { PokemonService } from 'src/app/features/pokemon/services/pokemon.service';
import { Router } from '@angular/router';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockedPokemonService: PokemonService;
  let routerMock: Router;

  beforeEach(() => {
    mockedPokemonService = mock(PokemonService);
    routerMock = mock(Router);

    TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        { provide: PokemonService, useValue: instance(mockedPokemonService) }
      ]
    });

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

  it('should not call navigate when pokemonList is empty', () => {
    component.pokemonList = [];
    component.pokemonDetails = null;
    
    component.navigateToDetail(1);

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
  

});
