import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, TiltDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  currentSlide = 0;

  testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechVision Inc.',
      text: 'Shireen transformed our entire product experience. The attention to detail and user-first approach resulted in a 40% increase in user engagement. Truly exceptional work.',
      initials: 'SC',
    },
    {
      name: 'Marcus Williams',
      role: 'Product Manager, Innovate Labs',
      text: 'Working with Shireen was a game-changer for our startup. The design system he created has saved our team countless hours and brought unprecedented consistency to our product.',
      initials: 'MW',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, DesignFirst Agency',
      text: 'Shireen\'s ability to translate complex requirements into intuitive interfaces is remarkable. Our clients consistently praise the designs, and our conversion rates have doubled.',
      initials: 'ER',
    },
  ];

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
