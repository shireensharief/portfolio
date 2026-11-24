import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent {
  /** Icons are 24x24 stroke paths. */
  steps = [
    {
      title: 'Discover',
      desc: 'I start with client requirements, user needs and business goals, so every screen has a clear purpose.',
      icon: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14z M21 21l-4.35-4.35',
    },
    {
      title: 'Wireframe',
      desc: 'Low-fidelity wireframes map out user flows and page structure before any visual design.',
      icon: 'M4 4h16v16H4z M4 9h16 M9 9v11',
    },
    {
      title: 'Design',
      desc: 'High-fidelity UI in Figma, with consistent components, colours and typography.',
      icon: 'M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z',
    },
    {
      title: 'Prototype',
      desc: 'Clickable prototypes let the team test flows and agree on the details early.',
      icon: 'M5 3l14 9-14 9V3z',
    },
    {
      title: 'Hand off & review',
      desc: 'Design walkthroughs for developers, then design reviews after the build for a pixel-perfect result.',
      icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
    },
  ];
}
