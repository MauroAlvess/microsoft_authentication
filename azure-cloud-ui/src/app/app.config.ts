import { ApplicationConfig, isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core'; 
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideNgxMask } from 'ngx-mask';
import { provideServiceWorker } from '@angular/service-worker';

import {
  MsalService,
  MsalBroadcastService,
  MsalGuard,
  MsalRedirectComponent,
  MsalModule,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG
} from '@azure/msal-angular';

import { msalInstance, msalGuardConfig } from './auth/msl.config';


function MSALInitializer(msalService: MsalService): () => Promise<void> {
  return () => msalService.instance.initialize().then(() => { 
    return msalService.instance.handleRedirectPromise().then(result => { 
      const account = result?.account || msalService.instance.getAllAccounts()[0];
      if (account) {
        msalService.instance.setActiveAccount(account);
      }
    });
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxMask(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),

    importProvidersFrom(MsalModule),

    { provide: MSAL_INSTANCE, useValue: msalInstance },
    { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfig },

    {
      provide: APP_INITIALIZER,
      useFactory: MSALInitializer,
      deps: [MsalService], 
      multi: true 
    },

    MsalService,
    MsalBroadcastService,
    MsalGuard
  ]
};