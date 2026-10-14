import type { Metadata } from "next";
import { Calistoga, Caladea, Inter } from "next/font/google";
import "./globals.css";

const display = Calistoga({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const serif = Caladea({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Webfont stand-in for Helvetica Neue (used for the About body copy)
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adria Robles",
  description: "Adria Robles — portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
