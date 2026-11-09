# Espaço Martins | Terapias Corporais

Site institucional em português com Next.js 16, React 19, TypeScript e Tailwind CSS 4. Fontes e imagens hospedadas localmente.

## Desenvolvimento

Requisito: Node.js 24 e npm 11. Não precisa de banco de dados ou chaves de API.

```sh
npm ci
npm run dev
```

Servidor na porta 3000. Webpack é usado por compatibilidade com as restrições de processos auxiliares do Turbopack neste ambiente.

```sh
npm run typecheck
npm run build
npm run start
```

Use o checkout existente: cada tarefa na nuvem já é isolada; não crie um worktree sem solicitação explícita.

## Conteúdo editável

- `src/lib/content.ts`: estabelecimento, terapias, WhatsApp, FAQ, galeria e etapas de atendimento.
- `src/lib/verified-content.ts`: biografia, registro, retrato, qualificações, eventos e depoimentos; campos profissionais vazios até confirmação; fotos recebidas e configuração central da marca.
- `src/components/site.tsx`: composição, navegação, filtros, modais, lightbox e mapa.
- `src/components/therapy-art.tsx`: fotografias oficiais de atendimento e fotos do ambiente identificadas, configurados em `verified-content.ts`.
- `public/images/`: três fotografias fornecidas, sem alterações. Next.js gera tamanhos e formatos otimizados nas requisições.
- `src/app/globals.css`: identidade visual, layouts e movimento reduzido.

## Testes de navegador

```sh
npm run build
npm run test:e2e
```

Playwright inicia o servidor de produção e utiliza Chromium em `/usr/bin/chromium`. Em outra máquina, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` com o caminho do Chromium instalado. Fora de CI, um servidor existente pode ser reutilizado.

Verificações: conteúdo, imagens, SEO, WhatsApp contextualizado, filtros, detalhes, FAQ, privacidade, galeria por teclado, foco, mapa sob demanda, abertura e movimento reduzido. Larguras: 320, 360, 375, 390, 430, 768, 820, 1024, 1440 e 1920 px. Auditoria axe WCAG A/AA automatizada; não substitui avaliação humana com tecnologias assistivas.

## Publicação

Veja [docs/PUBLICACAO.md](docs/PUBLICACAO.md). Configure o domínio real em `NEXT_PUBLIC_SITE_URL` antes do build para gerar canonical, compartilhamento e sitemap completos. Não foram inventadas avaliações, credenciais, preços ou horários.

Materiais recebidos e pendências: [docs/MATERIAIS-OFICIAIS.md](docs/MATERIAIS-OFICIAIS.md).
