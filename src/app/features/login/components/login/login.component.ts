import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthRequest } from 'src/app/core/models/auth-request';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public get usernameField() {
    return this.form.get('username');
  }

  public get passwordField() {
    return this.form.get('password');
  }

  login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      const authRequest: AuthRequest = this.form.value;
      this.authService
        .login(authRequest)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe();
    }
  }
}
