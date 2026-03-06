import { Component } from '@angular/core';
import { TiltDirective } from '../../directives/tilt.directive';

interface Experience {
  company: string;
  role: string;
  period: string;
  type: 'current' | 'past';
  highlights: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TiltDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      company: 'Medical Electronic Systems',
      role: 'UI/UX Designer & UI Developer',
      period: 'May 2025 - Present',
      type: 'current',
      highlights: [
        'Lead the end-to-end UI/UX workflow, including gathering client requirements, creating low-fidelity wireframes, and delivering final high-fidelity designs in Figma.',
        'Designed intuitive user interfaces for complex web and mobile applications, ensuring a seamless user journey and modern aesthetic.',
        'Developed responsive websites utilizing Angular and SASS to ensure high performance and maintainable code.',
        'Collaborated closely with the development team by providing detailed design walkthroughs and conducting post-development Design Reviews to ensure pixel-perfect implementation.',
        'Create visual assets and posters for social media to maintain brand consistency across digital platforms.',
      ],
    },
    {
      company: 'Avasoft',
      role: 'UI Developer & Designer',
      period: 'Jan 2023 - Dec 2024',
      type: 'past',
      highlights: [
        'Built multiple responsive web applications using HTML5, CSS3, Bootstrap, and SCSS, achieving a 95% user satisfaction rate.',
        'Developed WordPress websites with custom Elementor designs, improving user experience and SEO performance.',
        'Created reusable, consistent UI components for web and mobile applications to ensure seamless functionality.',
        'Led a team of 5 resources in Custom UI and WordPress development, ensuring project quality and timely delivery.',
        'Managed domain and hosting services and handled complex website migrations and child theme customizations.',
      ],
    },
  ];
}
