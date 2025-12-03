import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
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
    <html lang="fr">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Header />
          </header>

          <main className="w-[90vw] md:w-[80vw] mx-auto my-[5vh] flex flex-col items-center gap-5">
            {children}
          </main>

          <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
