import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platformId = inject(PLATFORM_ID);

  cartItems = signal<CartItem[]>([]);
  compareList = signal<Product[]>([]);

  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.impressionPrice * item.quantity), 0);
  });

  cartCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  });

  compareCount = computed(() => this.compareList().length);

  constructor() {
    this.loadCart();
    this.loadCompare();
    
    // Save to local storage whenever cart changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('x-perfumes-cart', JSON.stringify(this.cartItems()));
      }
    });

    // Save to local storage whenever compare list changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('x-perfumes-compare', JSON.stringify(this.compareList()));
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

  private loadCompare() {
    if (isPlatformBrowser(this.platformId)) {
      const savedCompare = localStorage.getItem('x-perfumes-compare');
      if (savedCompare) {
        try {
          this.compareList.set(JSON.parse(savedCompare));
        } catch (e) {
          console.error('Failed to parse compare list from local storage', e);
        }
      }
    }
  }

  toggleCompare(product: Product) {
    this.compareList.update(list => {
      const exists = list.find(p => p.id === product.id);
      if (exists) {
        return list.filter(p => p.id !== product.id);
      }
      // Limit to 4 products for comparison
      if (list.length >= 4) {
        return list;
      }
      return [...list, product];
    });
  }

  isInCompare(productId: string) {
    return !!this.compareList().find(p => p.id === productId);
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
