import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  hide = true;
  form: FormGroup;
  user: User;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.userService.getByJwt().subscribe((user) => {
      this.user = user;
      this.form.patchValue(user);
      this.isLoading = false;
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      names: '',
      surnames: '',
      username: '',
      password: '',
      dni: '',
      mobileNumber: '',
    });
  }

  getAvatarPath(role: string): string {
    switch (role) {
      case 'ROLE_TITULAR':
        return 'assets/img/titular.png';
      case 'ROLE_RECEPTIONIST':
        return 'assets/img/receptionist.png';
      default:
        return 'assets/img/secretary.png';
    }
  }
}
