import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Genre } from '../../shared/models/genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/genres`

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.api);
  }
}
