import { ProductItem } from './ProductItem'

export class IngredientItem {
    public ingredientItemName: string;
    public products: ProductItem[];
  
    constructor(ingredientItemName: string, products: ProductItem[]) {
      this.ingredientItemName = ingredientItemName;
      this.products = products;
    }
  }