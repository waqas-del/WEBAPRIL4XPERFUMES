import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <footer class="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div class="md:col-span-2">
            <h3 class="text-2xl font-serif font-bold tracking-tighter mb-4">
              X <span class="text-gold-500 font-light">PERFUMES</span>
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
              Luxury Scents, Crafted for You. Experience the finest fragrances curated for the modern connoisseur.
            </p>
          </div>
          
          <div>
            <h4 class="text-lg font-serif mb-4 text-gray-200">Quick Links</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a routerLink="/" class="hover:text-gold-400 transition-colors">Home</a></li>
              <li><a routerLink="/shop" class="hover:text-gold-400 transition-colors">Shop All</a></li>
              <li><a routerLink="/shop" [queryParams]="{ category: womensChoiceCategory }" class="hover:text-gold-400 transition-colors">Best Sellers</a></li>
              <li><a routerLink="/guide" class="hover:text-gold-400 transition-colors">Scent Guide</a></li>
              <li><a href="https://app.xperfumes.me" target="_blank" class="hover:text-gold-400 transition-colors">Perfume Quiz</a></li>
              <li><a routerLink="/about-us" class="hover:text-gold-400 transition-colors">About Us</a></li>
              <li><a routerLink="/contact-us" class="hover:text-gold-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-serif mb-4 text-gray-200">Legal & Support</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a routerLink="/shipping-delivery" class="hover:text-gold-400 transition-colors">Shipping & Delivery</a></li>
              <li><a routerLink="/refund-policy" class="hover:text-gold-400 transition-colors">Refund Policy</a></li>
              <li><a routerLink="/terms-conditions" class="hover:text-gold-400 transition-colors">Terms & Conditions</a></li>
              <li><a routerLink="/privacy-policy" class="hover:text-gold-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
        </div>
        
        <div class="pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {{ currentYear }} X Perfumes. All rights reserved.</p>
          <div class="mt-4 md:mt-0 space-x-4">
            <a routerLink="/privacy-policy" class="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a routerLink="/terms-conditions" class="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  womensChoiceCategory = "Womens' Choice for Men";
}
