import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

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
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackClientApp}>
            <StackTheme>
              <Suspense fallback={<Loading />}>
                <header>
                  <Header />
                </header>

                <main className="w-[90vw] md:w-[80vw] mx-auto my-[5vh] flex flex-col items-center gap-5">
                  {children}
                </main>

                <footer></footer>
              </Suspense>
            </StackTheme>
          </StackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
