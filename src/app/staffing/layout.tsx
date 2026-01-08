import "../globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { StaffingProvider } from "./context/StaffingContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "A&A Search Staffing",
  description: "AI Recruiting Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-50 text-gray-800 flex flex-col min-h-screen">
        <StaffingProvider>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
        </StaffingProvider>
      </body>
    </html>
  );
}
