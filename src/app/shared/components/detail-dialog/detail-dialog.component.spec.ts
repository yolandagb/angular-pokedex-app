import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailDialogComponent } from './detail-dialog.component';
import { Router } from '@angular/router';
import { of } from 'rxjs'; // Si necesitas usar observables
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { mock } from 'ts-mockito';



describe('DetailDialogComponent', () => {
  let component: DetailDialogComponent;
  let fixture: ComponentFixture<DetailDialogComponent>;
  let routerMock: Router;

  beforeEach(async () => {
   routerMock = mock(Router);
   
    await TestBed.configureTestingModule({
      imports: [CommonModule, CapitalizePipe],
      declarations: [DetailDialogComponent],
      providers: [
        { provide: Router, useValue: routerMock }, 
      ],
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

  it('should render pokemon name from pokemonDetails', () => {
    component.pokemonDetails = { name: 'Pikachu' };

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.pokemon-name').textContent).toContain('Pikachu');
  });



  it('should render abilities list if provided', () => {
    const abilities = ['Static', 'Lightning Rod'];
    component.abilities = abilities;

    const compiled = fixture.nativeElement;
    const abilitiesList = compiled.querySelectorAll('.abilities-list li');
    expect(abilitiesList.length).toBe(abilities.length);
    expect(abilitiesList[0].textContent).toContain('Static');
    expect(abilitiesList[1].textContent).toContain('Lightning Rod');
  });

  it('should render stats if provided', () => {
    const stats = [{ stat: 'Attack', base_stat: 55 }, { stat: 'Defense', base_stat: 40 }];
    component.stats = stats;

    const compiled = fixture.nativeElement;
    const statElements = compiled.querySelectorAll('.stat-item');
    expect(statElements.length).toBe(stats.length);
    expect(statElements[0].textContent).toContain('Attack');
    expect(statElements[0].textContent).toContain('55');
    expect(statElements[1].textContent).toContain('Defense');
    expect(statElements[1].textContent).toContain('40');
  });

  it('should display description if provided', () => {
    const description = 'A yellow electric-type Pokémon';
    component.description = description;

    fixture.detectChanges(); 

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.description').textContent).toContain(description);
  });
});
