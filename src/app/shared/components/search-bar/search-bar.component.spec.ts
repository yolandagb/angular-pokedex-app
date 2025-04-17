import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchEmitterMock: jest.Mock;

  beforeEach(() => {
    searchEmitterMock = jest.fn();

    TestBed.configureTestingModule({
      imports: [SearchBarComponent, ReactiveFormsModule], // Importa el componente standalone
    });

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;

    component.clearSearch = searchEmitterMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an empty string when clearSearch is called', () => {
    component.searchControl.setValue('Test search');
    expect(component.searchControl.value).toBe('Test search');

    component.clearSearch();

    expect(component.searchControl.value).toBe('Test search');
  });
});