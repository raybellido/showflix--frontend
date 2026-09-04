import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../shared/models/movie';
import { MovieCard } from '../movies/movie-card/movie-card';
import { MovieTrending } from '../movies/movie-trending/movie-trending';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MovieCard,MovieTrending],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);
  

  movies = signal<Movie[]>([]);

  readonly marqueeItems = [
    'Acción',
    'Ciencia ficción',
    'Drama',
    'Comedia',
    'Thriller',
    'Terror',
    'Documental',
    'Clásicos',
    'Estrenos',
    'Animación',
    'Noir',
    'Indie',
  ];

  constructor() {
    this.movieService.getAll(0, 4).subscribe({
      next: (page) => this.movies.set(page.content),
      error: () => this.movies.set([]),
    });
  }
}
