import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, MatIconModule, QuoteCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="relative bg-gray-50 pt-32 pb-40 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-200 opacity-90"></div>
          <!-- Decorative elements -->
          <div class="absolute top-20 left-10 w-64 h-64 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div class="absolute top-40 right-10 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="text-gold-600 font-medium tracking-widest uppercase text-sm mb-4 block">Welcome to X Perfumes</span>
          <h1 class="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Luxury Scents,<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 font-light italic">Crafted for You.</span>
          </h1>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10 font-light">
            Discover our curated collection of the world's most exquisite fragrances. Elevate your presence with a signature scent.
          </p>
          <div class="flex justify-center gap-4">
            <a routerLink="/new-arrivals" class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-sm text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              New Arrivals
            </a>
            <a routerLink="/best-sellers" class="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-sm text-gray-900 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              Best Seller Page
            </a>
          </div>
        </div>
      </section>

      <!-- Tagline Section -->
      <section class="py-16 bg-gold-50/30 border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-2xl md:text-3xl font-serif font-medium text-gray-900 leading-relaxed">
            Experience the world’s most luxurious fragrances — <br class="hidden md:block" />
            <span class="text-gold-600 italic font-light">without the luxury price tag.</span>
          </p>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-serif font-bold text-gray-900">Shop by Category</h2>
            <div class="w-16 h-0.5 bg-gold-400 mx-auto mt-4"></div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <!-- Male -->
            <a routerLink="/shop" [queryParams]="{ gender: 'Male' }" class="group relative h-24 md:h-80 bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex items-center justify-center rounded-lg">
              <div class="absolute inset-0 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-500 z-0"></div>
              <div class="relative z-20 text-center transform transition-transform duration-500">
                <h3 class="text-lg md:text-2xl font-serif text-gray-900 mb-0 md:mb-2 group-hover:text-gold-600 transition-colors duration-300">Pour Homme</h3>
                <span class="hidden md:flex text-gray-500 group-hover:text-gold-500 text-sm tracking-widest uppercase items-center justify-center gap-1 transition-colors duration-300">
                  Explore <mat-icon class="transform group-hover:translate-x-1 transition-transform duration-300" style="font-size: 14px; width: 14px; height: 14px;">arrow_forward</mat-icon>
                </span>
              </div>
            </a>
            
            <!-- Female -->
            <a routerLink="/shop" [queryParams]="{ gender: 'Female' }" class="group relative h-24 md:h-80 bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex items-center justify-center rounded-lg">
              <div class="absolute inset-0 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-500 z-0"></div>
              <div class="relative z-20 text-center transform transition-transform duration-500">
                <h3 class="text-lg md:text-2xl font-serif text-gray-900 mb-0 md:mb-2 group-hover:text-gold-600 transition-colors duration-300">Pour Femme</h3>
                <span class="hidden md:flex text-gray-500 group-hover:text-gold-500 text-sm tracking-widest uppercase items-center justify-center gap-1 transition-colors duration-300">
                  Explore <mat-icon class="transform group-hover:translate-x-1 transition-transform duration-300" style="font-size: 14px; width: 14px; height: 14px;">arrow_forward</mat-icon>
                </span>
              </div>
            </a>
            
            <!-- Unisex -->
            <a routerLink="/shop" [queryParams]="{ gender: 'Unisex' }" class="col-span-2 md:col-span-1 group relative h-24 md:h-80 bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex items-center justify-center rounded-lg">
              <div class="absolute inset-0 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-500 z-0"></div>
              <div class="relative z-20 text-center transform transition-transform duration-500">
                <h3 class="text-lg md:text-2xl font-serif text-gray-900 mb-0 md:mb-2 group-hover:text-gold-600 transition-colors duration-300">Unisex</h3>
                <span class="hidden md:flex text-gray-500 group-hover:text-gold-500 text-sm tracking-widest uppercase items-center justify-center gap-1 transition-colors duration-300">
                  Explore <mat-icon class="transform group-hover:translate-x-1 transition-transform duration-300" style="font-size: 14px; width: 14px; height: 14px;">arrow_forward</mat-icon>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Top Picks Section -->
      <section class="py-24 bg-gray-50 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-end mb-12">
            <div>
              <h2 class="text-3xl font-serif font-bold text-gray-900">Curated Top Picks</h2>
              <div class="w-16 h-0.5 bg-gold-400 mt-4"></div>
            </div>
            <a routerLink="/shop" class="text-sm font-medium text-gray-600 hover:text-gold-600 transition-colors flex items-center gap-1">
              View All <mat-icon style="font-size: 16px; width: 16px; height: 16px;">arrow_forward</mat-icon>
            </a>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of topPicks; track product.id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
        </div>
      </section>

      <!-- Best for Men Section -->
      <section class="py-24 bg-white border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-end mb-12">
            <div>
              <h2 class="text-3xl font-serif font-bold text-gray-900">Best for Men</h2>
              <div class="w-16 h-0.5 bg-gold-400 mt-4"></div>
            </div>
            <a routerLink="/shop" [queryParams]="{ gender: 'Male' }" class="text-sm font-medium text-gray-600 hover:text-gold-600 transition-colors flex items-center gap-1">
              View All <mat-icon style="font-size: 16px; width: 16px; height: 16px;">arrow_forward</mat-icon>
            </a>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of bestForMen; track product.id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
        </div>
      </section>

      <!-- Best for Women Section -->
      <section class="py-24 bg-gray-50 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-end mb-12">
            <div>
              <h2 class="text-3xl font-serif font-bold text-gray-900">Best for Women</h2>
              <div class="w-16 h-0.5 bg-gold-400 mt-4"></div>
            </div>
            <a routerLink="/shop" [queryParams]="{ gender: 'Female' }" class="text-sm font-medium text-gray-600 hover:text-gold-600 transition-colors flex items-center gap-1">
              View All <mat-icon style="font-size: 16px; width: 16px; height: 16px;">arrow_forward</mat-icon>
            </a>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of bestForWomen; track product.id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
        </div>
      </section>

      <!-- Facts about Niche and Designer Perfumes -->
      <section class="py-24 bg-white border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">The Truth About Designer & Niche Perfumes</h2>
            <div class="w-16 h-0.5 bg-gold-400 mx-auto"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="group bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gold-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <mat-icon>sell</mat-icon>
              </div>
              <p class="text-gray-800 font-medium leading-relaxed text-lg">Overpriced due to branding, packaging, and marketing</p>
            </div>
            
            <div class="group bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gold-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <mat-icon>loyalty</mat-icon>
              </div>
              <p class="text-gray-800 font-medium leading-relaxed text-lg">You pay for the name, not just the fragrance</p>
            </div>
            
            <div class="group bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gold-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <mat-icon>account_balance_wallet</mat-icon>
              </div>
              <p class="text-gray-800 font-medium leading-relaxed text-lg">Hard to own multiple scents due to high cost</p>
            </div>
            
            <div class="group bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gold-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <mat-icon>science</mat-icon>
              </div>
              <p class="text-gray-800 font-medium leading-relaxed text-lg">Niche can be too experimental for daily wear</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Disclaimer / Philosophy Section -->
      <section class="py-24 bg-gray-900 text-white border-t border-gray-800 relative overflow-hidden">
        <!-- Decorative background elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
          <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-gold-500"></div>
          <div class="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gold-500"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <mat-icon class="text-gold-400 mb-6" style="font-size: 48px; width: 48px; height: 48px;">auto_awesome</mat-icon>
          <h2 class="text-3xl md:text-4xl font-serif font-bold mb-6">The Art of Impression</h2>
          <div class="w-16 h-0.5 bg-gold-500 mx-auto mb-8"></div>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6">
            At X Perfumes, we believe that luxury should be accessible. We specialize in crafting high-quality <strong class="text-white font-medium">impressions</strong> of the world's most iconic designer fragrances.
          </p>
          <p class="text-lg text-gray-400 leading-relaxed font-light">
            Our master perfumers meticulously analyze and recreate these beloved scent profiles using premium ingredients. This allows us to offer you the exact olfactory experience, exceptional longevity, and beautiful sillage of luxury perfumes—without the designer markup. <br/><br/>
            <span class="text-sm text-gray-500 uppercase tracking-widest font-bold">Disclaimer:</span> <span class="text-sm text-gray-500">You are purchasing our expertly blended impression, not the original designer product. Any brand names mentioned are for comparative purposes only.</span>
          </p>
        </div>
      </section>

      <app-quote-card></app-quote-card>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  topPicks: Product[] = [];
  bestForMen: Product[] = [];
  bestForWomen: Product[] = [];

  ngOnInit() {
    this.titleService.setTitle('XPerfumes | Luxury Impression Fragrances');
    this.metaService.updateTag({ name: 'description', content: 'Discover XPerfumes, your destination for high-quality, long-lasting luxury impression fragrances. Shop the best designer perfume alternatives.' });
    this.metaService.updateTag({ property: 'og:title', content: 'XPerfumes | Luxury Impression Fragrances' });
    this.metaService.updateTag({ property: 'og:description', content: 'Discover XPerfumes, your destination for high-quality, long-lasting luxury impression fragrances. Shop the best designer perfume alternatives.' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    this.topPicks = this.productService.getTopPicks();
    const allProducts = this.productService.getAllProducts();
    this.bestForMen = allProducts.filter(p => p.gender === 'Male').slice(0, 4);
    this.bestForWomen = allProducts.filter(p => p.gender === 'Female').slice(0, 4);
  }
}
