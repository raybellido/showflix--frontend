import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/favorites`;

  addFavorite(movieId: number) {
    return this.http.post<void>(`${this.api}/${movieId}`, {});
  }

  removeFavorite(movieId: number) {
    return this.http.delete<void>(`${this.api}/${movieId}`);
  }

  getFavorites() {
    return this.http.get<any[]>(this.api);
  }

  isFavorite(movieId: number) {
    return this.http.get<boolean>(`${this.api}/check/${movieId}`);
  }
}
