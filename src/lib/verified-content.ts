import type { Testimonial } from "@/components/testimonials";
// Publish only verified information authorized by the owner.
// Supplied registration "CRT-BR 19.410" remains unpublished until confirmed.
export const verifiedProfile: {
  professionalName: string;
  institutionalText: string | null;
  biography: string | null;
  registration: string | null;
  portrait: { src: string; alt: string } | null;
  qualifications: string[];
  events: { title: string; url: string }[];
  educationalResources: { title: string; url: string }[];
} = {
  professionalName: "Martins",
  institutionalText: null,
  biography: null,
  registration: null,
  portrait: { src: "/images/martins-retrato.jpg", alt: "Martins sentado à mesa do espaço, usando camisa polo marrom" },
  qualifications: [],
  events: [],
  educationalResources: [],
};
export const authorizedTestimonials: readonly Testimonial[] = [];

// Somente arquivos oficiais aprovados. Use versões próprias para cada fundo quando fornecidas.
export const officialBrand: { light: string | null; dark: string | null } = {
  light: null,
  dark: null,
};

// Imagens oficiais por técnica. A foto de reflexologia foi expressamente selecionada pela cliente.
export const therapyPhotos: Record<string, { src: string; alt: string }> = {
  feet: { src: "/images/atendimento-reflexologia.jpg", alt: "Martins realizando reflexologia podal, com as mãos sobre o pé do paciente e o corpo coberto por lençol" },
  relax: { src: "/images/atendimento-massagem.jpg", alt: "Martins realizando massagem nas costas; paciente com touca e corpo coberto por toalha" },
  cups: { src: "/images/atendimento-ventosas.jpg", alt: "Atendimento de ventosaterapia no Espaço Martins, com paciente usando touca e cobertura" },
};

// Fotos do ambiente não representam a execução das técnicas pendentes.
export const therapyVenuePhotos: Record<string, { src: string; alt: string }> = {
  sport: { src: "/images/sala.png", alt: "Sala de atendimento do Espaço Martins com maca preparada; fotografia do ambiente, sem demonstração de massagem desportiva" },
  shiatsu: { src: "/images/recepcao.png", alt: "Recepção do Espaço Martins; fotografia do ambiente, sem demonstração de Shiatsu" },
  stones: { src: "/images/consulta.png", alt: "Ambiente de acolhimento do Espaço Martins; fotografia do espaço, sem demonstração de pedras quentes" },
  fascia: { src: "/images/sala.png", alt: "Sala do Espaço Martins; fotografia do ambiente, sem demonstração de liberação miofascial" },
  mobility: { src: "/images/consulta.png", alt: "Ambiente do Espaço Martins; fotografia do espaço, sem demonstração de avaliação do movimento" },
};
