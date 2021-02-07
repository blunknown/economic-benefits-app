import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Application } from 'src/app/core/models/application';
import { User } from 'src/app/core/models/user';
import { ApplicationService } from 'src/app/core/services/application.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  user$: Observable<User>;
  form: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public application: Application,
    private userService: UserService,
    private applicationService: ApplicationService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.user$ = this.userService.getByJwt();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      status: ['', Validators.required],
      comment: '',
    });
  }

  updateApplication(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      const updated: Application = this.form.value;
      this.application.status = updated.status;
      this.application.comment = updated.comment;
      this.applicationService
        .update(this.application.id, this.application)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }
}
