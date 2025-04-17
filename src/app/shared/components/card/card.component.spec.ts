
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { mock, instance } from 'ts-mockito';
import { PokemonService } from 'src/app/features/pokemon/services/pokemon.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockedPokemonService: PokemonService;

  beforeEach(() => {
    mockedPokemonService = mock(PokemonService);

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
});
