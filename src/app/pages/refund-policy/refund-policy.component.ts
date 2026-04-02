import { Component } from '@angular/core';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  template: `
    <div class="min-h-screen bg-white py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">Refund Policy</h1>
          <div class="w-16 h-0.5 bg-gold-400"></div>
        </div>
        
        <div class="prose prose-lg text-gray-700 max-w-none">
          <p>Free returns are available for all sale items within 7 days of receipt, provided the return conditions specified below are met.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Return Instructions are provided below.</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Purchases must be returned from the original shipping country.</li>
            <li>Returns will be accepted only if there is any manufacturing defect with the product or mismatch of the product.</li>
            <li>Items returned must be in their unused original condition with all X Perfumes item tags attached and any related sampling pieces and booklets included.</li>
            <li>Incomplete, damaged, or altered returns or anything we at X Perfumes reasonably believe has been used, will not be accepted and therefore sent back to the customer.</li>
            <li>Return charges are not applicable if you met the above conditions.</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class RefundPolicyComponent {}
