import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../../shared/models/movie';
import { FavoriteService } from '../../../core/services/favoriteService';
import { MovieCard } from '../../movies/movie-card/movie-card';

@Component({
  selector: 'app-favorites',
  imports: [MovieCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private favoriteService = inject(FavoriteService);

  movies = signal<Movie[]>([])

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe({
      next: (movies) => {
        this.movies.set(movies);

        console.log(movies);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
