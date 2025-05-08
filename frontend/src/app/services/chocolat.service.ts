import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Chocolat } from '../interfaces/chocolat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChocolatService {
  private apiUrl = 'http://localhost:5000/api/chocolats';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllChocolats(): Observable<Chocolat[]> {
    return this.http.get<Chocolat[]>(this.apiUrl).pipe(
      tap(data => console.log('Chocolats récupérés:', data)),
      catchError(error => {
        console.error('Erreur lors de la récupération des chocolats:', error);
        throw error;
      })
    );
  }

  createChocolat(chocolat: Chocolat): Observable<Chocolat> {
    console.log('Création du chocolat:', chocolat);
    return this.http.post<Chocolat>(this.apiUrl, chocolat, this.httpOptions).pipe(
      tap(data => console.log('Chocolat créé:', data)),
      catchError(error => {
        console.error('Erreur lors de la création du chocolat:', error);
        throw error;
      })
    );
  }

  updateChocolat(id: string, chocolat: Chocolat): Observable<Chocolat> {
    console.log('Mise à jour du chocolat:', { id, chocolat });
    return this.http.put<Chocolat>(`${this.apiUrl}/${id}`, chocolat, this.httpOptions).pipe(
      tap(data => console.log('Chocolat mis à jour:', data)),
      catchError(error => {
        console.error('Erreur lors de la mise à jour du chocolat:', error);
        throw error;
      })
    );
  }

  deleteChocolat(id: string): Observable<void> {
    console.log('Suppression du chocolat:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Chocolat supprimé')),
      catchError(error => {
        console.error('Erreur lors de la suppression du chocolat:', error);
        throw error;
      })
    );
  }
}
