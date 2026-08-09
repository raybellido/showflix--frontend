import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie';
import { PageResponse } from '../../shared/models/page-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/movies`;

  getAll(page = 0, size = 8): Observable<PageResponse<Movie>> {
    return this.http.get<PageResponse<Movie>>(this.api, {
      params: {
        page,
        size,
      },
    });
  }

  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.api}/${id}`);
  }

    searchByTitle(title: string, page = 0, size = 8): Observable<PageResponse<Movie>> {
    return this.http.get<PageResponse<Movie>>(this.api, {
      params: {
        title,
        page,
        size,
      },
    });
  }
}
