import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Lato } from "next/font/google";
import Navbar from "./components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Jannah Vizora",
  description:
    "Personal branding, social media strategy & unforgettable experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable}`}
    >
      
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
