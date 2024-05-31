import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthProvider";
import { Sidebar } from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Artifika Admin App",
  description: "Chatbot management application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <NotificationProvider>
            <Header />
            <div className="flex flex-row min-h-full pt-[80px]">
              {session?.user && <Sidebar />}

              <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                {children}
              </main>
            </div>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
