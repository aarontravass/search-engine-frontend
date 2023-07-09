import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ENVIRONMENT } from '../environments/default';


@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private readonly http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  async search(search_query: string, start: number) {
    const params = new HttpParams()
      .set('query', search_query)
      .set('start', start.toString());
    // return fetch('../assets/search.json').then(
    //   async (res) => (res = await res.json())
    // );
    const res = await this.http
      .get(ENVIRONMENT.API_URL + '/search', { params })
      .pipe(catchError(this.handleError))
      .toPromise();
    return res;
  }

  async fetchToken() {
    await this.http.get(ENVIRONMENT.API_URL + 'token').toPromise();
  }
}
