import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platformId = inject(PLATFORM_ID);

  cartItems = signal<CartItem[]>([]);

  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.impressionPrice * item.quantity), 0);
  });

  cartCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  });

  constructor() {
    this.loadCart();
    
    // Save to local storage whenever cart changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('x-perfumes-cart', JSON.stringify(this.cartItems()));
      }
    });
  }

  private loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('x-perfumes-cart');
      if (savedCart) {
        try {
          this.cartItems.set(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart from local storage', e);
        }
      }
    }
  }

  addToCart(product: Product, quantity = 1) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
