import type { Metadata } from "next";
import { instrumentSans } from "@wandercom/design-system-fonts/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wander Color",
  description: "Wander Color",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
