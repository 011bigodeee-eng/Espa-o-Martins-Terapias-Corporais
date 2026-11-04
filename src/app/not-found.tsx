import Link from "next/link";
export default function NotFound() {
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
      <span className="eyebrow">ESPAÇO MARTINS · 404</span>
      <h1 style={{ fontSize: 64 }}>
        Vamos voltar
        <br />
        <em>ao seu cuidado?</em>
      </h1>
      <p>Esta página não foi encontrada.</p>
      <Link className="button button-olive" href="/">
        Voltar ao início →
      </Link>
    </main>
  );
}
