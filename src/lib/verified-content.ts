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

// Seis registros reais selecionados pela cliente para o catálogo, sem alterações sintéticas.
// Alguns enquadramentos não mostram a cabeça; não se afirma touca visível nesses casos.
export const therapyPhotos: Record<string, { src: string; alt: string }> = {
  relax: { src: "/images/martins-relaxante-costas.jpg", alt: "Martins realizando massagem nas costas de paciente com touca e parte inferior coberta por toalha" },
  legs: { src: "/images/martins-massagem-pernas.jpg", alt: "Martins realizando atendimento manual na perna, com o restante do corpo coberto por lençol branco" },
  arms: { src: "/images/martins-mobilizacao-bracos.jpg", alt: "Martins acompanhando a mobilização dos braços de uma paciente com auxílio de bastão" },
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
  cups: { src: "/images/ilustracao-ventosaterapia.webp", alt: "Ilustração por IA de ventosaterapia: aplicação de ventosas transparentes nas costas, paciente com touca e parte inferior coberta por toalha branca" },
  sport: { src: "/images/ilustracao-desportiva.webp", alt: "Ilustração por IA de massagem desportiva: mãos pressionam a panturrilha, com paciente de touca e corpo coberto por toalha branca" },
  shiatsu: { src: "/images/ilustracao-shiatsu.webp", alt: "Ilustração por IA de Shiatsu: pressão com as palmas sobre as costas cobertas por lençol, com paciente de touca" },
  stones: { src: "/images/ilustracao-pedras-quentes.webp", alt: "Ilustração por IA de massagem com pedras quentes: terapeuta desliza pedra escura nas costas, com paciente de touca e parte inferior coberta" },
};
