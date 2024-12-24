"use client"

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/components/shared/ParentCard';
import React, {useEffect, useState} from "react";
import {blue, blueGrey} from "@mui/material/colors";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Column Chart',
  },
];

const ColumnChart = () => {

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const [orderShippedData, setOrderShippedData] = useState([]);
  const [orderPendingData, setOrderPendingData] = useState([]);
  const [orderCompletedData, setOrderCompletedData] = useState([]);
  const [orderCanceledData, setOrderCanceledData] = useState([]);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };
  useEffect(() => {
    async function fetchOrderPendingData() {
      try {
        const response = await fetch(`${apiUrl}/orders/pending
`); // Adjust the URL as needed
        const data = await response.json();
        setOrderPendingData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchOrderPendingData();
  }, []);
  useEffect(() => {
    async function fetchOrderShippedData() {
      try {
        const response = await fetch(`${apiUrl}/orders/shipped
`); // Adjust the URL as needed
        const data = await response.json();
        setOrderShippedData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchOrderShippedData();
  }, []);
  useEffect(() => {
    async function fetchOrderCompletedData() {
      try {
        const response = await fetch(`${apiUrl}/orders/completed
`); // Adjust the URL as needed
        const data = await response.json();
        setOrderCompletedData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchOrderCompletedData();
  }, []);
  useEffect(() => {
    async function fetchOrderCanceledData() {
      try {
        const response = await fetch(`${apiUrl}/orders/canceled
`); // Adjust the URL as needed
        const data = await response.json();
        setOrderCanceledData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchOrderCanceledData();
  }, []);


  const optionscolumnchart: any = {
    chart: {
      id: 'column-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    colors: [primary, secondary, error],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: 'Status Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
      },
      theme: 'dark',
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
  };
  const seriescolumnchart: any = [
    {
      name: 'Canceled',
      data: orderCanceledData.map((item) => item.order_count),
    },
    {
      name: 'Pending',
      data: orderPendingData.map((item) => item.order_count),
    },
    {
      name: 'Shipped',
      data: orderShippedData.map((item) => item.order_count),
    },
    {
      name: 'Completed',
      data: orderCompletedData.map((item) => item.order_count),
    },
  ];

  return (
      <PageContainer title="Column Chart" description="this is Column Chart">
        {/* breadcrumb */}
        <Breadcrumb title="Column Chart" items={BCrumb} />
        {/* end breadcrumb */}
        <ParentCard title='Order Status API'>
          <Chart
              id={'column-chart'}
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height="300px" width={"100%"}
          />
        </ParentCard>
      </PageContainer>
  );
};

export default ColumnChart;
