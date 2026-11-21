import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { Analytics } from "@/components/Analytics";
import { JsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/structured-data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | 24/7 Lockout Help & Handyperson Services`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    images: [
      {
        url: "/images/og-call-jack-pro.jpg",
        width: 1200,
        height: 630,
        alt: "Jack, the Call Jack Pro technician, giving a thumbs-up in front of the Call Jack Pro service van",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffcc00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-brand px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <Analytics />
      </body>
    </html>
  );
}
