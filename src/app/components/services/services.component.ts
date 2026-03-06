import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-services',
  imports: [CommonModule, TiltDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      title: 'UI/UX Design',
      description: 'End-to-end design from wireframing to high-fidelity prototypes in Figma, ensuring seamless user journeys and modern aesthetics.',
      gradient: 'gradient-1',
    },
    {
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      title: 'Web Development',
      description: 'Responsive, high-performance web applications built with Angular, HTML5, CSS3, and SCSS with maintainable code.',
      gradient: 'gradient-2',
    },
    {
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
      title: 'Prototyping',
      description: 'Interactive prototypes that bring ideas to life and validate concepts before development begins.',
      gradient: 'gradient-3',
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      title: 'Design Systems',
      description: 'Reusable, consistent UI component libraries for web and mobile applications ensuring seamless functionality.',
      gradient: 'gradient-1',
    },
    {
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      title: 'WordPress & CMS',
      description: 'Custom WordPress websites with Elementor designs, SEO optimization, domain management, and hosting services.',
      gradient: 'gradient-2',
    },
    {
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      title: 'Mobile Design',
      description: 'Intuitive user interfaces for mobile applications, optimized for touch interactions and responsive across devices.',
      gradient: 'gradient-3',
    },
  ];
}
