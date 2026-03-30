# Operação

## Requisitos

- Node.js 20+
- npm 10+

## Execução local

```bash
npm install
npm run dev
```

Acesso padrão: `http://localhost:3000`

## Build e preview

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run test`
- `npm run test:watch`
- `npm run docker:build`
- `npm run docker:up`
- `npm run docker:down`
- `npm run docker:logs`
- `npm run clean`

## Variáveis de ambiente

Base: `.env.example`

- `VITE_API_URL`
- `VITE_ANALYTICS_ID`
- `VITE_DEFAULT_ITERATIONS`
- `GEMINI_API_KEY` (lida via `vite.config.ts`)

## Deploy recomendado

A aplicação é estática após `npm run build`.

Pipeline recomendado:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. Publicar diretório `dist/`

## Benchmark reproduzível

O benchmark é executado em Web Worker para evitar bloquear a UI.

- Acionamento: botão de benchmark no `TopBar`
- Seed fixa: `1337`
- Resultado: FPS estimado, frame médio e checksum para comparação entre versões

## Docker

Build da imagem:

```bash
npm run docker:build
```

Subir stack:

```bash
npm run docker:up
```

Logs:

```bash
npm run docker:logs
```

Derrubar stack:

```bash
npm run docker:down
```

A aplicação containerizada fica disponível em `http://localhost:8080`.

## CI

Workflow: `.github/workflows/main.yml`

Etapas atuais:

1. checkout
2. setup Node 20
3. `npm ci`
4. `npm run lint`
5. `npm run test`
6. `npm run build`
