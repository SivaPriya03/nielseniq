import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { PieChartSeries } from "../../types/chart.type";

export function CategoriesPieChart({
  series
}: {
  series: PieChartSeries[]
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Memory Leak when data changes??
    if (containerRef.current && series.length > 0) {
      // @ts-ignore - Highcharts type definitions are not up to date
      Highcharts.chart(containerRef.current, {
        chart: {
          type: "pie",
        },
        title: {
          text: "Categories of Products",
        },
        tooltip: {
          valueSuffix: "%",
        },
        subtitle: {
          text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: [
              {
                enabled: true,
                distance: 20,
              },
              {
                enabled: true,
                distance: -40,
                format: "{point.percentage:.1f}%",
                style: {
                  fontSize: "1.2em",
                  textOutline: "none",
                  opacity: 0.7,
                },
                filter: {
                  operator: ">",
                  property: "percentage",
                  value: 10,
                },
              },
            ],
          },
        },
        series: [
          {
            name: "Percentage",
            colorByPoint: true,
            data: series
          },
        ],
      });
    }
  }, [series]);

  return <div ref={containerRef}/>;
}
