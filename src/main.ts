import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.querySelector('header.masthead video') as HTMLVideoElement;
  if (videoElement) {
    videoElement.muted = true; // Garante que o autoplay seja permitido
    videoElement.play().catch((error) => {
      console.error('Não foi possível iniciar o vídeo automaticamente:', error);
    });
  }
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ],
}).catch(err => console.error(err));