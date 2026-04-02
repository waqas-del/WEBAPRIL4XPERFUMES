import * as fs from 'fs';

const csv = fs.readFileSync('data.csv', 'utf-8');
const lines = csv.split('\n').filter(l => l.trim() !== '');
const headers = lines[0].split(',').map(h => h.trim());

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const products = [];
const seen = new Set();

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  if (values.length < 18) continue;
  
  const name = values[0];
  const brand = values[1];
  
  const key = `${name.toLowerCase()}|${brand.toLowerCase()}`;
  if (seen.has(key)) continue;
  seen.add(key);
  
  const product = {
    id: `p${products.length + 1}`,
    name: name,
    brand: brand,
    category: values[2],
    gender: values[3] === 'Mens\' Choice for Women' || values[3] === 'Womens\' Choice for Men' ? 'Unisex' : values[3],
    olfactoryFamily: values[4],
    keyNotes: values[5],
    whenToWear: values[6],
    bestOccasion: values[7],
    longevity: values[8],
    sillage: values[9],
    year: parseInt(values[10]) || new Date().getFullYear(),
    perfumer: values[11],
    originalPrice: parseInt(values[12]) || 500,
    pros: [values[13]],
    cons: [values[14]],
    comment: values[15],
    profession: values[16],
    persona: values[17],
    isTopPick: products.length < 8 // Make first 8 top picks
  };
  
  // Fix gender if it's weird
  if (!['Male', 'Female', 'Unisex'].includes(product.gender)) {
    product.gender = 'Unisex';
  }
  
  products.push(product);
}

const tsContent = `import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly rawProducts = ${JSON.stringify(products, null, 4)};

  private calculateImpressionPrice(originalPrice: number): number {
    if (originalPrice > 1500) return 99;
    if (originalPrice > 1000) return 89;
    if (originalPrice > 750) return 79;
    if (originalPrice > 500) return 69;
    return 60;
  }

  products = signal<Product[]>([]);

  constructor() {
    // Initialize products with calculated impression prices
    const processedProducts: Product[] = this.rawProducts.map(p => ({
      ...p,
      gender: p.gender as 'Male' | 'Female' | 'Unisex',
      impressionPrice: this.calculateImpressionPrice(p.originalPrice)
    }));
    this.products.set(processedProducts);
  }

  getAllProducts(): Product[] {
    return this.products();
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  getTopPicks(): Product[] {
    return this.products().filter(p => p.isTopPick);
  }
}
`;

fs.writeFileSync('src/app/services/product.service.ts', tsContent);
console.log('Updated product.service.ts with ' + products.length + ' unique products.');
