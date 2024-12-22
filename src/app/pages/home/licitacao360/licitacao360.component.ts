import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-licitacao360',
  templateUrl: './licitacao360.component.html',
  styleUrls: ['./licitacao360.component.scss'],
  standalone: true,
})
export class Licitacao360Component implements AfterViewInit {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  currentSlide = 0;
  totalSlides = 0;

  ngAfterViewInit() {
    const carousel = this.carousel.nativeElement;
    this.totalSlides = carousel.children.length;

    const updateCarousel = () => {
      const width = carousel.offsetWidth;
      carousel.style.transform = `translateX(-${this.currentSlide * width}px)`;
    };

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    prevButton?.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      updateCarousel();
    });

    nextButton?.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);

    updateCarousel(); // Inicializa o carrossel na posição correta
  }
}
