import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Mobile Layout -->
        <div class="md:hidden py-3 flex flex-col">
          <div class="relative flex justify-center items-center mb-3">
            <!-- Logo -->
            <a routerLink="/" class="text-xl font-serif font-bold tracking-tighter text-gray-900">
              X <span class="text-gold-500 font-light">PERFUMES</span>
            </a>
            
            <!-- Cart Icon (Absolute Right) -->
            <div class="absolute right-0">
              <a routerLink="/cart" class="relative p-1.5 text-gray-600 hover:text-gold-500 transition-colors">
                <mat-icon>shopping_bag</mat-icon>
                @if (cartService.cartCount() > 0) {
                  <span class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gold-500 rounded-full">
                    {{ cartService.cartCount() }}
                  </span>
                }
              </a>
            </div>
          </div>
          
          <!-- Secondary Mobile Nav -->
          <div class="flex justify-center items-center gap-8 border-t border-gray-100 pt-2">
            <a routerLink="/best-sellers" routerLinkActive="text-gold-600" class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-gold-500 transition-colors">Best Sellers</a>
            <a routerLink="/new-arrivals" routerLinkActive="text-gold-600" class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-gold-500 transition-colors">New Arrivals</a>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden md:flex justify-between items-center h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="text-2xl font-serif font-bold tracking-tighter text-gray-900">
              X <span class="text-gold-500 font-light">PERFUMES</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="flex space-x-8">
            <a routerLink="/" routerLinkActive="text-gold-600" [routerLinkActiveOptions]="{exact: true}" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors">Home</a>
            <a routerLink="/shop" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors">Shop Collection</a>
            <a routerLink="/best-sellers" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">Best Sellers</a>
            <a routerLink="/new-arrivals" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">New Arrivals</a>
            <a routerLink="/guide" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors">Scent Guide</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <!-- Cart Icon -->
            <a routerLink="/cart" class="relative p-2 text-gray-600 hover:text-gold-500 transition-colors">
              <mat-icon>shopping_bag</mat-icon>
              @if (cartService.cartCount() > 0) {
                <span class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gold-500 rounded-full">
                  {{ cartService.cartCount() }}
                </span>
              }
            </a>
          </div>
          
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  cartService = inject(CartService);
  womensChoiceCategory = "Womens' Choice for Men";
}
