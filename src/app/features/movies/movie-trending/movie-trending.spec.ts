import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrending } from './movie-trending';

describe('MovieTrending', () => {
  let component: MovieTrending;
  let fixture: ComponentFixture<MovieTrending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTrending],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieTrending);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
