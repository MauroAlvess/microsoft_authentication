import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  MsalService,
  MsalGuardConfiguration,
  MsalRedirectComponent,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MsalGuard
} from '@azure/msal-angular';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '58f0de44-3829-4034-a88d-d5d6eb3b720d', 
    authority: 'https://login.microsoftonline.com/c8540511-000c-4296-ba04-bb1049ccbfdb', 
    redirectUri: 'http://localhost:4200/auth'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
});

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['api://03fb9d50-535c-40ef-86da-1a45e04ed1b6/access_as_user']
  }
};
