import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPreferencesComponent } from './filter-preferences';

describe('FilterPreferences', () => {
  let component: FilterPreferencesComponent;
  let fixture: ComponentFixture<FilterPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
