import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PixelSettings {
  metaPixelId: string;
  tiktokPixelId: string;
  googleTagId: string;
  snapchatPixelId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PixelService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  
  private settings: PixelSettings = {
    metaPixelId: '',
    tiktokPixelId: '',
    googleTagId: '',
    snapchatPixelId: ''
  };

  private initialized = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSettings();
      this.initPixels();
      
      // Track page views on route change
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.trackPageView();
      });
    }
  }

  loadSettings() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('pixel_settings');
      if (saved) {
        try {
          this.settings = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse pixel settings', e);
        }
      }
    }
    return this.settings;
  }

  saveSettings(settings: PixelSettings) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('pixel_settings', JSON.stringify(settings));
      this.settings = settings;
      // Reload page to re-initialize pixels properly
      window.location.reload();
    }
  }

  getSettings(): PixelSettings {
    return this.settings;
  }

  private initPixels() {
    if (!isPlatformBrowser(this.platformId) || this.initialized) return;
    
    // Meta (Facebook) Pixel
    if (this.settings.metaPixelId) {
      const f = window as any;
      if (!f.fbq) {
        const n: any = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        const t = document.createElement('script');
        t.async = !0;
        t.src = 'https://connect.facebook.net/en_US/fbevents.js';
        const s = document.getElementsByTagName('script')[0];
        s?.parentNode?.insertBefore(t, s);
      }
      f.fbq('init', this.settings.metaPixelId);
    }

    // TikTok Pixel
    if (this.settings.tiktokPixelId) {
      const w = window as any;
      const t = 'ttq';
      w.TiktokAnalyticsObject = t;
      let ttq = w[t] = w[t] || [];
      ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
      ttq.setAndDefer = function(obj:any, method:any){
        obj[method] = function(){
          obj.push([method].concat(Array.prototype.slice.call(arguments,0)));
        };
      };
      for (let i=0; i<ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      ttq.instance = function(name:any){
        let inst = ttq._i[name] || [];
        for (let n=0; n<ttq.methods.length; n++) {
          ttq.setAndDefer(inst, ttq.methods[n]);
        }
        return inst;
      };
      ttq.load = function(id:any, options?:any){
        const i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[id] = [];
        ttq._i[id]._u = i;
        ttq._t = ttq._t || {};
        ttq._t[id] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[id] = options || {};
        const o = document.createElement("script");
        o.type = "text/javascript";
        o.async = !0;
        o.src = i + "?sdkid=" + id + "&lib=" + t;
        const a = document.getElementsByTagName("script")[0];
        a?.parentNode?.insertBefore(o, a);
      };
      ttq.load(this.settings.tiktokPixelId);
    }

    // Google Tag (gtag.js)
    if (this.settings.googleTagId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.settings.googleTagId}`;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      const gtag = function(...args: any[]){
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', this.settings.googleTagId);
    }

    // Snapchat Pixel
    if (this.settings.snapchatPixelId) {
      const e = window as any;
      if (!e.snaptr) {
        const a: any = e.snaptr = function() {
          a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
        };
        a.queue = [];
        const r = document.createElement('script');
        r.async = !0;
        r.src = 'https://sc-static.net/scevent.min.js';
        const u = document.getElementsByTagName('script')[0];
        u?.parentNode?.insertBefore(r, u);
      }
      e.snaptr('init', this.settings.snapchatPixelId);
    }

    this.initialized = true;
  }

  trackPageView() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.settings.metaPixelId && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
    if (this.settings.tiktokPixelId && (window as any).ttq) {
      (window as any).ttq.page();
    }
    if (this.settings.snapchatPixelId && (window as any).snaptr) {
      (window as any).snaptr('track', 'PAGE_VIEW');
    }
    // Google Tag naturally tracks page views on config
  }

  trackViewContent(product: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    const contentData = {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.impressionPrice,
      currency: 'AED'
    };

    if (this.settings.metaPixelId && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', contentData);
    }
    if (this.settings.tiktokPixelId && (window as any).ttq) {
      (window as any).ttq.track('ViewContent', {
        contents: [{
          content_id: product.id,
          content_name: product.name,
          price: product.impressionPrice,
          quantity: 1
        }],
        value: product.impressionPrice,
        currency: 'AED'
      });
    }
    if (this.settings.googleTagId && (window as any).gtag) {
      (window as any).gtag('event', 'view_item', {
        currency: 'AED',
        value: product.impressionPrice,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.impressionPrice
        }]
      });
    }
    if (this.settings.snapchatPixelId && (window as any).snaptr) {
      (window as any).snaptr('track', 'VIEW_CONTENT', {
        item_ids: [product.id],
        item_category: product.category,
        price: product.impressionPrice,
        currency: 'AED'
      });
    }
  }

  trackAddToCart(product: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    const contentData = {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.impressionPrice,
      currency: 'AED'
    };

    if (this.settings.metaPixelId && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', contentData);
    }
    if (this.settings.tiktokPixelId && (window as any).ttq) {
      (window as any).ttq.track('AddToCart', {
        contents: [{
          content_id: product.id,
          content_name: product.name,
          price: product.impressionPrice,
          quantity: 1
        }],
        value: product.impressionPrice,
        currency: 'AED'
      });
    }
    if (this.settings.googleTagId && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'AED',
        value: product.impressionPrice,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.impressionPrice
        }]
      });
    }
    if (this.settings.snapchatPixelId && (window as any).snaptr) {
      (window as any).snaptr('track', 'ADD_CART', {
        item_ids: [product.id],
        price: product.impressionPrice,
        currency: 'AED'
      });
    }
  }

  trackPurchase(value: number, items: any[]) {
    if (!isPlatformBrowser(this.platformId)) return;

    const itemIds = items.map(item => item.product.id);

    if (this.settings.metaPixelId && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        content_ids: itemIds,
        content_type: 'product',
        value: value,
        currency: 'AED'
      });
    }
    if (this.settings.tiktokPixelId && (window as any).ttq) {
      (window as any).ttq.track('CompletePayment', {
        contents: items.map(item => ({
          content_id: item.product.id,
          content_name: item.product.name,
          price: item.product.impressionPrice,
          quantity: item.quantity
        })),
        value: value,
        currency: 'AED'
      });
    }
    if (this.settings.googleTagId && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: 'T_' + new Date().getTime(),
        value: value,
        currency: 'AED',
        items: items.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.impressionPrice,
          quantity: item.quantity
        }))
      });
    }
    if (this.settings.snapchatPixelId && (window as any).snaptr) {
      (window as any).snaptr('track', 'PURCHASE', {
        item_ids: itemIds,
        price: value,
        currency: 'AED',
        transaction_id: 'T_' + new Date().getTime()
      });
    }
  }
}
