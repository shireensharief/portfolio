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
  isLight = false;
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
    // index.html already applied the saved choice before paint; just read it back
    this.isLight = this.document.documentElement.getAttribute('data-theme') === 'light';
  }

  toggleTheme(): void {
    this.isLight = !this.isLight;
    const root = this.document.documentElement;
    if (this.isLight) root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    this.document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', this.isLight ? '#f6f7fb' : '#0a0a0f');
    try { localStorage.setItem('theme', this.isLight ? 'light' : 'dark'); } catch { /* private mode: choice lasts this visit only */ }
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
