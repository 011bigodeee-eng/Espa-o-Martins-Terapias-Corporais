# Revisão dos materiais do Espaço Martins

A abertura, a paleta, os textos das terapias e a ordem das seções existentes foram preservados. A apresentação de Martins fica entre a abertura e O espaço.

## Atualização de conteúdo

Edite `src/lib/verified-content.ts`:

- `verifiedProfile.professionalName`, `biography` e `institutionalText`: nome e textos autorizados. Enquanto os textos estão vazios, a apresentação se identifica como provisória.
- `qualifications` e `registration`: publicar apenas depois de confirmação. Não foram preenchidos títulos, formação ou registro.
- `portrait`: retrato principal. A segunda foto fornecida está disponível na apresentação expansível.
- `officialBrand.light` e `officialBrand.dark`: caminhos das versões oficiais para fundos claros e escuros. Preserve o arquivo completo, sua proporção e a área de proteção. A referência comparativa recebida no segundo ZIP identifica como correta a marca oval no quadro à direita, com símbolo botânico e o texto “Terapias Manuais”. O arquivo original da marca ainda não foi fornecido; a identificação tipográfica atual é provisória, sem símbolo recriado. O componente Brand centraliza todas as aplicações.
- `therapyPhotos`: imagem e texto alternativo por técnica (`relax`, `sport`, `shiatsu`, `feet`, `cups`, `stones`, `fascia`, `mobility`). Não reutilize uma foto de outra modalidade para sugerir uma técnica diferente.

Os arquivos recebidos foram preservados sem alteração visual. Os seis cards demonstram suas técnicas, sem fotografias de ambientes vazios:

| Técnica | Imagem aplicada |
| --- | --- |
| Massagem relaxante | Fotografia real fornecida, com touca e cobertura visíveis |
| Massagem desportiva | Ilustração por IA de pressão manual na panturrilha |
| Shiatsu | Ilustração por IA de pressão com as palmas através do lençol |
| Reflexologia podal | Ilustração por IA de pressão na planta do pé |
| Ventosaterapia | Fotografia real fornecida, com touca e cobertura visíveis |
| Pedras quentes | Ilustração por IA com pedras escuras e aplicação manual |

As quatro ilustrações apresentam touca visível e corpo coberto, com exposição apenas da região tratada. Não retratam Martins e não são registros da clínica; recebem a legenda “Imagem ilustrativa · IA” nos cards e esclarecimento no modal. Os arquivos WebP separados têm 543 × 724 pixels (3:4). A fonte gerada permanece em `/workspace/generated_images/exec-01431696-162f-42d0-ba85-c052d711911d.png` na instância atual.

A fotografia real de reflexologia continua preservada em `public/images/atendimento-reflexologia.jpg`, mas não está aplicada: o enquadramento não mostra a cabeça, impedindo conferir a exigência de touca. Uma nova fotografia real com a touca visível poderá substituí-la.

`therapyPhotos` recebe registros oficiais; `therapyIllustrations` mantém as imagens identificadas como IA. Ao receber um registro real, acrescente-o a `therapyPhotos`: ele tem prioridade sobre a ilustração. `therapyVenuePhotos` permanece apenas nas seções fora dos seis cards, sem alteração nesta revisão.

## Materiais pendentes

- Arquivo original do logotipo oval da referência (quadro à direita), com versões adequadas para fundos claros e escuros. As capturas recebidas foram usadas somente como referência, sem recorte ou redesenho para uso final.
- Texto institucional e apresentação profissional oficiais.
- Formação, qualificações e registro confirmados, caso devam ser publicados.
- Fotografias oficiais de desportiva, Shiatsu e pedras quentes, além de um novo enquadramento de reflexologia, com cobertura, touca visível e autorização de uso.

A publicação em produção não faz parte desta alteração local.
