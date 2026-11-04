export const business = {
  name: "Espaço Martins | Terapias Corporais",
  phone: "5511959389897",
  phoneLabel: "(11) 95938-9897",
  address: "Rua Domingos de Morais, 1061, conjunto 83",
  neighborhood: "Vila Mariana, São Paulo – SP",
  instagram: "https://www.instagram.com/espacomartins.terapeuta/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Rua Domingos de Morais, 1061, Vila Mariana, São Paulo, SP",
    ),
};

export function whatsapp(therapy?: string) {
  const message = therapy
    ? `Olá! Conheci o Espaço Martins pelo site e gostaria de saber mais sobre ${therapy} e os horários disponíveis.`
    : "Olá! Conheci o Espaço Martins pelo site e gostaria de saber mais sobre os atendimentos e horários disponíveis.";
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
}

export const therapies = [
  {
    id: "relaxante",
    name: "Massagem relaxante",
    category: "Pausa & bem-estar",
    message: "a massagem relaxante",
    description:
      "Um convite a desacelerar. Toques que acolhem o corpo e proporcionam uma experiência de relaxamento e bem-estar.",
    detail:
      "Uma modalidade de massagem manual voltada ao relaxamento. O atendimento considera suas preferências e o conforto durante a sessão. Converse com Martins sobre seus objetivos para conhecer a proposta mais adequada para você.",
    theme: "relax",
    tag: "Para desacelerar",
  },
  {
    id: "desportiva",
    name: "Massagem desportiva",
    category: "Corpo em movimento",
    message: "a massagem desportiva",
    description:
      "Cuidado manual voltado às demandas musculares de quem tem o movimento como parte da rotina.",
    detail:
      "Modalidade de massagem voltada às demandas musculares relacionadas à atividade física. A escolha das técnicas depende da conversa inicial e da adequação ao seu momento. Não substitui avaliação médica ou acompanhamento especializado.",
    theme: "sport",
    tag: "Para quem se movimenta",
  },
  {
    id: "shiatsu",
    name: "Shiatsu",
    category: "Presença & equilíbrio",
    message: "o Shiatsu",
    description:
      "Técnica manual tradicional que utiliza pressões em pontos do corpo, em um atendimento atento a você.",
    detail:
      "O Shiatsu utiliza pressões manuais em pontos do corpo. A intensidade e a forma de aplicação são conversadas com o profissional, respeitando o conforto individual. Consulte pelo WhatsApp como essa técnica é realizada no espaço.",
    theme: "shiatsu",
    tag: "A arte do toque",
  },
  {
    id: "reflexologia",
    name: "Reflexologia podal",
    category: "Pausa & bem-estar",
    message: "a reflexologia podal",
    description:
      "Pressões em regiões dos pés em uma experiência dedicada ao relaxamento e à sensação de bem-estar.",
    detail:
      "Técnica de aplicação de pressões em regiões dos pés, voltada ao relaxamento e bem-estar. Durante o primeiro contato, compartilhe suas necessidades para que o profissional avalie a adequação do atendimento.",
    theme: "feet",
    tag: "Cuidado em cada ponto",
  },
  {
    id: "ventosas",
    name: "Ventosaterapia",
    category: "Técnicas complementares",
    message: "a ventosaterapia",
    description:
      "Uma técnica que utiliza ventosas aplicadas sobre a pele, com atenção à adequação individual.",
    detail:
      "A ventosaterapia utiliza ventosas aplicadas sobre a pele. Conheça com o profissional a forma de aplicação e os cuidados pertinentes ao seu caso. Não há promessa de cura, eliminação de toxinas ou tratamento de doenças.",
    theme: "cups",
    tag: "Uma abordagem complementar",
  },
  {
    id: "pedras",
    name: "Pedras quentes",
    category: "Pausa & bem-estar",
    message: "a massagem com pedras quentes",
    description:
      "O acolhimento do calor em uma modalidade de massagem que associa pedras aquecidas ao relaxamento.",
    detail:
      "Modalidade de massagem que utiliza pedras aquecidas, associada ao relaxamento. A temperatura e a aplicação devem respeitar o conforto de cada pessoa. Consulte o profissional para avaliar a adequação às suas necessidades.",
    theme: "stones",
    tag: "Calor que acolhe",
  },
  {
    id: "miofascial",
    name: "Liberação miofascial",
    category: "Mobilidade & conforto",
    message: "a liberação miofascial",
    description:
      "Atenção aos tecidos que envolvem os músculos, com possíveis objetivos de mobilidade e conforto muscular.",
    detail:
      "A fáscia é um tecido que envolve e conecta estruturas do corpo, incluindo os músculos. A liberação miofascial utiliza técnicas manuais sobre esses tecidos, com possíveis objetivos relacionados ao conforto muscular e à mobilidade. A proposta é individual e não garante resultados clínicos.",
    theme: "fascia",
    tag: "Mais atenção ao movimento",
  },
  {
    id: "biomecanica",
    name: "Ajustes biomecânicos ortopédicos",
    category: "Converse com o profissional",
    message: "os ajustes biomecânicos ortopédicos",
    description:
      "Conheça as técnicas realizadas e converse sobre sua adequação às suas necessidades.",
    detail:
      "Para conhecer as técnicas efetivamente realizadas nesse atendimento, suas indicações e sua adequação, converse diretamente com Martins antes de agendar. A definição do atendimento depende das necessidades individuais e dos serviços oferecidos dentro da habilitação profissional. Não substitui diagnóstico médico ou tratamento especializado.",
    theme: "mobility",
    tag: "Cuidado individualizado",
  },
] as const;
export type Therapy = (typeof therapies)[number];

export const gallery = [
  {
    src: "/images/sala.png",
    alt: "Sala de terapias do Espaço Martins com maca, toalhas e iluminação acolhedora",
    title: "Tempo para você",
    subtitle: "Sala de terapias",
  },
  {
    src: "/images/recepcao.png",
    alt: "Recepção do Espaço Martins com poltrona, plantas e logomarca iluminada",
    title: "Acolhimento desde a chegada",
    subtitle: "Recepção",
  },
  {
    src: "/images/consulta.png",
    alt: "Ambiente de consulta do Espaço Martins com mesa, cadeiras e modelo de coluna vertebral",
    title: "Espaço para escutar",
    subtitle: "Ambiente de consulta",
  },
];

export const faqs = [
  [
    "Como agendar um atendimento?",
    "É só entrar em contato pelo WhatsApp (11) 95938-9897. Conte qual atendimento despertou seu interesse e consulte os horários disponíveis diretamente com o profissional.",
  ],
  [
    "Como escolher a terapia adequada para mim?",
    "Você não precisa decidir sozinho. Compartilhe seus objetivos e necessidades no primeiro contato. Martins pode explicar os atendimentos oferecidos e conversar sobre a adequação de cada técnica ao seu momento.",
  ],
  [
    "Preciso agendar antecipadamente?",
    "Entre em contato antes de ir ao espaço para consultar a disponibilidade e combinar seu atendimento. A confirmação do horário é feita diretamente pelo WhatsApp.",
  ],
  [
    "Qual é a duração de uma sessão?",
    "A duração deve ser confirmada diretamente com o profissional, conforme o atendimento escolhido. Consulte essa informação pelo WhatsApp antes de agendar.",
  ],
  [
    "Quais são as formas de pagamento?",
    "Consulte os valores e as formas de pagamento disponíveis diretamente pelo WhatsApp. Assim você recebe informações atualizadas antes de confirmar o agendamento.",
  ],
  [
    "Quais terapias posso conhecer no Espaço Martins?",
    "Massagem relaxante, massagem desportiva, Shiatsu, reflexologia podal, ventosaterapia, pedras quentes e liberação miofascial. Confirme a disponibilidade e a adequação de cada modalidade ao entrar em contato.",
  ],
  [
    "Onde fica o Espaço Martins?",
    "Na Rua Domingos de Morais, 1061, conjunto 83, Vila Mariana, São Paulo – SP. Use o botão de rotas na seção de localização para planejar sua chegada.",
  ],
];

export const experience = [
  [
    "Primeiro contato",
    "Tudo começa com uma conversa pelo WhatsApp. Conte o que você está buscando.",
  ],
  [
    "Escuta e atenção",
    "Um momento para conversar sobre seus objetivos e as necessidades do atendimento.",
  ],
  [
    "Cuidado individualizado",
    "O atendimento considera a técnica escolhida e sua adequação a você.",
  ],
  [
    "Depois do atendimento",
    "Um espaço para dúvidas e orientações pertinentes ao cuidado realizado.",
  ],
];
