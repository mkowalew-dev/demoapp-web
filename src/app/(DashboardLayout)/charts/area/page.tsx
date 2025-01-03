"use client"

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles'
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/components/shared/ParentCard';
import React, {useEffect, useState} from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Area Chart',
  },
];

const AreaChart = () => {

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const [salesData, setSalesData, ] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };
  useEffect(() => {
    async function fetchSalesData1() {
      try {
        const response = await fetch(`/api/sales/summary/current`);
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchSalesData1();
  }, []);
  useEffect(() => {
    async function fetchExpenseData() {
      try {
        const response = await fetch(`/api/expenses/summary/current`);; // Adjust the URL as needed
        const data = await response.json();
        setExpenseData(data);
      } catch (error) {
        console.error('Error fetching Expense data:', error);
      }
    }

    fetchExpenseData();
  }, []);
  const optionsareachart:any = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: '3',
      curve: 'smooth',
    },
    colors: [primary, secondary],
    xaxis: {
      categories: salesData.map((item) => [getMonthName(item.month), (item.year)]), // Format month as a number
      title: {
        text: 'Month-Year',
      },
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
        formatter: (value) => `$${value.toFixed(0)}`   // Format as currency
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      formatter: (value) => `$${value.toFixed(0)}` // Format tooltip as currency
    },
  };
  const seriesareachart = [
    {
      name: 'Sales',
      data: salesData.map((item) => item.total_amount),
    },
    {
      name: 'Expenses',
      data: expenseData.map((item) => item.total_amount)
      ,
    },
  ];

  return (
    <PageContainer title="Area Chart" description="this is Area Chart">
      {/* breadcrumb */}
      <Breadcrumb title="Area Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <ParentCard title="Sales/Expenses API">
        <Chart
               id={'area-chart'}
               options={optionsareachart} series={seriesareachart} type="area" height="300px" width={"100%"}/>
      </ParentCard>
    </PageContainer>
  );
};

export default AreaChart;
