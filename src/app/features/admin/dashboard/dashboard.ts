import { Component } from '@angular/core';
import { AdminMovieList } from '../movies/admin-movie-list/admin-movie-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
