import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'refund-policy',
    loadComponent: () => import('./pages/refund-policy/refund-policy.component').then(m => m.RefundPolicyComponent)
  },
  {
    path: 'terms-conditions',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'shipping-delivery',
    loadComponent: () => import('./pages/shipping-delivery/shipping-delivery.component').then(m => m.ShippingDeliveryComponent)
  },
  {
    path: 'guide',
    loadComponent: () => import('./pages/fragrance-guide/fragrance-guide.component').then(m => m.FragranceGuideComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
