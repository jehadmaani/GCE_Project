import { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientWrapper>{children}</ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
