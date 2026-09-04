import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../shared/models/movie';
import { FavoriteService } from '../../../core/services/favoriteService';
import { MovieCard } from '../../movies/movie-card/movie-card';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, MovieCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  private favoriteService = inject(FavoriteService);

  movies = signal<Movie[]>([]);

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe({
      next: (movies) => {
        this.movies.set(movies);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
