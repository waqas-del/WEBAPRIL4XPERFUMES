import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { PixelService } from '../../services/pixel.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, ProductCardComponent, QuoteCardComponent, NgOptimizedImage, FormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-white py-12">
      @if (product()) {
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Breadcrumbs -->
          <nav class="flex text-sm text-gray-500 mb-8">
            <a routerLink="/" class="hover:text-gray-900">Home</a>
            <span class="mx-2">/</span>
            <a routerLink="/shop" class="hover:text-gray-900">Shop</a>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ product()?.name }}</span>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Left Column: Typography/Artistic Representation instead of Image -->
            <div class="hidden lg:block lg:col-span-5 relative">
              <div class="sticky top-28 bg-gray-50 aspect-[4/5] flex items-center justify-center p-8 border border-gray-100">
                <div class="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50"></div>
                <div class="text-center relative z-10">
                  <!-- Background Watermark Image -->
                  <img ngSrc="https://ais-pre-t7gjcw6mcpay6ihwkb46i4-306586258974.europe-west2.run.app/api/attachments/1LkvJAAUDEmd09bRMB7nSKnOsxHsRaRNH" 
                       width="800"
                       height="800"
                       priority
                       class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-none h-[150%] object-contain opacity-[0.08] -z-10 pointer-events-none"
                       referrerpolicy="no-referrer"
                       [alt]="product()?.name + ' Impression by XPerfumes'">
                  
                  <p class="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">{{ product()?.brand }}</p>
                  <h1 class="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">{{ product()?.name }}</h1>
                  <div class="w-12 h-px bg-gold-400 mx-auto mt-8 mb-8"></div>
                  <p class="text-sm text-gray-500 italic font-serif">{{ product()?.olfactoryFamily }}</p>
                </div>
                
                <!-- Decorative corner accents -->
                <div class="absolute top-4 left-4 w-4 h-4 border-t border-l border-gray-300"></div>
                <div class="absolute top-4 right-4 w-4 h-4 border-t border-r border-gray-300"></div>
                <div class="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gray-300"></div>
                <div class="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gray-300"></div>
              </div>
            </div>

            <!-- Right Column: Details -->
            <div class="lg:col-span-7">
              <div class="mb-8">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-800 uppercase tracking-wider">{{ product()?.gender }}</span>
                  <span class="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-800 uppercase tracking-wider">{{ product()?.category }}</span>
                </div>
                <h2 class="text-3xl font-serif font-bold text-gray-900 mb-2">{{ product()?.name }}</h2>
                <p class="text-lg text-gray-600 mb-6">by {{ product()?.brand }} <span class="text-gray-400 text-sm ml-2">(Created {{ product()?.year }})</span></p>
                
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
                  <div class="flex items-start gap-3 mb-4">
                    <mat-icon class="text-gold-500 mt-0.5" style="font-size: 20px; width: 20px; height: 20px;">info</mat-icon>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      <strong class="text-gray-900">Note:</strong> We craft high-quality impressions of designer fragrances. You are purchasing our expertly blended impression, not the original designer product.
                    </p>
                  </div>
                  <div class="flex items-baseline gap-6 pt-4 border-t border-gray-200">
                    <div>
                      <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Impression Price</span>
                      <span class="text-4xl font-light text-gray-900">{{ product()?.impressionPrice }} AED</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Original Price</span>
                      <span class="text-lg text-gray-400 line-through">{{ product()?.originalPrice }} AED</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4">
                  <button (click)="addToCart()" 
                          [class.bg-green-600]="isAddedToCart()"
                          [class.hover:bg-green-700]="isAddedToCart()"
                          [class.bg-gray-900]="!isAddedToCart()"
                          [class.hover:bg-gray-800]="!isAddedToCart()"
                          class="flex-1 text-white px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden">
                    
                    @if (isAddedToCart()) {
                      <mat-icon class="animate-bounce" style="font-size: 18px; width: 18px; height: 18px;">check_circle</mat-icon>
                      <span>Added to Cart!</span>
                    } @else {
                      <mat-icon style="font-size: 18px; width: 18px; height: 18px;">shopping_bag</mat-icon>
                      <span>Add to Cart</span>
                    }
                  </button>
                  <button (click)="orderViaWhatsApp()" class="flex-1 bg-green-600 text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    <mat-icon style="font-size: 18px; width: 18px; height: 18px;">chat</mat-icon>
                    Order via WhatsApp
                  </button>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6 mb-6">
                <button (click)="toggleSection('scent')" class="w-full flex justify-between items-center text-left focus:outline-none">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900">Fragrance Notes & Profile</h3>
                  <mat-icon class="text-gray-400">{{ expandedSection() === 'scent' ? 'remove' : 'add' }}</mat-icon>
                </button>
                @if (expandedSection() === 'scent') {
                  <div class="mt-6 animate-in slide-in-from-top-2 duration-300">
                    <div class="p-6 sm:p-8 rounded-2xl border shadow-sm relative overflow-hidden bg-gradient-to-br" [class]="scentProfileTheme().container">
                      <div class="absolute -right-4 -bottom-4 transform -rotate-12" [class]="scentProfileTheme().bgIcon">
                        <mat-icon style="font-size: 140px; width: 140px; height: 140px;">water_drop</mat-icon>
                      </div>
                      <div class="relative z-10">
                        <p class="text-gray-800 leading-relaxed mb-6 text-lg font-serif italic">"{{ product()?.comment }}"</p>
                        
                        <div class="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-white/80 mb-6">
                          <div class="flex items-center gap-2 mb-2">
                            <mat-icon style="font-size: 20px; width: 20px; height: 20px;" [class]="scentProfileTheme().keyNotesIcon">spa</mat-icon>
                            <h4 class="text-xs font-bold uppercase tracking-widest" [class]="scentProfileTheme().keyNotesTitle">Key Notes</h4>
                          </div>
                          <p class="text-gray-900 font-medium text-lg">{{ product()?.keyNotes }}</p>
                        </div>

                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <h4 class="text-xs font-bold uppercase tracking-widest mb-1" [class]="scentProfileTheme().gridTitle">Olfactory Family</h4>
                            <p class="text-gray-900 font-medium">{{ product()?.olfactoryFamily }}</p>
                          </div>
                          <div>
                            <h4 class="text-xs font-bold uppercase tracking-widest mb-1" [class]="scentProfileTheme().gridTitle">Perfumer</h4>
                            <p class="text-gray-900 font-medium">{{ product()?.perfumer }}</p>
                          </div>
                          <div>
                            <h4 class="text-xs font-bold uppercase tracking-widest mb-1" [class]="scentProfileTheme().gridTitle">Longevity</h4>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold" [class]="scentProfileTheme().longevityBadge">
                              {{ product()?.longevity }}
                            </span>
                          </div>
                          <div>
                            <h4 class="text-xs font-bold uppercase tracking-widest mb-1" [class]="scentProfileTheme().gridTitle">Sillage</h4>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold" [class]="scentProfileTheme().sillageBadge">
                              {{ product()?.sillage }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div class="border-t border-gray-200 pt-8 mb-8">
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Why This Scent?</h3>
                <div class="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div class="absolute -right-4 -bottom-4 text-gray-200 transform -rotate-12">
                    <mat-icon style="font-size: 140px; width: 140px; height: 140px;">psychology</mat-icon>
                  </div>
                  <div class="relative z-10 flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                      <mat-icon>auto_awesome</mat-icon>
                    </div>
                    <div class="flex-1">
                      <p class="text-gray-700 leading-relaxed text-lg mb-6">
                        This fragrance is perfectly suited for the 
                        <span class="group relative inline-block cursor-help">
                          <strong class="text-gray-900 font-serif border-b border-dashed border-gray-400">{{ product()?.profession }}</strong>
                          <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white text-xs rounded py-1.5 px-2 text-center z-20">
                            The profession highlights the ideal setting or career path where this fragrance shines.
                            <svg class="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                          </span>
                        </span>. 
                        It embodies a 
                        <span class="group relative inline-block cursor-help">
                          <strong class="text-gray-900 font-serif border-b border-dashed border-gray-400">{{ product()?.persona }}</strong>
                          <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white text-xs rounded py-1.5 px-2 text-center z-20">
                            The persona describes the character and mood this scent projects to others.
                            <svg class="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                          </span>
                        </span> vibe, making it the ideal choice to complement your unique character and leave a memorable impression.
                      </p>
                      
                      <!-- Key Accords Subsection -->
                      <div class="pt-6 mt-6 border-t border-gray-200/60">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                          <mat-icon style="font-size: 16px; width: 16px; height: 16px;">bubble_chart</mat-icon>
                          Key Accords
                        </h4>
                        <div class="flex flex-wrap gap-3">
                          @for (accord of keyAccords(); track accord; let i = $index) {
                            <div class="group relative inline-block">
                              <span (click)="openAccordModal(accord)" 
                                    (keydown.enter)="openAccordModal(accord)"
                                    tabindex="0"
                                    [style.fontSize.px]="12 + (i % 3) * 2"
                                    class="inline-flex items-center px-4 py-2 rounded-xl font-medium bg-white border border-gray-100 text-gray-700 shadow-sm hover:shadow-xl hover:border-gold-300 hover:text-gold-700 transition-all duration-500 cursor-pointer hover:-translate-y-1 overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold-400">
                                <span class="absolute inset-0 bg-gradient-to-br from-gold-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                <span class="relative z-10">{{ accord }}</span>
                              </span>
                              <!-- Accord Tooltip -->
                              <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white text-[10px] rounded py-1.5 px-2 text-center z-30 shadow-xl">
                                {{ accordDescriptions[accord] || 'A unique scent profile.' }}
                                <svg class="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                              </div>
                            </div>
                          }
                        </div>
                      </div>

                      <!-- Fragrance Notes Subsection -->
                      <div class="pt-6 mt-6 border-t border-gray-200/60">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                          <mat-icon style="font-size: 16px; width: 16px; height: 16px;">auto_awesome_motion</mat-icon>
                          Fragrance Notes
                        </h4>
                        <p class="text-gray-800 font-serif italic text-lg leading-relaxed">
                          {{ product()?.keyNotes }}
                        </p>
                      </div>

                      <!-- Perfumer Subsection -->
                      <div class="pt-6 mt-6 border-t border-gray-200/60">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                          <mat-icon style="font-size: 16px; width: 16px; height: 16px;">science</mat-icon>
                          The Nose Behind The Scent
                        </h4>
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 border border-gray-300 shadow-inner">
                            <mat-icon style="font-size: 20px; width: 20px; height: 20px;">person</mat-icon>
                          </div>
                          <div>
                            <p class="text-gray-900 font-serif font-bold text-lg">{{ product()?.perfumer }}</p>
                            <p class="text-xs text-gray-500 uppercase tracking-wider">Master Perfumer</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6 mb-6">
                <button (click)="toggleSection('when')" class="w-full flex justify-between items-center text-left focus:outline-none">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900">When & Where</h3>
                  <mat-icon class="text-gray-400">{{ expandedSection() === 'when' ? 'remove' : 'add' }}</mat-icon>
                </button>
                @if (expandedSection() === 'when') {
                  <div class="mt-6 animate-in slide-in-from-top-2 duration-300">
                    <div class="bg-gradient-to-br from-sky-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm relative overflow-hidden">
                      <div class="absolute -right-4 -bottom-4 text-sky-500/10 transform rotate-12">
                        <mat-icon style="font-size: 140px; width: 140px; height: 140px;">explore</mat-icon>
                      </div>
                      <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div class="flex items-center gap-2 mb-2">
                            <mat-icon class="text-sky-600" style="font-size: 20px; width: 20px; height: 20px;">wb_sunny</mat-icon>
                            <h4 class="text-xs font-bold uppercase tracking-widest text-sky-800">Season</h4>
                          </div>
                          <p class="text-lg font-medium text-gray-900">{{ product()?.whenToWear }}</p>
                        </div>
                        <div>
                          <div class="flex items-center gap-2 mb-2">
                            <mat-icon class="text-indigo-500" style="font-size: 20px; width: 20px; height: 20px;">event_seat</mat-icon>
                            <h4 class="text-xs font-bold uppercase tracking-widest text-indigo-800">Best Occasion</h4>
                          </div>
                          <p class="text-lg font-medium text-gray-900">{{ product()?.bestOccasion }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div class="border-t border-gray-200 pt-6 mb-6">
                <button (click)="toggleSection('persona')" class="w-full flex justify-between items-center text-left focus:outline-none">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-gray-900">The Persona</h3>
                  <mat-icon class="text-gray-400">{{ expandedSection() === 'persona' ? 'remove' : 'add' }}</mat-icon>
                </button>
                @if (expandedSection() === 'persona') {
                  <div class="mt-6 animate-in slide-in-from-top-2 duration-300">
                    <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden">
                      <!-- Decorative background element -->
                      <div class="absolute -right-4 -bottom-4 text-amber-500/10 transform -rotate-12">
                        <mat-icon style="font-size: 140px; width: 140px; height: 140px;">fingerprint</mat-icon>
                      </div>
                      
                      <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <div class="flex items-center gap-2 mb-2">
                            <mat-icon class="text-amber-600" style="font-size: 20px; width: 20px; height: 20px;">work_outline</mat-icon>
                            <h4 class="text-xs font-bold uppercase tracking-widest text-amber-800">Ideal For</h4>
                          </div>
                          <p class="text-xl font-serif text-gray-900 leading-tight">{{ product()?.profession }}</p>
                        </div>
                        <div>
                          <div class="flex items-center gap-2 mb-2">
                            <mat-icon class="text-orange-500" style="font-size: 20px; width: 20px; height: 20px;">auto_awesome</mat-icon>
                            <h4 class="text-xs font-bold uppercase tracking-widest text-orange-800">Vibe</h4>
                          </div>
                          <p class="text-lg text-gray-800 font-medium leading-snug">{{ product()?.persona }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div class="border-t border-gray-200 pt-8 mb-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Pros -->
                  <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 text-emerald-500/10 transform -rotate-12">
                      <mat-icon style="font-size: 120px; width: 120px; height: 120px;">thumb_up</mat-icon>
                    </div>
                    <div class="relative z-10">
                      <h3 class="text-sm font-bold uppercase tracking-widest text-emerald-900 mb-4 flex items-center gap-2">
                        <mat-icon class="text-emerald-600" style="font-size: 20px; width: 20px; height: 20px;">check_circle</mat-icon> Pros
                      </h3>
                      <ul class="space-y-3">
                        @for (pro of product()?.pros; track pro) {
                          <li class="text-base text-emerald-950 font-medium flex items-start gap-2">
                            <span class="text-emerald-500 mt-0.5">•</span> {{ pro }}
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                  <!-- Cons -->
                  <div class="bg-gradient-to-br from-rose-50 to-red-50 p-6 sm:p-8 rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 text-rose-500/10 transform rotate-12">
                      <mat-icon style="font-size: 120px; width: 120px; height: 120px;">thumb_down</mat-icon>
                    </div>
                    <div class="relative z-10">
                      <h3 class="text-sm font-bold uppercase tracking-widest text-rose-900 mb-4 flex items-center gap-2">
                        <mat-icon class="text-rose-600" style="font-size: 20px; width: 20px; height: 20px;">cancel</mat-icon> Cons
                      </h3>
                      <ul class="space-y-3">
                        @for (con of product()?.cons; track con) {
                          <li class="text-base text-rose-950 font-medium flex items-start gap-2">
                            <span class="text-rose-500 mt-0.5">•</span> {{ con }}
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Similar Perfumes Section -->
              @if (similarProducts().length > 0) {
                <div class="border-t border-gray-200 pt-12">
                  <h3 class="text-2xl font-serif font-bold text-gray-900 mb-6">Similar Perfumes</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for (similarProduct of similarProducts(); track similarProduct.id; let i = $index) {
                      <app-product-card 
                        [product]="similarProduct" 
                        [rank]="i === 0 ? 'gold' : (i === 1 ? 'silver' : 'bronze')">
                      </app-product-card>
                    }
                  </div>
                </div>
              }

              <!-- TikTok Reviews Section (Specific to Imagination) -->
              @if (product()?.slug === 'louis-vuitton-imagination-impression-by-xperfumes') {
                <div class="border-t border-gray-200 pt-12 pb-12">
                  <h3 class="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">Community Reviews</h3>
                  <div class="relative max-w-lg mx-auto px-4 sm:px-0">
                    <div class="overflow-hidden rounded-2xl shadow-lg bg-white border border-gray-100">
                      <div class="flex transition-transform duration-500 ease-in-out" [style.transform]="'translateX(-' + (currentVideoIndex() * 100) + '%)'">
                        @for (video of tiktokVideos; track video.id) {
                          <div class="w-full flex-shrink-0 p-4 flex justify-center">
                            <blockquote class="tiktok-embed" [attr.cite]="video.cite" [attr.data-video-id]="video.id" style="max-width: 605px;min-width: 325px;">
                              <section>
                                <a target="_blank" [title]="video.author" [href]="video.authorLink">{{ video.author }}</a>
                                <p>{{ video.text }}</p>
                                <a target="_blank" [title]="video.music" [href]="video.musicLink">{{ video.music }}</a>
                              </section>
                            </blockquote>
                          </div>
                        }
                      </div>
                    </div>
                    
                    <!-- Carousel Controls -->
                    <button (click)="prevVideo()" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gold-600 transition-all z-10">
                      <mat-icon>chevron_left</mat-icon>
                    </button>
                    <button (click)="nextVideo()" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gold-600 transition-all z-10">
                      <mat-icon>chevron_right</mat-icon>
                    </button>
                    
                    <!-- Dots -->
                    <div class="flex justify-center gap-2 mt-6">
                      @for (video of tiktokVideos; track video.id; let i = $index) {
                        <button (click)="currentVideoIndex.set(i)" 
                                class="w-2 h-2 rounded-full transition-all duration-300"
                                [class.bg-gold-500]="currentVideoIndex() === i"
                                [class.w-4]="currentVideoIndex() === i"
                                [class.bg-gray-300]="currentVideoIndex() !== i">
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }

              <app-quote-card></app-quote-card>

            </div>
          </div>

          <!-- Reviews Section -->
          <div class="border-t border-gray-200 pt-16 mt-16 mb-16">
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-8">Customer Reviews</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div class="lg:col-span-1">
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 class="text-xl font-serif font-bold mb-4">Write a Review</h3>
                  <form (ngSubmit)="submitReview()" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div class="flex gap-1">
                        @for (star of [1, 2, 3, 4, 5]; track star) {
                          <button type="button" (click)="setRating(star)" class="focus:outline-none">
                            <mat-icon [class.text-gold-500]="star <= newReview.rating" [class.text-gray-300]="star > newReview.rating">star</mat-icon>
                          </button>
                        }
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" [(ngModel)]="newReview.name" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Review</label>
                      <textarea [(ngModel)]="newReview.comment" name="comment" rows="3" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">Submit Review</button>
                  </form>
                </div>
              </div>
              <div class="lg:col-span-2 space-y-6">
                @if (reviews().length === 0) {
                  <p class="text-gray-500 italic">No reviews yet. Be the first to review this fragrance!</p>
                }
                @for (review of reviews(); track review.date) {
                  <div class="border-b border-gray-100 pb-6 last:border-0">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-bold text-gray-900">{{ review.name }}</span>
                      <span class="text-sm text-gray-500">{{ review.date | date:'mediumDate' }}</span>
                    </div>
                    <div class="flex gap-1 mb-3">
                      @for (star of [1, 2, 3, 4, 5]; track star) {
                        <mat-icon style="font-size: 16px; width: 16px; height: 16px;" [class.text-gold-500]="star <= review.rating" [class.text-gray-300]="star > review.rating">star</mat-icon>
                      }
                    </div>
                    <p class="text-gray-700">{{ review.comment }}</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Recently Viewed Section -->
          @if (recentlyViewed().length > 0) {
            <div class="border-t border-gray-200 pt-16 pb-16">
              <h2 class="text-3xl font-serif font-bold text-gray-900 mb-8">Recently Viewed</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                @for (rv of recentlyViewed(); track rv.id) {
                  <app-product-card [product]="rv"></app-product-card>
                }
              </div>
            </div>
          }

        </div>
      } @else {
        <div class="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 class="text-2xl font-serif text-gray-900 mb-4">Product not found</h2>
          <a routerLink="/shop" class="text-gold-600 hover:text-gold-700 underline">Return to Shop</a>
        </div>
      }
      
      <!-- Floating Toast Notification -->
      @if (isAddedToCart()) {
        <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div class="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <mat-icon class="text-green-400" style="font-size: 20px; width: 20px; height: 20px;">check_circle</mat-icon>
            <span class="font-medium text-sm">{{ product()?.name }} added to cart</span>
            <a routerLink="/cart" class="ml-4 text-xs font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 underline">View Cart</a>
          </div>
        </div>
      }

      <!-- Accord Modal -->
      @if (selectedAccord()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" (click)="closeAccordModal()" (keydown.escape)="closeAccordModal()" tabindex="-1"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div class="p-6 sm:p-8">
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600">
                    <mat-icon>bubble_chart</mat-icon>
                  </div>
                  <h3 class="text-2xl font-serif font-bold text-gray-900">{{ selectedAccord()?.name }}</h3>
                </div>
                <button (click)="closeAccordModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                  <mat-icon>close</mat-icon>
                </button>
              </div>
              <p class="text-gray-600 leading-relaxed text-lg">
                {{ selectedAccord()?.description }}
              </p>
            </div>
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
              <button (click)="closeAccordModal()" class="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
                Got it
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private pixelService = inject(PixelService);

  product = signal<Product | undefined>(undefined);
  similarProducts = signal<Product[]>([]);

  scentProfileTheme = computed(() => {
    const gender = this.product()?.gender;
    if (gender === 'Female') {
      return {
        container: 'from-pink-100 to-rose-100 border-pink-200',
        bgIcon: 'text-pink-500/20',
        keyNotesIcon: 'text-pink-600',
        keyNotesTitle: 'text-pink-900',
        gridTitle: 'text-pink-900',
        longevityBadge: 'bg-pink-200 text-pink-900',
        sillageBadge: 'bg-rose-200 text-rose-900'
      };
    } else if (gender === 'Male') {
      return {
        container: 'from-gray-100 to-slate-200 border-gray-300',
        bgIcon: 'text-gray-500/20',
        keyNotesIcon: 'text-gray-700',
        keyNotesTitle: 'text-gray-900',
        gridTitle: 'text-gray-900',
        longevityBadge: 'bg-gray-300 text-gray-900',
        sillageBadge: 'bg-slate-300 text-slate-900'
      };
    } else {
      return {
        container: 'from-purple-100 to-fuchsia-100 border-purple-200',
        bgIcon: 'text-purple-500/20',
        keyNotesIcon: 'text-purple-600',
        keyNotesTitle: 'text-purple-900',
        gridTitle: 'text-purple-900',
        longevityBadge: 'bg-purple-200 text-purple-900',
        sillageBadge: 'bg-fuchsia-200 text-fuchsia-900'
      };
    }
  });

  isAddedToCart = signal(false);
  selectedAccord = signal<{name: string, description: string} | null>(null);
  currentVideoIndex = signal(0);
  
  expandedSection = signal<string | null>('scent');
  reviews = signal<any[]>([]);
  newReview = { name: '', rating: 5, comment: '' };
  recentlyViewed = signal<Product[]>([]);

  toggleSection(section: string) {
    this.expandedSection.update(s => s === section ? null : section);
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  submitReview() {
    if (!this.newReview.name || !this.newReview.comment) return;
    const review = { ...this.newReview, date: new Date().toISOString() };
    const updated = [review, ...this.reviews()];
    this.reviews.set(updated);
    localStorage.setItem(`reviews_${this.product()?.id}`, JSON.stringify(updated));
    this.newReview = { name: '', rating: 5, comment: '' };
  }

  tiktokVideos = [
    {
      id: '7599683556071378198',
      cite: 'https://www.tiktok.com/@theperfumeguy77/video/7599683556071378198',
      author: '@theperfumeguy77',
      authorLink: 'https://www.tiktok.com/@theperfumeguy77?refer=embed',
      text: 'LV Imagination - The best summer fragrance all time 🍋🍊 #lv #imagination #fyp #viral #fragrancetok',
      music: '♬ original sound - St julies',
      musicLink: 'https://www.tiktok.com/music/original-sound-7581587709534866198?refer=embed'
    },
    {
      id: '7435051232013700395',
      cite: 'https://www.tiktok.com/@beautywithlandynn/video/7435051232013700395',
      author: '@beautywithlandynn',
      authorLink: 'https://www.tiktok.com/@beautywithlandynn?refer=embed',
      text: 'Its sooooooo addictive!! @Louis Vuitton #perfume #cologne #louisvuitton #fragrancetiktok',
      music: '♬ original sound - Landyn💋',
      musicLink: 'https://www.tiktok.com/music/original-sound-7435051221588708142?refer=embed'
    },
    {
      id: '7600698984461618450',
      cite: 'https://www.tiktok.com/@omarperfume0/video/7600698984461618450',
      author: '@omarperfume0',
      authorLink: 'https://www.tiktok.com/@omarperfume0?refer=embed',
      text: 'imagination by lv if u love this fragrance then watch full video',
      music: '♬ original sound - vyeon.11',
      musicLink: 'https://www.tiktok.com/music/original-sound-7591213600086264599?refer=embed'
    }
  ];

  nextVideo() {
    this.currentVideoIndex.update(i => (i + 1) % this.tiktokVideos.length);
  }

  prevVideo() {
    this.currentVideoIndex.update(i => (i - 1 + this.tiktokVideos.length) % this.tiktokVideos.length);
  }

  accordDescriptions: Record<string, string> = {
    'Citrus': 'Bright, zesty, and refreshing notes typically derived from lemon, bergamot, orange, and grapefruit.',
    'Woody': 'Warm, earthy, and grounding notes like sandalwood, cedar, patchouli, and vetiver.',
    'Floral': 'Romantic and soft notes derived from flowers like rose, jasmine, lily, and ylang-ylang.',
    'Amber': 'Rich, warm, and sweet notes often featuring vanilla, resin, and labdanum.',
    'Spicy': 'Warm or fresh pungent notes like cinnamon, cardamom, pepper, and clove.',
    'Aquatic': 'Fresh, marine, and watery notes reminiscent of the ocean or sea breeze.',
    'Fruity': 'Sweet, tart, and juicy notes from fruits like apple, berry, peach, and melon.',
    'Gourmand': 'Edible, dessert-like notes such as chocolate, caramel, coffee, and vanilla.',
    'Aromatic': 'Herbal and green notes like lavender, rosemary, sage, and mint.',
    'Chypre': 'A complex accord contrasting fresh citrus top notes with a mossy, woody base.',
    'Fougere': 'A fern-like scent combining lavender, oakmoss, and coumarin for a fresh, barbershop feel.',
    'Leather': 'Smoky, dry, and deep notes reminiscent of cured leather and tobacco.',
    'Musk': 'Clean, skin-like, or animalic notes that add depth and longevity to a fragrance.',
    'Earthy': 'Dark, rich notes reminiscent of damp soil, roots, and forest floors.',
    'Green': 'Crisp, fresh notes smelling of crushed leaves, grass, and stems.',
    'Fresh': 'Clean, uplifting, and airy notes that give a sense of vitality.',
    'Sweet': 'Sugary, rich, and comforting notes often derived from vanilla, honey, or fruits.',
    'Powdery': 'Soft, dry, and comforting notes reminiscent of talcum powder or makeup, often from iris or violet.'
  };

  openAccordModal(accordName: string) {
    const description = this.accordDescriptions[accordName] || "A distinct note or accord that contributes to the unique character and depth of the fragrance.";
    this.selectedAccord.set({ name: accordName, description });
  }

  closeAccordModal() {
    this.selectedAccord.set(null);
  }

  keyAccords = computed(() => {
    const prod = this.product();
    if (!prod) return [];
    const accords = new Set<string>();
    
    if (prod.olfactoryFamily) {
      prod.olfactoryFamily.split(/[\s-]+/).forEach(w => {
        if (w.length > 2) accords.add(w.trim());
      });
    }
    
    if (prod.keyNotes) {
      prod.keyNotes.split(',').forEach(w => {
        const note = w.trim();
        if (note.length > 2) accords.add(note);
      });
    }
    
    return Array.from(accords).slice(0, 6);
  });

  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const p = this.productService.getProductBySlug(slug);
        if (p) {
          this.product.set(p);
          this.similarProducts.set(this.productService.getSimilarProducts(p, 3));
          
          // Track View Content
          this.pixelService.trackViewContent(p);
          
          // Load Reviews
          const savedReviews = localStorage.getItem(`reviews_${p.id}`);
          if (savedReviews) {
            this.reviews.set(JSON.parse(savedReviews));
          } else {
            this.reviews.set([
              { name: 'Sarah M.', rating: 5, comment: 'Absolutely love this scent! It lasts all day.', date: new Date(Date.now() - 86400000).toISOString() },
              { name: 'Ahmed K.', rating: 4, comment: 'Great projection, but the opening is a bit strong for me.', date: new Date(Date.now() - 172800000).toISOString() }
            ]);
          }

          // Load Recently Viewed
          const savedRV = localStorage.getItem('recently_viewed');
          let rvIds: string[] = savedRV ? JSON.parse(savedRV) : [];
          const allProducts = this.productService.getAllProducts();
          const rvProducts = rvIds.filter(id => id !== p.id)
            .map(id => allProducts.find(prod => prod.id === id))
            .filter(prod => !!prod) as Product[];
          this.recentlyViewed.set(rvProducts.slice(0, 5));
          
          // Update Recently Viewed
          rvIds = [p.id, ...rvIds.filter(id => id !== p.id)].slice(0, 6);
          localStorage.setItem('recently_viewed', JSON.stringify(rvIds));

          // Update SEO Title and Meta Tags
          const pageTitle = `${p.name} Impression by XPerfumes | ${p.brand}`;
          const pageDescription = `Discover our impression of ${p.name} by ${p.brand}. A ${p.olfactoryFamily} fragrance featuring ${p.keyNotes}. Shop luxury impressions at XPerfumes.`;
          
          this.titleService.setTitle(pageTitle);
          this.metaService.updateTag({ name: 'description', content: pageDescription });
          
          // Open Graph tags
          this.metaService.updateTag({ property: 'og:title', content: pageTitle });
          this.metaService.updateTag({ property: 'og:description', content: pageDescription });
          this.metaService.updateTag({ property: 'og:type', content: 'product' });
          
          // Scroll to top when product changes
          window.scrollTo({ top: 0, behavior: 'smooth' });

          // Load TikTok script if this is the Imagination product
          if (p.slug === 'louis-vuitton-imagination-impression-by-xperfumes') {
            this.loadTikTokScript();
          }
        } else {
          this.router.navigate(['/shop']);
        }
      }
    });
  }

  addToCart() {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p);
      this.pixelService.trackAddToCart(p);
      this.isAddedToCart.set(true);
      setTimeout(() => {
        this.isAddedToCart.set(false);
      }, 2000);
    }
  }

  orderViaWhatsApp() {
    const p = this.product();
    if (p) {
      const message = `Hi, I would like to order:\n\n1x ${p.name} by ${p.brand}\nPrice: ${p.impressionPrice} AED\n\nPlease let me know the next steps.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/971585328790?text=${encodedMessage}`, '_blank');
    }
  }

  private loadTikTokScript() {
    if (!document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script already exists, we might need to re-trigger it
      // Some versions of the script auto-scan, others might need a nudge
      // Re-appending the script is a common hack for dynamic content
      const oldScript = document.getElementById('tiktok-embed-script');
      if (oldScript) {
        oldScript.remove();
        const newScript = document.createElement('script');
        newScript.id = 'tiktok-embed-script';
        newScript.src = 'https://www.tiktok.com/embed.js';
        newScript.async = true;
        document.body.appendChild(newScript);
      }
    }
  }
}
