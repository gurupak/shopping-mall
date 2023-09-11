import "./globals.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Navbar from "./components/views/NavBar";
import Wrapper from "./components/shared/Wrapper";
import { ClerkProvider } from '@clerk/nextjs'
import Footer from "./components/views/Footer";
import { auth } from "@clerk/nextjs";
import ContextWrapper from "@/context/context";
import { useState } from "react";

const inter = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dine Market",
  description: "E-Commerce website for buying clothes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Wrapper>
            <ContextWrapper >
              <Navbar userData={userId}/>
            </ContextWrapper>
            {children}
          </Wrapper>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
