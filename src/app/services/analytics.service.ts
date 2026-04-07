import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  private getEventId() {
    return `ev-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  private getTtpCookie() {
    if (!isPlatformBrowser(this.platformId)) return null;
    const match = document.cookie.match(new RegExp('(^| )_ttp=([^;]+)'));
    return match ? match[2] : null;
  }

  private sendToServer(event: string, properties: Record<string, unknown> = {}, eventId: string) {
    this.http.post('/server-api/tiktok/track', {
      event,
      properties,
      event_id: eventId,
      ttp: this.getTtpCookie(),
      url: isPlatformBrowser(this.platformId) ? window.location.href : ''
    }).subscribe({
      error: (err) => console.error('TikTok Server Tracking Error:', err)
    });
  }

  private sendToFbServer(event_name: string, event_id: string, custom_data: Record<string, unknown> = {}, user_data: Record<string, unknown> = {}) {
    this.http.post('/server-api/fb/track', {
      event_name,
      event_id,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: isPlatformBrowser(this.platformId) ? window.location.href : '',
      user_data,
      custom_data
    }).subscribe({
      error: (err) => console.error('Meta Server Tracking Error:', err)
    });
  }

  trackPageView() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.ttq) window.ttq.page();
      if (window.snaptr) window.snaptr('track', 'PAGE_VIEW');
      if (window.gtag) {
        const id = typeof GA_MEASUREMENT_ID !== 'undefined' ? GA_MEASUREMENT_ID : 'G-DMGPN8PCVG';
        window.gtag('config', id, { page_path: window.location.pathname });
      }
      if (window.fbq) window.fbq('track', 'PageView');
    }
  }

  trackViewContent(product: Product) {
    const eventId = this.getEventId();
    const props = {
      contents: [
        {
          content_id: product.id,
          content_name: product.name,
          content_type: 'product',
          quantity: 1,
          price: product.impressionPrice,
          brand: product.brand
        }
      ],
      content_type: 'product',
      value: product.impressionPrice,
      currency: 'AED',
    };

    if (isPlatformBrowser(this.platformId)) {
      if (window.ttq) window.ttq.track('ViewContent', { ...props, event_id: eventId });
      if (window.snaptr) {
        window.snaptr('track', 'VIEW_CONTENT', {
          item_ids: [product.id],
          item_category: product.gender,
          price: product.impressionPrice,
          currency: 'AED'
        });
      }
      if (window.gtag) {
        window.gtag('event', 'view_item', {
          currency: 'AED',
          value: product.impressionPrice,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.gender,
            price: product.impressionPrice,
            quantity: 1
          }]
        });
      }
      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_ids: [product.id],
          content_name: product.name,
          content_type: 'product',
          value: product.impressionPrice,
          currency: 'AED',
          eventID: eventId
        });
      }
    }
    this.sendToServer('ViewContent', props, eventId);
    this.sendToFbServer('ViewContent', eventId, {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.impressionPrice,
      currency: 'AED'
    });
  }

  trackSearch(query: string) {
    const eventId = this.getEventId();
    const props = {
      query: query,
      value: 0,
      currency: 'AED',
    };

    if (isPlatformBrowser(this.platformId)) {
      if (window.ttq) window.ttq.track('Search', { ...props, event_id: eventId });
      if (window.snaptr) window.snaptr('track', 'SEARCH', { search_string: query });
      if (window.gtag) {
        window.gtag('event', 'search', { search_term: query });
      }
      if (window.fbq) {
        window.fbq('track', 'Search', {
          search_string: query,
          eventID: eventId
        });
      }
    }
    this.sendToServer('Search', props, eventId);
    this.sendToFbServer('Search', eventId, { search_string: query });
  }

  trackAddToCart(product: Product, quantity = 1) {
    const eventId = this.getEventId();
    const props = {
      contents: [
        {
          content_id: product.id,
          content_name: product.name,
          content_type: 'product',
          quantity: quantity,
          price: product.impressionPrice,
        }
      ],
      content_type: 'product',
      value: product.impressionPrice * quantity,
      currency: 'AED',
    };

    if (isPlatformBrowser(this.platformId)) {
      if (window.ttq) window.ttq.track('AddToCart', { ...props, event_id: eventId });
      if (window.snaptr) {
        window.snaptr('track', 'ADD_CART', {
          item_ids: [product.id],
          price: product.impressionPrice * quantity,
          currency: 'AED',
          number_items: quantity
        });
      }
      if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'AED',
          value: product.impressionPrice * quantity,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.gender,
            price: product.impressionPrice,
            quantity: quantity
          }]
        });
      }
      if (window.fbq) {
        window.fbq('track', 'AddToCart', {
          content_ids: [product.id],
          content_name: product.name,
          content_type: 'product',
          value: product.impressionPrice * quantity,
          currency: 'AED',
          eventID: eventId
        });
      }
    }
    this.sendToServer('AddToCart', props, eventId);
    this.sendToFbServer('AddToCart', eventId, {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.impressionPrice * quantity,
      currency: 'AED'
    });
  }

  trackContact(product: Product) {
    const eventId = this.getEventId();
    const props = {
      contents: [
        {
          content_id: product.id,
          content_name: product.name,
          content_type: 'product',
        }
      ],
      value: product.impressionPrice,
      currency: 'AED',
    };

    if (isPlatformBrowser(this.platformId) && window.ttq) {
      window.ttq.track('Contact', { ...props, event_id: eventId });
    }
    this.sendToServer('Contact', props, eventId);
  }

  trackInitiateCheckout(total: number, items: { product: Product; quantity: number }[]) {
    const eventId = this.getEventId();
    const props = {
      contents: items.map(item => ({
        content_id: item.product.id,
        content_name: item.product.name,
        content_type: 'product',
        quantity: item.quantity,
        price: item.product.impressionPrice,
      })),
      content_type: 'product',
      value: total,
      currency: 'AED',
    };

    if (isPlatformBrowser(this.platformId)) {
      if (window.ttq) window.ttq.track('InitiateCheckout', { ...props, event_id: eventId });
      if (window.snaptr) {
        window.snaptr('track', 'START_CHECKOUT', {
          item_ids: items.map(i => i.product.id),
          price: total,
          currency: 'AED',
          number_items: items.reduce((acc, i) => acc + i.quantity, 0)
        });
      }
      if (window.gtag) {
        window.gtag('event', 'begin_checkout', {
          currency: 'AED',
          value: total,
          items: items.map(item => ({
            item_id: item.product.id,
            item_name: item.product.name,
            item_brand: item.product.brand,
            item_category: item.product.gender,
            price: item.product.impressionPrice,
            quantity: item.quantity
          }))
        });
      }
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          content_ids: items.map(i => i.product.id),
          value: total,
          currency: 'AED',
          eventID: eventId
        });
      }
    }
    this.sendToServer('InitiateCheckout', props, eventId);
    this.sendToFbServer('InitiateCheckout', eventId, {
      content_ids: items.map(i => i.product.id),
      value: total,
      currency: 'AED'
    });
  }

  trackPurchase(total: number, items: { product: Product; quantity: number }[]) {
    const eventId = this.getEventId();
    const props = {
      contents: items.map(item => ({
        content_id: item.product.id,
        content_name: item.product.name,
        content_type: 'product',
        quantity: item.quantity,
        price: item.product.impressionPrice,
      })),
      content_type: 'product',
      value: total,
      currency: 'AED',
    };

    if (isPlatformBrowser(this.platformId)) {
      if (window.ttq) window.ttq.track('CompletePayment', { ...props, event_id: eventId });
      if (window.snaptr) {
        window.snaptr('track', 'PURCHASE', {
          item_ids: items.map(i => i.product.id),
          price: total,
          currency: 'AED',
          number_items: items.reduce((acc, i) => acc + i.quantity, 0)
        });
      }
      if (window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: eventId,
          currency: 'AED',
          value: total,
          items: items.map(item => ({
            item_id: item.product.id,
            item_name: item.product.name,
            item_brand: item.product.brand,
            item_category: item.product.gender,
            price: item.product.impressionPrice,
            quantity: item.quantity
          }))
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          content_ids: items.map(i => i.product.id),
          value: total,
          currency: 'AED',
          eventID: eventId
        });
      }
    }
    this.sendToServer('CompletePayment', props, eventId);
    this.sendToFbServer('Purchase', eventId, {
      content_ids: items.map(i => i.product.id),
      value: total,
      currency: 'AED'
    });
  }
}
