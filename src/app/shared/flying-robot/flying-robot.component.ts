import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-flying-robot',
  templateUrl: './flying-robot.component.html',
  styleUrls: ['./flying-robot.component.scss']
})

export class FlyingRobotComponent implements OnInit {
  private robotElement!: HTMLElement;
  private isHeld: boolean = false;
  isLoading = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.robotElement = document.getElementById('robot')!;
    this.initializeRobot();
  
    // Adiciona evento de clique no robô
    this.robotElement.addEventListener('click', () => this.handleRobotClick());

        // Adiciona eventos para "segurar" e "soltar" o robô
    this.robotElement.addEventListener('mousedown', () => this.handleRobotHold());
    document.addEventListener('mouseup', () => this.handleRobotRelease());
  }
  
  private handleRobotClick() {
    // Gera um ângulo aleatório entre 80 e 150 graus
    const randomRotation = Math.random() < 0.5 
      ? - (80 + Math.random() * 70) // Gira para a esquerda
      : 80 + Math.random() * 70;   // Gira para a direita
  
    // Remove temporariamente a animação 'float'
    this.robotElement.classList.remove('float-animation');
  
    // Aplica a rotação ao robô
    this.robotElement.style.transform = `rotate(${randomRotation}deg)`;
  
    // Restaura o estado original após 1 segundo
    setTimeout(() => {
      this.robotElement.style.transform = `rotate(0deg)`; // Volta ao estado inicial
      setTimeout(() => {
        this.robotElement.classList.add('float-animation'); // Restaura a animação após a transição
      }, 500); // Aguarda a transição terminar
    }, 1000);
  }
  
  private handleRobotHold() {
    this.isHeld = true;
  
    // Remove temporariamente a animação de flutuação
    this.robotElement.classList.remove('float-animation');
  
    // Aplica um efeito visual para indicar que está sendo segurado
    this.robotElement.style.transform = `scale(0.9)`; // Aumenta o tamanho para simular um "aperto"
  }
  
  private handleRobotRelease() {
    if (!this.isHeld) return; // Não faz nada se o robô não estiver sendo segurado
  
    this.isHeld = false;
  
    // Restaura o tamanho original
    this.robotElement.style.transform = `rotate(0deg) scale(1)`;
  
    // Restaura a animação de flutuação após um pequeno atraso
    setTimeout(() => {
      this.robotElement.classList.add('float-animation');
    }, 200); // Pequeno atraso para transição suave
  }
 
  private initializeRobot() {
    this.moveRobotRandomly();
    setInterval(() => this.moveRobotRandomly(), 1500); // Movimenta a cada 2 segundos
    document.addEventListener('mousemove', (event) => this.avoidMouse(event));
  }

  private getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const x = Math.random() * screenWidth;
    const y = Math.random() * screenHeight;

    return { x, y };
  }

  private moveRobotRandomly() {
    const { x, y } = this.getRandomPosition();

    // Faz o robô atravessar de um lado para outro
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const currentX = parseFloat(this.robotElement.style.left) || 0;
    const currentY = parseFloat(this.robotElement.style.top) || 0;

    // Calcula a direção do movimento e permite atravessar as bordas
    let newX = x > screenWidth ? -100 : x < 0 ? screenWidth + 100 : x;
    let newY = y > screenHeight ? -100 : y < 0 ? screenHeight + 100 : y;

    this.robotElement.style.left = `${newX}px`;
    this.robotElement.style.top = `${newY}px`;
  }

  private avoidMouse(event: MouseEvent) {
    if (this.isLoading) return; // Não esquiva enquanto está carregando

    const robotRect = this.robotElement.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const distance = 100;

    let newX = robotRect.left + (robotRect.left < mouseX ? -distance : distance);
    let newY = robotRect.top + (robotRect.top < mouseY ? -distance : distance);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (newX < 0) newX = screenWidth + 100;
    if (newX > screenWidth) newX = -100;
    if (newY < 0) newY = screenHeight + 100;
    if (newY > screenHeight) newY = -100;

    this.robotElement.style.left = `${newX}px`;
    this.robotElement.style.top = `${newY}px`;
  }

  // Método para centralizar o robô
  centerRobot() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    this.robotElement.style.left = `${screenWidth / 2}px`;
    this.robotElement.style.top = `${screenHeight / 2}px`;
  }

  // Alterna o estado de loading
  toggleLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    if (isLoading) {
      this.centerRobot(); // Centraliza ao ativar o loading
      this.robotElement.classList.add('loading'); // Adiciona uma classe CSS para animação
    } else {
      this.robotElement.classList.remove('loading');
    }
  }
}