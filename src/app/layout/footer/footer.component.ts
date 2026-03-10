import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private isBrowser: boolean;
  currentYear = new Date().getFullYear();

  quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'];
  socials = ['Dribbble', 'Behance', 'LinkedIn', 'Twitter'];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    const el = this.document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
