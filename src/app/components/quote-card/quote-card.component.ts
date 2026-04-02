import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="max-w-4xl mx-auto my-16 px-4">
      <div class="relative bg-white border border-gold-100 rounded-3xl p-8 md:p-12 shadow-2xl shadow-gold-100/20 overflow-hidden group">
        <!-- Decorative background elements -->
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-gold-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
        <div class="absolute -left-12 -bottom-12 w-48 h-48 bg-gold-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div class="relative z-10 text-center">
          <mat-icon class="text-gold-400 mb-6 scale-150" style="font-size: 32px; width: 32px; height: 32px;">format_quote</mat-icon>
          
          <h3 class="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed mb-8">
            {{ currentQuote() }}
          </h3>
          
          <div class="flex items-center justify-center gap-4">
            <div class="w-8 h-px bg-gold-300"></div>
            <span class="text-[10px] uppercase tracking-[0.4em] font-bold text-gold-600">The Art of Fragrance</span>
            <div class="w-8 h-px bg-gold-300"></div>
          </div>
        </div>
        
        <!-- Corner accents -->
        <div class="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-gold-100 rounded-tl-lg"></div>
        <div class="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-gold-100 rounded-br-lg"></div>
      </div>
    </div>
  `
})
export class QuoteCardComponent implements OnInit {
  private quotes = [
    "Perfume is the invisible signature you leave behind.",
    "Before you speak, your fragrance introduces you.",
    "A great scent is remembered long after you’re gone.",
    "Perfume is not an accessory—it’s an identity.",
    "The right fragrance doesn’t just complete your outfit, it defines it.",
    "Confidence begins with how you smell.",
    "Smell good, feel unstoppable.",
    "A single spray can change your entire mood.",
    "Fragrance is the quickest way to elevate your presence.",
    "Luxury isn’t what you wear—it’s how you smell.",
    "Scents have the power to turn moments into memories.",
    "Your fragrance tells your story without saying a word.",
    "The right scent can take you back—or take you forward.",
    "Perfume is emotion bottled into a single experience.",
    "Designer scents follow trends. Niche scents create them.",
    "Niche perfumes are art—impressions make that art wearable.",
    "Why own one luxury scent when you can experience many?",
    "Impressions bring luxury within reach—without compromise.",
    "Smell like luxury, without paying for the label.",
    "Your signature scent shouldn’t cost a fortune."
  ];

  currentQuote = signal<string>('');

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote.set(this.quotes[randomIndex]);
  }
}
