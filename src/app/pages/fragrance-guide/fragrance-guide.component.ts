import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fragrance-guide',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-stone-50 py-16 sm:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">How to Choose Your Signature Scent</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Finding the perfect perfume is an intimate journey. It's about discovering a scent that resonates with your personality, evokes memories, and leaves a lasting impression. Let us guide you through the art of perfumery.
          </p>
        </div>

        <!-- Section 1: The Fragrance Pyramid -->
        <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-100 mb-12 relative overflow-hidden">
          <div class="absolute -right-10 -top-10 text-stone-100 transform rotate-12">
            <mat-icon style="font-size: 200px; width: 200px; height: 200px;">change_history</mat-icon>
          </div>
          <div class="relative z-10">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
              <mat-icon class="text-gold-500">layers</mat-icon>
              The Fragrance Pyramid
            </h2>
            <p class="text-gray-600 mb-8">Perfumes are composed of three distinct layers of notes that unfold over time. Understanding this structure is key to knowing how a scent will evolve on your skin.</p>
            
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 font-bold">1</div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Top Notes (The Introduction)</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">The initial scent you smell immediately upon application. These are usually light, fresh, and evaporate quickly (within 15-30 minutes). Common top notes include citrus, light fruits, and herbs.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 font-bold">2</div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Heart Notes (The Core)</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">As the top notes fade, the heart notes emerge. These form the main body of the perfume and last for several hours. They are often well-rounded and include floral, spicy, or fruity elements.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">3</div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Base Notes (The Memory)</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">The final phase of the fragrance. These rich, heavy notes mingle with the heart notes to create the full body of the perfume. They linger on the skin for hours or even days. Think vanilla, musk, woods, and amber.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Fragrance Families -->
        <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-100 mb-12">
          <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
            <mat-icon class="text-gold-500">category</mat-icon>
            Fragrance Families
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 hover:shadow-md transition-shadow">
              <mat-icon class="text-rose-500 mb-4" style="font-size: 32px; width: 32px; height: 32px;">local_florist</mat-icon>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Floral</h3>
              <p class="text-sm text-gray-600">Romantic, powdery, and soft. Ranges from single flower notes (soliflore) to complex bouquets. Ideal for spring and summer.</p>
            </div>
            <div class="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 hover:shadow-md transition-shadow">
              <mat-icon class="text-amber-600 mb-4" style="font-size: 32px; width: 32px; height: 32px;">park</mat-icon>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Woody</h3>
              <p class="text-sm text-gray-600">Earthy, warm, and dry. Features notes like sandalwood, cedar, and vetiver. Perfect for evening wear and colder months.</p>
            </div>
            <div class="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 hover:shadow-md transition-shadow">
              <mat-icon class="text-purple-500 mb-4" style="font-size: 32px; width: 32px; height: 32px;">auto_awesome</mat-icon>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Oriental</h3>
              <p class="text-sm text-gray-600">Rich, exotic, and sensual. Characterized by spices, vanilla, amber, and musk. Bold and long-lasting.</p>
            </div>
            <div class="p-6 rounded-2xl bg-sky-50/50 border border-sky-100 hover:shadow-md transition-shadow">
              <mat-icon class="text-sky-500 mb-4" style="font-size: 32px; width: 32px; height: 32px;">water_drop</mat-icon>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Fresh</h3>
              <p class="text-sm text-gray-600">Clean, zesty, and vibrant. Includes citrus, green, and aquatic notes. Great for daytime, office wear, and hot weather.</p>
            </div>
          </div>
        </div>

        <!-- Section 3: Concentration -->
        <div class="bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-xl mb-12 text-white relative overflow-hidden">
          <div class="absolute right-0 top-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
              <mat-icon class="text-gold-400">opacity</mat-icon>
              Understanding Concentration
            </h2>
            <div class="space-y-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 class="text-lg font-bold text-gold-400">Parfum (Extrait)</h3>
                  <p class="text-sm text-gray-400">20-30% concentration</p>
                </div>
                <p class="text-sm font-medium mt-2 sm:mt-0">Lasts 8-24 hours</p>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">Eau de Parfum (EDP)</h3>
                  <p class="text-sm text-gray-400">15-20% concentration</p>
                </div>
                <p class="text-sm font-medium mt-2 sm:mt-0">Lasts 6-8 hours</p>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">Eau de Toilette (EDT)</h3>
                  <p class="text-sm text-gray-400">5-15% concentration</p>
                </div>
                <p class="text-sm font-medium mt-2 sm:mt-0">Lasts 3-5 hours</p>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold text-white">Eau de Cologne (EDC)</h3>
                  <p class="text-sm text-gray-400">2-5% concentration</p>
                </div>
                <p class="text-sm font-medium mt-2 sm:mt-0">Lasts 1-3 hours</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl p-10 sm:p-16 border border-gold-100">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">Ready to Find Your Scent?</h2>
          <p class="text-gray-600 mb-8 max-w-xl mx-auto">
            Explore our curated collections of premium fragrance impressions and find the one that speaks to you.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a routerLink="/best-sellers" class="bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
              <mat-icon>star</mat-icon>
              Best Sellers
            </a>
            <a routerLink="/new-arrivals" class="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:border-gray-900 transition-all flex items-center justify-center gap-2">
              <mat-icon>new_releases</mat-icon>
              New Arrivals
            </a>
          </div>
        </div>

      </div>
    </div>
  `
})
export class FragranceGuideComponent {}
