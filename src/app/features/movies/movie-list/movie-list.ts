import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie';
import { MovieCard } from '../movie-card/movie-card';
import { MovieSearchService } from '../../../core/services/movieSearchService';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  private movieService = inject(MovieService);
  private movieSearchService = inject(MovieSearchService);
  private destroyRef = inject(DestroyRef);

  movies = signal<Movie[]>([]);

  private search$ = toObservable(this.movieSearchService.search);

  ngOnInit() {
    this.search$
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),

        switchMap((term) => {
          console.log('MovieList recibe:', term);

          if (!term) {
            return this.movieService.getAll();
          }

          return this.movieService.searchByTitle(term);
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => this.movies.set(response.content),
        error: (err) => console.error(err),
      });
  }
}
