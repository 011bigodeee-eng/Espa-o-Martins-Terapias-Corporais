# Revisão dos materiais do Espaço Martins

A abertura, a paleta, os textos das terapias e a ordem das seções existentes foram preservados. A apresentação de Martins fica entre a abertura e O espaço.

## Atualização de conteúdo

Edite `src/lib/verified-content.ts`:

- `verifiedProfile.professionalName`, `biography` e `institutionalText`: nome e textos autorizados. Enquanto os textos estão vazios, a apresentação informa que aguarda a biografia e as qualificações confirmadas.
- `qualifications` e `registration`: publicar apenas depois de confirmação. Não foram preenchidos títulos, formação ou registro.
- `portrait`: retrato principal. A foto com o modelo anatômico foi retirada da apresentação e não foi reutilizada. Em seu lugar, `martins-sala-atendimento.jpg` contém a foto real da sala recebida no ZIP de 17.40.25, copiada sem alterações.
- Marca atual: `public/images/logo-martins-oficial.jpg`, recebida no ZIP de 12.10.13. O componente `Brand` exibe o arquivo ao lado do nome; `.brand-emblem` enquadra o círculo original sem margem branca, preservando o arquivo. O antigo objeto `officialBrand` não controla essa aplicação.
- `therapyPhotos`: imagem e texto alternativo por técnica (`relax`, `sport`, `shiatsu`, `feet`, `cups`, `stones`, `fascia`, `mobility`). Não reutilize uma foto de outra modalidade para sugerir uma técnica diferente.

## Catálogo atual: somente fotografias reais de Martins

A cliente solicitou expressamente a aplicação das seis fotos do ZIP e nomes compatíveis com os atendimentos visíveis. Não há ilustrações de IA ou fotos de ambientes nos seis cards. Os originais foram copiados sem alterações sintéticas ou adição de toucas e toalhas. Os cards usam quadros uniformes 9:16 com preenchimento proporcional via CSS; os arquivos originais são preservados.

| Arquivo recebido | Card | Arquivo aplicado |
| --- | --- | --- |
| `11.50.56 (1).jpeg` | Massagem relaxante | `martins-relaxante-costas.jpg` |
| `11.50.55 (1).jpeg` | Massagem nas pernas | `martins-massagem-pernas.jpg` |
| `11.50.55.jpeg` | Mobilização dos braços | `martins-mobilizacao-bracos.jpg` |
| `11.50.56.jpeg` | Reflexologia podal | `martins-reflexologia-podal.jpg` |
| `11.50.56 (2).jpeg` | Cuidado instrumental | `martins-tecnica-instrumental.jpg` |
| `11.50.55 (2).jpeg` | Massagem nos pés | `martins-massagem-pes.jpg` |

Arquivos em `public/images/`; mapeamento e textos alternativos em `src/lib/verified-content.ts`, no objeto `therapyPhotos`. Nomes, descrições, detalhes e mensagens de WhatsApp em `src/lib/content.ts`. Os filtros acompanham as categorias dos novos cards.

Massagem relaxante e reflexologia foram confirmadas pela cliente. Os demais nomes descrevem a região ou ação visível, sem atribuir Shiatsu, desportiva, ventosaterapia ou pedras quentes a registros que não comprovam essas técnicas. O nome específico do atendimento com instrumento pode ser refinado após informação do profissional.

Alguns enquadramentos não mostram a cabeça do paciente. A seleção das seis fotos foi expressamente solicitada pela cliente; não se afirma touca visível nesses registros. A foto de reflexologia também recebeu aprovação explícita quanto ao enquadramento.

As seções fora do catálogo foram preservadas. Os arquivos de ilustrações anteriores permanecem no repositório, sem aplicação nos seis cards.

## Materiais pendentes fora desta revisão

- Texto institucional, apresentação profissional, qualificações e registro confirmados.
- Nome específico da técnica com instrumento, caso desejado no lugar da descrição atual.

A introdução dura 3 segundos (2,6 segundos de exibição e 0,4 segundo de saída), sem botão de pular. A preferência por movimento reduzido continua respeitada. A hero usa qualidade 90 e `sizes="100vw"`, sem modificar o original de 1536 × 1024 pixels; não há promessa de detalhes além da resolução fornecida.

## Revisão de 10/11/2026 — fotografias e apresentação

- Removidas as tags dos seis atendimentos, legendas do retrato e da galeria, legenda redundante dos modais de atendimento e frase “Conheça o Martins”. Textos explicativos e descrições acessíveis das imagens foram preservados. Avisos de imagens ilustrativas e de ambiente nas técnicas continuam identificando sua natureza.
- `martins-sala-atendimento.jpg`: original `WhatsApp Image 2026-11-10 at 17.40.24.jpeg` (1200 × 1600). Os cinco outros anexos são fotografias da tela usadas apenas como referência.
- `sala-sem-logotipo.png`: edição da imagem de abertura `sala.png` para retirar o logotipo do vidro da janela direita; original preservado. A versão editada é usada nas referências à mesma foto, sem sobreposição CSS ou recorte para esconder a marca.
- Biografia completa não encontrada. O projeto menciona “CRT-BR 19.410” em comentário, explicitamente pendente de confirmação; não foi publicado. Formação, nome da pós-graduação miofascial e registro aguardam material oficial. Preencher `biography`, `institutionalText`, `qualifications` e `registration` em `verifiedProfile` quando recebido.
