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
    <span className={`therapy-art ${className}`}>
      <svg
        className="therapy-art__scene"
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
      </svg>
      <span className="therapy-art__caption">Imagem ilustrativa · IA</span>
    </span>
  );
}
const scenes: Record<string, { index: number; alt: string }> = {
  relax: {
    index: 0,
    alt: "Imagem ilustrativa gerada por IA: terapeuta homem realizando uma massagem relaxante nas costas",
  },
  sport: {
    index: 1,
    alt: "Imagem ilustrativa gerada por IA: terapeuta homem realizando massagem na panturrilha de uma pessoa com roupa esportiva",
  },
  shiatsu: {
    index: 2,
    alt: "Imagem ilustrativa gerada por IA: terapeuta homem aplicando pressão manual sobre o ombro por cima de uma camiseta",
  },
  feet: {
    index: 3,
    alt: "Imagem ilustrativa gerada por IA: terapeuta homem aplicando pressão no arco de um pé",
  },
  cups: {
    index: 4,
    alt: "Imagem ilustrativa gerada por IA: três ventosas aplicadas nas costas",
  },
  stones: {
    index: 5,
    alt: "Imagem ilustrativa gerada por IA: terapeuta homem posicionando uma pedra de massagem sobre as costas",
  },
  fascia: {
    index: 6,
    alt: "Imagem ilustrativa gerada por IA: terapeuta homem aplicando técnica manual com antebraço sobre a musculatura das costas",
  },
  mobility: {
    index: 7,
    alt: "Imagem ilustrativa gerada por IA: mãos de terapeuta homem apoiando um ombro e um braço vestido",
  },
};
