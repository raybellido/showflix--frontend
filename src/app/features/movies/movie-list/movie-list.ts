import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  constructor() {
    console.log('MovieList creado');
  }

  private movieService = inject(MovieService);

  movies = signal<Movie[]>([]);

  ngOnInit() {
    this.movieService.getAll().subscribe({
      next: (movies) => {
        console.log('LLEGARON:', movies);

        setTimeout(() => {
          this.movies.set(movies);
        }, 1000);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
