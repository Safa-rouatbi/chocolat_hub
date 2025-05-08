// src/app/services/chocolat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chocolat {
  _id?: string;
  nom: string;
  type: string;
  origine: string;
  description?: string;
  prix: number;
}

@Injectable({ providedIn: 'root' })
export class ChocolatService {
  private apiUrl = 'http://localhost:5000/api/chocolats';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Chocolat[]> {
    return this.http.get<Chocolat[]>(this.apiUrl);
  }

  add(chocolat: Chocolat): Observable<Chocolat> {
    return this.http.post<Chocolat>(this.apiUrl, chocolat);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(id: string, chocolat: Chocolat): Observable<Chocolat> {
    return this.http.put<Chocolat>(`${this.apiUrl}/${id}`, chocolat);
  }
}
