import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/movies`


  getAll():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.api)
  }


  getById(id: number): Observable<Movie> {
  return this.http.get<Movie>(`${this.api}/${id}`);
  }

}
