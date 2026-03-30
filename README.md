<div align="center">
  <h1>WebGL Fluid Simulator</h1>
  <p><i>Simulador 2D de fluidos em tempo real com WebGL2, React e TypeScript</i></p>

  <p>
    <a href="https://github.com/NullCipherr/WebGL-Fluid-Simulator/actions/workflows/main.yml"><img src="https://github.com/NullCipherr/WebGL-Fluid-Simulator/actions/workflows/main.yml/badge.svg" alt="CI" /></a>
    <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/WebGL-2-990000?style=flat-square" alt="WebGL2" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/License-Apache--2.0-2E7D32?style=flat-square" alt="License" />
  </p>
</div>

---

## Documentação

A documentação técnica está modularizada para facilitar onboarding, manutenção e evolução do projeto.

- [Índice da documentação](docs/README.md)
- [Arquitetura](docs/pt-br/ARQUITETURA.md)
- [Parâmetros e Controles](docs/pt-br/PARAMETROS_E_CONTROLES.md)
- [Operação](docs/pt-br/OPERACAO.md)
- [Performance](docs/pt-br/PERFORMANCE.md)
- [Testes e Qualidade](docs/pt-br/TESTES_E_QUALIDADE.md)
- [Roadmap](docs/pt-br/ROADMAP.md)

---

## Preview

Interface principal servida localmente via Vite:

- Entrada: `src/components/layout/AppShell.tsx`
- Canvas da simulação: `src/components/simulator/Canvas.tsx`
- Acesso local (dev): `http://localhost:3000`

---

## Visão Geral

O **WebGL Fluid Simulator** é uma aplicação interativa que executa uma simulação de fluidos 2D no navegador com renderização acelerada por GPU.

O projeto foi organizado com separação clara entre:

- **Engine de simulação** (solver, partículas, obstáculos e input);
- **Renderização WebGL2** (shaders e pipeline gráfico);
- **Camada de UI React** (painéis, controles e estado global).

---

## Principais Recursos

- Simulação em tempo real com atualização contínua de densidade e velocidade.
- Injeção de força e densidade por mouse/touch, com suporte a clique direito para repulsão.
- Modos de visualização: `density`, `velocity`, `pressure`, `particles`.
- Presets prontos (`calm`, `viscous`, `chaotic`, `smoke`) para ajuste rápido de comportamento.
- Presets customizados persistidos em `localStorage`.
- Sistema de obstáculos dinâmicos (círculos/retângulos) com drag no canvas.
- Painéis laterais com métricas de execução e parâmetros físicos/rendering.
- Benchmark reproduzível em Web Worker com seed fixa e checksum de validação.
- Backend gráfico experimental (`experimental-gpu`) para evolução incremental da pipeline.
- Arquitetura em TypeScript com módulos reutilizáveis para evolução incremental.

---

## Arquitetura

Fluxo principal da aplicação:

1. `src/main.tsx` inicia o app React.
2. `src/App.tsx` monta `SimulationProvider` e `AppShell`.
3. `useCanvas` instancia o `FluidEngine` e conecta resize/reset/config.
4. `FluidEngine` orquestra `FluidSolver`, `WebGLRenderer`, `ParticleSystem` e `InputController`.
5. `useAnimationLoop` executa `requestAnimationFrame`, atualiza FPS e aciona update/render.
6. A UI consome `SimulationContext` para refletir e alterar estado em tempo real.

Detalhamento completo em [ARQUITETURA.md](docs/pt-br/ARQUITETURA.md).

---

## Performance

Características de engenharia já aplicadas:

- Arrays tipados (`Float32Array`) para campos do solver.
- Limite de `deltaTime` no loop (`<= 0.033`) para reduzir instabilidade em picos de frame.
- Reuso de buffers de partículas no renderer para reduzir pressão de alocação.
- Cálculo e renderização contínua desacoplados por estado (`running`/`paused`).

Benchmark formal ainda não está versionado no repositório.

Procedimento recomendado para baseline local:

1. Executar `npm run dev` e abrir no Chrome/Edge.
2. Registrar FPS médio por modo (`density`, `velocity`, `pressure`, `particles`) com `gridSize` em `128`, `256` e `512`.
3. Monitorar CPU/GPU e memória via DevTools Performance.

Guia detalhado: [PERFORMANCE.md](docs/pt-br/PERFORMANCE.md).

---

## Desafios Técnicos

- Manter estabilidade numérica da simulação sob entrada intensa do usuário.
- Balancear fidelidade visual e custo computacional em diferentes resoluções de grade.
- Garantir sincronização consistente entre estado React e estado interno da engine.
- Evoluir observabilidade real (métricas não mockadas) sem acoplar UI à lógica de simulação.

---

## Roadmap

Próximos passos recomendados:

- Implementar métricas reais de uso de memória/tempo de frame na sidebar direita.
- Adicionar suíte de testes para invariantes do solver e utilitários de simulação.
- Melhorar ciclo de vida da engine com `dispose()` completo (WebGL + listeners).
- Criar presets persistentes e compartilháveis.
- Publicar demo estável com pipeline de deploy contínuo.

Roadmap técnico expandido: [ROADMAP.md](docs/pt-br/ROADMAP.md).

---

## Stack Tecnológica

- **Frontend**: React 19 + TypeScript
- **Build**: Vite 6
- **Estilos**: Tailwind CSS 4
- **Renderização**: WebGL2 + GLSL (shaders customizados)
- **Offloading**: Web Worker para benchmark determinístico
- **Ícones/UI**: Lucide React
- **Qualidade**: Type check (`tsc --noEmit`) + GitHub Actions

---

## Estrutura do Projeto

```text
.
├── docs/
│   ├── README.md
│   └── pt-br/
│       ├── ARQUITETURA.md
│       ├── OPERACAO.md
│       ├── PARAMETROS_E_CONTROLES.md
│       ├── PERFORMANCE.md
│       ├── ROADMAP.md
│       └── TESTES_E_QUALIDADE.md
├── public/
│   └── favicon.svg
├── docker/
│   └── nginx/
│       └── default.conf
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── simulator/
│   │   └── ui/
│   ├── context/
│   │   └── SimulationContext.tsx
│   ├── engine/
│   │   ├── core/
│   │   ├── rendering/
│   │   └── simulation/
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── .dockerignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── SECURITY.md
├── package.json
└── vite.config.ts
```

---

## Como Rodar

### Pré-requisitos

- Node.js 20+
- npm 10+

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

### Build de produção

```bash
npm run build
npm run preview
```

### Scripts disponíveis

- `npm run dev`: inicia servidor Vite em `0.0.0.0:3000`
- `npm run build`: gera build em `dist/`
- `npm run preview`: serve localmente o build gerado
- `npm run lint`: checagem de tipos com TypeScript
- `npm run test`: executa testes de invariantes do solver com Vitest
- `npm run test:watch`: executa testes em modo watch
- `npm run docker:build`: build da imagem Docker
- `npm run docker:up`: sobe stack via Docker Compose
- `npm run docker:down`: remove stack local
- `npm run docker:logs`: acompanha logs do container
- `npm run clean`: remove `dist/`

### Variáveis de ambiente

Arquivo de referência: `.env.example`

- `VITE_API_URL`
- `VITE_ANALYTICS_ID`
- `VITE_DEFAULT_ITERATIONS`

Observação: `vite.config.ts` também lê `GEMINI_API_KEY` via `loadEnv`.

---

## Deploy

Como a aplicação gera artefato estático (`dist/`), o deploy pode ser feito em plataformas de hosting estático.

Fluxo recomendado:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. Publicar conteúdo de `dist/` (ex.: Vercel, Netlify, Cloudflare Pages, Nginx)

### Opção com Docker

```bash
npm run docker:build
npm run docker:up
```

Acesso: `http://localhost:8080`

Guia operacional: [OPERACAO.md](docs/pt-br/OPERACAO.md).

---

## Qualidade e CI

Pipeline configurado em `.github/workflows/main.yml` com:

- Instalação de dependências (`npm ci`)
- Type check (`npm run lint`)
- Testes (`npm run test`)
- Build de produção (`npm run build`)

---

## Licença

Este projeto está sob a licença **Apache-2.0**.

Leia [LICENSE](LICENSE) para mais detalhes.

---

## Contribuição

- Guia de contribuição: [CONTRIBUTING.md](CONTRIBUTING.md)
- Código de conduta: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Política de segurança: [SECURITY.md](SECURITY.md)

<div align="center">
  Construído para estudar simulação, rendering em GPU e engenharia de front-end em tempo real.
</div>
