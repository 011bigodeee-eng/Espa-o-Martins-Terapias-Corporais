"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 25,
        padding: 25,
        textAlign: "center",
      }}
    >
      <span className="eyebrow">ESPAÇO MARTINS</span>
      <h1 style={{ fontSize: 54 }}>Uma pequena pausa.</h1>
      <p>Não foi possível carregar esta página. Tente novamente.</p>
      <button className="button button-olive" onClick={reset}>
        Tentar novamente
      </button>
      <a
        className="text-link"
        href="https://wa.me/5511959389897"
        target="_blank"
        rel="noopener noreferrer"
      >
        Falar pelo WhatsApp ↗
      </a>
    </main>
  );
}
