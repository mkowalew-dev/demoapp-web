import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";

export const metadata = {
  title: "Retail Demo Store",
  description: "Retail Demo Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp session={undefined}>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
