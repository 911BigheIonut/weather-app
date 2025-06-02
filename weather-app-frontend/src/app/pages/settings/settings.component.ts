import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SettingsComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required]
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  submitNewPassword() {
    const newPassword = this.passwordForm.value.newPassword;
    this.http.post('/api/auth/change-password', {
      username: this.auth.user,
      password: newPassword
    }).subscribe({
      next: () => alert('Password updated successfully.'),
      error: () => alert('Failed to update password.')
    });
  }

  deleteAccount() {
    const confirmed = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (confirmed) {
      this.http.post('/api/auth/delete', { username: this.auth.user })
        .subscribe({
          next: () => {
            this.auth.logout();
            alert('Account deleted.');
            this.router.navigate(['/login']);
          },
          error: () => alert('Failed to delete account.')
        });
    }
  }
}
