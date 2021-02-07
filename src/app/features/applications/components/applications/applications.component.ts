import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Application } from 'src/app/core/models/application';
import { User } from 'src/app/core/models/user';
import { ApplicationService } from 'src/app/core/services/application.service';
import { UserService } from 'src/app/core/services/user.service';
import { DetailsComponent } from '../details/details.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  displayedColumns: string[] = [
    'userNames',
    'userSurnames',
    'userDni',
    'applicationTypeName',
    'startDate',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<Application>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user: User;

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getApplications();
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (
      application: Application,
      filter: string
    ) =>
      application.userNames.trim().toLowerCase().indexOf(filter) != -1 ||
      application.userSurnames.trim().toLowerCase().indexOf(filter) != -1 ||
      application.userDni.trim().toLowerCase().indexOf(filter) != -1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(application: Application): void {
    this.dialog.open(DetailsComponent, { data: application, autoFocus: false });
  }

  openUpdate(application: Application): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: application,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = null;
        this.getApplications();
      }
    });
  }

  getApplications(): void {
    this.userService
      .getByJwt()
      .pipe(
        switchMap((user) => {
          this.user = user;
          switch (user.roles[0]) {
            case 'ROLE_TITULAR':
              return this.applicationService.getByUserId(user.id);
            case 'ROLE_RECEPTIONIST':
              return this.applicationService.getByStatus('Solicitado');
            default:
              return this.applicationService.getByStatus('Derivado');
          }
        })
      )
      .subscribe((applications) => {
        this.dataSource = new MatTableDataSource(applications);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setupFilter();
      });
  }
}
