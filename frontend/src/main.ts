import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.js';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
// Aca carga el componenete con la aplicacion, es el primer archivo que se inicia