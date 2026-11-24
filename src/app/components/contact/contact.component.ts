import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, TiltDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = { name: '', email: '', phone: '', subject: '', message: '' };

  contactInfo = [
    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'shireenh2131@gmail.com' },
    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: '+91 9597166193' },
    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Location', value: 'Chennai, Tamil Nadu' },
  ];

  submitted = false;
  sending = false;
  error = false;

  private serviceId = 'service_8eomnln';
  private templateId = 'template_23fl8zv';
  private publicKey = 'i0lobtROg7J4huwCs';
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onSubmit(form: NgForm): void {
    if (!this.isBrowser || this.sending) return;
    // Block empty or whitespace-only messages; the template shows a hint under each missing field.
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.sending = true;
    this.error = false;

    const templateParams = {
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone.trim(),
      title: this.formData.subject,
      message: this.formData.message,
    };

    // Load EmailJS only when someone actually sends a message, keeping it out of the first page load.
    import('@emailjs/browser')
      .then(({ default: emailjs }) => emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey))
      .then(() => {
        this.ngZone.run(() => {
          this.sending = false;
          this.submitted = true;
          setTimeout(() => {
            this.submitted = false;
            form.resetForm();
            this.formData = { name: '', email: '', phone: '', subject: '', message: '' };
          }, 3000);
        });
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        this.ngZone.run(() => {
          this.sending = false;
          this.error = true;
          setTimeout(() => this.error = false, 4000);
        });
      });
  }
}
