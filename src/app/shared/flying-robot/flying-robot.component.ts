import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-flying-robot',
  templateUrl: './flying-robot.component.html',
  styleUrls: ['./flying-robot.component.scss']
})
export class FlyingRobotComponent implements OnInit {
  private robotElement!: HTMLElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.robotElement = document.getElementById('robot')!;
    this.initializeRobot();
  }

  private initializeRobot() {
    this.moveRobotRandomly();
    setInterval(() => this.moveRobotRandomly(), 1000); // Movimenta a cada 2 segundos
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
    const robotRect = this.robotElement.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const distance = 500; // Distância maior para esquiva

    let newX = robotRect.left + (robotRect.left < mouseX ? -distance : distance);
    let newY = robotRect.top + (robotRect.top < mouseY ? -distance : distance);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Faz o robô reaparecer do lado oposto ao ultrapassar os limites da tela
    if (newX < 0) newX = screenWidth + 100;
    if (newX > screenWidth) newX = -100;
    if (newY < 0) newY = screenHeight + 100;
    if (newY > screenHeight) newY = -100;

    this.robotElement.style.left = `${newX}px`;
    this.robotElement.style.top = `${newY}px`;
  }
}
