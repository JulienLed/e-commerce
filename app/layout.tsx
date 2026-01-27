import type { Metadata } from "next";
import Header from "@/components/client/header/Header";
import Footer from "@/components/server/footer/Footer";
import "./globals.css";
import { Toaster } from "sonner";

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
    <html lang="fr">
      <body>
        <header className="sticky top-0 z-30">
          <Header />
        </header>

        <main className="w-[90vw] md:w-[80vw] mx-auto my-[5vh] flex flex-col items-center gap-5">
          {children}
          <Toaster position="top-center" duration={3000} />
        </main>

        <footer className="relative z-30">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
