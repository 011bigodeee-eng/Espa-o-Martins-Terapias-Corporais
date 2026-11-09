import Image from "next/image";
import { therapyPhotos, therapyVenuePhotos } from "@/lib/verified-content";

export function TherapyArt({ theme, className = "" }: { theme: string; className?: string }) {
  const treatment = therapyPhotos[theme];
  const photo = treatment || therapyVenuePhotos[theme];
  if (!photo) return null;
  return (
    <span className={`therapy-art ${treatment ? "therapy-art--treatment" : "therapy-art--venue"} ${className}`}>
      <Image className={`therapy-photo ${treatment ? "therapy-photo--treatment" : "therapy-photo--venue"}`} src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, (max-width: 1150px) 45vw, 30vw" />
      <span className="therapy-art__caption">{treatment ? "Atendimento no Espaço Martins" : "Ambiente do Espaço · não demonstra a técnica"}</span>
    </span>
  );
}
