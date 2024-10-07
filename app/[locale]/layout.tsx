import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Cairo } from "next/font/google";
import Header from "../_components/Header";
import useTextDirection from "../_hooks/useTextDirection";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const cairo = Cairo({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // unstable_setRequestLocale(locale);
  const dir = useTextDirection();
  const messages = useMessages();
  return (
    <html lang={locale} dir={dir}>
      <body className={cairo.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="container">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
