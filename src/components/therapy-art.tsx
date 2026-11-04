/** Generated illustrative scenes, kept separate from the supplied venue photos.
 * A single optimized contact sheet is framed by SVG; the original is retained.
 */
export function TherapyArt({
  theme,
  className = "",
}: {
  theme: string;
  className?: string;
}) {
  const scene = scenes[theme] || scenes.relax;
  const x = (scene.index % 2) * 512;
  const y = Math.floor(scene.index / 2) * 384;
  return (
    <svg
      className={`therapy-art ${className}`}
      viewBox="0 0 512 384"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={scene.alt}
    >
      <image
        href="/images/terapias-ilustrativas.webp"
        x={-x}
        y={-y}
        width="1024"
        height="1536"
      />
      <rect
        x="16"
        y="347"
        width="174"
        height="23"
        fill="#faf8f3"
        fillOpacity=".94"
      />
      <text
        x="27"
        y="362"
        fill="#354725"
        fontSize="9"
        fontFamily="Arial,sans-serif"
        letterSpacing="1"
      >
        IMAGEM ILUSTRATIVA · IA
      </text>
    </svg>
  );
}
const scenes: Record<string, { index: number; alt: string }> = {
  relax: {
    index: 0,
    alt: "Imagem ilustrativa gerada por IA: mãos em uma massagem relaxante nas costas",
  },
  sport: {
    index: 1,
    alt: "Imagem ilustrativa gerada por IA: massagem na panturrilha de uma pessoa com roupa esportiva",
  },
  shiatsu: {
    index: 2,
    alt: "Imagem ilustrativa gerada por IA: pressão manual sobre o ombro por cima de uma camiseta",
  },
  feet: {
    index: 3,
    alt: "Imagem ilustrativa gerada por IA: mãos aplicando pressão no arco de um pé",
  },
  cups: {
    index: 4,
    alt: "Imagem ilustrativa gerada por IA: três ventosas aplicadas nas costas",
  },
  stones: {
    index: 5,
    alt: "Imagem ilustrativa gerada por IA: mão posicionando uma pedra de massagem sobre as costas",
  },
  fascia: {
    index: 6,
    alt: "Imagem ilustrativa gerada por IA: técnica manual com antebraço sobre a musculatura das costas",
  },
  mobility: {
    index: 7,
    alt: "Imagem ilustrativa gerada por IA: mãos apoiando um ombro e um braço vestido",
  },
};
