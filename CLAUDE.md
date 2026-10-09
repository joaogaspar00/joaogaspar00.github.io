# CLAUDE.md — website pessoal (conceito "lançamento")

Este ficheiro documenta o conceito e as decisões de design para o
website pessoal de João Gaspar. Serve de contexto para o Claude Code
implementar o site.

## Conceito

Em vez do scroll normal (para baixo), o site usa **scroll invertido — para
cima**. A metáfora é um lançamento de foguetão: o utilizador parte do chão
(origem) e vai subindo, secção a secção, até chegar ao espaço (estado atual),
tal como um foguetão a subir na atmosfera.


## Animação de entrada

- Ao entrar no site, corre uma **animação automática de ~1 minuto**: a
  página deverá ser precionado um botão que dará inicio ao scroll no fundo (chão) e sobe sozinha através de
  todas as zonas até ao espaço, simulando o lançamento.
- Depois da animação terminar, o **controlo do scroll passa para o
  utilizador** — passa a ser scroll normal (para cima = continuar a "subir"),
  sem inversão de lógica confusa.
- É **obrigatório** um botão de skip para saltar a animação — importante
  para quem já viu o site ou está com pressa (ex: recrutadores).
- Respeitar `prefers-reduced-motion`: desativar ou encurtar drasticamente a
  animação para quem tiver essa preferência ativa.

## Sistema visual

Paleta herdada do design system do Nexora, adaptada para o percurso
atmosférico:

| Zona | Cor | Nota |
|---|---|---|
| Chão (céu à superfície) | `#6f97bf` | azul claro, horizonte |
| Chão (transição) | `#3c5f82` | azul crepuscular |
| Troposfera | `#151923` | |
| Estratosfera | `#10131c` | |
| Termosfera | `#0b0e18` | |
| Espaço | `#05060a` | |
| Acento | `#7c6cf0` / `#9686ff` | roxo, usado em luzes, traços técnicos, logótipo |

Outros elementos visuais:

- **Nuvens ** - deverá haver umas nuvens a simular a passagem na atmosfera
- **Estrelas** — campo de pontos que vai aparecendo (fade in) à medida que
  se sobe, quase invisível perto do chão, mais denso no espaço.
- **Nebulosa** — glow roxo subtil que só aparece perto do topo (espaço).
- **Plataforma de lançamento** — estrutura de torre (gantry) com treliça,
  braço de serviço lateral e luzes roxas nos nós, visível junto ao chão,
  desvanece ao subir. Sem base/deck sólida (removida por ficar visualmente
  pesada).
- **Rodapé fixo** — sempre visível, independente da zona: nome/copyright à
  esquerda ("João Gaspar © 2026"), ícones de redes sociais à direita
  (GitHub, LinkedIn, Email — SVGs inline, sem dependências externas).
- **Barra de progresso** — indicador lateral fixo com marcações de cada
  zona - poderá ser algo parecido com telemetria do prórpio foguete

## Estilo geral

Estética "engenharia / blueprint": grelha subtil, marcas de canto tipo
viewfinder de CAD, linhas de cota, traços técnicos — não cartoon/arredondado.
Evitar elementos demasiado "fofos" (ex: janelas circulares tipo BD).

## Assets já produzidos

- `foguetao.svg` — ilustração do foguetão, estilo técnico (sem janela,
  linhas de painel, bocal do motor com detalhe), chama animada em 3 camadas
  (flicker via CSS `@keyframes`), fundo transparente.
- `logo-jg.svg` — logótipo/monograma JG, emblema quadrado: moldura com
  cantos chanfrados (topo-esquerda e baixo-direita), traço roxo curto +
  anel oco a marcar cada vértice, letras construídas em blocos geométricos
  (J a branco, G em roxo de acento), grelha de blueprint no fundo. Pensado
  para funcionar como favicon/avatar.
- `plano-fundo.html` — protótipo funcional standalone (scroll real) do
  percurso de cor chão→espaço, com a plataforma de lançamento e o rodapé.
  Serve de referência de implementação, não é o código final do site.

## Página de projetos

- `projetos.html` + `projetos.js` — arquivo de projetos, acessível pelo
  botão "Projetos" na secção final. Mesmo céu de espaço que
  `contact.html`. Dados no array `PROJECTS` (migrados de `projects/*.md`
  do site antigo `joaogaspar00.github.io`), imagens em
  `images/projects/`, relatórios em `reports/`. Para adicionar um
  projeto: acrescentar uma entrada ao array.

## Notas técnicas (do protótipo)

- A ordem dos elementos no DOM tem de bater certo com a direção do
  gradiente de fundo: o "chão" fica no **fundo do documento** (maior
  scrollY), o "espaço" no **topo do documento** (scrollY = 0). A página
  deve abrir já com o scroll no fundo (`scrollTo(0, document.body.scrollHeight)`
  no load).
- Fração de progresso: `frac = 1 - scrollTop / (scrollHeight - innerHeight)`,
  de forma a que chão = 0 e espaço = 1.
- Opacidades de estrelas, nebulosa e plataforma são todas derivadas dessa
  `frac`, com janelas de fade distintas por elemento.

## Conteúdo ao longo da atmosfera (a partir do CV)

As zonas (chão, troposfera, estratosfera, termosfera, espaço) são só o
**fundo visual contínuo** (gradiente, nuvens, estrelas, nebulosa) — não
são "secções" com conteúdo fixo lá dentro. O conteúdo do CV é uma
**timeline de marcos** (cards/nós), como entradas de um log de missão,
espalhados ao longo de toda a subida, cada um a uma altitude/scroll
própria, independente de onde caem as fronteiras de cor da atmosfera.
Cada marco pode ter uma pequena etiqueta de altitude/data, reforçando a
estética de telemetria já usada na barra de progresso lateral.

Ordem sugerida dos marcos, do chão (início) ao espaço (atual) —
grosso modo cronológica, para que subir = avançar no tempo:

1. **Hero (chão, ponto de partida)** — Nome (João Pedro Sousa Gaspar),
   título (*Aerospace Engineer* — Aerodinâmica e Propulsão), tagline
   curta, botão para iniciar o lançamento.
2. **Sobre mim** — resumo curto adaptado do parágrafo de abertura do CV
   (graduado em Eng. Aeroespacial, background em Eletrónica, interesse em
   CFD, tecnologia reutilizável, sustentabilidade).
3. **Licenciatura em Engenharia Eletrónica** — IST, Set 2019 – Jun 2022.
   Cadeiras-chave: Sistemas Digitais, Comunicações, Sistemas Embebidos,
   Instrumentação e Aquisição de Sinal, Micro/Nanoeletrónica, Redes de
   Computadores, Controlo Automático, Dispositivos Eletrónicos, Gestão.
4. **Mentor — NAPE-IST** (Set 2020 – Jul 2022): integração de novos
   alunos.
5. **Mestrado em Engenharia Aeroespacial** — IST, Set 2022 – Jun 2025.
   Especialização em Aerodinâmica e Propulsão; tese *Computational
   Investigation of Spacecraft Recovery via Rotary Wings: A Study on
   Autorotation*.
6. **Scholarship — ROB9-16 & Projeto "Oeiras Educa"** (Nov 2021 – Jan
   2025): workshops STEM para milhares de crianças, com a Câmara
   Municipal de Oeiras.
7. **Projeto "Salas de Estudo Online"** — Núcleo de Desenvolvimento
   Académico, IST (Set 2021 – Jan 2022): apoio a alunos do 1º ano.
8. **Técnico Fuel Cell — Electrical Engineer** (Jul 2022 – Abr 2024):
   sistema de telemetria para carro a hidrogénio (Shell Eco-Marathon),
   eletrónica e montagem do carro.
9. **Self-Defense Instructor — Krav Maga Global** (Set 2022 – presente):
   planeamento e liderança de aulas.
10. **Competências técnicas & certificações** (marco "painel de
    sistemas", não amarrado a uma data): Matlab, Python, C; Simulink,
    LabView, Solidworks, STARCCM+; KMG Civil Instructor Course (190h,
    2023); Advanced/First Certificate in English.
11. **Espaço — estado atual / contacto** — em busca de oportunidades em
    aeroespacial (CFD, aerodinâmica, propulsão, tecnologia reutilizável);
    contactos (e-mail, LinkedIn, download do CV). Rodapé com redes
    sociais reais mantém-se sempre visível (independente destes marcos).

Implementação atual: o conteúdo dos marcos vive em `index.html`, na
lista `<ol id="milestones">` (secção `#percurso`, escondida visualmente
com `.sr-only` mas lida por leitores de ecrã e motores de busca). O
`script.js` lê essa lista e alimenta o card fixo `#mission-log`. Os
marcos são distribuídos automaticamente a espaços iguais entre a
descolagem (frac 0.07) e um pouco antes de a secção final entrar no
ecrã — para acrescentar/remover um marco basta editar a lista. O
`content.md` ficou só como rascunho/histórico.

Atalhos: "Ir direto ao perfil →" no hero e o botão de skip saltam
ambos para a secção final; qualquer scroll do utilizador (roda, toque,
teclas) durante a subida automática passa-lhe o controlo ali mesmo.

## Tipografia

- **Space Grotesk** — títulos e hero. Geométrica, com carácter técnico
  sem cair no exagero sci-fi.
- **Inter** — corpo de texto (bio, descrições dos marcos). Legível em
  blocos de texto mais longos.
- **JetBrains Mono** — elementos de telemetria: etiquetas de
  altitude/data nos marcos, leitura de ALT% e ticks da barra de
  progresso, marca/copyright do rodapé.
- Self-hosted em `fonts/` (`.woff2` variáveis, subsets latin +
  latin-ext, declarados em `fonts/fonts.css`) — sem dependências
  externas, coerente com os SVGs inline.

## Por decidir

- Se a animação de entrada usa exatamente este protótipo de cor ou é
  refinada (parallax por camadas, easing não-linear, rasto de partículas
  atrás do foguetão).
- Comportamento em mobile (gestos de scroll diferentes, performance).
- Fotos dos marcos (pasta `fotos/`, nomes em `data-photo` na lista
  `#milestones`) — até lá aparece o ícone-placeholder.
- `tese.pdf` — o link no marco da tese está comentado à espera do ficheiro.
- Versão em inglês (o site antigo era em inglês; este é pt-PT).
