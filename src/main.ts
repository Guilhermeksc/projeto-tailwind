import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.querySelector('#backgroundVideo') as HTMLVideoElement;
  if (videoElement) {
    videoElement.muted = true; // Necessário para autoplay
    videoElement.autoplay = true; // Define o autoplay diretamente
    videoElement.loop = true; // Garante o loop
    videoElement.playsInline = true; // Compatibilidade com dispositivos móveis

    // Adiciona evento de carregamento para garantir que o vídeo está pronto para ser reproduzido
    videoElement.addEventListener('canplay', () => {
      videoElement.play().catch((error) => {
        console.error('Erro ao iniciar o vídeo:', error);
      });
    });
  }
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot() // Registra o módulo do Toastr
    ),
  ],
}).catch(err => console.error(err));
