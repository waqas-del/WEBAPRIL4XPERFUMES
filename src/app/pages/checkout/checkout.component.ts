import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 class="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

        @if (isSuccess()) {
          <div class="bg-white p-12 text-center border border-gray-200">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <mat-icon class="text-green-600" style="font-size: 32px; width: 32px; height: 32px;">check_circle</mat-icon>
            </div>
            <h2 class="text-2xl font-serif text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p class="text-gray-600 mb-8">Thank you for your order. We will contact you shortly to confirm delivery.</p>
            <a routerLink="/shop" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors">
              Continue Shopping
            </a>
          </div>
        } @else if (cartService.cartItems().length === 0) {
          <div class="bg-white p-12 text-center border border-gray-200">
            <p class="text-gray-500 mb-6">Your cart is empty.</p>
            <a routerLink="/shop" class="text-gold-600 hover:text-gold-700 underline">Return to Shop</a>
          </div>
        } @else {
          <div class="bg-white border border-gray-200 p-6 sm:p-8">
            <div class="mb-8 pb-8 border-b border-gray-200">
              <h2 class="text-lg font-bold uppercase tracking-widest text-gray-900 mb-4">Order Summary</h2>
              <div class="space-y-3">
                @for (item of cartService.cartItems(); track item.product.id) {
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">{{ item.quantity }}x {{ item.product.name }}</span>
                    <span class="text-gray-900 font-medium">{{ item.product.impressionPrice * item.quantity }} AED</span>
                  </div>
                }
              </div>
              <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span class="font-bold text-gray-900">Total</span>
                <span class="text-xl font-serif font-bold text-gray-900">{{ cartService.cartTotal() }} AED</span>
              </div>
              <p class="text-xs text-gray-500 mt-2 text-right">Payment Method: Cash on Delivery</p>
            </div>

            <form (ngSubmit)="onSubmit()" #checkoutForm="ngForm" class="space-y-6">
              <h2 class="text-lg font-bold uppercase tracking-widest text-gray-900 mb-4">Delivery Details</h2>
              
              @if (errorMessage()) {
                <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm flex items-start gap-3 animate-pulse">
                  <mat-icon class="text-red-500" style="font-size: 20px; width: 20px; height: 20px;">error_outline</mat-icon>
                  <div>
                    <p class="font-bold mb-1">Submission Failed</p>
                    <p>{{ errorMessage() }}</p>
                    <p class="mt-2 text-xs opacity-80 italic">Tip: Check your Google Sheet sharing permissions and Vercel environment variables.</p>
                  </div>
                </div>
              }

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" id="name" name="name" [(ngModel)]="formData.name" required class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" id="email" name="email" [(ngModel)]="formData.email" required email class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm">
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" [(ngModel)]="formData.phone" required class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm">
                </div>
                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select id="country" name="country" [(ngModel)]="formData.country" required class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm">
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Oman">Oman</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Bahrain">Bahrain</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="province" class="block text-sm font-medium text-gray-700 mb-1">Province / State *</label>
                <input type="text" id="province" name="province" [(ngModel)]="formData.province" required class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm" placeholder="e.g. Dubai, Abu Dhabi">
              </div>
              
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                <textarea id="address" name="address" [(ngModel)]="formData.address" required rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm" placeholder="Street, Building, Apartment No."></textarea>
              </div>
              
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                <textarea id="notes" name="notes" [(ngModel)]="formData.notes" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm"></textarea>
              </div>

              <!-- Security Feature: Honeypot (Hidden from users) -->
              <div class="hidden" aria-hidden="true">
                <label for="website">Website</label>
                <input type="text" id="website" name="website" [(ngModel)]="formData.honeypot" tabindex="-1" autocomplete="off">
              </div>

              <!-- Simple Math Challenge for extra security -->
              <div class="bg-gray-50 p-4 rounded-sm border border-gray-200">
                <label for="security" class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Security Verification</label>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-700">What is {{ mathChallenge.a }} + {{ mathChallenge.b }}?</span>
                  <input type="number" id="security" name="security" [(ngModel)]="userAnswer" required class="w-20 px-3 py-1 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm">
                </div>
              </div>
              
              <div class="pt-4 flex flex-col sm:flex-row gap-4">
                <button type="button" (click)="orderViaWhatsApp()" [disabled]="!isFormValid(checkoutForm) || isSubmitting()" class="flex-1 bg-green-600 text-white px-6 py-3 text-sm font-medium rounded-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  @if (isSubmitting()) {
                    <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  } @else {
                    <mat-icon style="font-size: 18px; width: 18px; height: 18px;">chat</mat-icon>
                    Order via WhatsApp
                  }
                </button>
                <button type="submit" [disabled]="!isFormValid(checkoutForm) || isSubmitting()" class="flex-1 bg-gray-900 text-white px-6 py-3 text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  @if (isSubmitting()) {
                    <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  } @else {
                    Place Order (COD)
                  }
                </button>
              </div>
            </form>
          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private router = inject(Router);
  private http = inject(HttpClient);

  isSuccess = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  formData = {
    name: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    province: '',
    address: '',
    notes: '',
    honeypot: ''
  };

  mathChallenge = {
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1
  };
  userAnswer: number | null = null;

  isFormValid(form: NgForm): boolean {
    if (!form.form.valid) return false;
    if (this.formData.honeypot) return false; // Bot detected
    if (this.userAnswer !== (this.mathChallenge.a + this.mathChallenge.b)) return false;
    return true;
  }

  onSubmit() {
    if (this.cartService.cartItems().length === 0) return;
    if (this.formData.honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }
    if (this.userAnswer !== (this.mathChallenge.a + this.mathChallenge.b)) {
      alert('Security verification failed. Please try again.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    
    // Send data to backend to save in Google Sheets
    this.http.post('/api/orders', {
      items: this.cartService.cartItems(),
      details: this.formData,
      total: this.cartService.cartTotal()
    }).subscribe({
      next: () => {
        this.isSuccess.set(true);
        this.cartService.clearCart();
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Failed to save order to Google Sheets:', err);
        const message = err.error?.details || err.error?.error || err.message || 'An unexpected error occurred while saving your order.';
        this.errorMessage.set(`Order Submission Error: ${message}`);
        this.isSubmitting.set(false);
      }
    });
  }

  orderViaWhatsApp() {
    if (this.cartService.cartItems().length === 0) return;
    if (this.formData.honeypot) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Save to Google Sheets first
    this.http.post('/api/orders', {
      items: this.cartService.cartItems(),
      details: this.formData,
      total: this.cartService.cartTotal()
    }).subscribe({
      next: () => {
        this.finalizeWhatsAppOrder();
      },
      error: (err) => {
        console.error('Failed to save order to Google Sheets:', err);
        const message = err.error?.details || err.error?.error || err.message || 'An unexpected error occurred while saving your order.';
        this.errorMessage.set(`Order Submission Error: ${message}`);
        this.isSubmitting.set(false);
      }
    });
  }

  private finalizeWhatsAppOrder() {
    let message = `*New Order*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${this.formData.name || 'Not provided'}\n`;
    message += `Email: ${this.formData.email || 'Not provided'}\n`;
    message += `Phone: ${this.formData.phone || 'Not provided'}\n`;
    message += `Country: ${this.formData.country}\n`;
    message += `Province: ${this.formData.province || 'Not provided'}\n`;
    message += `Address: ${this.formData.address || 'Not provided'}\n`;
    if (this.formData.notes) {
      message += `Notes: ${this.formData.notes}\n`;
    }
    
    message += `\n*Order Items:*\n`;
    this.cartService.cartItems().forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${item.product.impressionPrice} AED)\n`;
    });
    
    message += `\n*Total: ${this.cartService.cartTotal()} AED*\n`;
    message += `Payment: Cash on Delivery`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971585328790?text=${encodedMessage}`, '_blank');
    
    this.isSuccess.set(true);
    this.cartService.clearCart();
    this.isSubmitting.set(false);
  }
}
