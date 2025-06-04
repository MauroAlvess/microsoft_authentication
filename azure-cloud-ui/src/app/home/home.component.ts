import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '../service/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { TenantInfoResponseDto, UsersDto, GroupDto, ApplicationDto } from '../model/tenant-info.mode';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class HomeComponent implements OnInit {

  tenantInfo: TenantInfoResponseDto | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  userName: string | null = '';
  tenantId: string | null = '';

  displayedUsersColumns: string[] = ['id', 'displayName', 'mail', 'userPrincipalName'];
  dataSourceUsers: MatTableDataSource<UsersDto> = new MatTableDataSource<UsersDto>([]);

  displayedGroupsColumns: string[] = ['id', 'displayName', 'mail'];
  dataSourceGroups: MatTableDataSource<GroupDto> = new MatTableDataSource<GroupDto>([]);

  displayedApplicationsColumns: string[] = ['id', 'displayName', 'appId'];
  dataSourceApplications: MatTableDataSource<ApplicationDto> = new MatTableDataSource<ApplicationDto>([]);

  @ViewChild('usersPaginator') usersPaginator!: MatPaginator;
  @ViewChild('groupsPaginator') groupsPaginator!: MatPaginator;
  @ViewChild('applicationsPaginator') applicationsPaginator!: MatPaginator;

  // @ViewChild(MatSort) sort!: MatSort; 

  constructor(
    private router: Router,
    private authService: UserService,
    public msalService: MsalService
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name');
    this.tenantId = localStorage.getItem('tenant_id');



    const account = this.msalService.instance.getActiveAccount()
      || this.msalService.instance.getAllAccounts()[0];

    if (!account) {
      this.router.navigate(['/login']);
    } else {
      this.getTenantInfoAsync();
    }
  }

  ngAfterViewInit() {

    this.dataSourceUsers.paginator = this.usersPaginator;
    this.dataSourceGroups.paginator = this.groupsPaginator;
    this.dataSourceApplications.paginator = this.applicationsPaginator;
  }


  getTenantInfoAsync(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.authService.getTenantInfo().subscribe({
      next: (res) => {
        this.tenantInfo = res;
        this.dataSourceUsers.data = res.users;
        this.dataSourceGroups.data = res.groups;
        // Não temos signIns, mas podemos adicionar um array vazio se o DTO esperar
        // this.dataSourceSignIns.data = res.signIns || [];

        this.dataSourceApplications.data = res.applications || [];

        this.isLoading = false;
        console.log('Informações do tenant:', res);
      },
      error: (err) => {
        console.error('Erro ao obter informações do tenant:', err);
        this.errorMessage = 'Não foi possível carregar as informações do tenant. Por favor, tente novamente mais tarde.';
        if (err.error && err.error.message) {
          this.errorMessage += ` Detalhes: ${err.error.message}`;
        } else if (err.message) {
          this.errorMessage += ` Detalhes: ${err.message}`;
        }
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }
}