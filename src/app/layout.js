import "../styles/globals.css";
import { EventProvider } from "@/contexts/EventContext";
import { Analytics } from "@vercel/analytics/next";

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
      <head>
        <link rel="icon" href="/Favicon.png" />
      </head>
      <body className="max-w-7xl m-auto">
        <EventProvider>
          {children}
          <Analytics />
        </EventProvider>
      </body>
    </html>
  );
}
