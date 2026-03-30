# Testes e Qualidade

## Status atual

A validação automatizada atual é centrada em:

- Type check com TypeScript (`npm run lint`)
- Testes de invariantes do solver com Vitest (`npm run test`)
- Build de produção (`npm run build`)

## Pipeline de CI

Arquivo: `.github/workflows/main.yml`

Cobertura atual da pipeline:

1. instalação com `npm ci`
2. verificação de tipos
3. testes de solver
4. build

## Lacunas conhecidas

- Não há testes de integração para fluxo de input + render.
- Não há teste visual/regressão de shader.

## Direção recomendada

- Criar cenários determinísticos mínimos para validar estabilidade do solver.
- Adicionar smoke test E2E da interface principal.
- Definir critérios de performance mínima por faixa de `gridSize`.
