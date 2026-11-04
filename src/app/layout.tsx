import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/seo";

const description =
  "Um espaço acolhedor de terapias corporais na Vila Mariana, São Paulo. Conheça as massagens, Shiatsu e liberação miofascial do Espaço Martins. Agende pelo WhatsApp.";
export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: "Espaço Martins | Terapias Corporais na Vila Mariana",
  description,
  applicationName: "Espaço Martins",
  keywords: [
    "Espaço Martins Vila Mariana",
    "terapias corporais Vila Mariana",
    "massoterapia Vila Mariana",
    "massagem relaxante São Paulo",
    "massagem desportiva Vila Mariana",
    "liberação miofascial Vila Mariana",
  ],
  openGraph: {
    title: "Espaço Martins | Cuidar de você é o que nos move",
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "Espaço Martins",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/images/sala.png",
              width: 1536,
              height: 1024,
              alt: "Sala de terapias do Espaço Martins",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço Martins | Terapias Corporais",
    description,
    ...(siteUrl ? { images: [new URL("/images/sala.png", siteUrl).href] } : {}),
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = {
  themeColor: "#354725",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
