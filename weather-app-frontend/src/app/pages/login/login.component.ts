import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.auth.login(username, password).subscribe({
        next: () => {
          this.favoritesService.loadFavorites(username);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid username or password');
        },
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
