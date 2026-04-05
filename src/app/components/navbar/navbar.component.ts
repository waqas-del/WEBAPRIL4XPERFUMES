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
        <div class="flex justify-between items-center h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="text-2xl font-serif font-bold tracking-tighter text-gray-900">
              X <span class="text-gold-500 font-light">PERFUMES</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a routerLink="/" routerLinkActive="text-gold-600" [routerLinkActiveOptions]="{exact: true}" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors">Home</a>
            <a routerLink="/shop" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors">Shop Collection</a>
            <a routerLink="/best-sellers" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">Best Sellers</a>
            <a routerLink="/new-arrivals" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">New Arrivals</a>
            <a routerLink="/guide" routerLinkActive="text-gold-600" class="text-gray-600 hover:text-gold-500 px-3 py-2 text-sm font-medium transition-colors">Scent Guide</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Best Sellers (Mobile only) -->
            <a routerLink="/best-sellers" routerLinkActive="text-gold-600"
               class="md:hidden text-gray-600 hover:text-gold-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap">
              Best Sellers
            </a>

            <!-- Fancy Quiz Button -->
            <a href="https://app.xperfumes.me" target="_blank" 
               class="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group relative overflow-hidden">
              <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
              <mat-icon class="group-hover:rotate-12 transition-transform" style="font-size: 12px; width: 12px; height: 12px; sm:font-size: 14px; sm:width: 14px; sm:height: 14px;">auto_awesome</mat-icon>
              <span class="relative z-10">Quiz</span>
              <span class="hidden sm:inline relative z-10 ml-0.5">Perfume</span>
            </a>

            <!-- Cart Icon -->
            <a routerLink="/cart" class="relative p-1.5 sm:p-2 text-gray-600 hover:text-gold-500 transition-colors">
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
