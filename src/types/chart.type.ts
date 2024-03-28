export type PieChartSeries = {
  name: string;
  y: number;
};

export type BarChart = {
  series: {
    name: string;
    data: number[];
  }[];
  xAxis: {
    categories: string[];
    accessibility: {
      description: string;
    };
  };
};
