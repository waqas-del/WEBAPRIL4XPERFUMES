declare const GEMINI_API_KEY: string;
declare const TIKTOK_PIXEL_ID: string;
declare const SNAPCHAT_PIXEL_ID: string;
declare const GA_MEASUREMENT_ID: string;
declare const FB_PIXEL_ID: string;

interface Window {
  ttq: {
    page: () => void;
    track: (event: string, properties: Record<string, unknown>) => void;
  };
  snaptr: (event: string, action: string, properties?: Record<string, unknown>) => void;
  gtag: (command: string, action: string, properties?: Record<string, unknown>) => void;
  fbq: (command: string, action: string, properties?: Record<string, unknown>) => void;
  dataLayer: unknown[];
}
