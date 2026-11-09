import Image from "next/image";
import { therapyPhotos } from "@/lib/verified-content";

export function TherapyArt({ theme, className = "" }: { theme: string; className?: string }) {
  const photo = therapyPhotos[theme];
  return (
    <span className={`therapy-art ${className}`}>
      {photo ? <Image className="therapy-photo" src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, 45vw" /> : (
        <span className="therapy-placeholder" role="img" aria-label="Fotografia oficial desta técnica em breve">
          <span>ESPAÇO MARTINS</span><strong>O cuidado em foco.</strong>
        </span>
      )}
      <span className="therapy-art__caption">{photo ? "Atendimento no Espaço Martins" : "Fotografia oficial em breve"}</span>
    </span>
  );
}
