import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
} from '@azure/msal-angular';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'SUA_CLIENT_ID_AQUI',
    authority: 'https://login.microsoftonline.com/SEU_TENANT_ID',
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
