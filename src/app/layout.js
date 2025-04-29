"use effect";

import "../styles/globals.css";
import Walkthrough from "@/components/walkthrough/Walkthrough";

export const metadata = {
  title: "Army Career Map",
  description: "Building Your Path",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="relative">
      <body className="max-w-7xl m-auto">{children}</body>
    </html>
  );
}
