<div align="center">
  <h1>🌊 WebGL Fluid Simulator</h1>
  <p><i>Simulador de fluidos 2D em tempo real com WebGL, React e TypeScript</i></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/WebGL-GPU-990000?style=for-the-badge&logo=webgl&logoColor=white" alt="WebGL" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

---

## ⚡ Visão Geral

O **WebGL Fluid Simulator** é uma aplicação interativa que simula dinâmica de fluidos em tempo real no navegador, usando renderização acelerada por GPU.

O projeto combina uma **engine de simulação modular** com uma interface de controle completa para ajuste de parâmetros físicos, visualização em diferentes modos e manipulação de obstáculos.

## ✨ Principais Recursos

- **Simulação em tempo real no navegador**:
  - Atualização contínua de densidade, velocidade e pressão.
  - Entrada por mouse/toque para injetar força e densidade no fluido.
- **Painel avançado de controle**:
  - Ajustes de densidade, força de impulso, vorticidade e dissipação.
  - Controle de raio do pincel, resolução da grade e efeitos visuais.
- **Múltiplos modos de visualização**:
  - `density`, `velocity`, `pressure` e `particles`.
  - Paletas de cor (`default`, `fire`, `ocean`, `plasma`) e glow configurável.
- **Sistema de obstáculos**:
  - Adição de círculos/retângulos em runtime.
  - Limpeza rápida de obstáculos e reset da simulação.
- **Arquitetura organizada**:
  - Separação entre engine (`solver`, `renderer`, `input`, `particles`) e UI React.

## 🛠️ Stack Tecnológica

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Estilização**: Tailwind CSS 4
- **Renderização**: WebGL + shaders GLSL
- **Qualidade**: Type check com `tsc --noEmit` + GitHub Actions

## 📂 Estrutura do Projeto

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/            # TopBar, sidebars, status bar e shell da aplicação
│   │   ├── simulator/         # Canvas principal da simulação
│   │   └── ui/                # Componentes reutilizáveis (sliders, toggles, cards)
│   ├── context/
│   │   └── SimulationContext.tsx
│   ├── engine/
│   │   ├── core/              # FluidEngine e InputController
│   │   ├── simulation/        # Solver, partículas e obstáculos
│   │   └── rendering/         # Renderer WebGL, wrappers e shaders
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
└── vite.config.ts
```

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/NullCipherr/WebGL-Fluid-Simulator.git
   cd WebGL-Fluid-Simulator
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. (Opcional) Configure variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```

4. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse no navegador:
   - `http://localhost:3000`

## 📜 Scripts

- `npm run dev`: inicia o servidor Vite em `0.0.0.0:3000`
- `npm run build`: gera build de produção em `dist/`
- `npm run preview`: publica localmente o build gerado
- `npm run lint`: roda checagem de tipos com TypeScript
- `npm run clean`: remove o diretório `dist/`

## ⚙️ Variáveis de Ambiente

Arquivo base: `.env.example`

- `VITE_API_URL`: endpoint de API (quando aplicável)
- `VITE_ANALYTICS_ID`: identificador de analytics
- `VITE_DEFAULT_ITERATIONS`: valor padrão de iterações

Observação: o `vite.config.ts` também suporta `GEMINI_API_KEY` via `process.env`.

## 🔄 CI

O repositório inclui workflow em `.github/workflows/main.yml` com:

- Instalação (`npm ci`)
- Checagem de tipos (`npm run lint`)
- Build de produção (`npm run build`)

## 📄 Licença

Este projeto está licenciado sob a **Apache-2.0**.

---

<div align="center">
  <p>Desenvolvido por <a href="https://github.com/NullCipherr">NullCipherr</a></p>
</div>
