"use client"
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/components/shared/ParentCard';
import React, {useEffect, useState} from "react";

//
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Line Chart",
  },
];

const LineChart = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const [salesData, setSalesData] = useState([]);


  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await fetch(`${apiUrl}/saleslegacy/summary/2024`); // Adjust the URL as needed
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching Sales data:', error);
      }
    }

    fetchSalesData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    series: [
      {
        name: 'Sales',
        data: salesData.map((item) => item.amount),
      },
    ],
    options: {
      chart: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        foreColor: "#adb0bb",
        toolbar: {
          show: false,
        },
        shadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1,
        },
        height: 350,
      },
      xaxis: {
        categories: salesData.map((item) => getMonthName(item.month)), // Format month as a number
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Amount',
        },
        labels: {
          formatter: (value) => `$${value.toFixed(0)}` // Format as currency
        },
      },
      grid: {
        show: false,
      },
      colors: [primary, secondary],
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        y: {
          formatter: (value) => `$${value.toFixed(0)}` // Format tooltip as currency
        }
      },
    },

  };

  return (
      <PageContainer title="Line Chart" description="this is Line Chart">
        {/* breadcrumb */}
        <Breadcrumb title="Line Chart" items={BCrumb} />
        {/* end breadcrumb */}
        <ParentCard title="Sales API">
          <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
          />
        </ParentCard>
      </PageContainer>
  );
};

export default LineChart;