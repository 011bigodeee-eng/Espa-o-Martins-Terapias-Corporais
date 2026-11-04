import Site from "@/components/site";
import { business } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description:
      "Espaço dedicado a terapias corporais e atendimentos personalizados na Vila Mariana, São Paulo.",
    telephone: "+5511959389897",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Domingos de Morais, 1061, conjunto 83",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: [business.instagram],
    hasMap: business.maps,
    ...(siteUrl
      ? { url: siteUrl, image: new URL("/images/sala.png", siteUrl).href }
      : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Site />
    </>
  );
}
