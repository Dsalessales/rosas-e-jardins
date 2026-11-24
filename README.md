# Rosas e Jardins

Protótipo da home de uma loja de flores, feito em HTML, CSS e JS puros. A loja é fictícia e não faz vendas reais.

Site publicado: https://dsalessales.github.io/rosas-e-jardins/

## Estrutura

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Todas as seções, do header ao footer |
| `css/style.css` | Tokens (`:root`), componentes e responsivo (768px e 1025px) |
| `js/products.js` | Produtos do slider "Our Bestsellers" (nome, preço, imagem, selo) |
| `js/main.js` | Mega menu, busca, menu mobile, header que some ao rolar, slider, calendário, zoom do mapa, favoritos |
| `img/us-map.svg` | Mapa dos EUA gerado a partir de dados públicos (us-atlas) |

Uma imagem que ainda não existe aparece como um bloco rosa listrado com o nome do arquivo esperado. Basta salvar o arquivo com esse nome que ele passa a aparecer.

## Arquivos que ainda faltam

- `img/colecoes/birthday-flowers.jpg` (684×684)
- `img/colecoes/small-attentions.jpg` (585×780)
- `video/signature-bouquets.mp4` e o pôster `img/colecoes/signature-bouquets.jpg`
- `img/historia.jpg` (1392×588) e `img/historia-mobile.jpg` (735×980)
- `img/icons/dog.svg`
- `img/logo.svg` (opcional, sem ele aparece o logo em texto)
- `img/produtos/`: `grand-felice.jpg`, `white-orchid.jpg`, `jade-plant.jpg`, `petite-amour.jpg`, `julia.jpg`

## Fontes

Montserrat e Playfair Display vêm do Google Fonts. Para usar outra fonte de títulos, coloque os `.woff2` em `fonts/` e ajuste o `@font-face` no topo de `css/style.css`.

## Para ver localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.
