import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { ContactPageSharp } from '@mui/icons-material';

const ChartVisual = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/trades');
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (chartData.length > 0) {
      createChart();
    }
  }, [chartData]);

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');

    if (typeof chartRef.current.chart !== 'undefined') {
      chartRef.current.chart.destroy();
    }

    const formattedData = chartData.map((trade) => ({
      label: new Date(trade.Date).toLocaleDateString('en-CA'),
      //value: (trade.BTC / trade.TotalBTC) * trade.BuyPrice,
      value: trade.BTC,
    }));

    const chartLabels = formattedData.map((dataPoint) => dataPoint.label);
    const chartValues = formattedData.map((dataPoint) => dataPoint.value);
    // console.log(chartLabels);
    // console.log(chartValues);

    const chartDataConfig = {
      labels: chartLabels,
      datasets: [
        {
          label: 'BTC',
          data: chartValues,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'BTC',
          },
          ticks: {
            beginAtZero: true,
            stepSize: 0.01,
          },
        },
      },
    };

    chartRef.current.chart = new Chart(ctx, {
      type: 'bar',
      data: chartDataConfig,
      options: chartOptions,
    });
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartVisual;
