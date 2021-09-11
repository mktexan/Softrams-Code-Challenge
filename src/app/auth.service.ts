import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('username')

    if(user) return true

    return false
  }
}
