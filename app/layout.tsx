import type { Metadata } from "next";
import { Libre_Baskerville, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-newsreader",
  display: "swap",
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Legal Stack — Josh Benzadon",
  description:
    "Notes on artificial intelligence inside transactional practice, by Josh Benzadon, innovation attorney.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${baskerville.variable}`}>
      <body>{children}</body>
    </html>
  );
}
