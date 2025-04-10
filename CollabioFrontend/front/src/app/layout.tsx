import type { Metadata } from "next"; 
import { Inter } from "next/font/google";
import "./globals.css";
import Register from "@/pages/Register";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collabio",
  description: "Collabio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Register/>
      </body>
    </html>
  );
}
