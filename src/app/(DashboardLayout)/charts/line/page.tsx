"use client"
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/components/shared/ParentCard';
import React, {useEffect, useState} from "react";
import axios from "axios";

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

  useEffect(() => {
    // Fetch sales data from the API
    axios.get('http://192.168.1.31:4000/api/sales/2024')
        .then(response => {
          // Assume response.data is an array of objects with { month: number, amount: number }
          const data = response.data.map(item => ({
            x: getMonthName(item.month), // Month as a number
            y: item.amount  // Sales value
          }));
          setSalesData(data);
          console.log(data)
        })
        .catch(error => {
          console.error("Error fetching sales data:", error);
        });
  }, []);
  // Function to convert month number to month name
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };
  const chartOptions = {
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
    },
    xaxis: {
      title: {
        text: 'Month'
      }
    },
    grid: {
      show: false,
    },
    colors: [primary, secondary],
    dataLabels: {
      enabled: true,
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toFixed(0)}` // Format as currency
      },
      title: {
        text: 'Amount'
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value.toFixed(0)}` // Format tooltip as currency
      }
    },

  };

  const chartSeries = [
    {
      name: 'Sales',
      data: salesData
    }
  ];

  return (
    <PageContainer title="Line Chart" description="this is Line Chart">
      {/* breadcrumb */}
      <Breadcrumb title="Line Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <ParentCard title="Monthly Sales">
          <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={350}
          />
      </ParentCard>
    </PageContainer>
  );
};

export default LineChart;
