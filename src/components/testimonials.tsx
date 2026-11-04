"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export type Testimonial = {
  name: string;
  quote: string;
  context?: string;
  authorized: true;
};
/** Only real, authorized reviews. Empty data hides the entire section. */
export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (!items.length) return null;
  const active = items[index % items.length];
  return (
    <section
      className="testimonials container section-space"
      aria-labelledby="testimonials-title"
      aria-roledescription="carrossel"
    >
      <span className="eyebrow">
        <span className="tiny-line" /> HISTÓRIAS COMPARTILHADAS
      </span>
      <h2 id="testimonials-title">
        Palavras de quem
        <br />
        <em>viveu o cuidado.</em>
      </h2>
      <div className="testimonial-active" aria-live="polite" aria-atomic="true">
        <blockquote>“{active.quote}”</blockquote>
        <span>{active.name}</span>
        {active.context && <small>{active.context}</small>}
      </div>
      {items.length > 1 && (
        <div className="testimonial-controls">
          <button
            className="icon-button"
            aria-label="Depoimento anterior"
            onClick={() => setIndex((index - 1 + items.length) % items.length)}
          >
            <ChevronLeft size={21} />
          </button>
          <span>
            {index + 1} / {items.length}
          </span>
          <button
            className="icon-button"
            aria-label="Próximo depoimento"
            onClick={() => setIndex((index + 1) % items.length)}
          >
            <ChevronRight size={21} />
          </button>
        </div>
      )}
    </section>
  );
}
