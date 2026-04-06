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
      <a [routerLink]="['/product', product().slug]" class="block h-full">
        <div class="border p-6 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden"
             [class]="themeClasses().container">
          
          <!-- Subtle accent line -->
          <div class="absolute top-0 left-0 w-full h-1 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
               [class]="themeClasses().accentLine"></div>

          <!-- Line 1: Brand -->
          <p class="text-[10px] uppercase tracking-[0.2em] mb-1 font-bold" [class]="themeClasses().brandText">
            {{ product().brand }}
          </p>
          
          <!-- Line 2: Name -->
          <h3 class="text-xl font-serif font-bold mb-2 transition-colors" [class]="themeClasses().titleText">
            {{ product().name }}
          </h3>
          
          <!-- Line 3: Type -->
          <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border" [class]="themeClasses().badge">
              {{ product().gender }}
            </span>
            <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border" [class]="themeClasses().badge">
              {{ product().category }}
            </span>
          </div>
          
          <!-- Line 4, 5: Key Notes -->
          <div class="flex-grow mb-4">
            <p class="text-xs leading-relaxed line-clamp-2" [class]="themeClasses().notesText">
              <span class="font-bold uppercase tracking-tighter mr-1" [class]="themeClasses().notesLabel">Notes:</span>
              {{ product().keyNotes }}
            </p>
          </div>

          <!-- Divider -->
          <div class="border-t mb-4" [class]="themeClasses().divider"></div>
          
          <!-- Line 6: Original Price -->
          <p class="text-[10px] uppercase tracking-widest mb-1" [class]="themeClasses().originalPrice">
            Original: <span class="line-through">{{ product().originalPrice }} AED</span>
          </p>
          
          <!-- Line 7: Impression Price -->
          <div class="mb-5">
            <p class="text-sm font-medium flex items-baseline gap-2" [class]="themeClasses().impressionPriceContainer">
              <span class="text-[10px] uppercase tracking-wider font-bold" [class]="themeClasses().impressionLabel">Impression:</span>
              <span class="text-2xl font-black" [class]="themeClasses().impressionPrice">{{ product().impressionPrice }} AED</span>
            </p>
          </div>

          <!-- Line 8: Icons -->
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center gap-3">
              <!-- Favorite -->
              <button (click)="toggleFavorite($event)" 
                      aria-label="Add to favorites"
                      [class.text-rose-500]="isFavorite()" [class.bg-rose-50]="isFavorite()"
                      [class.text-gray-400]="!isFavorite()" [class.bg-white]="!isFavorite()"
                      class="w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400">
                <mat-icon style="font-size: 18px; width: 18px; height: 18px;">{{ isFavorite() ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>

              <!-- Compare -->
              <button (click)="toggleCompare($event)" 
                      aria-label="Add to compare"
                      [class.text-gold-600]="isCompare()" [class.bg-gold-50]="isCompare()"
                      [class.text-gray-400]="!isCompare()" [class.bg-white]="!isCompare()"
                      class="w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-400">
                <mat-icon style="font-size: 18px; width: 18px; height: 18px;">compare_arrows</mat-icon>
              </button>

              <!-- Quick Add to Cart -->
              <button (click)="addToCart($event)" 
                      aria-label="Add to cart"
                      [class.bg-green-600]="isAdding()" [class.text-white]="isAdding()"
                      [class.bg-white]="!isAdding()" [class.text-green-600]="!isAdding()"
                      class="w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400">
                <mat-icon style="font-size: 18px; width: 18px; height: 18px;">{{ isAdding() ? 'check' : 'shopping_cart' }}</mat-icon>
              </button>
            </div>

            <!-- Detail Arrow -->
            <div class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" [class]="themeClasses().arrowBtn">
              <mat-icon style="font-size: 18px; width: 18px; height: 18px;">arrow_forward</mat-icon>
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
  isAdding = signal(false);
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

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product());
    
    this.isAdding.set(true);
    setTimeout(() => this.isAdding.set(false), 1500);
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
