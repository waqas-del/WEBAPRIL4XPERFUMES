import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="min-h-screen bg-white py-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">About X Perfumes</h1>
          <div class="w-24 h-0.5 bg-gold-400 mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-6">Who We Are & What We Do</h2>
            <p class="text-lg text-gray-600 leading-relaxed mb-6">
              At X Perfumes, we believe that luxury should be an accessible experience, not an exclusive privilege. We specialize in crafting high-quality, expertly blended <strong class="text-gray-900">impressions</strong> of the world's most iconic and beloved designer fragrances.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              Our master perfumers meticulously analyze and recreate complex scent profiles using premium ingredients. This dedication to the craft allows us to offer you the exact olfactory experience, exceptional longevity, and beautiful sillage of luxury perfumes—without the designer markup.
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-2xl border border-gray-200 text-center relative overflow-hidden shadow-sm">
            <div class="absolute -right-8 -bottom-8 text-gold-500/10 transform -rotate-12">
              <mat-icon style="font-size: 200px; width: 200px; height: 200px;">auto_awesome</mat-icon>
            </div>
            <div class="relative z-10 flex flex-col gap-12">
              <div>
                <span class="block text-6xl font-serif font-bold text-gold-600 mb-2">4+</span>
                <span class="text-sm font-bold uppercase tracking-widest text-gray-900">Years in Business</span>
              </div>
              <div class="w-16 h-px bg-gray-300 mx-auto"></div>
              <div>
                <span class="block text-6xl font-serif font-bold text-gold-600 mb-2">10,000+</span>
                <span class="text-sm font-bold uppercase tracking-widest text-gray-900">Perfume Bottles Served</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Why X Perfumes Section -->
        <div class="mb-24">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">Why X Perfumes?</h2>
            <div class="w-16 h-0.5 bg-gold-400 mx-auto"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-rose-50 p-6 rounded-xl border border-rose-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 text-rose-600">
                <mat-icon>auto_awesome</mat-icon>
              </div>
              <div>
                <p class="text-gray-800 font-medium leading-snug mt-1">Inspired by world-renowned designer & niche fragrances</p>
              </div>
            </div>
            
            <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <mat-icon>wb_sunny</mat-icon>
              </div>
              <div>
                <p class="text-gray-800 font-medium leading-snug mt-1">Crafted for long-lasting performance in UAE weather</p>
              </div>
            </div>
            
            <div class="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <mat-icon>payments</mat-icon>
              </div>
              <div>
                <p class="text-gray-800 font-medium leading-snug mt-1">Affordable luxury (AED 60–99)</p>
              </div>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600">
                <mat-icon>mood</mat-icon>
              </div>
              <div>
                <p class="text-gray-800 font-medium leading-snug mt-1">Wide variety for every mood, occasion & personality</p>
              </div>
            </div>
            
            <div class="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow lg:col-span-2">
              <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                <mat-icon>diamond</mat-icon>
              </div>
              <div>
                <p class="text-gray-800 font-medium leading-snug mt-1">Premium scent experience without overpaying for branding</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Facts about Niche and Designer Perfumes -->
        <div class="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div class="text-center mb-12 relative z-10">
            <h2 class="text-3xl font-serif font-bold mb-4">The Truth About Designer & Niche Perfumes</h2>
            <div class="w-16 h-0.5 bg-gold-500 mx-auto"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition-colors hover:-translate-y-1 duration-300">
              <div class="text-4xl mb-6">🏷️</div>
              <p class="text-gray-300 leading-relaxed font-medium">Overpriced due to branding, packaging, and marketing</p>
            </div>
            
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition-colors hover:-translate-y-1 duration-300">
              <div class="text-4xl mb-6">🧴</div>
              <p class="text-gray-300 leading-relaxed font-medium">You pay for the name, not just the fragrance</p>
            </div>
            
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition-colors hover:-translate-y-1 duration-300">
              <div class="text-4xl mb-6">🔄</div>
              <p class="text-gray-300 leading-relaxed font-medium">Hard to own multiple scents due to high cost</p>
            </div>
            
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition-colors hover:-translate-y-1 duration-300">
              <div class="text-4xl mb-6">🧪</div>
              <p class="text-gray-300 leading-relaxed font-medium">Niche can be too experimental for daily wear</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AboutUsComponent {}
