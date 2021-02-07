import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { UpdateComponent } from './components/update/update.component';

@NgModule({
  declarations: [ApplicationsComponent, DetailsComponent, UpdateComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ApplicationsModule {}
