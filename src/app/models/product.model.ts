export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  gender: 'Male' | 'Female' | 'Unisex';
  olfactoryFamily: string;
  keyNotes: string;
  whenToWear: string;
  bestOccasion: string;
  longevity: string;
  sillage: string;
  year: number;
  perfumer: string;
  originalPrice: number;
  impressionPrice: number;
  pros: string[];
  cons: string[];
  comment: string;
  profession: string;
  persona: string;
  isTopPick?: boolean;
  slug?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
