import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chocolat } from '../interfaces/chocolat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChocolatService {
  private apiUrl = 'http://localhost:3000/chocolats';

  constructor(private http: HttpClient) { }

  getAllChocolats(): Observable<Chocolat[]> {
    return this.http.get<Chocolat[]>(this.apiUrl);
  }

  createChocolat(chocolat: Chocolat): Observable<Chocolat> {
    return this.http.post<Chocolat>(this.apiUrl, chocolat);
  }

  updateChocolat(id: string, chocolat: Chocolat): Observable<Chocolat> {
    return this.http.put<Chocolat>(`${this.apiUrl}/${id}`, chocolat);
  }

  deleteChocolat(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
