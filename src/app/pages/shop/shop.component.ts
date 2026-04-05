import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, ProductCardComponent, MatIconModule, QuoteCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="mb-12">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">The Collection</h1>
          <p class="text-gray-600 max-w-2xl">Explore our full range of luxury fragrances. Filter by gender, brand, or search for your favorite scent.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- Mobile Filter Overlay -->
          @if (isMobileFilterOpen()) {
            <div class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity" (click)="isMobileFilterOpen.set(false)" (keydown.escape)="isMobileFilterOpen.set(false)" tabindex="-1"></div>
          }

          <!-- Sidebar Filters -->
          <aside class="fixed inset-y-0 left-0 z-50 w-[280px] bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64 lg:flex-shrink-0 lg:z-auto lg:bg-transparent lg:overflow-visible"
                 [class.translate-x-0]="isMobileFilterOpen()"
                 [class.-translate-x-full]="!isMobileFilterOpen()">
            <div class="bg-white border-r lg:border border-gray-200 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto min-h-full lg:min-h-0 pb-20 lg:pb-0">
              
              <!-- Mobile Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden sticky top-0 bg-white z-10">
                <h2 class="text-lg font-serif font-bold text-gray-900">Filters</h2>
                <button (click)="isMobileFilterOpen.set(false)" class="p-2 -mr-2 text-gray-500 hover:text-gray-900 transition-colors">
                  <mat-icon>close</mat-icon>
                </button>
              </div>

              <!-- Search -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('search')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Search</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['search']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['search']">
                  <div class="relative">
                    <input 
                      type="text" 
                      [(ngModel)]="searchQuery" 
                      (ngModelChange)="applyFilters()"
                      placeholder="Search perfumes..." 
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm"
                    >
                    <mat-icon class="absolute left-3 top-2.5 text-gray-400" style="font-size: 18px; width: 18px; height: 18px;">search</mat-icon>
                  </div>
                </div>
              </div>

              <!-- Sort By -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('sort')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Sort By</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['sort']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['sort']">
                  <select [(ngModel)]="selectedSort" (ngModelChange)="applyFilters()" class="w-full border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm py-2">
                    <option value="default">Featured</option>
                    <option value="best-seller">Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <!-- Gender -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('gender')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Gender</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['gender']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['gender']">
                  <div class="space-y-2">
                    @for (gender of ['All', 'Male', 'Female', 'Unisex']; track gender) {
                      <label class="flex items-center cursor-pointer group">
                        <input type="radio" name="gender" [value]="gender" [(ngModel)]="selectedGender" (ngModelChange)="applyFilters()" class="text-gold-600 focus:ring-gold-500 border-gray-300">
                        <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900">{{ gender }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>

              <!-- Season (When to Wear) -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('season')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">When to Wear</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['season']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['season']">
                  <div class="space-y-2">
                    @for (season of seasonsOptions(); track season) {
                      <label class="flex items-center cursor-pointer group">
                        <input type="checkbox" [checked]="selectedSeasons.includes(season)" (change)="toggleSeason(season)" class="text-gold-600 focus:ring-gold-500 border-gray-300 rounded-sm">
                        <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900">{{ season }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>

              <!-- Best Occasion -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('occasion')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Best Occasion</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['occasion']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['occasion']">
                  <div class="space-y-2">
                    @for (occasion of occasionsOptions(); track occasion) {
                      <label class="flex items-center cursor-pointer group">
                        <input type="checkbox" [checked]="selectedOccasions.includes(occasion)" (change)="toggleOccasion(occasion)" class="text-gold-600 focus:ring-gold-500 border-gray-300 rounded-sm">
                        <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900">{{ occasion }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>

              <!-- Brand -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('brand')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Brand</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['brand']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['brand']">
                  <select [(ngModel)]="selectedBrand" (ngModelChange)="applyFilters()" class="w-full border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm py-2">
                    <option value="All">All Brands</option>
                    @for (brand of brands(); track brand) {
                      <option [value]="brand">{{ brand }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Category -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('category')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Category</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['category']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['category']">
                  <select [(ngModel)]="selectedCategory" (ngModelChange)="applyFilters()" class="w-full border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm py-2">
                    <option value="All">All Categories</option>
                    @for (cat of categories(); track cat) {
                      <option [value]="cat">{{ cat }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Longevity -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('longevity')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Longevity</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['longevity']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['longevity']">
                  <div class="space-y-2">
                    @for (longevity of longevityOptions; track longevity) {
                      <label class="flex items-center cursor-pointer group">
                        <input type="radio" name="longevity" [value]="longevity" [(ngModel)]="selectedLongevity" (ngModelChange)="applyFilters()" class="text-gold-600 focus:ring-gold-500 border-gray-300">
                        <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900">{{ longevity }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>

              <!-- Sillage -->
              <div class="border-b border-gray-200">
                <button (click)="toggleSection('sillage')" class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Sillage</h3>
                  <mat-icon class="text-gray-500 transition-transform duration-300" [class.rotate-180]="expandedSections['sillage']">expand_more</mat-icon>
                </button>
                <div class="px-6 pb-6 pt-2" [class.hidden]="!expandedSections['sillage']">
                  <div class="space-y-2">
                    @for (sillage of sillageOptions; track sillage) {
                      <label class="flex items-center cursor-pointer group">
                        <input type="radio" name="sillage" [value]="sillage" [(ngModel)]="selectedSillage" (ngModelChange)="applyFilters()" class="text-gold-600 focus:ring-gold-500 border-gray-300">
                        <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900">{{ sillage }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <button (click)="resetFilters()" class="w-full py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors">
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          <!-- Product Grid -->
          <div class="flex-grow">
            <div class="mb-6 flex justify-between items-center">
              <p class="text-sm text-gray-500">
                @if (isLoading()) {
                  Loading products...
                } @else {
                  Showing {{ filteredProducts().length }} results
                }
              </p>
              <button (click)="isMobileFilterOpen.set(true)" class="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                <mat-icon style="font-size: 18px; width: 18px; height: 18px;">filter_list</mat-icon>
                Filters
              </button>
            </div>

            @if (isLoading()) {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (i of [1, 2, 3, 4, 5, 6]; track i) {
                  <div class="border border-gray-200 bg-white p-6 h-[280px] flex flex-col relative overflow-hidden animate-pulse">
                    <div class="mb-4">
                      <div class="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                      <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div class="flex-grow">
                      <div class="flex items-center gap-2 mb-4">
                        <div class="h-5 bg-gray-200 rounded w-16"></div>
                        <div class="h-5 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div class="space-y-2 mb-4">
                        <div class="h-4 bg-gray-200 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                    <div class="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <div class="h-3 bg-gray-200 rounded w-12 mb-2"></div>
                        <div class="h-5 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                }
              </div>
            } @else if (filteredProducts().length === 0) {
              <div class="bg-white p-12 text-center border border-gray-200">
                <mat-icon class="text-gray-300 mb-4" style="font-size: 48px; width: 48px; height: 48px;">search_off</mat-icon>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p class="text-gray-500">Try adjusting your filters or search query.</p>
                <button (click)="resetFilters()" class="mt-4 text-gold-600 hover:text-gold-700 font-medium text-sm">Clear all filters</button>
              </div>
            } @else {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (product of filteredProducts(); track product.id) {
                  <app-product-card [product]="product"></app-product-card>
                }
              </div>
            }
          </div>

        </div>

        <app-quote-card></app-quote-card>
      </div>
    </div>
  `
})
export class ShopComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  allProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  isLoading = signal(true);
  isMobileFilterOpen = signal(false);

  searchQuery = '';
  selectedSort = 'default';
  selectedGender = 'All';
  selectedBrand = 'All';
  selectedCategory = 'All';
  selectedLongevity = 'All';
  selectedSillage = 'All';
  selectedSeasons: string[] = [];
  selectedOccasions: string[] = [];

  expandedSections: Record<string, boolean> = {
    search: true,
    sort: true,
    gender: true,
    season: true,
    occasion: true,
    brand: false,
    category: false,
    longevity: false,
    sillage: false
  };

  longevityOptions = ['All', 'Moderate', 'Long lasting', 'Eternal'];
  sillageOptions = ['All', 'Intimate', 'Moderate', 'Strong', 'Enormous'];

  brands = computed(() => {
    const uniqueBrands = new Set(this.allProducts().map(p => p.brand));
    return Array.from(uniqueBrands).sort();
  });

  categories = computed(() => {
    const uniqueCats = new Set(this.allProducts().map(p => p.category));
    return Array.from(uniqueCats).sort();
  });

  seasonsOptions = computed(() => {
    const uniqueSeasons = new Set<string>();
    this.allProducts().forEach(p => {
      if (p.whenToWear) {
        p.whenToWear.split(',').forEach(s => uniqueSeasons.add(s.trim()));
      }
    });
    return Array.from(uniqueSeasons).sort();
  });

  occasionsOptions = computed(() => {
    const uniqueOccasions = new Set<string>();
    this.allProducts().forEach(p => {
      if (p.bestOccasion) {
        p.bestOccasion.split(',').forEach(o => uniqueOccasions.add(o.trim()));
      }
    });
    return Array.from(uniqueOccasions).sort();
  });

  toggleSection(section: string) {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  toggleSeason(season: string) {
    const index = this.selectedSeasons.indexOf(season);
    if (index > -1) {
      this.selectedSeasons.splice(index, 1);
    } else {
      this.selectedSeasons.push(season);
    }
    this.applyFilters();
  }

  toggleOccasion(occasion: string) {
    const index = this.selectedOccasions.indexOf(occasion);
    if (index > -1) {
      this.selectedOccasions.splice(index, 1);
    } else {
      this.selectedOccasions.push(occasion);
    }
    this.applyFilters();
  }

  ngOnInit() {
    this.titleService.setTitle('Shop All Fragrances | XPerfumes');
    this.metaService.updateTag({ name: 'description', content: 'Explore our full collection of luxury impression fragrances at XPerfumes. Filter by gender, brand, season, and occasion to find your perfect scent.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Shop All Fragrances | XPerfumes' });
    this.metaService.updateTag({ property: 'og:description', content: 'Explore our full collection of luxury impression fragrances at XPerfumes. Filter by gender, brand, season, and occasion to find your perfect scent.' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // Simulate network request for loading skeleton
    setTimeout(() => {
      this.allProducts.set(this.productService.getAllProducts());
      this.filteredProducts.set(this.allProducts());

      // Check for query params (e.g., from Home page category clicks)
      this.route.queryParams.subscribe(params => {
        let shouldApply = false;
        if (params['gender']) {
          this.selectedGender = params['gender'];
          shouldApply = true;
        }
        if (params['sort']) {
          this.selectedSort = params['sort'];
          shouldApply = true;
        }
        if (params['category']) {
          this.selectedCategory = params['category'];
          shouldApply = true;
        }
        
        if (shouldApply) {
          this.applyFilters();
        }
      });
      
      this.isLoading.set(false);
    }, 800);
  }

  applyFilters() {
    let result = this.allProducts();

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.keyNotes.toLowerCase().includes(query)
      );
    }

    if (this.selectedGender !== 'All') {
      result = result.filter(p => p.gender === this.selectedGender);
    }

    if (this.selectedBrand !== 'All') {
      result = result.filter(p => p.brand === this.selectedBrand);
    }

    if (this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedLongevity !== 'All') {
      result = result.filter(p => p.longevity === this.selectedLongevity);
    }

    if (this.selectedSillage !== 'All') {
      result = result.filter(p => p.sillage === this.selectedSillage);
    }

    if (this.selectedSeasons.length > 0) {
      result = result.filter(p => {
        if (!p.whenToWear) return false;
        const productSeasons = p.whenToWear.split(',').map(s => s.trim());
        return this.selectedSeasons.some(selected => productSeasons.includes(selected));
      });
    }

    if (this.selectedOccasions.length > 0) {
      result = result.filter(p => {
        if (!p.bestOccasion) return false;
        const productOccasions = p.bestOccasion.split(',').map(o => o.trim());
        return this.selectedOccasions.some(selected => productOccasions.includes(selected));
      });
    }

    // Apply Sorting
    if (this.selectedSort === 'best-seller') {
      result = result.sort((a, b) => (b.isTopPick ? 1 : 0) - (a.isTopPick ? 1 : 0));
    } else if (this.selectedSort === 'price-low') {
      result = result.sort((a, b) => a.impressionPrice - b.impressionPrice);
    } else if (this.selectedSort === 'price-high') {
      result = result.sort((a, b) => b.impressionPrice - a.impressionPrice);
    } else if (this.selectedSort === "Womens' Choice for Men") {
      // If sort is passed as a category name, filter by it
      this.selectedCategory = this.selectedSort;
      result = result.filter(p => p.category === this.selectedCategory);
    }

    this.filteredProducts.set(result);
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedSort = 'default';
    this.selectedGender = 'All';
    this.selectedBrand = 'All';
    this.selectedCategory = 'All';
    this.selectedLongevity = 'All';
    this.selectedSillage = 'All';
    this.selectedSeasons = [];
    this.selectedOccasions = [];
    this.applyFilters();
  }
}
