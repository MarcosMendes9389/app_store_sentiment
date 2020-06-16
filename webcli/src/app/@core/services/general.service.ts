import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  readonly baseUrl: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  listReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/review/all`);
  } 

  listApps(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/app/all`);
  }

  saveApp(app: any): Observable<Application[]> {
    return this.http.post<Application[]>(`${this.baseUrl}/app/save`, app);
  }

  updateApp(app: any): Observable<Application[]> {
    return this.http.put<Application[]>(`${this.baseUrl}/app/update`, app);
  }

  delete(id: any): Observable<Application[]> {
    return this.http.delete<Application[]>(`${this.baseUrl}/app/delete/${id}`);
  }

  listClassificationAppDatebyDay(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/dashboard/google/classification/app/date`);
  }

  listRankingAppClassificationPositivo(): Observable<any[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/dashboard/ranking/app/classification/positivo`);
  }

  listRankingAppClassificationNegativo(): Observable<any[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/dashboard/ranking/app/classification/negativo`);
  }
}