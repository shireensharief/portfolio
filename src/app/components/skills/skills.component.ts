import { Component } from '@angular/core';
import { TiltDirective } from '../../directives/tilt.directive';

interface Skill {
  name: string;
  logo: string;
  image?: string;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TiltDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  activeTab = 0;

  setTab(index: number): void {
    this.activeTab = index;
  }

  categories: SkillCategory[] = [
    {
      title: 'Design',
      skills: [
        {
          name: 'Figma',
          color: '#A259FF',
          logo: '',
          image: 'assets/images/figma.svg',
        },
        {
          name: 'Sketch',
          color: '#FDB300',
          logo: '',
          image: 'assets/images/sketch.svg',
        },
        {
          name: 'Adobe XD',
          color: '#FF61F6',
          logo: '',
          image: 'assets/images/xd.svg',
        },
        {
          name: 'UI/UX Design',
          color: '#5571ed',
          logo: '',
          image: 'assets/images/uiux.svg',
        },
        {
          name: 'Color Theory',
          color: '#5571ed',
          logo:'',
          image: 'assets/images/colors.svg',
        },
        {
          name: 'Iconography',
          color: '#5571ed',
          logo:'',
          image: 'assets/images/iconography.svg',
        },
        {
          name: 'Typography',
          color: '#5571ed',
          logo:'',
          image: 'assets/images/typography.svg',
        },
        {
          name: 'Layouts',
          color: '#5571ed',
          logo:'',
          image: 'assets/images/layout.svg',
        },
        {
          name: 'Wireframes',
          color: '#5571ed',
          logo:'',
          image: 'assets/images/wireframe.svg',
        },
        
        {
          name: 'Prototyping',
          color: '#4aaff1',
          logo: '',
          image: 'assets/images/prototyping.svg',
        },
      ],
    },
    {
      title: 'Development',
      skills: [
        {
          name: 'Angular',
          color: '#DD0031',
          logo: '',
          image: 'assets/images/angular.svg',
        },
        {
          name: 'HTML5',
          color: '#E34F26',
          logo: '',
          image: 'assets/images/html.svg',
        },
        {
          name: 'CSS3',
          color: '#1572B6',
          logo: '',
          image: 'assets/images/css.svg',
        },
        {
          name: 'SCSS',
          color: '#CF649A',
          logo: '',
          image: 'assets/images/scss.svg',
        },
        {
          name: 'JavaScript',
          color: '#F7DF1E',
          logo: '',
          image: 'assets/images/javascript.svg',
        },
        {
          name: 'Bootstrap',
          color: '#7952B3',
          logo: '',
          image: 'assets/images/bootstrap.svg',
        },
      ],
    },
    {
      title: 'CMS & Tools',
      skills: [
        {
          name: 'WordPress',
          color: '#21759B',
          logo: '',
          image: 'assets/images/wordpress-.svg',
        },
        {
          name: 'Elementor',
          color: '#92003B',
          logo: '',
          image: 'assets/images/elementor.svg',
        },
        {
          name: 'Angular Material',
          color: '#DD0031',
          logo: '',
          image: 'assets/images/angular.svg',
        },
      ],
    },
    {
      title: 'Strategy',
      skills: [
        {
          name: 'SEO',
          color: '#4285F4',
          logo: '',
          image: 'assets/images/seo.svg',
        },
        {
          name: 'Google Analytics',
          color: '#E37400',
          logo: '',
          image: 'assets/images/google-analytics.svg',
        },
        {
          name: 'Design Systems',
          color: '#d94cac',
          logo:'',
          image: 'assets/images/iconography.svg',
        },
      ],
    },
  ];
}
