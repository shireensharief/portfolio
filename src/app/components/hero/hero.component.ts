import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { SITE_LINKS } from '../../site-links';
import { DesignToCodeComponent } from '../../shared/design-to-code/design-to-code.component';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, DesignToCodeComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private typewriterTimeout: any;

  displayText = '';
  links = SITE_LINKS;
  private roles = ['UI/UX Designer', 'UI Developer'];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.typewrite();
    }
  }

  ngOnDestroy(): void {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
  }

  private typewrite(): void {
    const currentRole = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.displayText = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.displayText = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 500;
    }

    this.typewriterTimeout = setTimeout(() => this.typewrite(), delay);
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    const el = this.document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}
