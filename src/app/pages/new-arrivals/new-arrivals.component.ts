import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [FormsModule, ProductCardComponent, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <p class="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Fresh Drops</p>
          <h1 class="text-4xl md:text-5xl font-serif text-gray-900 mb-12">New Arrivals</h1>
          
          <!-- Filters Row -->
          <div class="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8">
            <button (click)="setGender('All')" 
                    [class.bg-gray-900]="selectedGender() === 'All'" [class.text-white]="selectedGender() === 'All'"
                    [class.bg-white]="selectedGender() !== 'All'" [class.text-gray-500]="selectedGender() !== 'All'"
                    class="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-gray-200 transition-colors">
              All
            </button>
            <button (click)="setGender('Female')" 
                    [class.bg-gray-900]="selectedGender() === 'Female'" [class.text-white]="selectedGender() === 'Female'"
                    [class.bg-white]="selectedGender() !== 'Female'" [class.text-gray-500]="selectedGender() !== 'Female'"
                    class="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-gray-200 transition-colors">
              For Her
            </button>
            <button (click)="setGender('Male')" 
                    [class.bg-gray-900]="selectedGender() === 'Male'" [class.text-white]="selectedGender() === 'Male'"
                    [class.bg-white]="selectedGender() !== 'Male'" [class.text-gray-500]="selectedGender() !== 'Male'"
                    class="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-gray-200 transition-colors">
              For Him
            </button>
            <button (click)="setGender('Unisex')" 
                    [class.bg-gray-900]="selectedGender() === 'Unisex'" [class.text-white]="selectedGender() === 'Unisex'"
                    [class.bg-white]="selectedGender() !== 'Unisex'" [class.text-gray-500]="selectedGender() !== 'Unisex'"
                    class="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-gray-200 transition-colors">
              Unisex
            </button>
            
            <select [ngModel]="selectedFamily()" (ngModelChange)="setFamily($event)" 
                    class="px-4 py-2 text-xs font-bold tracking-widest text-gray-500 border border-gray-200 outline-none focus:border-gray-400 bg-white min-w-[160px]">
              <option value="All">All Families</option>
              @for (family of families(); track family) {
                <option [value]="family">{{ family }}</option>
              }
            </select>
            
            <input type="text" [ngModel]="searchQuery()" (ngModelChange)="setSearch($event)" placeholder="Search..." 
                   class="px-4 py-2 text-xs tracking-wider text-gray-700 border border-gray-200 outline-none focus:border-gray-400 bg-white min-w-[200px]">
          </div>
          
          <p class="text-sm text-gray-400">Showing {{ filteredProducts().length }} of {{ products().length }} fragrances</p>
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-20">
            <div class="w-12 h-12 border-4 border-gray-200 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (product of filteredProducts(); track product.id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
          
          @if (filteredProducts().length === 0) {
            <div class="text-center py-20">
              <mat-icon class="text-gray-300 mb-4" style="font-size: 48px; width: 48px; height: 48px;">search_off</mat-icon>
              <h3 class="text-xl font-serif text-gray-900 mb-2">No fragrances found</h3>
              <p class="text-gray-500">Try adjusting your filters to discover more scents.</p>
              <button (click)="resetFilters()" class="mt-6 text-gold-600 hover:text-gold-700 font-medium text-sm uppercase tracking-wider">
                Clear all filters
              </button>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class NewArrivalsComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  isLoading = signal(true);
  
  selectedGender = signal<string>('All');
  selectedFamily = signal<string>('All');
  searchQuery = signal<string>('');

  families = computed(() => {
    const allFamilies = this.products().map(p => p.olfactoryFamily).filter(f => !!f);
    return [...new Set(allFamilies)].sort();
  });

  filteredProducts = computed(() => {
    let result = this.products();
    
    if (this.selectedGender() !== 'All') {
      result = result.filter(p => p.gender === this.selectedGender());
    }
    
    if (this.selectedFamily() !== 'All') {
      result = result.filter(p => p.olfactoryFamily === this.selectedFamily());
    }
    
    if (this.searchQuery().trim()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.keyNotes.toLowerCase().includes(query)
      );
    }
    
    return result;
  });

  ngOnInit() {
    this.titleService.setTitle('New Arrivals | XPerfumes');
    this.metaService.updateTag({ name: 'description', content: 'Discover our newest luxury impression fragrances.' });
    
    // Simulate network request for loading skeleton
    setTimeout(() => {
      const newArrivals = this.productService.getAllProducts().filter(p => p.id.startsWith('na-'));
      this.products.set(newArrivals);
      this.isLoading.set(false);
    }, 500);
  }

  setGender(gender: string) {
    this.selectedGender.set(gender);
  }

  setFamily(family: string) {
    this.selectedFamily.set(family);
  }

  setSearch(query: string) {
    this.searchQuery.set(query);
  }

  resetFilters() {
    this.selectedGender.set('All');
    this.selectedFamily.set('All');
    this.searchQuery.set('');
  }
}
