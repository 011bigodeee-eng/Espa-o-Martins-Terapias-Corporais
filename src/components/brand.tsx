export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-large" : ""}`}>
      <svg viewBox="0 0 50 58" fill="none" aria-hidden="true">
        <path
          d="M25 51C8 45 2 32 6 22c3 12 9 16 19 20 10-4 16-8 19-20 4 10-2 23-19 29Z"
          fill="currentColor"
          opacity=".85"
        />
        <path
          d="M25 42C14 33 12 22 18 12c7 5 11 13 7 30Z"
          fill="currentColor"
        />
        <path
          d="M27 36c-2-13 4-23 15-27 2 13-3 22-15 27Z"
          fill="currentColor"
          opacity=".65"
        />
        <path
          d="M25 4c-14 0-23 13-23 25s9 26 23 27c14-1 23-15 23-27"
          stroke="currentColor"
          strokeWidth=".7"
        />
        <circle cx="25" cy="5" r="2" fill="currentColor" />
      </svg>
      <span className="brand-words">
        <span>ESPAÇO</span>
        <strong>MARTINS</strong>
        <small>Terapias Corporais</small>
      </span>
    </span>
  );
}
