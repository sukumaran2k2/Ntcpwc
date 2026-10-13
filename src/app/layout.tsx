import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NTCPWC – National Technology Centre for Ports, Waterways and Coasts",
    template: "%s | NTCPWC",
  },
  description:
    "NTCPWC is India's premier research and development institution for safe, efficient and sustainable development of ports, waterways and coastal regions.",
  keywords: [
    "NTCPWC",
    "ports",
    "waterways",
    "coastal engineering",
    "India maritime",
    "harbour engineering",
    "marine research",
  ],
  authors: [{ name: "NTCPWC" }],
  openGraph: {
    title: "NTCPWC – Advancing India's Maritime Future",
    description:
      "Research, technology and solutions for safe, efficient and sustainable ports, waterways and coastal regions.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
