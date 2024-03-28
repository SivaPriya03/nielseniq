import { useEffect, useReducer, useRef, useState } from "react";
import "./styles.css";
import { HomeLayout } from "./components/HomeLayout";
import { Filters } from "./components/Filters";
import styled from "styled-components";
import { Category, Product } from "./types/schema.type";

import {
  filterReducer,
  Actions as FilterChangeActions,
} from "./reducers/filterReducer";
import { useFetch } from "./hooks/useFetch";
import { CATEGORIES_URL, PRODUCTS_BY_CATEGORY_URL } from "./constants";
import { CategoriesPieChart } from "./components/CategoriesPieChart";
import { generateBarChartData, generatePieChartSeries } from "./utils/chart";
import { ProductBarChart } from "./components/ProductBarChart";
import { BarChart, PieChartSeries } from "./types/chart.type";
import { Spinner } from "./components/Spinner";

const PageWrapper = styled.div`
  display: flex;
  max-width: 80%;
  margin: 8rem auto;
  height: 80vh;
  width: 100%;
`;

export default function App() {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    category: "",
    products: [],
  });
  const { category: selectedCategory, products: selectedProducts } =
    filterState;

  const [categories = [], { isLoading: categoriesLoading, isError }] =
    useFetch<Array<Category>>(CATEGORIES_URL);

  const [
    productResponse = {
      products: [],
      limit: 0,
      total: 0,
    },
    _apiStatus,
    fetchProductsByCategory,
  ] = useFetch<{
    products: Array<Product>;
    limit: number;
    total: number;
  }>(`${PRODUCTS_BY_CATEGORY_URL}${selectedCategory}`, {
    skipInitialFetch: selectedCategory.length === 0,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { products = [] } = productResponse;

  const [chartData, setChartData] = useState<
    | {
        showSpinner: true;
      }
    | {
        showSpinner: false;
        type: "bar";
        data: BarChart;
      }
    | {
        showSpinner: false;
        type: "pie";
        data: PieChartSeries[];
      }
  >({
    showSpinner: true,
  });

  useEffect(() => {
    if (selectedCategory.length > 0) {
      fetchProductsByCategory();
    } else {
      filterDispatch({
        type: FilterChangeActions.SET_PRODUCTS,
        payload: [],
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    // When categories are fetched initially set chart data
    setChartData({
      type: "pie",
      showSpinner: false,
      data: generatePieChartSeries(categories),
    });
  }, [categories]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (categoriesLoading) {
    return <h1> Loading... </h1>;
  }

  if (isError) {
    return <h1> Unexpected Error happened </h1>;
  }
  const { showSpinner } = chartData;

  const renderFilter = () => {
    return (
      <Filters
        categories={categories}
        products={products}
        disableProductSelect={false}
        disableEdit={selectedCategory.length === 0 || showSpinner}
        appliedFilters={filterState}
        onChangeCategory={(category) => {
          filterDispatch({
            type: FilterChangeActions.SET_CATEGORY,
            payload: category,
          });
        }}
        onChangeProduct={(products) => {
          filterDispatch({
            type: FilterChangeActions.SET_PRODUCTS,
            payload: products,
          });
        }}
        onClear={() => {
          filterDispatch({
            type: FilterChangeActions.CLEAR,
          });
          setChartData({
            showSpinner: false,
            type: "pie",
            data: generatePieChartSeries(categories),
          });
        }}
        onRun={() => {
          setChartData({
            showSpinner: true,
          });
          timerRef.current = setTimeout(() => {
            const isPieChart = selectedCategory.length === 0;
            if (isPieChart) {
              setChartData({
                showSpinner: false,
                type: "pie",
                data: generatePieChartSeries(categories),
              });
            } else {
              const productsChart = generateBarChartData(
                selectedProducts.length === 0
                  ? products
                  : selectedProducts.map(
                      (id) =>
                        products.find((product) => product.id === id) as Product
                    )
              );
              setChartData({
                showSpinner: false,
                type: "bar",
                data: productsChart,
              });
            }
          }, 3000);
        }}
      />
    );
  };

  const renderCharts = () => {
    if (showSpinner) {
      return <Spinner />;
    }
    const { type, data } = chartData;
    if (type === "pie") return <CategoriesPieChart series={data} />;
    return (
      <ProductBarChart
        productsChart={data}
        selectedCategory={selectedCategory}
      />
    );
  };

  return (
    <PageWrapper>
      <HomeLayout left={renderFilter()} right={renderCharts()} />
    </PageWrapper>
  );
}
