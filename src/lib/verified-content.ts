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

// Registros reais aprovados pela cliente. Reflexologia: enquadramento sem cabeça expressamente aprovado.
export const therapyPhotos: Record<string, { src: string; alt: string }> = {
  feet: { src: "/images/atendimento-reflexologia.jpg", alt: "Martins realizando reflexologia podal, com foco nas mãos e no pé, e o corpo do paciente coberto por lençol" },
  relax: { src: "/images/atendimento-relaxante-oficial.jpg", alt: "Martins realizando massagem manual nas costas de paciente com touca e parte inferior coberta por toalha" },
};

// Fotos do ambiente não representam a execução das técnicas pendentes.
export const therapyVenuePhotos: Record<string, { src: string; alt: string }> = {
  fascia: { src: "/images/sala.png", alt: "Sala do Espaço Martins; fotografia do ambiente, sem demonstração de liberação miofascial" },
  mobility: { src: "/images/consulta.png", alt: "Ambiente do Espaço Martins; fotografia do espaço, sem demonstração de avaliação do movimento" },
};

// Ilustrações geradas por IA: não retratam Martins nem registros reais do espaço.
export const therapyIllustrations: Record<string, { src: string; alt: string }> = {
  cups: { src: "/images/ilustracao-ventosaterapia.webp", alt: "Ilustração por IA de ventosaterapia: aplicação de ventosas transparentes nas costas, paciente com touca e parte inferior coberta por toalha branca" },
  sport: { src: "/images/ilustracao-desportiva.webp", alt: "Ilustração por IA de massagem desportiva: mãos pressionam a panturrilha, com paciente de touca e corpo coberto por toalha branca" },
  shiatsu: { src: "/images/ilustracao-shiatsu.webp", alt: "Ilustração por IA de Shiatsu: pressão com as palmas sobre as costas cobertas por lençol, com paciente de touca" },
  stones: { src: "/images/ilustracao-pedras-quentes.webp", alt: "Ilustração por IA de massagem com pedras quentes: terapeuta desliza pedra escura nas costas, com paciente de touca e parte inferior coberta" },
};
