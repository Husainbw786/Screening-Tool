import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consultadd",
  description: "AI powered Interviews",
  openGraph: {
    title: "Consultadd",
    description: "AI-powered Interviews",
    siteName: "Consultadd",
    images: [
      {
        url: "/FoloUp.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/browser-user-icon.ico" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
            <div className="pt-[64px] px-4">
              {children}
            </div>
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-white border-2 border-green-400",
                  title: "text-black",
                  description: "text-red-400",
                  actionButton: "bg-green-400",
                  cancelButton: "bg-orange-400",
                  closeButton: "bg-lime-400",
                },
              }}
            />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
