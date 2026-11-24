import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  private isBrowser: boolean;

  navLinks = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Services', sectionId: 'services' },
    { label: 'Portfolio', sectionId: 'portfolio' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isScrolled = scrollTop > 50;
    for (let i = this.navLinks.length - 1; i >= 0; i--) {
      const section = this.document.getElementById(this.navLinks[i].sectionId);
      if (section && scrollTop >= section.offsetTop - 120) {
        this.activeSection = this.navLinks[i].sectionId;
        return;
      }
    }
    this.activeSection = 'home';
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    this.isMobileMenuOpen = false;
    const el = this.document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
