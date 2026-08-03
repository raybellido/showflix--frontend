import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/auth/login/login';
import { Favorites } from './features/favorites/favorites/favorites';
import { MovieList } from './features/movies/movie-list/movie-list';
import { MovieDetail } from './features/movies/movie-detail/movie-detail';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },

  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },

      {
        path: 'movies',
        component: MovieList,
      },

      {
            path: 'movies/:id',
            component: MovieDetail
        },

      {
        path: 'favorites',
        component: Favorites,
        canActivate: [authGuard]
      },
    ],
  },
];
