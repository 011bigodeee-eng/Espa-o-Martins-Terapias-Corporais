# Revisão dos materiais do Espaço Martins

A abertura, a paleta, os textos das terapias e a ordem das seções existentes foram preservados. A apresentação de Martins fica entre a abertura e O espaço.

## Atualização de conteúdo

Edite `src/lib/verified-content.ts`:

- `verifiedProfile.professionalName`, `biography` e `institutionalText`: nome e textos autorizados. Enquanto os textos estão vazios, a apresentação se identifica como provisória.
- `qualifications` e `registration`: publicar apenas depois de confirmação. Não foram preenchidos títulos, formação ou registro.
- `portrait`: retrato principal. A segunda foto fornecida está disponível na apresentação expansível.
- `officialBrand.light` e `officialBrand.dark`: caminhos das versões oficiais para fundos claros e escuros. Preserve o arquivo completo, sua proporção e a área de proteção. A referência comparativa recebida no segundo ZIP identifica como correta a marca oval no quadro à direita, com símbolo botânico e o texto “Terapias Manuais”. O arquivo original da marca ainda não foi fornecido; a identificação tipográfica atual é provisória, sem símbolo recriado. O componente Brand centraliza todas as aplicações.
- `therapyPhotos`: imagem e texto alternativo por técnica (`relax`, `sport`, `shiatsu`, `feet`, `cups`, `stones`, `fascia`, `mobility`). Não reutilize uma foto de outra modalidade para sugerir uma técnica diferente.

## Catálogo atual: somente fotografias reais de Martins

A cliente solicitou expressamente a aplicação das seis fotos do ZIP e nomes compatíveis com os atendimentos visíveis. Não há ilustrações de IA ou fotos de ambientes nos seis cards. Os originais foram copiados sem alterações sintéticas, recortes ou adição de toucas e toalhas.

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

- Arquivo original do logotipo oval da referência.
- Texto institucional, apresentação profissional, qualificações e registro confirmados.
- Nome específico da técnica com instrumento, caso desejado no lugar da descrição atual.
