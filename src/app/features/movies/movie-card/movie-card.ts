import { Component, input } from '@angular/core';
import { Movie } from '../../../shared/models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {

  movie = input.required<Movie>();
}
