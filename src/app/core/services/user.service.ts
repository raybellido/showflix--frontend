import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';
import { UserResponse } from '../../shared/models/user-response';
import { PageResponse } from '../../shared/models/page-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/users`;

  getAll(
    page = 0,
    size = 4,
    sort = 'name,asc',
    status?: string,
  ): Observable<PageResponse<UserResponse>> {
    return this.http.get<PageResponse<UserResponse>>(this.api, {
      params: {
        page,
        size,
        sort,
        ...(status !== undefined && { status }),
      },
    });
  }

  softDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  restore(id: number): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.api}/${id}/restore`, null);
  }
}
