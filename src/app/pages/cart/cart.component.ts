import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 class="text-3xl font-serif font-bold text-gray-900 mb-8">Your Cart</h1>

        @if (cartService.cartItems().length === 0) {
          <div class="bg-white p-12 text-center border border-gray-200">
            <mat-icon class="text-gray-300 mb-4" style="font-size: 48px; width: 48px; height: 48px;">shopping_bag</mat-icon>
            <h2 class="text-xl font-serif text-gray-900 mb-2">Your cart is empty</h2>
            <p class="text-gray-500 mb-6">Looks like you haven't added any fragrances yet.</p>
            <a routerLink="/shop" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors">
              Continue Shopping
            </a>
          </div>
        } @else {
          <div class="bg-white border border-gray-200 overflow-hidden mb-8">
            <ul class="divide-y divide-gray-200">
              @for (item of cartService.cartItems(); track item.product.id) {
                <li class="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div class="flex-grow">
                    <p class="text-xs uppercase tracking-widest text-gray-500 mb-1">{{ item.product.brand }}</p>
                    <h3 class="text-lg font-serif text-gray-900 mb-1">
                      <a [routerLink]="['/product', item.product.id]" class="hover:text-gold-600 transition-colors">{{ item.product.name }}</a>
                    </h3>
                    <p class="text-sm text-gray-500">{{ item.product.impressionPrice }} AED</p>
                  </div>
                  
                  <div class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div class="flex items-center border border-gray-300 rounded-sm">
                      <button (click)="cartService.updateQuantity(item.product.id, item.quantity - 1)" class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                      <span class="px-3 py-1 text-sm font-medium text-gray-900 border-x border-gray-300 min-w-[2.5rem] text-center">{{ item.quantity }}</span>
                      <button (click)="cartService.updateQuantity(item.product.id, item.quantity + 1)" class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">+</button>
                    </div>
                    
                    <div class="text-right min-w-[5rem]">
                      <p class="text-lg font-medium text-gray-900">{{ item.product.impressionPrice * item.quantity }} AED</p>
                    </div>
                    
                    <button (click)="cartService.removeFromCart(item.product.id)" class="text-gray-400 hover:text-red-500 transition-colors p-2">
                      <mat-icon style="font-size: 20px; width: 20px; height: 20px;">delete_outline</mat-icon>
                    </button>
                  </div>
                </li>
              }
            </ul>
            
            <div class="bg-gray-50 p-6 border-t border-gray-200">
              <div class="flex justify-between items-center mb-6">
                <span class="text-lg text-gray-600">Subtotal</span>
                <span class="text-2xl font-serif font-bold text-gray-900">{{ cartService.cartTotal() }} AED</span>
              </div>
              <p class="text-sm text-gray-500 mb-6 text-right">Shipping calculated at checkout.</p>
              
              <div class="flex flex-col sm:flex-row gap-4 justify-end">
                <button (click)="orderViaWhatsApp()" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-green-600 hover:bg-green-700 transition-colors gap-2">
                  <mat-icon style="font-size: 18px; width: 18px; height: 18px;">chat</mat-icon>
                  Order via WhatsApp
                </button>
                <a routerLink="/checkout" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);

  orderViaWhatsApp() {
    const items = this.cartService.cartItems();
    if (items.length === 0) return;

    let message = `Hi, I would like to place an order:\n\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${item.product.impressionPrice} AED)\n`;
    });
    
    message += `\nTotal: ${this.cartService.cartTotal()} AED\n\nPlease let me know the next steps.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971585328790?text=${encodedMessage}`, '_blank');
  }
}
