"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  MapPin,
  Menu,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MessageCircle,
  Hand,
  Check,
  Expand,
} from "lucide-react";
import { Brand } from "./brand";
import { TherapyArt } from "./therapy-art";
import { Testimonials } from "./testimonials";
import {
  authorizedTestimonials,
  verifiedProfile,
  therapyPhotos,
  therapyIllustrations,
} from "@/lib/verified-content";
import {
  business,
  whatsapp,
  therapies,
  gallery,
  faqs,
  experience,
  type Therapy,
} from "@/lib/content";

const nav = [
  ["O espaço", "espaco"],
  ["Terapias", "terapias"],
  ["A experiência", "experiencia"],
  ["Localização", "localizacao"],
];

function Booking({
  children = "Agendar meu atendimento",
  therapy,
  className = "",
  light = false,
}: {
  children?: ReactNode;
  therapy?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-gold" : "button-olive"} ${className}`}
      href={whatsapp(therapy)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

function Modal({
  children,
  onClose,
  titleId,
  className = "",
  onKeyDown,
}: {
  children: ReactNode;
  onClose: () => void;
  titleId: string;
  className?: string;
  onKeyDown?: (key: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => onKeyDown?.(event.key)}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="modal-close icon-button"
        onClick={onClose}
        aria-label="Fechar"
        title="Fechar"
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}

export default function Site() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Therapy | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState("Todas");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [bookingInView, setBookingInView] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 50);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const visibleActions = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleActions.add(entry.target);
          else visibleActions.delete(entry.target);
        }
        setBookingInView(visibleActions.size > 0);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0.1 },
    );
    document
      .querySelectorAll(
        '.button[href^="https://wa.me"], .fascia-actions .button',
      )
      .forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-15% 0px -50% 0px", threshold: [0, 0.1, 0.5] });
    nav.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  const changeImage = (direction: number) =>
    setLightbox((index) =>
      index === null
        ? null
        : (index + direction + gallery.length) % gallery.length,
    );
  const filtered = therapies.filter(
    (t) =>
      !["miofascial", "biomecanica"].includes(t.id) &&
      (filter === "Todas" ||
        (filter === "Relaxamento"
          ? ["relaxante", "reflexologia", "pes"].includes(t.id)
          : filter === "Movimento"
            ? t.id === "pernas"
            : ["instrumental", "shiatsu", "ventosaterapia"].includes(t.id))),
  );

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="intro" aria-hidden="true">
        <Brand compact dark showEmblem={false} />
        <span>Cuidar de você é o que nos move!</span>
        <i />
      </div>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-inner">
          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com Espaço Martins pelo WhatsApp"
            className="brand-link"
          >
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="header-book"
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar um momento <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={25} />
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-image">
            <Image
              src="/images/sala-sem-logotipo.png"
              alt="Sala de atendimento do Espaço Martins, com maca e iluminação aconchegante"
              fill
              preload
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-content container">
            <div className="eyebrow hero-location">
              <span className="tiny-line" />
              <MapPin size={13} /> VILA MARIANA · SÃO PAULO
            </div>
            <h1 id="hero-title">
              Cuidar de <em>você</em>
              <br />é o que nos
              <br />
              <em>move.</em>
            </h1>
            <p>
              Conheça um espaço dedicado às terapias corporais,
              <br className="desktop-break" /> ao cuidado individualizado e ao
              seu bem-estar,
              <br className="desktop-break" /> no coração da Vila Mariana.
            </p>
            <div className="hero-actions">
              <Booking light />
              <a className="text-link light-link" href="#terapias">
                Conhecer nossas terapias <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-bottom container">
            <a href="#espaco" className="scroll-cue">
              <span className="scroll-circle">
                <ArrowDown size={17} />
              </span>
              <span>PERMITA-SE DESACELERAR</span>
            </a>
            <span className="photo-note">
              <span /> Um espaço real. Um cuidado só seu.
            </span>
            <span className="hero-number">
              01 <i /> 03
            </span>
          </div>
        </section>

        <div className="values-bar">
          <span>
            <Check size={16} /> Cuidado individualizado
          </span>
          <i />
          <span>
            <Hand size={17} /> Terapias corporais
          </span>
          <i />
          <span>
            <MapPin size={16} /> No coração da Vila Mariana
          </span>
        </div>

        <section className="profile-intro section-space container" id="martins" aria-labelledby="profile-title">
          <figure className="profile-photo reveal">
            <Image src={verifiedProfile.portrait!.src} alt={verifiedProfile.portrait!.alt} width={960} height={1280} sizes="(max-width: 760px) 90vw, 42vw" />
          </figure>
          <div className="profile-copy reveal">
            <h2 id="profile-title">{verifiedProfile.professionalName}</h2>
            {verifiedProfile.biography?.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {verifiedProfile.institutionalText && <p>{verifiedProfile.institutionalText}</p>}
            {verifiedProfile.qualifications.length > 0 && <ul>{verifiedProfile.qualifications.map(item => <li key={item}>{item}</li>)}</ul>}
            {verifiedProfile.registration && <p>{verifiedProfile.registration}</p>}
            {[...verifiedProfile.events, ...verifiedProfile.educationalResources].map(item => <a className="text-link" key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<ArrowUpRight size={16} /></a>)}
            <a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">Converse com Martins <ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section
          className="about section-space container"
          id="espaco"
          aria-labelledby="about-title"
        >
          <div className="about-visual reveal">
            <div className="image-frame">
              <Image
                src="/images/recepcao.png"
                alt={gallery[1].alt}
                fill
                sizes="(max-width: 760px) 90vw, 42vw"
                quality={75}
              />
            </div>
            <div className="about-seal">
              <Hand size={26} strokeWidth={1.5} />
              <span>
                CUIDADO
                <br />
                INDIVIDUAL
              </span>
            </div>
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow">
              <span className="tiny-line" /> O ESSENCIAL É VOCÊ
            </span>
            <h2 id="about-title">Um espaço pensado para cuidar de você.</h2>
            <p>
              Entre o ritmo da cidade e o seu próprio tempo, existe um lugar
              para fazer uma pausa.
            </p>
            <p>
              No Espaço Martins, o cuidado começa na escuta. Um ambiente
              acolhedor, dedicado às terapias corporais e ao atendimento
              individualizado, onde cada detalhe convida ao bem-estar.
            </p>
            <div className="professional">
              <span className="professional-mark">M.</span>
              <div>
                <h3>Martins</h3>
                <span>Espaço Martins · Terapias Corporais</span>
              </div>
              <Hand size={24} strokeWidth={1.5} />
            </div>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Vamos conversar sobre o seu cuidado <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section
          className="therapies section-space"
          id="terapias"
          aria-labelledby="therapies-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">
                  <span className="tiny-line" /> TERAPIAS CORPORAIS
                </span>
                <h2 id="therapies-title">
                  Diferentes caminhos.
                  <br />
                  <em>O mesmo cuidado.</em>
                </h2>
              </div>
              <p>
                Seu corpo tem uma história.
                <br />
                Conheça possibilidades de cuidado
                <br />
                que respeitam o seu momento.
              </p>
            </div>
            <div className="therapy-toolbar">
              <div
                className="filters"
                role="group"
                aria-label="Filtrar terapias"
              >
                {["Todas", "Relaxamento", "Movimento", "Complementares"].map(
                  (label) => (
                    <button
                      key={label}
                      aria-pressed={filter === label}
                      onClick={() => setFilter(label)}
                    >
                      {label}
                      {filter === label && <span />}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="therapy-grid" aria-live="polite">
              {filtered.map((therapy) => (
                <article
                  className={`therapy-card therapy-${therapy.id}`}
                  key={therapy.id}
                >
                  <button
                    className="therapy-visual"
                    onClick={() => setSelected(therapy)}
                    aria-label={`Saiba mais sobre ${therapy.name}`}
                  >
                    <TherapyArt theme={therapy.theme} />
                    <span className="art-expand">
                      <Plus size={21} />
                    </span>
                  </button>
                  <div className="therapy-copy">
                    <span className="eyebrow">{therapy.category}</span>
                    <h3>{therapy.name}</h3>
                    <p>{therapy.description}</p>
                    <div className="therapy-actions">
                      <button
                        className="text-link"
                        onClick={() => setSelected(therapy)}
                      >
                        Saiba mais <Plus size={14} />
                      </button>
                      <a
                        href={whatsapp(therapy.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Agendar pelo WhatsApp: ${therapy.name}`}
                      >
                        <MessageCircle size={15} /> Agendar pelo WhatsApp{" "}
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fascia"
          id="liberacao-miofascial"
          aria-labelledby="fascia-title"
        >
          <div className="fascia-inner container">
            <div className="fascia-art">
              <TherapyArt theme="fascia" />
            </div>
            <div className="fascia-copy">
              <span className="eyebrow">
                <span className="tiny-line" /> UM OLHAR PARA O MOVIMENTO
              </span>
              <h2 id="fascia-title">
                Movimento, cuidado e atenção ao seu corpo.
              </h2>
              <span className="fascia-subtitle">Liberação miofascial</span>
              <p>
                Uma abordagem manual voltada às estruturas musculares e
                fasciais, respeitando as necessidades individuais e os objetivos
                de cada atendimento.
              </p>
              <div className="fascia-actions">
                <Booking therapy="a liberação miofascial">
                  Agendar atendimento
                </Booking>
                <button
                  className="button button-outline"
                  onClick={() => setSelected(therapies.find(therapy => therapy.id === "miofascial")!)}
                >
                  Conhecer a técnica <Plus size={16} />
                </button>
              </div>
              <span className="fascia-caption">
                Atendimento individualizado para homens e mulheres.
              </span>
            </div>
          </div>
        </section>

        <section
          className="body-section section-space container"
          aria-labelledby="body-title"
        >
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">
                <span className="tiny-line" /> CADA CORPO, UMA HISTÓRIA
              </span>
              <h2 id="body-title">
                Atenção individualizada
                <br />
                às necessidades <em>do seu corpo.</em>
              </h2>
            </div>
            <p>
              A escolha do atendimento passa pela escuta das suas necessidades e
              pelos serviços efetivamente oferecidos.
            </p>
          </div>
          <div className="body-regions">
            {[
              { title: "Costas", photo: therapyPhotos.relax },
              { title: "Ombros", photo: { src: "/images/atendimento-massagem.jpg", alt: "Martins realizando terapia manual nos ombros, com cliente de touca e parte inferior do corpo coberta por toalha limpa" } },
              { title: "Pernas e joelhos", photo: therapyPhotos.legs },
            ].map(({ title, photo }) => (
              <article className="body-region reveal" key={title}>
                <div className="body-region-photo">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 30vw" quality={90} />
                </div>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
          <div className="biomechanics">
            <div className="biomechanics-art">
              <TherapyArt theme="mobility" />
            </div>
            <div>
              <span className="eyebrow">CONVERSE COM O PROFISSIONAL</span>
              <h3>Ajustes biomecânicos ortopédicos</h3>
              <p>
                Para conhecer as técnicas realizadas e sua adequação às suas
                necessidades, converse diretamente com Martins.
              </p>
              <button
                className="text-link"
                onClick={() => setSelected(therapies.find(therapy => therapy.id === "biomecanica")!)}
              >
                Saiba mais <Plus size={14} />
              </button>
            </div>
            <Booking therapy="os ajustes biomecânicos ortopédicos">
              Consultar atendimento
            </Booking>
          </div>
          <p className="care-note">
            Os atendimentos não substituem diagnóstico médico ou tratamento
            especializado. A adequação de cada técnica deve ser conversada com o
            profissional.
          </p>
        </section>

        <section
          className="experience section-space"
          id="experiencia"
          aria-labelledby="experience-title"
        >
          <div className="container">
            <div className="experience-top reveal">
              <span className="eyebrow">
                <span className="tiny-line" /> DO PRIMEIRO OLÁ AO SEU MOMENTO
              </span>
              <h2 id="experience-title">
                O cuidado começa
                <br />
                <em>antes do toque.</em>
              </h2>
              <p>Uma experiência feita de escuta, presença e atenção.</p>
            </div>
            <ol className="timeline">
              {experience.map(([title, description], i) => (
                <li className="reveal" key={title}>
                  <span className="step-number">
                    0{i + 1}
                    <span />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <div className="experience-cta">
              <span>Seu próximo passo pode ser uma pausa.</span>
              <Booking light>Vamos agendar seu momento?</Booking>
            </div>
          </div>
        </section>

        <section
          className="gallery-section section-space container"
          id="galeria"
          aria-labelledby="gallery-title"
        >
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">
                <span className="tiny-line" /> CONHEÇA NOSSO ESPAÇO
              </span>
              <h2 id="gallery-title">
                Aconchego que se vê.
                <br />
                <em>Cuidado que se sente.</em>
              </h2>
            </div>
            <p>
              Três olhares para um lugar
              <br />
              feito para receber você.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map((photo, index) => (
              <button
                className={`gallery-item gallery-item-${index} reveal`}
                key={photo.src}
                onClick={() => setLightbox(index)}
                aria-label={`Ampliar imagem: ${photo.subtitle}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 760px) 90vw, 50vw"
                      : "(max-width: 760px) 90vw, 25vw"
                  }
                  quality={75}
                />
                <span className="gallery-expand">
                  <Expand size={18} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="commitment container reveal"
          aria-labelledby="commitment-title"
        >
          <div className="commitment-icon">
            <Brand compact />
          </div>
          <div>
            <span className="eyebrow">NOSSO COMPROMISSO</span>
            <h2 id="commitment-title">
              Confiança se constrói
              <br />
              <em>com cuidado e transparência.</em>
            </h2>
            <p>
              Um atendimento que respeita sua individualidade. Converse com
              Martins sobre sua abordagem, as técnicas oferecidas e as
              informações profissionais antes de escolher seu atendimento.
            </p>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Conheça quem cuida de você <ArrowUpRight size={17} />
            </a>
          </div>
          <ul>
            <li>
              <Check size={17} /> Escuta atenta
            </li>
            <li>
              <Check size={17} /> Respeito ao seu momento
            </li>
            <li>
              <Check size={17} /> Informações claras
            </li>
          </ul>
        </section>

        <Testimonials items={authorizedTestimonials} />
        <section
          className="faq-section section-space container"
          id="duvidas"
          aria-labelledby="faq-title"
        >
          <div className="faq-intro reveal">
            <span className="eyebrow">
              <span className="tiny-line" /> ANTES DA SUA VISITA
            </span>
            <h2 id="faq-title">
              Podemos
              <br />
              <em>te ajudar?</em>
            </h2>
            <p>
              Cuidar também é deixar
              <br />
              você à vontade para perguntar.
            </p>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Converse pelo WhatsApp <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span>
                    <small>0{index + 1}</small>
                    {question}
                  </span>
                  <Plus className="faq-plus" size={18} />
                  <Minus className="faq-minus" size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="location-section"
          id="localizacao"
          aria-labelledby="location-title"
        >
          <div className="location-info">
            <span className="eyebrow">
              <span className="tiny-line" /> UM RESPIRO NA VILA MARIANA
            </span>
            <h2 id="location-title">
              Seu momento
              <br />
              <em>tem endereço.</em>
            </h2>
            <p>
              Esperamos você em um espaço
              <br />
              de acolhimento na Vila Mariana.
            </p>
            <address>
              <MapPin size={21} strokeWidth={1.4} />
              <span>
                {business.address}
                <br />
                {business.neighborhood}
              </span>
            </address>
            <a
              href={business.maps}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no Google Maps <ArrowUpRight size={18} />
            </a>
            <div className="location-book">
              <Booking>Agendar atendimento</Booking>
            </div>
          </div>
          <div className="map-panel">
            {mapLoaded ? (
              <iframe
                title="Mapa: Espaço Martins na Vila Mariana"
                src={`https://www.google.com/maps?q=${encodeURIComponent("Rua Domingos de Morais, 1061, Vila Mariana, São Paulo")}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <>
                <MapIllustration />
                <div className="map-pin">
                  <MapPin size={25} strokeWidth={1.5} />
                  <span>ESPAÇO MARTINS</span>
                  <small>Vila Mariana · São Paulo</small>
                </div>
                <button className="load-map" onClick={() => setMapLoaded(true)}>
                  Explorar mapa interativo <ArrowUpRight size={16} />
                </button>
                <span className="map-disclaimer">
                  Representação ilustrativa · Ao abrir, o mapa carrega pelo
                  Google.
                </span>
              </>
            )}
          </div>
        </section>

        <section className="final-cta">
          <span className="eyebrow">SEU BEM-ESTAR MERECE ESSE TEMPO</span>
          <h2>
            Que tal começar
            <br />
            <em>por você?</em>
          </h2>
          <Booking light>Quero agendar meu momento</Booking>
          <span className="final-signature">
            Cuidar de você é o que nos move!
          </span>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <a href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Conversar com Espaço Martins pelo WhatsApp">
            <Brand dark />
          </a>
          <div className="footer-contact">
            <span className="eyebrow">VENHA NOS CONHECER</span>
            <p>
              {business.address}
              <br />
              {business.neighborhood}
            </p>
            <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
              {business.phoneLabel} <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-nav">
            <span className="eyebrow">EXPLORE</span>
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-social">
            <span className="eyebrow">ACOMPANHE O ESPAÇO</span>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={19} /> @espacomartins.terapeuta{" "}
              <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() =>
                document.getElementById("privacy-panel")?.showPopover()
              }
            >
              Privacidade e dados
            </button>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>
            © {new Date().getFullYear()} Espaço Martins. Todos os direitos
            reservados.
          </span>
          <a
            href="https://wa.me/5519992483529"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desenvolvido por Webmax — falar com Flávia pelo WhatsApp"
          >
            Desenvolvido por Webmax
          </a>
        </div>
      </footer>
      <a
        className={`floating-whatsapp ${scrolled && !bookingInView ? "floating-visible" : ""}`}
        tabIndex={scrolled && !bookingInView ? 0 : -1}
        aria-hidden={!scrolled || bookingInView}
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com o Espaço Martins pelo WhatsApp"
      >
        <MessageCircle size={25} strokeWidth={1.6} />
        <span>Vamos conversar?</span>
      </a>

      <div className="privacy-panel" popover="auto" id="privacy-panel">
        <button
          className="icon-button privacy-close"
          aria-label="Fechar privacidade"
          popoverTarget="privacy-panel"
          popoverTargetAction="hide"
        >
          <X size={22} />
        </button>
        <h2>Privacidade e dados</h2>
        <p>
          Este site não possui formulário de cadastro nem utiliza cookies de
          publicidade ou ferramentas de análise instaladas pelo projeto.
        </p>
        <p>
          O mapa do Google é carregado somente quando você o solicita. Links
          para WhatsApp, Instagram e Google Maps levam a serviços externos,
          sujeitos às políticas de privacidade dessas plataformas.
        </p>
        <p>
          Para falar sobre o tratamento de informações compartilhadas durante o
          agendamento, entre em contato pelo WhatsApp {business.phoneLabel}.
        </p>
      </div>

      {menuOpen && (
        <Modal
          onClose={() => setMenuOpen(false)}
          titleId="menu-title"
          className="mobile-menu"
        >
          <Brand />
          <h2 id="menu-title" className="sr-only">
            Navegação
          </h2>
          <nav id="mobile-navigation" aria-label="Navegação mobile">
            {nav.map(([label, id], index) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={20} />
              </a>
            ))}
            <a href="#galeria" onClick={() => setMenuOpen(false)}>
              <span>05</span>Galeria
              <ArrowUpRight size={20} />
            </a>
          </nav>
          <Booking />
          <p>Vila Mariana · São Paulo</p>
        </Modal>
      )}
      {selected && (
        <Modal
          onClose={() => setSelected(null)}
          titleId="therapy-dialog-title"
          className="therapy-modal"
        >
          <TherapyArt theme={selected.theme} />
          <div className="therapy-modal-content">
            <span className="eyebrow">{selected.category}</span>
            <h2 id="therapy-dialog-title">{selected.name}</h2>
            <p>{selected.detail}</p>
            <p className="modal-consult">
              Consulte disponibilidade, valores e duração diretamente com o
              profissional.
            </p>
            <Booking therapy={selected.message}>Agendar pelo WhatsApp</Booking>
            {!therapyPhotos[selected.theme] && <span className="art-note">
              {therapyIllustrations[selected.theme] ? "Imagem ilustrativa gerada por IA. Não representa Martins ou um atendimento real do Espaço Martins." : "Foto do ambiente. Fotografia de atendimento desta técnica ainda não fornecida."}
            </span>}
          </div>
        </Modal>
      )}
      {lightbox !== null && (
        <Modal
          onClose={() => setLightbox(null)}
          titleId="gallery-dialog-title"
          className="lightbox"
          onKeyDown={(key) => {
            if (key === "ArrowRight") changeImage(1);
            if (key === "ArrowLeft") changeImage(-1);
          }}
        >
          <div className="lightbox-image">
            <Image
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              fill
              sizes="95vw"
              quality={95}
            />
          </div>
          <div className="lightbox-bottom">
            <div>
              <span>0{lightbox + 1} / 03</span>
              <h2 id="gallery-dialog-title" className="sr-only">{gallery[lightbox].subtitle}</h2>
            </div>
            <div className="lightbox-controls">
              <button
                className="icon-button"
                aria-label="Imagem anterior"
                onClick={() => changeImage(-1)}
              >
                <ChevronLeft size={23} />
              </button>
              <button
                className="icon-button"
                aria-label="Próxima imagem"
                onClick={() => changeImage(1)}
              >
                <ChevronRight size={23} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function MapIllustration() {
  return (
    <svg
      viewBox="0 0 750 650"
      preserveAspectRatio="xMidYMid slice"
      className="map-illustration"
      aria-hidden="true"
    >
      <rect width="750" height="650" fill="#e7e7db" />
      <g fill="#cdd5bf" opacity=".5">
        <path d="m0 120 130 50-45 107L0 245ZM546 0l77 170 127-38V0ZM568 425l182 47v178H645Z" />
      </g>
      <g fill="none" stroke="#f8f6ee" strokeWidth="17">
        <path d="M-20 130 780 420M-20 340l800 260M78-40l203 740M357-40l212 740M636-40 394 700M-20 575 700-20M-20 45l800 251" />
      </g>
      <g fill="none" stroke="#d3d3c4" strokeWidth="2">
        <path d="M-20 130 780 420M-20 340l800 260M78-40l203 740M357-40l212 740M636-40 394 700M-20 575 700-20M-20 45l800 251" />
      </g>
      <path d="M220-50 455 700" stroke="#c1cbb3" strokeWidth="27" />
      <path d="M220-50 455 700" stroke="#f8f6ee" strokeWidth="20" />
      <g fontSize="10" fill="#838977" fontFamily="sans-serif" letterSpacing="2">
        <text x="90" y="478" transform="rotate(-40 90 478)">
          VILA MARIANA
        </text>
        <text x="272" y="90" transform="rotate(73 272 90)">
          R. DOMINGOS DE MORAIS
        </text>
        <text x="480" y="565">
          SÃO PAULO
        </text>
      </g>
    </svg>
  );
}
