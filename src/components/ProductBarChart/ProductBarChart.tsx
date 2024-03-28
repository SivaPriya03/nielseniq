import { useEffect, useRef } from "react";
import { BarChart } from "../../types/chart.type";
import Highcharts from "highcharts";

export const ProductBarChart = ({
  productsChart,
  selectedCategory,
}: {
  productsChart: BarChart;
  selectedCategory: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (productsChart.series.length > 0 && containerRef.current) {
      // @ts-ignore - Highcharts type definitions are not up to date
      Highcharts.chart(containerRef.current, {
        chart: {
          type: "column",
        },
        title: {
          text: "Products in selected category",
          align: "left",
        },
        subtitle: {
          text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
          align: "left",
        },
        xAxis: productsChart.xAxis,
        yAxis: {
          min: 0,
          title: {
            text: selectedCategory
          }
        },
        tooltip: {
          valuePrefix: "$",
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: productsChart.series,
      });
    }
  }, [productsChart]);

  return <div ref={containerRef}/>;
};
