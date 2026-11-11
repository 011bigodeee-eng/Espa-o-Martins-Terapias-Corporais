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
  biography: "Com um olhar atento e humanizado para o bem-estar, Martins atua como terapeuta integrativo e massoterapeuta, oferecendo cuidados que buscam promover o equilíbrio corporal, o relaxamento e a qualidade de vida.\n\nPor meio de técnicas de liberação Miofacial manual e instrumental seu trabalho é voltado ao alívio de tensões musculares, a dores, à melhora da mobilidade, ao relaxamento e à conexão entre corpo e mente.",
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

// Imagens fornecidas pela cliente para o catálogo.
// Alguns enquadramentos não mostram a cabeça; não se afirma touca visível nesses casos.
export const therapyPhotos: Record<string, { src: string; alt: string }> = {
  cups: { src: "/images/ventosaterapia.jpeg", alt: "Ventosas transparentes aplicadas nas costas durante atendimento de ventosaterapia" },
  shiatsu: { src: "/images/shiatsu.png", alt: "Mãos aplicando pressão nas costas de uma pessoa coberta por tecido branco durante Shiatsu" },
  relax: { src: "/images/martins-relaxante-costas.jpg", alt: "Martins realizando massagem nas costas de paciente com touca e parte inferior coberta por toalha" },
  legs: { src: "/images/martins-massagem-pernas.jpg", alt: "Martins realizando atendimento manual na perna, com o restante do corpo coberto por lençol branco" },
  feet: { src: "/images/martins-reflexologia-podal.jpg", alt: "Martins realizando reflexologia podal, com foco nas mãos e no pé e corpo coberto por lençol" },
  instrument: { src: "/images/martins-tecnica-instrumental.jpg", alt: "Martins utilizando um instrumento junto ao pescoço e ombro de paciente com touca" },
  footmassage: { src: "/images/martins-massagem-pes.jpg", alt: "Martins realizando atendimento manual no pé de paciente sobre maca com lençol branco" },
};

// Fotos do ambiente não representam a execução das técnicas pendentes.
export const therapyVenuePhotos: Record<string, { src: string; alt: string }> = {
  fascia: { src: "/images/sala-sem-logotipo.png", alt: "Sala do Espaço Martins; fotografia do ambiente, sem demonstração de liberação miofascial" },
  mobility: { src: "/images/consulta.png", alt: "Ambiente do Espaço Martins; fotografia do espaço, sem demonstração de avaliação do movimento" },
};

// Ilustrações geradas por IA: não retratam Martins nem registros reais do espaço.
export const therapyIllustrations: Record<string, { src: string; alt: string }> = {
  sport: { src: "/images/ilustracao-desportiva.webp", alt: "Ilustração por IA de massagem desportiva: mãos pressionam a panturrilha, com paciente de touca e corpo coberto por toalha branca" },
  stones: { src: "/images/ilustracao-pedras-quentes.webp", alt: "Ilustração por IA de massagem com pedras quentes: terapeuta desliza pedra escura nas costas, com paciente de touca e parte inferior coberta" },
};
