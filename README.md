# Rosas e Jardins

Site da Rosas e Jardins, floricultura em Araçoiaba da Serra (SP): buquês, cestas e decorações. Feito em HTML, CSS e JS puros.

Av. Ângelo Pupim, nº 41, sala 5, Araçoiaba da Serra, SP, 18190-000 · Seg. à Sex.: 9h às 18h · Sáb.: 9h às 13h

Site publicado: https://dsalessales.github.io/rosas-e-jardins/

## Estrutura

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Todas as seções, do header ao footer |
| `css/style.css` | Tokens (`:root`), componentes e responsivo (768px e 1025px) |
| `js/products.js` | Produtos do slider "Our Bestsellers" (nome, preço, imagem, selo) |
| `js/main.js` | Mega menu, busca, menu mobile, header que some ao rolar, slider, calendário, zoom do mapa (o "+" aproxima no pin da loja), favoritos |
| `img/brasil-mapa.svg` | Mapa do Brasil gerado a partir do Natural Earth (domínio público), com o pin da loja |

Uma imagem que ainda não existe aparece como um bloco rosa listrado com o nome do arquivo esperado. Basta salvar o arquivo com esse nome que ele passa a aparecer.

## Arquivos que ainda faltam

- `img/colecoes/birthday-flowers.jpg` (684×684): Flores de aniversário
- `img/colecoes/cestas.jpg` (585×780): Cestas
- `img/historia.jpg` (1392×588) e `img/historia-mobile.jpg` (735×980): banner "Flores para cada momento"
- `img/icons/dog.svg`: ilustração do bloco do Instagram (opcional)
- `img/logo.svg` (opcional, sem ele aparece o logo em texto)
- `img/produtos/`: `grand-felice.jpg`, `white-orchid.jpg`, `jade-plant.jpg`, `petite-amour.jpg`, `julia.jpg`

## Conteúdo provisório

- Fotos de produtos, coleções e Instagram são de referência e devem ser trocadas por fotos da loja.
- Nomes dos produtos e preços ("Sob consulta") ficam em `js/products.js`.
- O bloco de depoimentos está escondido (`hidden` em `index.html`) até termos avaliações reais.
- Faltam o telefone/WhatsApp e os links das redes sociais (hoje só o Instagram aparece, sem link).

## Fontes

Montserrat e Playfair Display vêm do Google Fonts. Para usar outra fonte de títulos, coloque os `.woff2` em `fonts/` e ajuste o `@font-face` no topo de `css/style.css`.

## Para ver localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.
