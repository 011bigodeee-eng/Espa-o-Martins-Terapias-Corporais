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
  await expect(page.locator(".therapy-card")).toHaveCount(2);
  await expect(page.locator(".therapy-card h3")).toHaveText(["Massagem nas pernas", "Mobilização dos braços"]);
  await page.getByRole("button", { name: "Relaxamento", exact: true }).click();
  await expect(page.locator(".therapy-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Todas", exact: true }).click();
  await expect(page.locator(".therapy-card")).toHaveCount(6);
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
  await page
    .locator(".biomechanics")
    .getByRole("button", { name: "Saiba mais" })
    .click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Ajustes biomecânicos ortopédicos",
  );
  await expect(page.getByRole("dialog").getByRole("link")).toHaveAttribute(
    "href",
    /ajustes%20biomec%C3%A2nicos/,
  );
  await page.keyboard.press("Escape");
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
      const label = el
        .querySelector(".therapy-art__caption")!
        .getBoundingClientRect();
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
        labelHeight: label.height,
        buttons,
        headingFont: getComputedStyle(el.querySelector("h2")!).fontFamily,
      };
    });
    expect(layout.headingFont).toContain("Manrope");
    expect(layout.labelHeight).toBeLessThan(28);
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
    .getByRole("button", { name: "Saiba mais sobre Mobilização dos braços", exact: true })
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

test("abertura encerra em 1,5s e respeita movimento reduzido", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".intro")).toBeHidden({ timeout: 3000 });
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
  await expect(profile.getByText(/Apresentação provisória/)).toBeVisible();
  expect(await page.locator("main > section").evaluateAll(sections => sections.slice(0, 3).map(section => section.id))).toEqual(["inicio", "martins", "espaco"]);
  await expect(page.locator(".header .brand-link")).toHaveAttribute("href", /^https:\/\/wa.me\/5511959389897/);
  await expect(page.locator('image[href*="terapias-ilustrativas"]')).toHaveCount(0);
  await profile.locator("summary").click();
  await expect(profile.getByAltText("Martins segurando um modelo anatômico da coluna vertebral")).toBeVisible();
  for (const width of [360, 390, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await profile.scrollIntoViewIfNeeded();
    const bounds = await profile.locator(".profile-photo").boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
  }
  await page.locator("#terapias").scrollIntoViewIfNeeded();
  await expect(page.locator("#terapias .therapy-photo")).toHaveCount(6);
  await expect.poll(() => page.locator("#terapias .therapy-photo").evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
});


test("seis cards com técnicas representadas, legendas honestas e grade responsiva", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const cards = page.locator("#terapias .therapy-card");
  await expect(cards).toHaveCount(6);
  await expect(cards.locator("h3")).toHaveText(["Massagem relaxante", "Massagem nas pernas", "Mobilização dos braços", "Reflexologia podal", "Cuidado instrumental", "Massagem nos pés"]);
  const sources = await cards.locator("img").evaluateAll(images => images.map(img => img.getAttribute("src")));
  expect(new Set(sources).size).toBe(6);
  expect(sources.every(src => src?.includes("martins-"))).toBe(true);
  await expect(page.getByText("O cuidado em foco.", { exact: true })).toHaveCount(0);
  await expect(page.locator("#terapias .therapy-art--venue")).toHaveCount(0);
  await expect(page.locator("#terapias .therapy-art--illustration")).toHaveCount(0);
  await expect(page.locator("#terapias .therapy-art--treatment")).toHaveCount(6);
  for (const [width, columns] of [[390, 1], [820, 2], [1440, 3]]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      await expect.poll(() => card.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      await expect(card.locator(".therapy-actions a")).toHaveAttribute("href", /^https:\/\/wa.me\//);
    }
    expect(await page.locator(".therapy-grid").evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length)).toBe(columns);
    const sizes = await cards.locator(".therapy-art").evaluateAll(items => items.map(el => ({ w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height })));
    expect(Math.max(...sizes.map(s => s.h)) - Math.min(...sizes.map(s => s.h))).toBeLessThan(2);
  }
});
