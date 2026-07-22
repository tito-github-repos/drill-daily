import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DisableCopy from "./components/DisableCopy";

export const metadata: Metadata = {
  title: "Drill Daily",
  description: "We're here to help you succeed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DisableCopy />
        <Header />
        <main style={{ paddingTop: "60px"}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}