import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardUserComponent } from '../shared/card-user/card-user.component';
import { CardGroupComponent } from '../shared/card-group/card-group.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    CardUserComponent,
    CardGroupComponent
  ]
})
export class HomeComponent implements OnInit {

  userName: string | null = '';
  tenantId: string | null = '';

  users: any[] = [];
  groups: any[] = [];

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
      this.getTenantUsers();
      this.getTenantGroups();
    }
  }

  ngAfterViewInit() {

  }


  getTenantUsers(): void {
    this.authService.getTenantUsers().subscribe({
      next: (res) => {
        this.users = res.value || res;
      },
      error: (err) => {
        console.error('Erro ao obter informações do tenant:', err);
      }
    });
  }

  getTenantGroups(): void {
    this.authService.getTenantGroups().subscribe({
      next: (res) => {
        this.groups = res.value || res;
      },
      error: (err) => {
        console.error('Erro ao obter informações do tenant:', err);
      }
    });
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }

}