import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';

const maskConfig: Partial<NgxMaskConfig> = {
  validation: false,
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(), provideAnimationsAsync(),provideEnvironmentNgxMask(maskConfig),]
};
