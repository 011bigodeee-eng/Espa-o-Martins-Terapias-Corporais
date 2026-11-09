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
| Reflexologia podal | Foto 6 real, com enquadramento sem cabeça expressamente aprovado pela cliente |
| Ventosaterapia | Ilustração por IA com ventosas transparentes e bomba manual em uso |
| Pedras quentes | Ilustração por IA com pedras escuras e aplicação manual |

As quatro ilustrações aplicadas apresentam touca visível e corpo coberto, com exposição apenas da região tratada. Não retratam Martins e não são registros da clínica; recebem a legenda “Imagem ilustrativa · IA” nos cards e esclarecimento no modal. As ilustrações de desportiva, Shiatsu e pedras quentes têm 543 × 724 pixels (3:4); ventosaterapia usa arquivo otimizado de 900 pixels de largura. A fonte gerada permanece em `/workspace/generated_images/exec-01431696-162f-42d0-ba85-c052d711911d.png` na instância atual.

A fotografia real de reflexologia está aplicada em `public/images/atendimento-reflexologia.jpg`: a cliente aprovou expressamente o enquadramento sem a cabeça visível. Não se afirma uso de touca nessa imagem e não houve alteração sintética.

`therapyPhotos` recebe registros oficiais; `therapyIllustrations` mantém as imagens identificadas como IA. Ao receber um registro real, acrescente-o a `therapyPhotos`: ele tem prioridade sobre a ilustração. `therapyVenuePhotos` permanece apenas nas seções fora dos seis cards, sem alteração nesta revisão.

## Materiais pendentes

- Arquivo original do logotipo oval da referência (quadro à direita), com versões adequadas para fundos claros e escuros. As capturas recebidas foram usadas somente como referência, sem recorte ou redesenho para uso final.
- Texto institucional e apresentação profissional oficiais.
- Formação, qualificações e registro confirmados, caso devam ser publicados.
- Fotografias oficiais de desportiva, Shiatsu, pedras quentes e ventosaterapia, com cobertura, touca visível e autorização de uso. O enquadramento atual de reflexologia já foi aprovado.

A publicação em produção não faz parte desta alteração local.

## Revisão do ZIP de 11.50.55–11.50.56

- Foto 1 (`11.50.55 (1)`): atendimento manual na perna, cabeça fora do enquadramento. Técnica específica e uso de touca não confirmados; não aplicada automaticamente à desportiva.
- Foto 2 (`11.50.55 (2)`): mãos e pé visíveis; cabeça fora do quadro. Aguardar confirmação do tratamento e aprovação do enquadramento antes de uso secundário.
- Foto 3 (`11.50.55`): mobilização de braço com bastão, não é registro verificável de uma das seis técnicas. Não aplicada no catálogo.
- Foto 4 (`11.50.56 (1)`): atendimento manual nas costas com touca e cobertura. Cliente confirmou o serviço. Aplicada em Massagem relaxante, sem alteração visual, em `atendimento-relaxante-oficial.jpg`.
- Foto 5 (`11.50.56 (2)`): instrumento junto ao pescoço e ombro. Sem ventosas claramente visíveis; não classificada como ventosaterapia. O antigo arquivo `atendimento-ventosas.jpg` também foi retirado do card por não mostrar ventosas de forma inequívoca.
- Foto 6 (`11.50.56`): mesma foto de reflexologia recebida anteriormente. Cabeça fora do quadro; cliente aprovou explicitamente esse enquadramento. Foto real aplicada no card e no modal, sem adicionar touca artificialmente.

Não foram adicionadas toucas, toalhas ou alterações sintéticas às fotografias reais.
