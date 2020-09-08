import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async loginWithEmail(credentials: LoginParams) {
    const { email, password } = credentials;
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async registerWithEmail(credentials: LoginParams) {
    const { email, password } = credentials;
    await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async authWithGoogle() {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  async authWithFacebook() {
    await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
  }

  getUserInfo() {
    return this.afAuth.currentUser;
  }

  async logout() {
    localStorage.clear();
    await this.afAuth.signOut();
  }
}

export interface LoginParams {
  email: string;
  password: string;
}
