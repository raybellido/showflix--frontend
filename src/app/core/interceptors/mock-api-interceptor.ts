import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../enviroment';
import { Movie } from '../../shared/models/movie';
import { UserResponse } from '../../shared/models/user-response';
import {
  blockedMovieIds,
  buildMockToken,
  deletedMovieIds,
  favoriteIds,
  genres,
  movies,
  paginate,
  sortBy,
  users,
} from '../mocks/mock-data';

const json = (status: number, body: unknown): Observable<HttpResponse<unknown>> =>
  of(new HttpResponse({ status, body }));

const empty = (status: number): Observable<HttpResponse<unknown>> =>
  of(new HttpResponse({ status }));

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.mockApi) {
    return next(req);
  }

  const method = req.method;
  const path = req.url.split('?')[0].replace(environment.apiUrl, '');
  const params = req.params;

  const respond = (obs: Observable<HttpResponse<unknown>>): Observable<HttpResponse<unknown>> =>
    obs.pipe(delay(350));

  // ---------- AUTH ----------
  if (method === 'POST' && path === '/auth/login') {
    const body = req.body as { email?: string } | null;
    const email = body?.email ?? 'usuario@email.com';
    const isAdmin = email.toLowerCase().includes('admin');

    return respond(
      json(200, {
        token: buildMockToken(isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER', isAdmin ? 'Administrador Demo' : 'Usuario Demo', email),
        type: 'Bearer',
        name: isAdmin ? 'Administrador Demo' : 'Usuario Demo',
        email,
        role: isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER',
      }),
    );
  }

  if (method === 'POST' && path === '/auth/register') {
    const body = req.body as { name?: string; email?: string } | null;
    const name = body?.name ?? 'Nuevo Usuario';
    const email = body?.email ?? 'nuevo@email.com';

    return respond(
      json(200, {
        token: buildMockToken('ROLE_USER', name, email),
        type: 'Bearer',
        name,
        email,
        role: 'ROLE_USER',
      }),
    );
  }

  // ---------- GENRES ----------
  if (method === 'GET' && path === '/genres') {
    return respond(json(200, genres));
  }

  // ---------- MOVIES ----------
  if (method === 'GET' && path === '/movies') {
    const page = Number(params.get('page') ?? 0);
    const size = Number(params.get('size') ?? 8);
    const sort = params.get('sort') ?? 'releaseYear,desc';
    const title = params.get('title')?.toLowerCase();
    const genreId = params.get('genreId');

    let result = movies.filter((m) => !deletedMovieIds.has(m.id));

    if (title) {
      result = result.filter((m) => m.title.toLowerCase().includes(title));
    }

    if (genreId) {
      result = result.filter((m) => m.genreId === Number(genreId));
    }

    const sorted = sortBy(result, sort, (m) => {
      if (sort.startsWith('title') || sort.startsWith('name')) {
        return m.title;
      }

      if (sort.startsWith('rating')) {
        return m.rating;
      }

      return m.releaseYear;
    });

    return respond(json(200, paginate(sorted, page, size)));
  }

  const movieIdMatch = path.match(/^\/movies\/(\d+)$/);

  if (method === 'GET' && movieIdMatch) {
    const id = Number(movieIdMatch[1]);

    if (blockedMovieIds.has(id) || deletedMovieIds.has(id)) {
      return respond(empty(404));
    }

    const movie = movies.find((m) => m.id === id);

    return respond(movie ? json(200, movie) : empty(404));
  }

  if (method === 'PUT' && movieIdMatch) {
    const id = Number(movieIdMatch[1]);
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
      return respond(empty(404));
    }

    const updates = req.body as Partial<Movie>;
    const updated: Movie = { ...movies[index], ...updates };
    movies[index] = updated;

    return respond(json(200, updated));
  }

  if (method === 'DELETE' && movieIdMatch) {
    const id = Number(movieIdMatch[1]);

    deletedMovieIds.add(id);
    favoriteIds.delete(id);

    return respond(empty(204));
  }

  // ---------- FAVORITES ----------
  if (method === 'GET' && path === '/favorites') {
    const favorites = movies.filter((m) => favoriteIds.has(m.id));

    return respond(json(200, favorites));
  }

  if (method === 'POST' && path.match(/^\/favorites\/(\d+)$/)) {
    const movieId = Number(path.match(/^\/favorites\/(\d+)$/)![1]);

    favoriteIds.add(movieId);

    return respond(empty(200));
  }

  if (method === 'DELETE' && path.match(/^\/favorites\/(\d+)$/)) {
    const movieId = Number(path.match(/^\/favorites\/(\d+)$/)![1]);

    favoriteIds.delete(movieId);

    return respond(empty(204));
  }

  if (method === 'GET' && path.match(/^\/favorites\/check\/(\d+)$/)) {
    const movieId = Number(path.match(/^\/favorites\/check\/(\d+)$/)![1]);

    return respond(json(200, favoriteIds.has(movieId)));
  }

  // ---------- USERS ----------
  if (method === 'GET' && path === '/users') {
    const page = Number(params.get('page') ?? 0);
    const size = Number(params.get('size') ?? 20);
    const sort = params.get('sort') ?? 'name,asc';
    const status = params.get('status');

    let result = status ? users.filter((u) => u.status === status) : [...users];

    const sorted = sortBy(result, sort, (u: UserResponse) => u.name);

    return respond(json(200, paginate(sorted, page, size)));
  }

  const userIdMatch = path.match(/^\/users\/(\d+)(\/restore)?$/);

  if (method === 'DELETE' && path.match(/^\/users\/(\d+)$/)) {
    const id = Number(path.match(/^\/users\/(\d+)$/)![1]);
    const user = users.find((u) => u.id === id);

    if (user) {
      user.status = 'INACTIVE';
    }

    return respond(empty(204));
  }

  if (method === 'PATCH' && userIdMatch && userIdMatch[2] === '/restore') {
    const id = Number(userIdMatch[1]);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return respond(empty(404));
    }

    user.status = 'ACTIVE';

    return respond(json(200, user));
  }

  return next(req);
};