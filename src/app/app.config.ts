import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { applyQuizThemeFromStorageToBody } from './theme/quiz-theme';

const baseProviders: any[] = [
  provideRouter(appRoutes, withComponentInputBinding()),
  provideAnimations(),
  provideHttpClient(),
  importProvidersFrom([TranslateModule.forRoot()]),
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => () => applyQuizThemeFromStorageToBody(),
  },
];

export const appConfig: ApplicationConfig = {
  providers: baseProviders
};
