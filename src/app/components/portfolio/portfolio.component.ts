import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

interface Project {
  title: string;
  platforms: ('mobile' | 'web')[];
  tag: string;
  description: string;
  image: string;
  /** Link to the Dribbble shot. Leave empty until the shot is posted. */
  dribbble: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TiltDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  activeFilter = 'all';

  filters = ['all', 'mobile', 'web'];

  projects: Project[] = [
    {
      title: 'Kitly',
      platforms: ['web', 'mobile'],
      tag: 'Web + Mobile',
      description: 'Test-kit ordering platform: a customer portal, an admin dashboard and a mobile scanner app, with promo codes, wallet credit and refunds.',
      image: 'assets/images/work/kitly.jpg',
      dribbble: '',
    },
    {
      title: 'Stockwise',
      platforms: ['web', 'mobile'],
      tag: 'Web + Mobile',
      description: 'B2B ordering for distributors: a web shop, an order admin and an iOS app to follow every order from invoice to delivery.',
      image: 'assets/images/work/stockwise.jpg',
      dribbble: '',
    },
    {
      title: 'StripSense',
      platforms: ['mobile'],
      tag: 'Mobile App',
      description: 'A mobile app that guides users through reading test strips, with a built-in timer and clear colour-matched results.',
      image: 'assets/images/work/stripsense.jpg',
      dribbble: '',
    },
    {
      title: 'Softwarebase',
      platforms: ['web'],
      tag: 'Web App',
      description: 'A software catalogue where teams publish releases and users find and download the right build for their platform.',
      image: 'assets/images/work/softwarebase.jpg',
      dribbble: '',
    },
    {
      title: 'GiveaBook',
      platforms: ['mobile', 'web'],
      tag: 'Mobile + Web Admin',
      description: 'A book donation app for donors, with a web admin for the teams who run book drives, in light and dark themes.',
      image: 'assets/images/work/giveabook.jpg',
      dribbble: '',
    },
    {
      title: 'FieldLog',
      platforms: ['mobile', 'web'],
      tag: 'Mobile + Web',
      description: 'A field service app for engineers on the road, plus a stock statement that keeps distributors and admins in sync.',
      image: 'assets/images/work/fieldlog.jpg',
      dribbble: '',
    },
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.platforms.includes(this.activeFilter as 'mobile' | 'web'));
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  formatFilter(filter: string): string {
    return { all: 'All', mobile: 'Mobile', web: 'Web' }[filter] ?? filter;
  }
}
