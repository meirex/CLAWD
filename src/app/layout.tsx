import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./components/container/header";
import { AnimationWrapper } from "./components/AnimationWrapper";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CLAWD",
  description: "A maior database de jogos do Brasil",
  keywords: ['steam', 'jogos', 'games', 'epic games', 'playstation', 'xbox'],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/card.png`],
    title: "CLAWD - A maior database de jogos do Brasil",
    description: "Explore, descubra e supere. Tudo isso na CLAWD.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    }
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FF0000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="smooth-scroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-900 overflow-x-hidden`}
      >

        <AnimationWrapper>
          <ScrollToTop />
          <Header />
          <main className="flex flex-col min-h-screen">
            {children}
          </main>
          <footer className="mt-auto py-6 text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} CLAWD. Todos os direitos reservados.
          </footer>
        </AnimationWrapper>

      </body>
    </html>
  );
}
