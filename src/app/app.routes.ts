import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/auth/login/login';
import { Favorites } from './features/favorites/favorites/favorites';
import { MovieList } from './features/movies/movie-list/movie-list';
import { MovieDetail } from './features/movies/movie-detail/movie-detail';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { Dashboard } from './features/admin/dashboard/dashboard';
import { AdminMovieList } from './features/admin/movies/admin-movie-list/admin-movie-list';
import { AdminMovieEdit } from './features/admin/movies/admin-movie-edit/admin-movie-edit';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },

  {
    path: 'register',
    component: Register,
  },


  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: Dashboard,
      },

      {
        path: 'movies',
        component: AdminMovieList,
      },

      {
        path: 'movies/edit/:id',
        component: AdminMovieEdit,
      },
    ],
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
        component: MovieDetail,
      },

      {
        path: 'favorites',
        component: Favorites,
        canActivate: [authGuard],
      },
    ],
  },


  {
    path: '**',
    redirectTo: '',
  },
];
