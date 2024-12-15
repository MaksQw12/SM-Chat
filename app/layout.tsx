import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"], // Подключение кириллицы
  weight: ["300", "400", "500", "700"], // Настройка нужных начертаний
});
export const metadata: Metadata = {
  title: "SM-Chat",
  description: "SM_Chat it's app for speaking with your friends!",
  icons: "/favicon.png",
};
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.variable}>
        
        {children}
        <Toaster />
        {modal}
      </body>
    </html>
  );
}
