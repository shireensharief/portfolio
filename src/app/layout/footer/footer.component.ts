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

  quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  /** Only links with a url are shown. Add the Dribbble profile url when it is ready. */
  socials = [
    { name: 'Dribbble', url: '' },
    { name: 'Email', url: 'mailto:shireenh2131@gmail.com' },
  ];

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
