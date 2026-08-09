import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {

  private searchTerm = signal('');

  readonly search = this.searchTerm.asReadonly();


  setSearchTerm(value: string){

    this.searchTerm.set(value.trim());

  }

}
