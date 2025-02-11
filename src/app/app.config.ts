import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { environment } from '@environments/environment.prod'; // Usamos el correcto environment

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    importProvidersFrom(InfiniteScrollDirective)
  ],
};
