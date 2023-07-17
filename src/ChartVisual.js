import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartVisual = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
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
      createChart1();
      createChart2();
    }
  }, [chartData]);

  const createChart1 = () => {
    const ctx = chartRef1.current.getContext('2d');

    if (typeof chartRef1.current.chart !== 'undefined') {
      chartRef1.current.chart.destroy();
    }

    const formattedData = chartData.map((trade) => ({
      label: new Date(trade.Date).toLocaleDateString('en-CA'),
      value: trade.BTC,
    }));

    const chartLabels = formattedData.map((dataPoint) => dataPoint.label);
    const chartValues = formattedData.map((dataPoint) => dataPoint.value);

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

    chartRef1.current.chart = new Chart(ctx, {
      type: 'bar',
      data: chartDataConfig,
      options: chartOptions,
    });
  };

  const createChart2 = () => {
    const ctx = chartRef2.current.getContext('2d');

    if (typeof chartRef2.current.chart !== 'undefined') {
      chartRef2.current.chart.destroy();
    }

    const formattedData = chartData.map((trade) => ({
      label: new Date(trade.Date).toLocaleDateString('en-CA'),
      buyPrice: trade.BuyPrice,
      onlinePrice: trade.OnlinePrice,
    }));

    const chartLabels = formattedData.map((dataPoint) => dataPoint.label);
    const chartBuyPrice = formattedData.map((dataPoint) => dataPoint.buyPrice);
    const chartOnlinePrice = formattedData.map((dataPoint) => dataPoint.onlinePrice);

    const chartDataConfig = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Buy Price',
          data: chartBuyPrice,
          backgroundColor: 'rgba(192, 75, 75, 1)',
          borderColor: 'rgba(192, 75, 75, 1)',
          borderWidth: 1,
        },
        {
          label: 'Online Price',
          data: chartOnlinePrice,
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderColor: 'rgba(0, 0, 0, 1)',
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
            text: 'Price ($)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      },
    };

    chartRef2.current.chart = new Chart(ctx, {
      type: 'line',
      data: chartDataConfig,
      options: chartOptions,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '100px' }}>
      <div style={{ width: '700px', height: '600px', textAlign: 'center' }}>
        <h2>Amount of BTC purchased per day</h2>
        <canvas ref={chartRef1} />
      </div>
      <div style={{ width: '700px', height: '600px', textAlign: 'center' }}>
        <h2>Buy price versus Online price</h2>
        <canvas ref={chartRef2} />
      </div>
    </div>
  );
};

export default ChartVisual;
