import { Component, input, computed, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group block h-full relative">
      <!-- Action Buttons (Top Right) -->
      <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button (click)="toggleFavorite($event)" 
                (keydown.enter)="toggleFavorite($event)"
                aria-label="Add to favorites"
                [class.text-rose-500]="isFavorite()" [class.bg-rose-50]="isFavorite()"
                [class.text-gray-400]="!isFavorite()" [class.bg-white]="!isFavorite()"
                class="w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400">
          <mat-icon style="font-size: 18px; width: 18px; height: 18px;">{{ isFavorite() ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
        <button (click)="toggleCompare($event)" 
                (keydown.enter)="toggleCompare($event)"
                aria-label="Add to compare"
                [class.text-gold-600]="isCompare()" [class.bg-gold-50]="isCompare()"
                [class.text-gray-400]="!isCompare()" [class.bg-white]="!isCompare()"
                class="w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-400">
          <mat-icon style="font-size: 18px; width: 18px; height: 18px;">{{ isCompare() ? 'compare_arrows' : 'compare_arrows' }}</mat-icon>
        </button>
      </div>

      <a [routerLink]="['/product', product().slug]" class="block h-full">
        <div class="border p-6 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden"
             [class]="themeClasses().container">
          
          <!-- Subtle accent line -->
          <div class="absolute top-0 left-0 w-full h-1 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
               [class]="themeClasses().accentLine"></div>

          <div class="mb-4 relative z-10">
            <p class="text-xs uppercase tracking-widest mb-1" [class]="themeClasses().brandText">{{ product().brand }}</p>
            <h3 class="text-xl font-serif transition-colors" [class]="themeClasses().titleText">{{ product().name }}</h3>
          </div>
          
          <div class="flex-grow relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs px-2 py-1 rounded-sm" [class]="themeClasses().badge">{{ product().gender }}</span>
              <span class="text-xs px-2 py-1 rounded-sm" [class]="themeClasses().badge">{{ product().category }}</span>
            </div>
            
            <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out">
              <div class="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                <p class="text-sm line-clamp-3 mb-4 mt-1" [class]="themeClasses().notesText">
                  <span class="font-medium" [class]="themeClasses().notesLabel">Key Notes:</span> {{ product().keyNotes }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="mt-auto pt-4 border-t flex items-end justify-between relative z-10" [class]="themeClasses().divider">
            <div>
              <p class="text-[10px] uppercase tracking-wider mb-0.5" [class]="themeClasses().originalPrice">Original: <span class="line-through">{{ product().originalPrice }} AED</span></p>
              <p class="text-sm font-medium flex items-baseline gap-1" [class]="themeClasses().impressionPriceContainer">
                <span class="text-[10px] uppercase tracking-wider mr-1" [class]="themeClasses().impressionLabel">Impression:</span>
                <span class="text-2xl font-bold" [class]="themeClasses().impressionPrice">{{ product().impressionPrice }} AED</span>
              </p>
            </div>
            <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors" [class]="themeClasses().arrowBtn">
              <mat-icon class="text-sm" style="font-size: 16px; width: 16px; height: 16px;">arrow_forward</mat-icon>
            </div>
          </div>
          
          <!-- Background decorative gradient for ranked cards -->
          @if (rank() !== 'default') {
            <div class="absolute -right-12 -bottom-12 w-40 h-40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"
                 [class]="themeClasses().bgGlow"></div>
          }
        </div>
      </a>
    </div>
  `
})
export class ProductCardComponent {
  private cartService = inject(CartService);
  product = input.required<Product>();
  rank = input<'gold' | 'silver' | 'bronze' | 'default'>('default');

  isFavorite = signal(false);
  isCompare = computed(() => this.cartService.isInCompare(this.product().id));

  toggleFavorite(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isFavorite.update(v => !v);
  }

  toggleCompare(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.toggleCompare(this.product());
  }

  themeClasses = computed(() => {
    const r = this.rank();
    if (r === 'gold') {
      return {
        container: 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 hover:border-amber-400',
        accentLine: 'bg-gradient-to-r from-amber-400 to-amber-600',
        brandText: 'text-amber-700',
        titleText: 'text-amber-900 group-hover:text-amber-600',
        badge: 'bg-amber-200/50 text-amber-900',
        notesText: 'text-amber-800',
        notesLabel: 'text-amber-950',
        divider: 'border-amber-200',
        originalPrice: 'text-amber-600/70',
        impressionPriceContainer: 'text-amber-900',
        impressionLabel: 'text-amber-700',
        impressionPrice: 'text-amber-950',
        arrowBtn: 'bg-amber-200 text-amber-800 group-hover:bg-amber-500 group-hover:text-white',
        bgGlow: 'bg-amber-400'
      };
    } else if (r === 'silver') {
      return {
        container: 'bg-gradient-to-br from-slate-50 to-gray-200 border-slate-300 hover:border-slate-400',
        accentLine: 'bg-gradient-to-r from-slate-400 to-slate-600',
        brandText: 'text-slate-600',
        titleText: 'text-slate-900 group-hover:text-slate-600',
        badge: 'bg-slate-200/70 text-slate-800',
        notesText: 'text-slate-700',
        notesLabel: 'text-slate-900',
        divider: 'border-slate-300',
        originalPrice: 'text-slate-500',
        impressionPriceContainer: 'text-slate-900',
        impressionLabel: 'text-slate-600',
        impressionPrice: 'text-slate-900',
        arrowBtn: 'bg-slate-300 text-slate-700 group-hover:bg-slate-600 group-hover:text-white',
        bgGlow: 'bg-slate-400'
      };
    } else if (r === 'bronze') {
      return {
        container: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:border-orange-400',
        accentLine: 'bg-gradient-to-r from-orange-400 to-orange-600',
        brandText: 'text-orange-700',
        titleText: 'text-orange-950 group-hover:text-orange-600',
        badge: 'bg-orange-200/60 text-orange-900',
        notesText: 'text-orange-800',
        notesLabel: 'text-orange-950',
        divider: 'border-orange-200',
        originalPrice: 'text-orange-600/70',
        impressionPriceContainer: 'text-orange-900',
        impressionLabel: 'text-orange-700',
        impressionPrice: 'text-orange-950',
        arrowBtn: 'bg-orange-200 text-orange-800 group-hover:bg-orange-500 group-hover:text-white',
        bgGlow: 'bg-orange-400'
      };
    } else {
      // Default
      return {
        container: 'bg-white border-gray-200 hover:border-gold-400',
        accentLine: 'bg-gradient-to-r from-gold-400 to-gold-600',
        brandText: 'text-gray-500',
        titleText: 'text-gray-900 group-hover:text-gold-600',
        badge: 'bg-gray-100 text-gray-600',
        notesText: 'text-gray-600',
        notesLabel: 'text-gray-900',
        divider: 'border-gray-100',
        originalPrice: 'text-gray-400',
        impressionPriceContainer: 'text-gray-900',
        impressionLabel: 'text-gray-500',
        impressionPrice: 'text-gray-900',
        arrowBtn: 'bg-gray-50 text-gray-600 group-hover:bg-gold-500 group-hover:text-white',
        bgGlow: ''
      };
    }
  });
}
