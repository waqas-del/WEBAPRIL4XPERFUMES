import * as fs from 'fs';

const bestSellers = JSON.parse(fs.readFileSync('best-sellers.json', 'utf-8'));
let serviceCode = fs.readFileSync('src/app/services/product.service.ts', 'utf-8');

// Find the end of rawProducts array
const match = serviceCode.match(/];\n\n  private calculateImpressionPrice/);
if (match) {
  const insertIndex = match.index;
  const newProductsStr = bestSellers.map((p: any) => JSON.stringify(p, null, 4)).join(',\n    ');
  
  serviceCode = serviceCode.slice(0, insertIndex) + ',\n    ' + newProductsStr + serviceCode.slice(insertIndex);
  fs.writeFileSync('src/app/services/product.service.ts', serviceCode);
  console.log('Appended to ProductService');
} else {
  console.log('Could not find insertion point');
}
