import { Genre } from '../../shared/models/genre';
import { Movie } from '../../shared/models/movie';
import { UserResponse } from '../../shared/models/user-response';
import { PageResponse } from '../../shared/models/page-response';

export const genres: Genre[] = [
  { id: 1, name: 'Acción' },
  { id: 2, name: 'Ciencia ficción' },
  { id: 3, name: 'Drama' },
  { id: 4, name: 'Comedia' },
  { id: 5, name: 'Thriller' },
  { id: 6, name: 'Terror' },
  { id: 7, name: 'Documental' },
  { id: 8, name: 'Animación' },
  { id: 9, name: 'Clásicos' },
  { id: 10, name: 'Indie' },
];

const img = (seed: number) => `https://picsum.photos/seed/showflix${seed}/600/900`;

export const movies: Movie[] = [
  {
    id: 1,
    title: 'El Último Amanecer',
    description:
      'Un astrónomo solitario descubre una señal imposible que lo arrastra a una conspiración interestelar.',
    duration: 128,
    releaseYear: 2024,
    genre: 'Ciencia ficción',
    imageUrl: img(1),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('El Último Amanecer trailer')}`,
    rating: 8.4,
    genreId: 2,
  },
  {
    id: 2,
    title: 'Código Sin Retorno',
    description:
      'Un hacker queda atrapado dentro de la red bancaria más segura del mundo con seis horas para salir.',
    duration: 112,
    releaseYear: 2023,
    genre: 'Thriller',
    imageUrl: img(2),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Código Sin Retorno trailer')}`,
    rating: 7.6,
    genreId: 5,
  },
  {
    id: 3,
    title: 'Nébula',
    description:
      'En una estación orbital al borde del colapso, una ingeniera debe decidir entre salvar la tripulación o el experimento de su vida.',
    duration: 141,
    releaseYear: 2025,
    genre: 'Ciencia ficción',
    imageUrl: img(3),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Nébula trailer')}`,
    rating: 9.1,
    genreId: 2,
  },
  {
    id: 4,
    title: 'La Última Función',
    description:
      'El dueño de un viejo cine de barrio organiza una función final que reunirá a un pueblo entero.',
    duration: 98,
    releaseYear: 2021,
    genre: 'Drama',
    imageUrl: img(4),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('La Última Función trailer')}`,
    rating: 7.9,
    genreId: 3,
  },
  {
    id: 5,
    title: 'Persecución en Vivo',
    description:
      'Un reportero sigue en directo a un ladrón que convierte cada barrio de la ciudad en su escenario.',
    duration: 104,
    releaseYear: 2022,
    genre: 'Acción',
    imageUrl: img(5),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Persecución en Vivo trailer')}`,
    rating: 7.2,
    genreId: 1,
  },
  {
    id: 6,
    title: 'Risa Fatal',
    description:
      'Una comedia negra sobre una standupera cuyo mejor chiste la mete en problemas muy reales.',
    duration: 95,
    releaseYear: 2023,
    genre: 'Comedia',
    imageUrl: img(6),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Risa Fatal trailer')}`,
    rating: 6.8,
    genreId: 4,
  },
  {
    id: 7,
    title: 'El Susurro del Bosque',
    description:
      'Un grupo de campistas graba sonidos que no deberían existir en la montaña más antigua del país.',
    duration: 101,
    releaseYear: 2024,
    genre: 'Terror',
    imageUrl: img(7),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('El Susurro del Bosque trailer')}`,
    rating: 7.7,
    genreId: 6,
  },
  {
    id: 8,
    title: 'Ciudad de Cartón',
    description:
      'Un documental íntimo sobre los artesanos urbanos que construyen el alma de la metrópolis.',
    duration: 87,
    releaseYear: 2020,
    genre: 'Documental',
    imageUrl: img(8),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Ciudad de Cartón trailer')}`,
    rating: 8.0,
    genreId: 7,
  },
  {
    id: 9,
    title: 'El Roble y la Luna',
    description:
      'Un clásico restaurado sobre dos amigos que cruzan a pie el país para devolver un árbol que nunca debió moverse.',
    duration: 116,
    releaseYear: 1958,
    genre: 'Clásicos',
    imageUrl: img(9),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('El Roble y la Luna trailer')}`,
    rating: 8.8,
    genreId: 9,
  },
  {
    id: 10,
    title: 'Salto al Vacío',
    description:
      'Un cineasta independiente filma sus últimos 17 minutos antes de arriesgarse a lo que siempre soñó.',
    duration: 79,
    releaseYear: 2025,
    genre: 'Indie',
    imageUrl: img(10),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Salto al Vacío trailer')}`,
    rating: 8.2,
    genreId: 10,
  },
  {
    id: 11,
    title: 'Sombras del Paraíso',
    description:
      'Ambientada en el Miami de los 80, un detective cree estar tras un asesino… pero los muertos siguen caminando.',
    duration: 124,
    releaseYear: 2021,
    genre: 'Noir',
    imageUrl: img(11),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Sombras del Paraíso trailer')}`,
    rating: 8.5,
    genreId: 10,
  },
  {
    id: 12,
    title: 'Frontera Invisible',
    description:
      'Un tenso thriller fronterizo que jamás llegó a estrenarse por conflictos de distribución.',
    duration: 109,
    releaseYear: 2019,
    genre: 'Thriller',
    imageUrl: img(12),
    trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Frontera Invisible trailer')}`,
    rating: 6.5,
    genreId: 5,
  },
];

export const users: UserResponse[] = [
  { id: 1, name: 'Carlos Huamán', email: 'carlos@email.com', role: 'ROLE_ADMIN', status: 'ACTIVE' },
  { id: 2, name: 'María López', email: 'maria@email.com', role: 'ROLE_USER', status: 'ACTIVE' },
  { id: 3, name: 'Jorge Rojas', email: 'jorge@email.com', role: 'ROLE_USER', status: 'ACTIVE' },
  { id: 4, name: 'Valeria Díaz', email: 'valeria@email.com', role: 'ROLE_USER', status: 'INACTIVE' },
  { id: 5, name: 'Luis Torres', email: 'luis@email.com', role: 'ROLE_USER', status: 'ACTIVE' },
  { id: 6, name: 'Paola Mendoza', email: 'paola@email.com', role: 'ROLE_USER', status: 'INACTIVE' },
];

export const blockedMovieIds = new Set<number>([12]);

export const deletedMovieIds = new Set<number>([]);

export const favoriteIds = new Set<number>([1, 3]);

export function buildMockToken(role: string, name: string, email: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: 'mock', name, email, role }));
  return `${header}.${payload}.mock-signature`;
}

export function sortBy<T>(items: T[], sort: string, key: (item: T) => number | string): T[] {
  const [field, direction] = sort.split(',');
  const factor = direction === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const av = key(a);
    const bv = key(b);

    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * factor;
    }

    return String(av).localeCompare(String(bv)) * factor;
  });
}

export function paginate<T>(
  items: T[],
  page: number,
  size: number,
): PageResponse<T> {
  const start = page * size;

  return {
    content: items.slice(start, start + size),
    totalElements: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / size)),
    size,
    number: page,
    first: page === 0,
    last: start + size >= items.length,
  };
}