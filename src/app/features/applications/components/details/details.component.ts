import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from 'src/app/core/models/application';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public application: Application,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.formBuilder.group({
      beneficiaryNames: '',
      beneficiarySurnames: '',
      beneficiaryDni: '',
      beneficiaryEmail: '',
      beneficiaryMobileNumber: '',
      amount: '',
      startDate: '',
      endDate: '',
      status: '',
      comment: '',
      applicationTypeName: '',
      userNames: '',
      userSurnames: '',
      userDni: '',
    });
    this.form.patchValue(this.application);
  }
}
