import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  readonly baseUrl: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Faz a chamada ao endpoint de reviews
   */
  listReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/review/all`);

  }

}

