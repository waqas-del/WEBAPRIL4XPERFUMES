import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping-delivery',
  standalone: true,
  template: `
    <div class="min-h-screen bg-white py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">Shipping and Delivery</h1>
          <div class="w-16 h-0.5 bg-gold-400"></div>
        </div>
        
        <div class="prose prose-lg text-gray-700 max-w-none space-y-6">
          <p>Presently, X Perfumes' online store is only available for purchase. You are required to choose a preferred country in order to avail the offers and products that are available in your respective countries.</p>
          
          <p>We regret to inform you that if you wish to place an order in any country and request delivery in other countries, we will not be able to process the request.</p>
          
          <p>Due to strict International trading agreements and regulations, we are unable to ship the fragrance to other countries except for this country. As of now, we can ship the goods only locally!</p>
        </div>
      </div>
    </div>
  `
})
export class ShippingDeliveryComponent {}
