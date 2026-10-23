# brenolira.dev

Portfólio de Breno Lira Rocha. Feito com HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

## Estrutura

```
index.html      Conteúdo do site
css/style.css   Estilos (variáveis no topo, responsivo no final)
js/main.js      Interações: etapas do processo, FAQ, formulário do WhatsApp e menu ativo
assets/         Imagens e currículo (ver abaixo)
```

## Rodando localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
```

## Conteúdo

- Fotos em `assets/img/` (WebP, já recortadas para a seção Sobre).
- Currículo: o conteúdo fica em `curriculo/index.html` (com o mesmo visual do site). Depois de editar, gere o PDF com o Chrome e salve em `assets/curriculo-breno-lira-rocha.pdf`:

```bash
npx serve .
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="assets/curriculo-breno-lira-rocha.pdf" http://localhost:3000/curriculo/
```

O currículo tem duas páginas A4 fixas. Se adicionar muito conteúdo, confira se nada passou da borda.
