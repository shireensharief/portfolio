import { Component } from '@angular/core';

/**
 * Hero visual: a Figma-style frame whose wireframe turns into the finished card
 * while the matching Angular template types itself out in a code editor.
 * Pure CSS animation (12s loop, see the .scss); each loop shows the next case study.
 */
@Component({
  selector: 'app-design-to-code',
  templateUrl: './design-to-code.component.html',
  styleUrl: './design-to-code.component.scss'
})
export class DesignToCodeComponent {
  projects = [
    { title: 'FieldLog',  summary: 'Field service app and stock statement, Android + web.', cover: 'assets/images/work/fieldlog.webp' },
    { title: 'Kitly',     summary: 'Test-kit ordering: customer portal, admin and scanner app.', cover: 'assets/images/work/kitly.webp' },
    { title: 'Stockwise', summary: 'B2B ordering for distributors: web shop, admin and iOS app.', cover: 'assets/images/work/stockwise.webp' },
    { title: 'StripSense', summary: 'Mobile app that reads test strips with a guided timer.', cover: 'assets/images/work/stripsense.webp' },
  ];
  index = 0;

  get project() {
    return this.projects[this.index];
  }

  /** Called when the 12s loop restarts, while everything is hidden, so the swap is never seen. */
  next(): void {
    this.index = (this.index + 1) % this.projects.length;
  }
}
