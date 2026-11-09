# Revisão dos materiais do Espaço Martins

A abertura, a paleta, os textos das terapias e a ordem das seções existentes foram preservados. A apresentação de Martins fica entre a abertura e O espaço.

## Atualização de conteúdo

Edite `src/lib/verified-content.ts`:

- `verifiedProfile.professionalName`, `biography` e `institutionalText`: nome e textos autorizados. Enquanto os textos estão vazios, a apresentação se identifica como provisória.
- `qualifications` e `registration`: publicar apenas depois de confirmação. Não foram preenchidos títulos, formação ou registro.
- `portrait`: retrato principal. A segunda foto fornecida está disponível na apresentação expansível.
- `officialBrand.light` e `officialBrand.dark`: caminhos das versões oficiais para fundos claros e escuros. Preserve o arquivo completo, sua proporção e a área de proteção. A referência comparativa recebida no segundo ZIP identifica como correta a marca oval no quadro à direita, com símbolo botânico e o texto “Terapias Manuais”. O arquivo original da marca ainda não foi fornecido; a identificação tipográfica atual é provisória, sem símbolo recriado. O componente Brand centraliza todas as aplicações.
- `therapyPhotos`: imagem e texto alternativo por técnica (`relax`, `sport`, `shiatsu`, `feet`, `cups`, `stones`, `fascia`, `mobility`). Não reutilize uma foto de outra modalidade para sugerir uma técnica diferente.

Os arquivos recebidos foram copiados sem alteração visual. As fotos de massagem e ventosas exibem touca e cobertura; são mostradas inteiras, sem recortar a identificação ou o paciente. A foto dos pés permanece fora do site porque não permite verificar o uso de touca. As outras técnicas usam placeholders explicitamente identificados. Nenhuma imagem de IA permanece aplicada às terapias.

## Materiais pendentes

- Arquivo original do logotipo oval da referência (quadro à direita), com versões adequadas para fundos claros e escuros. As capturas recebidas foram usadas somente como referência, sem recorte ou redesenho para uso final.
- Texto institucional e apresentação profissional oficiais.
- Formação, qualificações e registro confirmados, caso devam ser publicados.
- Fotos das demais técnicas com cobertura, touca e autorização de uso.

A publicação em produção não faz parte desta alteração local.
