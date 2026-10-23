# O que alterar até a publicação

Guia do portfólio **brenolira.dev**. Feito em HTML, CSS e JavaScript puros, sem build.

## Estrutura

| Arquivo | O que tem |
|---|---|
| `index.html` | Todo o conteúdo do site |
| `css/style.css` | Visual: cores e fontes no começo (`:root`), celular no final |
| `js/main.js` | Abertura, etapas do "Como funciona", dúvidas, formulário do WhatsApp e menu do celular |
| `curriculo/` | Currículo em HTML, de onde sai o PDF |
| `assets/img/` | Fotos e capturas dos projetos (formato WebP) |
| `assets/icons/` e `favicon.ico` | Ícones do site |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Arquivos para o Google e para o celular |

Para ver o site no computador:

```bash
npx serve .
```

---

## 1. Obrigatório antes de publicar

- [ ] **Comprar o domínio `brenolira.dev`** e apontar para a Vercel (Vercel → Project → Settings → Domains). Sem isso, a imagem de compartilhamento não aparece e o Google não acha o site.
- [ ] **Deixar o repositório do GitHub privado** (GitHub → Settings → Danger Zone → Change visibility → Private).
- [ ] **Escolher um e-mail só.** O site usa `dev.breno.lira@gmail.com` e o currículo usa `breno.lira.rochaa@gmail.com`.
  - Site: procure o e-mail no `index.html` (rodapé e dados do Google no `<head>`).
  - Currículo: `curriculo/index.html` (depois gere o PDF de novo, veja a seção 4).
- [ ] **Conferir os itens do plano mensal** (`index.html`, seção `id="plano"`): hospedagem e domínio, segurança e cópias, pequenas atualizações e suporte direto. Tire o que você não for oferecer.
- [ ] **Conferir as respostas das Dúvidas** (`index.html`, seção `id="faq"`): prazo de 2 semanas, 30 dias de suporte e plano mensal opcional.
- [ ] **Abrir o link dos certificados** no LinkedIn e ver se eles estão públicos: `linkedin.com/in/-brenolirarocha/details/certifications/`.

## 2. Depois de publicar

- [ ] Cadastrar o site no [Google Search Console](https://search.google.com/search-console) e enviar `https://brenolira.dev/sitemap.xml`.
- [ ] Testar a prévia do link mandando o endereço no WhatsApp para você mesmo.
- [ ] Abrir o site no celular e testar o menu sanduíche, o formulário e o botão "Baixar currículo".

## 3. Conteúdo que você pode trocar quando quiser

**Textos**: todos ficam no `index.html`, na ordem em que aparecem na página.

**Projetos para clientes** (`id="projetos"`): cada projeto é um `<article class="work">`. Para trocar a imagem, coloque o arquivo em `assets/img/` (de preferência `.webp`, 1280×720) e mude o `src` e o `alt` da `<img>`.

**Laboratório** (`id="laboratorio"`): para adicionar um projeto, copie um `<article class="lab-card">` inteiro e troque o título, o texto, as tecnologias e o link do GitHub.

**Fotos do Sobre**: `assets/img/breno-trabalhando.webp` (vertical, 3:4) e `assets/img/breno-retrato.webp` (quadrada). Troque o arquivo mantendo o nome.

**Linha do tempo do Sobre**: lista `<ul class="timeline">` no `index.html`.

**Cores**: no começo do `css/style.css`, dentro de `:root`. A cor principal é `--color-accent` (#12B5A6).

**WhatsApp**: o número aparece no `index.html` (links `wa.me`) e no `js/main.js` (`WHATSAPP_NUMBER`). Troque nos dois.

**Opções do formulário** ("O que você precisa"): os botões `<label class="choice">` dentro do formulário em `id="contato"`.

## 4. Currículo

O conteúdo fica em `curriculo/index.html`, com o mesmo visual do site. Depois de editar, gere o PDF de novo (com o `npx serve .` rodando):

```bash
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="assets/curriculo-breno-lira-rocha.pdf" http://localhost:3000/curriculo/
```

São duas páginas A4 fixas. Se adicionar muito texto, abra o PDF e confira se nada passou da borda.

## 5. Domínio

O endereço `https://brenolira.dev` aparece em:

- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` e os dados do Google (`application/ld+json`)
- `robots.txt` (linha do Sitemap)
- `sitemap.xml`

Se o domínio mudar, troque nesses três arquivos.

## 6. Ícone e imagem de compartilhamento

- **Ícone "bl."**: os PNGs em `assets/icons/` e o `favicon.ico` saem da versão de 512 px (`assets/icons/icon-512.png`).
- **Imagem de compartilhamento**: `assets/img/og-image.jpg` (1200×630). Para trocar, mantenha o tamanho e o nome.
