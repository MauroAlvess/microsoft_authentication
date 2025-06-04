import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private msalService: MsalService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.msalService.instance.initialize();

    const account = this.msalService.instance.getActiveAccount() 
      || this.msalService.instance.getAllAccounts()[0];

    if (account) {
      this.msalService.instance.setActiveAccount(account); 
      return true;
    }

    this.msalService.loginRedirect(); 
    return false;
  }
}
