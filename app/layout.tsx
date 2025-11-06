import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smoke",
  description: "Personnal project about a e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
