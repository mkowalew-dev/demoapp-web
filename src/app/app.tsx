"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from 'react-redux';
import { SessionProvider } from "next-auth/react"

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AppState } from "@/store/store";
import "@/utils/i18n";
import "@/app/api/index";
import Script from "next/script";
import SplunkRum from "@splunk/otel-web";


const MyApp = ({ children, session }: { children: React.ReactNode, session: any }) => {
    const theme = ThemeSettings();
    const customizer = useSelector((state: AppState) => state.customizer);
    SplunkRum.init({
        realm: 'us1', // e.g., us0
        rumAccessToken: 'LQkhp6MMxl4soUMNZQPODg',
        applicationName: 'demoapp-web-tier',
        deploymentEnvironment: 'development', // or 'development', 'sta
    })
    return (
        <>
        <SessionProvider session={session}>
            <Script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web.js"
                    crossOrigin="anonymous"></Script>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
                <RTL direction={customizer.activeDir}>
                <CssBaseline/>
                            {children}
                        </RTL>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </SessionProvider>
        </>
    );
};

export default MyApp;
