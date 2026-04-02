import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="mb-12">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">The Collection</h1>
          <p class="text-gray-600 max-w-2xl">Explore our full range of luxury fragrances. Filter by gender, brand, or search for your favorite scent.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- Sidebar Filters -->
          <aside class="w-full lg:w-64 flex-shrink-0">
            <div class="bg-white p-6 border border-gray-200 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Search</h3>
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

              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Sort By</h3>
                <select [(ngModel)]="selectedSort" (ngModelChange)="applyFilters()" class="w-full border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm py-2">
                  <option value="default">Featured</option>
                  <option value="best-seller">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Gender</h3>
                <div class="space-y-2">
                  @for (gender of ['All', 'Male', 'Female', 'Unisex']; track gender) {
                    <label class="flex items-center">
                      <input type="radio" name="gender" [value]="gender" [(ngModel)]="selectedGender" (ngModelChange)="applyFilters()" class="text-gold-600 focus:ring-gold-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-600">{{ gender }}</span>
                    </label>
                  }
                </div>
              </div>

              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Brand</h3>
                <select [(ngModel)]="selectedBrand" (ngModelChange)="applyFilters()" class="w-full border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm py-2">
                  <option value="All">All Brands</option>
                  @for (brand of brands(); track brand) {
                    <option [value]="brand">{{ brand }}</option>
                  }
                </select>
              </div>

              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Category</h3>
                <select [(ngModel)]="selectedCategory" (ngModelChange)="applyFilters()" class="w-full border-gray-300 rounded-sm focus:ring-gold-500 focus:border-gold-500 text-sm py-2">
                  <option value="All">All Categories</option>
                  @for (cat of categories(); track cat) {
                    <option [value]="cat">{{ cat }}</option>
                  }
                </select>
              </div>

              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Longevity</h3>
                <div class="space-y-2">
                  @for (longevity of longevityOptions; track longevity) {
                    <label class="flex items-center">
                      <input type="radio" name="longevity" [value]="longevity" [(ngModel)]="selectedLongevity" (ngModelChange)="applyFilters()" class="text-gold-600 focus:ring-gold-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-600">{{ longevity }}</span>
                    </label>
                  }
                </div>
              </div>

              <div class="mb-6">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Sillage</h3>
                <div class="space-y-2">
                  @for (sillage of sillageOptions; track sillage) {
                    <label class="flex items-center">
                      <input type="radio" name="sillage" [value]="sillage" [(ngModel)]="selectedSillage" (ngModelChange)="applyFilters()" class="text-gold-600 focus:ring-gold-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-600">{{ sillage }}</span>
                    </label>
                  }
                </div>
              </div>
              
              <button (click)="resetFilters()" class="w-full py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors">
                Reset Filters
              </button>
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

  allProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  isLoading = signal(true);

  searchQuery = '';
  selectedSort = 'default';
  selectedGender = 'All';
  selectedBrand = 'All';
  selectedCategory = 'All';
  selectedLongevity = 'All';
  selectedSillage = 'All';

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

  ngOnInit() {
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
    this.applyFilters();
  }
}
