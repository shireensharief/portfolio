import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

interface Project {
  title: string;
  platforms: ('mobile' | 'web' | 'wordpress')[];
  tag: string;
  description: string;
  image: string;
  /** Where the card opens: a Dribbble shot or a live site. Empty = not clickable yet. */
  url: string;
  /** Text on the hover button, e.g. "View on Dribbble" or "Visit live site". */
  cta: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TiltDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  activeFilter = 'all';

  filters = ['all', 'mobile', 'web', 'wordpress'];

  projects: Project[] = [
    {
      title: 'Kitly',
      platforms: ['web', 'mobile'],
      tag: 'Web + Mobile',
      description: 'Test-kit ordering platform: a customer portal, an admin dashboard and a mobile scanner app, with promo codes, wallet credit and refunds.',
      image: 'assets/images/work/kitly.webp',
      url: 'https://dribbble.com/shots/27913681-Kitly-Home-Test-Kit-Platform',
      cta: 'View on Dribbble',
    },
    {
      title: 'Stockwise',
      platforms: ['web', 'mobile'],
      tag: 'Web + Mobile',
      description: 'B2B ordering for distributors: a web shop, an order admin and an iOS app to follow every order from invoice to delivery.',
      image: 'assets/images/work/stockwise.webp',
      url: 'https://dribbble.com/shots/27913898-Stockwise-B2B-Ordering-Platform',
      cta: 'View on Dribbble',
    },
    {
      title: 'StripSense',
      platforms: ['mobile'],
      tag: 'Mobile App',
      description: 'A mobile app that guides users through reading test strips, with a built-in timer and clear colour-matched results.',
      image: 'assets/images/work/stripsense.webp',
      url: 'https://dribbble.com/shots/27914023-StripSense-pH-WBC-Test-Strip-Reader-App',
      cta: 'View on Dribbble',
    },
    {
      title: 'Softwarebase',
      platforms: ['web'],
      tag: 'Web App',
      description: 'A software catalogue where teams publish releases and users find and download the right build for their platform.',
      image: 'assets/images/work/softwarebase.webp',
      url: 'https://dribbble.com/shots/27914125-Softwarebase-Software-Document-Download-Portal',
      cta: 'View on Dribbble',
    },
    {
      title: 'GiveaBook',
      platforms: ['mobile', 'web'],
      tag: 'Mobile + Web Admin',
      description: 'A book donation app for donors, with a web admin for the teams who run book drives, in light and dark themes.',
      image: 'assets/images/work/giveabook.webp',
      url: 'https://dribbble.com/shots/27916062-GiveaBook-Book-Donation-App-Admin-Dashboard',
      cta: 'View on Dribbble',
    },
    {
      title: 'FieldLog',
      platforms: ['mobile', 'web'],
      tag: 'Mobile + Web',
      description: 'A field service app for engineers on the road, plus a stock statement that keeps distributors and admins in sync.',
      image: 'assets/images/work/fieldlog.webp',
      url: 'https://dribbble.com/shots/27916168-FieldLog-Log-Calls-Expenses-Leave-on-the-Go',
      cta: 'View on Dribbble',
    },
    {
      title: 'Cocopah Casino & Resort',
      platforms: ['wordpress'],
      tag: 'WordPress',
      description: 'Website for a casino and resort in Yuma, Arizona, covering gaming, hotel stays, dining, entertainment and events.',
      image: 'assets/images/work/cocopah.webp',
      url: 'https://www.cocopahresort.com/',
      cta: 'Visit live site',
    },
    {
      title: 'Ballet Arizona',
      platforms: ['wordpress'],
      tag: 'WordPress',
      description: 'Website for Arizona\u2019s professional ballet company, with performances, tickets, the ballet school and community programs.',
      image: 'assets/images/work/balletaz.webp',
      url: 'https://balletaz.org/',
      cta: 'Visit live site',
    },
    {
      title: 'Greater Dallas Development',
      platforms: ['wordpress'],
      tag: 'WordPress \u00b7 Elementor',
      description: 'Website for a Dallas land development company offering grading, site preparation and land development.',
      image: 'assets/images/work/greaterdallas.webp',
      url: 'https://greaterdaldev.com/',
      cta: 'Visit live site',
    },
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.platforms.includes(this.activeFilter as 'mobile' | 'web' | 'wordpress'));
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  formatFilter(filter: string): string {
    return { all: 'All', mobile: 'Mobile', web: 'Web', wordpress: 'WordPress' }[filter] ?? filter;
  }
}
