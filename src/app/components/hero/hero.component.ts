import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private typewriterTimeout: any;
  private statsObserver: IntersectionObserver | null = null;

  displayText = '';
  private roles = ['UI/UX Designer', 'UI Developer'];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;

  stats = [
    { target: 3,  suffix: '+', display: '0', label: 'Years Experience' },
    { target: 10, suffix: '+', display: '0', label: 'Projects Completed' },
    { target: 20, suffix: '+', display: '0', label: 'Happy Clients' },
    { target: 95, suffix: '%', display: '0', label: 'Satisfaction Rate' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.typewrite();
      this.observeStats();
    }
  }

  ngOnDestroy(): void {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
    if (this.statsObserver) this.statsObserver.disconnect();
  }

  private observeStats(): void {
    const statsRow = this.document.querySelector('.stats-row');
    if (!statsRow) return;

    this.statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.animateStats();
        this.statsObserver?.disconnect();
      }
    }, { threshold: 0.3 });

    this.statsObserver.observe(statsRow);
  }

  private animateStats(): void {
    const duration = 1500;
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;

    this.stats.forEach(stat => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3);
        stat.display = Math.floor(eased * stat.target).toString();

        if (frame >= totalFrames) {
          stat.display = stat.target.toString();
          clearInterval(counter);
        }
      }, 1000 / frameRate);
    });
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
