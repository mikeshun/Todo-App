import { Component, OnInit } from '@angular/core';
import { AuthService, LoginParams } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  async emailSignIn(credentials: LoginParams) {
    try {
      this.isLoading = true;
      await this.authService.loginWithEmail(credentials);
      localStorage.setItem('CurrentUid', (await this.authService.getUserInfo()).uid);
      this.router.navigate(['/todo']);
    } catch (error) {
      this.toastr.error(error.message, 'Ooppss..🤔')
    } finally {
      this.isLoading = false;
    }
  }

  async socialSignIn(type: number) {
    try {
      this.isLoading = true;
      if (!type) {
        return;
      }
      if (type === 1) {
        await this.authService.authWithGoogle();
        localStorage.setItem('CurrentUid', (await this.authService.getUserInfo()).uid);
        this.router.navigate(['/todo']);
      }
      if (type === 2) {
        await this.authService.authWithFacebook();
        localStorage.setItem('CurrentUid', (await this.authService.getUserInfo()).uid);
        this.router.navigate(['/todo']);
      }
    } catch (error) {
      this.toastr.error(error.message, 'Ooppss..🤔')
    } finally {
      this.isLoading = false;
    }
  }

  private setupForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email,  Validators.required]],
      password: ['', Validators.required],
    });
  }
}
