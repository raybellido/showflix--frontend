import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie';
import { MovieCard } from '../movie-card/movie-card';
import { MovieSearchService } from '../../../core/services/movieSearchService';
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { GenreService } from '../../../core/services/genreService';
import { Genre } from '../../../shared/models/genre';

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
  private genreService = inject(GenreService);
  

  currentPage = signal(0);
  pageSize = signal(8);
  totalPages = signal(0);
  totalElements = signal(0);

  movies = signal<Movie[]>([]);
  sort = signal('releaseYear,desc');
  genres = signal<Genre[]>([]);
  selectedGenre = signal<number | null>(null);

  changePage(page: number) {
    this.currentPage.set(page);
  }

  changeSort(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.sort.set(select.value);
    this.currentPage.set(0);
  }

  changeGenre(genreId: string) {
  this.selectedGenre.set(genreId ? Number(genreId) : null);
  this.currentPage.set(0);
}

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, index) => index);
  }
  clearSearch() {
    this.movieSearchService.setSearchTerm('');
  }
  private search$ = toObservable(this.movieSearchService.search);
  private page$ = toObservable(this.currentPage);
  private searchWithReset$ = this.search$.pipe(tap(() => this.currentPage.set(0)));
  private sort$ = toObservable(this.sort);
  private genre$ = toObservable(this.selectedGenre)

  ngOnInit() {
    this.genreService.getAll().subscribe({
      next: (genres) => {
        this.genres.set(genres);
      },
      error: (err) => {
        console.error('Error cargando géneros:', err);
      },
    });

    combineLatest([this.searchWithReset$, this.page$, this.sort$,this.genre$])
      .pipe(
        debounceTime(400),

        switchMap(([term, page, sort,genreId]) => {
          console.log('Buscando:', term);
          console.log('Página:', page);
          console.log('Orden:', sort);

          if (!term) {
            return this.movieService.getAll(page, this.pageSize(), sort, genreId ?? undefined);
          }

          return this.movieService.searchByTitle(term, page, this.pageSize(), sort, genreId ?? undefined);
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.movies.set(response.content);
          this.totalPages.set(response.totalPages);
          this.totalElements.set(response.totalElements);
        },

        error: (err) => {
          console.error(err);
        },
      });
  }
}
