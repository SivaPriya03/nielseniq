export type Category = string & { _type: "Category" }; // Branded or Fake type


export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: Category;
  thumbnail: string;
  images: Array<string>;
}