import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

interface Project {
  title: string;
  category: string;
  tag: string;
  description: string;
  gradient: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TiltDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  activeFilter = 'all';

  filters = ['all', 'ui-design', 'web-development', 'wordpress'];

  projects: Project[] = [
    {
      title: 'Medical Web App',
      category: 'ui-design',
      tag: 'UI/UX Design',
      description: 'End-to-end UI/UX design for complex medical web and mobile applications with intuitive user interfaces.',
      gradient: 'gradient-1',
    },
    {
      title: 'Enterprise Dashboard',
      category: 'web-development',
      tag: 'Web Development',
      description: 'Responsive enterprise dashboard built with Angular and SASS, ensuring high performance and maintainable code.',
      gradient: 'gradient-2',
    },
    {
      title: 'E-Commerce Platform',
      category: 'wordpress',
      tag: 'WordPress',
      description: 'Custom WordPress website with Elementor designs, improving user experience and SEO performance.',
      gradient: 'gradient-3',
    },
    {
      title: 'SaaS Landing Page',
      category: 'web-development',
      tag: 'Web Development',
      description: 'High-converting responsive web application built with HTML5, CSS3, Bootstrap, and SCSS.',
      gradient: 'gradient-1',
    },
    {
      title: 'Mobile Health App',
      category: 'ui-design',
      tag: 'UI/UX Design',
      description: 'Designed intuitive user interfaces ensuring seamless user journey from wireframes to high-fidelity prototypes.',
      gradient: 'gradient-2',
    },
    {
      title: 'Corporate Website',
      category: 'wordpress',
      tag: 'WordPress',
      description: 'WordPress website with custom child theme, domain management, and complex site migration.',
      gradient: 'gradient-3',
    },
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  formatFilter(filter: string): string {
    if (filter === 'all') return 'All';
    return filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
}
