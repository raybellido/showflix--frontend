import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../shared/models/movie';
import { MovieService } from '../../../core/services/movie.service';
import { FavoriteService } from '../../../core/services/favoriteService';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private favoriteService = inject(FavoriteService);

  isFavorite = signal(false);

  movie = signal<Movie | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getById(id).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        console.log(movie);
      },

      error: (err) => console.error(err),
    });
  }

  addFavorite() {
    const id = this.movie()?.id;

    if (!id) return;

    this.favoriteService.addFavorite(id).subscribe({
      next: () => {
        console.log('Agregado a favoritos');
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  toggleFavorite() {
    const movieId = this.movie()?.id;

    if (!movieId) {
      return;
    }

    if (this.isFavorite()) {
      this.favoriteService.removeFavorite(movieId).subscribe({
        next: () => {
          this.isFavorite.set(false);

          console.log('Eliminado de favoritos');
        },
      });
    } else {
      this.favoriteService.addFavorite(movieId).subscribe({
        next: () => {
          this.isFavorite.set(true);

          console.log('Agregado a favoritos');
        },
      });
    }
  }
}
