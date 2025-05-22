import AuthProviderServer from "@/components/AuthProviderServer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { ToastContainer } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UpHero - AI-Powered Upwork Success",
  description:
    "UpHero helps freelancers optimize their Upwork profiles and create winning proposals with AI-powered tools. Boost your Upwork success today!",
  keywords: [
    "Upwork",
    "AI-powered proposals",
    "Upwork profile optimization",
    "freelance success",
    "improve Upwork profile",
  ],
  robots: "index, follow",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviderServer>{children}</AuthProviderServer>
        <Suspense>
          <Toaster />
          <ToastContainer />
        </Suspense>
      </body>
    </html>
  );
}
