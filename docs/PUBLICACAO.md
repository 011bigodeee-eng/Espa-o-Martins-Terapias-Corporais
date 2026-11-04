# Revisão de conteúdo e publicação

Site preparado para Next.js na Vercel. Nenhuma publicação externa é executada automaticamente.

## Confirmar com Martins antes da publicação definitiva

- Validade do registro informado **CRT-BR 19.410** e sua apresentação correta. O registro está omitido do site público até confirmação.
- Trajetória, formação, certificações, retrato e participações em eventos. Campos opcionais em `src/lib/verified-content.ts`; nenhum dado foi inventado.
- Técnicas dos **ajustes biomecânicos ortopédicos**, indicações e descrição adequada dentro da habilitação profissional. A versão atual apenas convida à consulta direta e não publica indicações clínicas.
- Fluxo de primeiro contato, entendimento das necessidades, atendimento e orientações. Validar a redação da seção de experiência.
- Disponibilidade de modalidades, duração, valores, pagamento e horários. O FAQ direciona ao WhatsApp para informações não confirmadas.
- Autorização de uso das três fotos fornecidas. São utilizadas como entregues, sem reconstrução do estabelecimento. O símbolo vetorial do cabeçalho é uma interpretação gráfica; substituir pelo arquivo oficial da marca quando disponível.
- Depoimentos reais e autorizados. O carrossel está implementado, mas oculto enquanto `authorizedTestimonials` estiver vazio.
- As imagens das técnicas são cenas ilustrativas geradas por IA, identificadas em cada imagem; não são fotografias de atendimentos ou do estabelecimento. Os esquemas corporais são demonstrativos, não material diagnóstico. Essas imagens podem ser substituídas por fotografias específicas e autorizadas quando fornecidas.

## Domínio e SEO

Defina `NEXT_PUBLIC_SITE_URL` com a origem HTTPS real antes de `npm run build`. A variável `VERCEL_PROJECT_PRODUCTION_URL` também é detectada automaticamente na Vercel.

Sem domínio confirmado: título, descrição, idioma e dados locais funcionam; canonical e URLs absolutas de compartilhamento ficam omitidos, e o sitemap XML não contém URLs. Com domínio configurado no build: canonical, Open Graph, Twitter, sitemap e sua referência em robots usam a origem real. Nenhum domínio fictício é publicado.

O mapa pesquisa o endereço pelo Google, sem coordenadas inventadas. Revisar o resultado na produção. Ele carrega após solicitação do visitante; a imagem anterior é identificada como representação ilustrativa. O link de rotas funciona de forma independente.

## Deploy na Vercel

1. Importe o repositório, preset Next.js, Node.js 24.
2. Instalação `npm ci`, build `npm run build`, saída padrão do Next.js.
3. Configure o domínio/variável acima. Não são necessários segredos ou banco de dados.
4. Revise telefone, endereço, textos autorizados, mapa, imagens e compartilhamento no domínio final.
5. Publique após a revisão editorial.

## Privacidade

Não foram adicionados analytics, pixels ou formulários. Imagens e fontes são locais. O aviso de privacidade informa sobre Google Maps sob demanda e links externos. Mensagens automáticas do WhatsApp contêm somente o nome da terapia e pedido de horários, sem dados de saúde.

Revise a política se novos formulários ou ferramentas de rastreamento forem adicionados.
