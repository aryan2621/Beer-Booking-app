import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { UserData } from '../model/auth';
import { DB } from 'src/APIs/db/db';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  angularFireAuth: AngularFireAuth = inject(AngularFireAuth);
  constructor() {}
  async siginInWithGoogle() {
    await this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
  }
  logOut() {
    return this.angularFireAuth.signOut();
  }
  async getUser(): Promise<UserData | null> {
    const user = await this.angularFireAuth.currentUser;
    if (user) {
      return new UserData(user);
    } else {
      return null;
    }
  }
  storeInLocalStorage(user: UserData) {
    localStorage.setItem(DB.USER, JSON.stringify(user));
  }
  getFromLocalStorage(): UserData | null {
    const user = localStorage.getItem(DB.USER);
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
  clearLocalStorage() {
    localStorage.removeItem(DB.USER);
  }
}
