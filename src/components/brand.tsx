import Image from "next/image";
import { officialBrand } from "@/lib/verified-content";

export function Brand({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  const src = dark ? officialBrand.dark : officialBrand.light;
  return (
    <span className={`brand ${compact ? "brand-large" : ""}`}>
      {src ? <Image className="brand-official" src={src} alt="Espaço Martins — Terapias Corporais" width={240} height={100} unoptimized /> : (
        // Identificação tipográfica provisória; não recria o símbolo oficial ausente.
        <span className="brand-words">
          <span>ESPAÇO</span><strong>MARTINS</strong><small>Terapias Corporais</small>
        </span>
      )}
    </span>
  );
}
