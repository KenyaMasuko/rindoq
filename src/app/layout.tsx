import "./globals.css";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";
import { Header } from "@/app/_components/Header";
import { Container, MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={inter.className}>
          <MantineProvider>
            <Header />
            <Container my="md">{children}</Container>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
