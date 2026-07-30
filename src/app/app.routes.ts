import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/auth/login/login';
import { Favorites } from './features/favorites/favorites/favorites';
import { MovieList } from './features/movies/movie-list/movie-list';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'movies',
        component: MovieList
      },
      {
        path: 'favorites',
        component: Favorites
      },
      {
        path: 'login',
        component: Login
      }
    ]
  }
];
