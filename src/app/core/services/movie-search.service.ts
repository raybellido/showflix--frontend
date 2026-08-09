import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  private searchTerm = signal<string>('');

  get search(): import('@angular/core').Signal<string> {
    return this.searchTerm;
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term.trim());
  }
}