import { BarChart, PieChartSeries } from "../types/chart.type";
import { Category, Product } from "../types/schema.type";

export const generatePieChartSeries = (
  categories: Category[]
): Array<PieChartSeries> => {
  return categories.map((category, index) => {
    return {
      name: category,
      y: 100 / categories.length,
    };
  });
};

export const generateBarChartData = (
  products: Product[]
): BarChart => {
  return {
    series: [
      {
        name: "Product Price",
        data: products.map((product) => product.price),
      },
    ],
    xAxis: {
      categories: products.map((product) => product.title),
      accessibility: {
        description: "Products",
      },
    },
  };
};
