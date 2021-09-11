import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) { }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm: any) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') }

    return this.http
      .post(`${this.api}/addMember`, memberForm, config)
      .pipe(catchError(this.handleError))
  }

  modifyMember(memberForm) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') }

    return this.http
      .put(`${this.api}/modifyMember`, memberForm, config)
      .pipe(catchError(this.handleError))
  }

  deleteMember(id) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'), body: id
    }

    return this.http
      .delete(`${this.api}/deleteMember`, options)
      .pipe(catchError(this.handleError))
  }

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
