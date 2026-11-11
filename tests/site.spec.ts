import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("conteúdo, imagens, links de agendamento e SEO local", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cuidar de vocêé o que nosmove.",
  );
  await expect(page).toHaveTitle(/Terapias Corporais na Vila Mariana/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  const json = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(json.address.streetAddress).toContain("conjunto 83");
  expect(json.telephone).toBe("+5511959389897");
  expect(json).not.toHaveProperty("aggregateRating");
  const links = await page
    .locator('a[href^="https://wa.me/5511959389897"]')
    .evaluateAll((elements) =>
      elements.map((el) => (el as HTMLAnchorElement).href),
    );
  expect(links.length).toBeGreaterThan(12);
  for (const href of links) {
    const url = new URL(href);
    expect(url.pathname).toBe("/5511959389897");
    expect(url.searchParams.get("text")).toContain(
      "Conheci o Espaço Martins pelo site",
    );
  }
  const relaxingLink = page.getByRole("link", {
    name: "Agendar pelo WhatsApp: Massagem relaxante",
    exact: true,
  });
  expect(
    new URL((await relaxingLink.getAttribute("href"))!).searchParams.get(
      "text",
    ),
  ).toContain("a massagem relaxante");
  await page.locator("#galeria").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("#galeria img")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((elements) => elements.map((el) => el.getAttribute("href")))) {
    expect(await page.locator(`[id="${href!.slice(1)}"]`).count(), href!).toBe(
      1,
    );
  }
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Allow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("urlset");
  expect(errors).toEqual([]);
});

test("filtros, detalhes, FAQ, privacidade e mapa sob demanda", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Movimento", exact: true }).click();
  await expect(page.locator(".therapy-card")).toHaveCount(1);
  await expect(page.locator(".therapy-card h3")).toHaveText(["Massagem desportiva"]);
  await page.getByRole("button", { name: "Relaxamento", exact: true }).click();
  await expect(page.locator(".therapy-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Todas", exact: true }).click();
  await expect(page.locator(".therapy-card")).toHaveCount(7);
  await page
    .getByRole("button", {
      name: "Saiba mais sobre Massagem relaxante",
      exact: true,
    })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Massagem relaxante");
  await expect(
    dialog.getByRole("link", { name: "Agendar pelo WhatsApp" }),
  ).toHaveAttribute("href", /massagem%20relaxante/);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Saiba mais sobre Massagem relaxante",
      exact: true,
    }),
  ).toBeFocused();
  await expect(page.locator(".biomechanics, .body-section")).toHaveCount(0);
  await expect(page.getByText("Ajustes biomecânicos ortopédicos", { exact: true })).toHaveCount(0);
  const question = page
    .locator("summary")
    .filter({ hasText: "Qual é a duração de uma sessão?" });
  await question.click();
  await expect(
    page.getByText(
      "A duração deve ser confirmada diretamente com o profissional",
      { exact: false },
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Privacidade e dados", exact: true })
    .click();
  await expect(page.locator("#privacy-panel")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#privacy-panel")).not.toBeVisible();
  expect(await page.locator("iframe").count()).toBe(0);
  await page.route("https://www.google.com/maps**", (route) =>
    route.fulfill({
      body: "<html lang='pt-BR'><title>Mapa de teste</title><body>Mapa</body></html>",
      contentType: "text/html",
    }),
  );
  await page.getByRole("button", { name: "Explorar mapa interativo" }).click();
  await expect(
    page.getByTitle("Mapa: Espaço Martins na Vila Mariana"),
  ).toBeVisible();
});

test("galeria: ampliação, setas, fechamento e foco", async ({ page }) => {
  await page.goto("/");
  const opener = page.getByRole("button", {
    name: "Ampliar imagem: Sala de terapias",
    exact: true,
  });
  await opener.click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Sala de terapias",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Recepção",
  );
  await page
    .getByRole("button", { name: "Próxima imagem", exact: true })
    .click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Ambiente de consulta",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Recepção",
  );
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("liberação miofascial: conteúdo, ações e proporções do redesign", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#liberacao-miofascial");
  await expect(section.locator(".therapy-art__caption")).toHaveCount(0);
  await expect(section.locator(".fascia-art img")).toHaveAttribute("src", /sala-sem-logotipo/);
  await expect(section.locator(".fascia-copy > p")).toHaveText("A liberação instrumental é uma técnica terapêutica utilizada por terapeutas e profissionais de saúde para tratar restrições, aderência ou tensões no tecido miofascial (a fáscia que envolve os músculos).");

  await expect(section.getByRole("heading")).toHaveText(
    "Movimento, cuidado e atenção ao seu corpo.",
  );
  await expect(
    section.getByText("Liberação miofascial", { exact: true }),
  ).toBeVisible();
  await expect(
    section.getByRole("link", { name: "Agendar atendimento", exact: true }),
  ).toHaveAttribute("href", /libera%C3%A7%C3%A3o%20miofascial/);
  await section.getByRole("button", { name: "Conhecer a técnica" }).click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Liberação miofascial",
  );
  await page.keyboard.press("Escape");
  for (const width of [320, 375, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await section.scrollIntoViewIfNeeded();
    await section
      .getByRole("link", { name: "Agendar atendimento", exact: true })
      .scrollIntoViewIfNeeded();
    await expect(page.locator(".floating-whatsapp")).not.toHaveClass(
      /floating-visible/,
    );
    const layout = await section.evaluate((el) => {
      const photo = el.querySelector(".fascia-art")!.getBoundingClientRect();
      const copy = el.querySelector(".fascia-copy")!.getBoundingClientRect();
      const buttons = Array.from(
        el.querySelectorAll(".fascia-actions .button"),
      ).map((button) => {
        const rect = button.getBoundingClientRect();
        return { height: rect.height, left: rect.left, right: rect.right };
      });
      return {
        photo: {
          top: photo.top,
          bottom: photo.bottom,
          width: photo.width,
          height: photo.height,
        },
        copy: { top: copy.top, bottom: copy.bottom, width: copy.width },
        buttons,
        headingFont: getComputedStyle(el.querySelector("h2")!).fontFamily,
      };
    });
    expect(layout.headingFont).toContain("Manrope");
    for (const button of layout.buttons)
      expect(button.height).toBeGreaterThanOrEqual(51);
    if (width > 760) {
      expect(Math.abs(layout.photo.width - layout.copy.width)).toBeLessThan(2);
      expect(Math.abs(layout.photo.bottom - layout.copy.bottom)).toBeLessThan(
        2,
      );
    } else {
      expect(layout.copy.top).toBeGreaterThanOrEqual(layout.photo.bottom - 1);
      expect(layout.photo.height).toBeLessThan(350);
    }
  }
});

for (const width of [320, 360, 375, 390, 430, 768, 820, 1024, 1440, 1920]) {
  test(`layout sem overflow e navegação em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(overflow.scroll).toBeLessThanOrEqual(overflow.client);
    const outside = await page
      .locator("h1,h2,h3,.button,summary")
      .evaluateAll((elements) =>
        elements
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            return (
              rect.width > 0 &&
              (rect.left < -1 ||
                rect.right > document.documentElement.clientWidth + 1)
            );
          })
          .map((el) => el.textContent),
      );
    expect(outside).toEqual([]);
    if (width <= 760) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page
        .getByRole("navigation", { name: "Navegação mobile" })
        .getByRole("link", { name: /Terapias/ })
        .click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(page).toHaveURL(/#terapias$/);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
}

test("acessibilidade WCAG automatizada: desktop, detalhes e mobile", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const desktop = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(desktop.violations).toEqual([]);
  await page
    .getByRole("button", { name: "Saiba mais sobre Massagem desportiva", exact: true })
    .click();
  const modal = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(modal.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  const mobilePage = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(mobilePage.violations).toEqual([]);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const mobile = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(mobile.violations).toEqual([]);
});

test("abertura dura três segundos, sem botão de pular, e respeita movimento reduzido", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".intro")).toBeVisible();
  expect(await page.locator(".intro").evaluate(el => { const style = getComputedStyle(el); return parseFloat(style.animationDelay) + parseFloat(style.animationDuration); })).toBe(3);
  await expect(page.getByRole("button", { name: /pular introdução/i })).toHaveCount(0);
  await expect(page.locator(".intro")).toBeHidden({ timeout: 4500 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".intro")).toBeHidden();
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});


test("apresentação, fotografias oficiais e marca com WhatsApp", async ({ page }) => {
  await page.goto("/");
  const profile = page.locator("#martins");
  await expect(profile.getByRole("heading", { name: "Martins", exact: true })).toBeVisible();
  await expect(profile.locator(".profile-copy > p")).toHaveText([
    "Com um olhar atento e humanizado para o bem-estar, Martins atua como terapeuta integrativo e massoterapeuta, oferecendo cuidados que buscam promover o equilíbrio corporal, o relaxamento e a qualidade de vida.",
    "Por meio de técnicas de liberação Miofacial manual e instrumental seu trabalho é voltado ao alívio de tensões musculares, a dores, à melhora da mobilidade, ao relaxamento e à conexão entre corpo e mente.",
  ]);
  await expect(profile.locator(".profile-pending")).toHaveCount(0);
  await expect(profile.getByText(/será publicada|em breve|provisóri/)).toHaveCount(0);
  expect(await page.locator("main > section").evaluateAll(sections => sections.slice(0, 3).map(section => section.id))).toEqual(["inicio", "martins", "espaco"]);
  await expect(page.locator(".header .brand-link")).toHaveAttribute("href", /^https:\/\/wa.me\/5511959389897/);
  await expect(page.locator('image[href*="terapias-ilustrativas"]')).toHaveCount(0);
  await expect(profile.locator("img")).toHaveCount(1);
  await expect(profile.locator("img")).toHaveAttribute("alt", "Martins sentado à mesa do espaço, usando camisa polo marrom");
  await expect(page.locator('img[src*="martins-coluna"]')).toHaveCount(0);
  await expect(page.getByText("CONHEÇA O MARTINS", { exact: true })).toHaveCount(0);
  await expect(profile.locator("figcaption")).toHaveCount(0);
  for (const width of [360, 390, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await profile.scrollIntoViewIfNeeded();
    const bounds = await profile.locator(".profile-photo").boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
  }
  await page.locator("#terapias").scrollIntoViewIfNeeded();
  await expect(page.locator("#terapias .therapy-photo")).toHaveCount(7);
  await expect.poll(() => page.locator("#terapias .therapy-photo").evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
});


test("sete cards com fotografias sem legendas e grade responsiva", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const cards = page.locator("#terapias .therapy-card");
  await expect(cards).toHaveCount(7);
  await expect(cards.locator(".therapy-tag, .therapy-art__caption")).toHaveCount(0);
  await expect(page.locator(".gallery-caption, .gallery-footnote")).toHaveCount(0);
  for (const text of ["Para desacelerar", "Atenção às pernas", "Atendimento no Espaço Martins", "Uma pausa para os pés", "Cuidado atento"]) {
    await expect(page.getByText(text, { exact: true })).toHaveCount(0);
  }
  await cards.first().getByRole("button", { name: "Saiba mais sobre Massagem relaxante" }).click();
  await expect(page.getByRole("dialog").locator(".therapy-art__caption, .art-note")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(cards.locator("h3")).toHaveText(["Massagem relaxante", "Massagem desportiva", "Reflexologia podal", "Técnica de liberação Miofacial com instrumento na cervical", "Shiatsu", "Ventosaterapia", "Pedras quentes"]);
  await expect(page.getByText("Mobilização dos braços", { exact: true })).toHaveCount(0);
  const shiatsu = page.locator(".therapy-shiatsu");
  await shiatsu.getByRole("button", { name: "Saiba mais sobre Shiatsu", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "Shiatsu", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").locator(".therapy-modal-content > p").first()).toHaveText("É uma técnica de massagem terapêutica de origem japonesa cujo nome significa literalmente “pressão com os dedos” para reequilibrar o fluxo de energia.");
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", /shiatsu.png/);
  await expect(page.getByRole("dialog").getByRole("link", { name: "Agendar pelo WhatsApp" })).toHaveAttribute("href", /Shiatsu/);
  await page.keyboard.press("Escape");
  await page.locator(".therapy-ventosaterapia").getByRole("button", { name: "Saiba mais sobre Ventosaterapia", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "Ventosaterapia", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").locator(".therapy-modal-content > p").first()).toHaveText("A ventosaterapia serve principalmente para aliviar dores musculares, reduzir tensões e promover o relaxamento físico e mental.");
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", /ventosaterapia.jpeg/);
  await expect(page.getByRole("dialog").getByRole("link", { name: "Agendar pelo WhatsApp" })).toHaveAttribute("href", /ventosaterapia/);
  await page.keyboard.press("Escape");
  await expect(page.getByText("Massagem nos pés", { exact: true })).toHaveCount(0);
  await page.locator(".therapy-pedras-quentes").getByRole("button", { name: "Saiba mais sobre Pedras quentes", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "Pedras quentes", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").locator(".therapy-modal-content > p").first()).toHaveText("Pedras quentes são pedras vulcânicas de basalto, que retém calor por muito tempo, sendo utilizadas principalmente na massagem, combinando termoterapia e massoterapia.");
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", /pedras-quentes.jpeg/);
  await page.keyboard.press("Escape");
  const sources = await cards.locator("img").evaluateAll(images => images.map(img => img.getAttribute("src")));
  expect(new Set(sources).size).toBe(7);
  expect(sources.every(src => src?.includes("martins-") || src?.includes("shiatsu.png") || src?.includes("ventosaterapia.jpeg") || src?.includes("pedras-quentes.jpeg"))).toBe(true);
  await expect(page.getByText("O cuidado em foco.", { exact: true })).toHaveCount(0);
  await expect(page.locator("#terapias .therapy-art--venue")).toHaveCount(0);
  await expect(page.locator("#terapias .therapy-art--illustration")).toHaveCount(0);
  await expect(page.locator("#terapias .therapy-art--treatment")).toHaveCount(7);
  for (const [width, columns] of [[390, 1], [820, 2], [1440, 3]]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const card of await cards.filter({ has: page.locator("img") }).all()) {
      await card.scrollIntoViewIfNeeded();
      await expect.poll(() => card.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      await expect(card.locator(".therapy-actions a")).toHaveAttribute("href", /^https:\/\/wa.me\//);
    }
    expect(await page.locator(".therapy-grid").evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length)).toBe(columns);
    const sizes = await cards.locator(".therapy-art").evaluateAll(items => items.map(el => ({ w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height })));
    expect(Math.max(...sizes.map(s => s.h)) - Math.min(...sizes.map(s => s.h))).toBeLessThan(2);
  }
});

test("fotos uniformes e conteúdo centralizado no celular", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 430]) {
    await page.setViewportSize({ width, height: 900 });
    for (const selector of [".hero-content", ".profile-copy", ".about-copy", ".therapy-copy", ".experience-top", ".faq-intro", ".location-info", ".footer"]) {
      expect(await page.locator(selector).first().evaluate(el => getComputedStyle(el).textAlign)).toBe("center");
    }
    const photo = page.locator(".profile-photo");
    const box = await photo.boundingBox();
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(Math.abs(box!.x + box!.width / 2 - clientWidth / 2)).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const photos = await page.locator(".therapy-grid img").evaluateAll(images => images.map(img => ({fit: getComputedStyle(img).objectFit, width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height})));
    expect(photos).toHaveLength(7);
    expect(photos.every(photo => photo.fit === "cover")).toBe(true);
    expect(Math.max(...photos.map(photo => photo.height)) - Math.min(...photos.map(photo => photo.height))).toBeLessThan(2);
  }
});


test("seção de regiões do corpo removida", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".body-regions, .body-region")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Costas", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Ombros", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Pernas e joelhos", exact: true })).toHaveCount(0);
});
