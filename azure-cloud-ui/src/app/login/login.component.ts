import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  interactionInProgress = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: UserService,
    private msalService: MsalService
  ) { }

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount()
      || this.msalService.instance.getAllAccounts()[0];

    if (account) {
      localStorage.setItem('user_name', account.name || '');
      localStorage.setItem('tenant_id', account.tenantId || '');
      this.getToken();
    }
  }

  loginWithAzure(): void {
    console.log('Iniciando login com Microsoft Azure AD...');
    this.msalService.loginRedirect();
  }

  getToken(): void {
    this.msalService.acquireTokenSilent({
      scopes: ['api://03fb9d50-535c-40ef-86da-1a45e04ed1b6/access_as_user']
    }).subscribe({
      next: (result) => {
        this.loginWithTokenAzure(result.accessToken);
      },
      error: (error) => {
        if (error instanceof InteractionRequiredAuthError) {
          this.msalService.acquireTokenRedirect({
            scopes: ['api://03fb9d50-535c-40ef-86da-1a45e04ed1b6/access_as_user']
          });
        } else {
          console.error('Erro ao adquirir token silenciosamente:', error);
        }
      }
    });
  }

  loginWithTokenAzure(token: string): void {
    const body = { MicrosoftToken: token };

    this.authService.exchangeMicrosoftToken(body).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao trocar token com o backend:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}