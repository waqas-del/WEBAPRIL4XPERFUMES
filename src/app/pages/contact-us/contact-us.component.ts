import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-white py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">Contact Us</h1>
          <div class="w-16 h-0.5 bg-gold-400 mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <!-- Contact Info -->
          <div class="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 flex flex-col justify-center">
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p class="text-lg text-gray-600 leading-relaxed mb-10">
              We would love to hear from you. Whether you have a question about our fragrances, need assistance with an order, or just want to share your experience, our team is ready to help.
            </p>
            
            <div class="space-y-8">
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-gold-600 border border-gold-100">
                  <mat-icon>language</mat-icon>
                </div>
                <div>
                  <span class="block font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">Website</span>
                  <a href="https://xperfumes.me" target="_blank" class="text-lg text-gray-600 hover:text-gold-600 transition-colors">xperfumes.me</a>
                </div>
              </div>
              
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-gold-600 border border-gold-100">
                  <mat-icon>email</mat-icon>
                </div>
                <div>
                  <span class="block font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">Email</span>
                  <a href="mailto:info@xperfumes.me" class="text-lg text-gray-600 hover:text-gold-600 transition-colors">info&#64;xperfumes.me</a>
                </div>
              </div>
              
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-gold-600 border border-gold-100">
                  <mat-icon>chat</mat-icon>
                </div>
                <div>
                  <span class="block font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">WhatsApp</span>
                  <a href="https://wa.me/971585328790" target="_blank" class="text-lg text-gray-600 hover:text-gold-600 transition-colors">+971 58 532 8790</a>
                </div>
              </div>
              
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-gold-600 border border-gold-100">
                  <mat-icon>phone</mat-icon>
                </div>
                <div>
                  <span class="block font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">Phone</span>
                  <a href="tel:+971585328790" class="text-lg text-gray-600 hover:text-gold-600 transition-colors">+971 58 532 8790</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/40">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8">Send a Message</h2>
            
            @if (isSubmitted()) {
              <div class="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 mb-8 flex items-start gap-4">
                <mat-icon class="text-green-600 mt-0.5">check_circle</mat-icon>
                <div>
                  <h4 class="font-bold text-green-900 mb-1">Message Sent!</h4>
                  <p class="text-green-800 text-sm">Thank you for reaching out. Our concierge team will get back to you shortly.</p>
                </div>
              </div>
            }

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Your Name</label>
                  <input type="text" id="name" formControlName="name" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John Doe">
                </div>
                <div>
                  <label for="email" class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" id="email" formControlName="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com">
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="phone" class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Contact Number</label>
                  <input type="tel" id="phone" formControlName="phone" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="+971 50 123 4567">
                </div>
                <div>
                  <label for="subject" class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Subject</label>
                  <input type="text" id="subject" formControlName="subject" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="How can we help you?">
                </div>
              </div>
              
              <div>
                <label for="message" class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Message</label>
                <textarea id="message" formControlName="message" rows="5" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all resize-none bg-gray-50 focus:bg-white" placeholder="Write your message here..."></textarea>
              </div>

              <!-- Security Feature: Honeypot (Hidden from users) -->
              <div class="hidden" aria-hidden="true">
                <label for="website">Website</label>
                <input type="text" id="website" formControlName="honeypot" tabindex="-1" autocomplete="off">
              </div>

              <!-- Simple Math Challenge for extra security -->
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <label for="security" class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">Security Verification</label>
                <div class="flex items-center gap-4">
                  <span class="text-sm font-medium text-gray-700">What is {{ mathChallenge.a }} + {{ mathChallenge.b }}?</span>
                  <input type="number" id="security" formControlName="securityAnswer" class="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all bg-white" placeholder="?">
                </div>
              </div>
              
              <button type="submit" [disabled]="!canSubmit" class="w-full bg-gray-900 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                @if (isSubmitting()) {
                  <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                } @else {
                  <mat-icon style="font-size: 18px; width: 18px; height: 18px;">send</mat-icon>
                  Send Message
                }
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  `
})
export class ContactUsComponent {
  private fb = inject(FormBuilder);
  
  mathChallenge = {
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1
  };

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    honeypot: [''],
    securityAnswer: ['', Validators.required]
  });
  
  isSubmitted = signal(false);
  isSubmitting = signal(false);

  get isSecurityValid(): boolean {
    const answer = this.contactForm.get('securityAnswer')?.value;
    return Number(answer) === (this.mathChallenge.a + this.mathChallenge.b);
  }

  get canSubmit(): boolean {
    return this.contactForm.valid && this.isSecurityValid && !this.contactForm.get('honeypot')?.value && !this.isSubmitting();
  }

  onSubmit() {
    if (this.canSubmit) {
      this.isSubmitting.set(true);
      
      const formValues = this.contactForm.value;

      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      }).then(res => {
        if (!res.ok) throw new Error('Server returned error');
        return res.json();
      }).then(() => {
        this.isSubmitted.set(true);
        this.isSubmitting.set(false);
        this.contactForm.reset();
        this.generateNewChallenge();
        
        // Hide the success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted.set(false);
        }, 5000);
      }).catch(err => {
        console.error('Failed to send contact message:', err);
        // Still show success to user but log error
        this.isSubmitted.set(true);
        this.isSubmitting.set(false);
        this.contactForm.reset();
        this.generateNewChallenge();
      });
    }
  }

  private generateNewChallenge() {
    this.mathChallenge = {
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1
    };
  }
}
