import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Application } from 'src/app/core/models/application';
import { ApplicationType } from 'src/app/core/models/application-type';
import { ApplicationTypeService } from 'src/app/core/services/application-type.service';
import { ApplicationService } from 'src/app/core/services/application.service';
import { UserService } from 'src/app/core/services/user.service';
import { StatementComponent } from '../statement/statement.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  form: FormGroup;
  applicationTypes: ApplicationType[];

  constructor(
    private formBuilder: FormBuilder,
    private applicationTypeService: ApplicationTypeService,
    private applicationService: ApplicationService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getRequestTypes();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      beneficiaryNames: '',
      beneficiarySurnames: '',
      beneficiaryDni: '',
      beneficiaryEmail: ['', Validators.email],
      beneficiaryMobileNumber: '',
      applicationTypeId: ['', Validators.required],
      amount: ['', Validators.required],
      endDate: ['', Validators.required],
      statement: [false, Validators.requiredTrue],
    });
  }

  public get beneficiaryEmail() {
    return this.form.get('beneficiaryEmail') as FormControl;
  }

  public get endDateField() {
    return this.form.get('endDate') as FormControl;
  }

  sendRequest(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const application: Application = this.form.value;
      application.endDate = new DatePipe('en').transform(
        application.endDate,
        'yyyy-MM-dd'
      );
      application.status = 'Solicitado';
      this.userService
        .getByJwt()
        .pipe(
          switchMap((user) => {
            application.userId = user.id;
            return this.applicationService.create(application);
          })
        )
        .subscribe(() => {
          this.openSnackBar('Solicitud enviada correctamente!!!', 'Ok');
          this.form.reset();
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getRequestTypes(): void {
    this.applicationTypeService
      .getAll()
      .subscribe(
        (applicationTypes) => (this.applicationTypes = applicationTypes)
      );
  }

  openStatement(): void {
    this.dialog.open(StatementComponent, { autoFocus: false });
  }
}
