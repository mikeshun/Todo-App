import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Scoobydo.';
  user: firebase.User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  async signOut() {
    localStorage.removeItem('CurrentUid');
    await this.authService.logout();
    this.router.navigate(['/auth']);
  }

  async fetchCurrentUser() {
    this.user = await this.authService.getUserInfo();
  }
}
