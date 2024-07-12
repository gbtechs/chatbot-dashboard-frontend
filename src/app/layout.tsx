import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { MainLayout } from "@/components/MainLayout";

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
            <MainLayout>{children}</MainLayout>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
