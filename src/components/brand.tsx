import Image from "next/image";

export function Brand({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-large" : ""} ${dark ? "brand-on-dark" : ""}`}>
      <span className="brand-emblem" aria-hidden="true">
        <Image src="/images/logo-martins-oficial.jpg" alt="" width={1280} height={1093} sizes="(max-width: 760px) 80px, 110px" />
      </span>
      <span className="brand-words">
        <span>ESPAÇO</span><strong>MARTINS</strong><small>Terapias Corporais</small>
      </span>
    </span>
  );
}
