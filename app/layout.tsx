import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Home from "./page";
import NavigationBar from "./NavigationBar";
import FirebaseAuthProvider from "./FirebaseAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pawductivity Pup",
  description: "Generated by create next app",
};

export default function RootLayout({ 
  children,
 }: {
  children: React.ReactNode;
 }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <FirebaseAuthProvider>
            <NavigationBar />

            {children}
          </FirebaseAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
