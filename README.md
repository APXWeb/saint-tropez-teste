# Saint Tropez Confeitaria · proposta de site

Proposta conceito da APX Web para a Saint Tropez Confeitaria (Rua Piracema, Santa Teresinha, Zona Norte de São Paulo). Não tem vínculo oficial com a casa; a página usa `noindex` até a aprovação.

**Cópia de teste** (pasta `saint-tropez-teste`, branch `teste`, sem GitHub e com push desligado). Mudanças aprovadas aqui são levadas depois para o projeto oficial `saint-tropez-experience`.

A ideia desta versão: a página atravessa a casa pelos seus arcos. A abertura é a arcada do salão; o arco do meio é a fachada, que se abre até tomar a tela quando você rola. A vitrine tem um capítulo por categoria, cada um com a sua composição (colagem de bolos, croissants em tela cheia, balcão turquesa dos salgados com as fotos subindo uma sobre a outra, pratos passando ao lado do texto fixo). O salão é noturno, com novas vistas subindo por um arco; a casa chega num turquesa que sobe pela tela; Instagram e Visite fecham. Fundo porcelana, letras cacau, campos turquesa e capítulos noturnos. Sem movimento (preferência do sistema), tudo vira um layout estático completo.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5190
npm run build      # gera dist/
npm run preview    # serve dist/ em http://localhost:4176
npm run test:e2e   # Playwright, desktop e celular (faz o build antes)
```

## Onde ficam as coisas

| Caminho | O quê |
|---|---|
| `src/data/site.js` | **Todos os fatos exibidos**: endereço, horários, links, regras da casa, legendas. Corrija aqui. |
| `src/data/internal.js` | **Referência interna, nunca exibida**: divergência do endereço, ano de abertura, estacionamento, cardápio histórico e pendências. Nenhum arquivo importa este módulo. |
| `src/render.js` | Transforma os dados em HTML no build (`{{chave}}` no `index.html`). |
| `index.html` | Estrutura da página. |
| `src/styles/main.css` | Design system (tokens no `:root`) e seções. |
| `src/main.js` | Scroll (Lenis + GSAP ScrollTrigger), cabeçalho, menu, abertura em arcada, revelações da vitrine, palcos fixos dos salgados e do salão, turquesa da casa. |
| `tools/shots.mjs`, `tools/hero-shots.mjs`, `tools/static-shot.mjs` | Capturas de tela para revisão (rolagem, transição da abertura, layout sem movimento). |
| `src/js/lightbox.js` | Foto ampliada da vitrine (`<dialog>`, setas, teclado, swipe). |
| `src/js/status.js` | "Aberto agora", no fuso de São Paulo. |
| `assets-src/` | Fotos originais (Instagram da casa, com o selo). |
| `tools/images.py` | Recorta o selo e gera AVIF + WebP em 640/1080/1600 px em `public/img/`. |

Para trocar ou acrescentar uma foto: coloque o JPG em `assets-src/`, registre o recorte em `tools/images.py`, rode `npm run images` e use o nome em `src/data/site.js`. Depois rode `sh tools/provenance.sh` (com `IMPECCABLE` apontando para o CLI do Impeccable) para gravar a origem de cada imagem dentro do arquivo.

## Fontes dos dados (consultadas em 13/10/2026)

- **Perfil da casa no Google**: R. Piracema, 221, Santa Teresinha, 02460-040; dom a qui 6h às 22h, sex e sáb 6h às 23h; 4,6 com 6.342 avaliações; sem telefone. O botão do mapa abre esse perfil exato (`maps.google.com/?cid=42194893093639372`).
- **Bio do Instagram**: "Um novo conceito em confeitaria", atendimento presencial, 6:00 às 22:00, não fazemos reservas, não fazemos entregas. Destaques: Clientes, Adega, Bolos e doces, Cafés, Ilha de frios, Localização.
- **Fotos**: as 27 fotos são da própria casa (Instagram), herdadas da proposta anterior. Não há fotos de cafés, adega ou ilha de frios; por isso essas categorias aparecem só em texto.

### Pendente de validação com a casa

Registrado em `src/data/internal.js` (fora do site):

- **Endereço**: o site mostra nº 221 (perfil do Google), mas o site antigo, o cadastro empresarial (CNPJ), o Waze e o BaresSP indicam 211. Não está validado até a casa confirmar.
- **Horário**: o Google e o levantamento de 13/10/2026 dizem seg a qui e dom 6h às 22h, sex e sáb 6h às 23h (é o que o site mostra); a bio do Instagram diz só "6:00 às 22:00".
- **Ano de abertura**: uma matéria fala em 2020 e o CNPJ é de 2019. Não aparece no site.
- **Estacionamento**: uma listagem indica estacionamento para clientes; não se sabe se é gratuito nem se há manobrista. Não aparece no site.
- **Cardápio histórico**: 21 itens vistos em cardápios antigos enviados por usuários (Café Monaco, Canoa Saint Tropez, Torrada Brioche Saint Tropez etc.). Guardados só como referência; os preços desses cardápios são antigos e não foram registrados nem exibidos.
- **Telefone ou WhatsApp**: a casa não divulga nenhum, então o site não tem.

## Publicação

GitHub Pages via Actions (`.github/workflows/pages.yml`) a cada push na `main`. O `base: './'` do Vite deixa todos os caminhos relativos, então o mesmo build funciona em `/`, em `/<repo>/` ou em qualquer subpasta, sem variável de ambiente. O workflow confere, antes de publicar, que todo arquivo referenciado pelo `index.html` existe em `dist/`.

### Sobre o 404 da versão anterior

A proposta anterior (repo `APXWeb/saint-tropez-confeitaria`) continua no ar em `apxweb.github.io/saint-tropez-confeitaria/`. Os 404 vinham de dois endereços antigos: `apex-web-oficial.netlify.app`, que saiu do ar, e `apxweb.github.io/apex-web/portfolio-projects/saint-tropez/`, que não existe porque a pasta é ignorada no repo do site da APX. Este projeto é independente e não altera nada daquele repo.
