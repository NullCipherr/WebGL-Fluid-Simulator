# Guia de Contribuição

## Objetivo

Este guia define o fluxo recomendado para contribuições no **WebGL Fluid Simulator**.

## Pré-requisitos

- Node.js 20+
- npm 10+

## Fluxo recomendado

1. Faça um fork do repositório.
2. Crie uma branch descritiva (`feat/nome-da-feature` ou `fix/nome-do-ajuste`).
3. Instale dependências com `npm ci`.
4. Garanta validação local com:
   - `npm run lint`
   - `npm run build`
5. Abra um Pull Request com descrição objetiva do problema e da solução.

## Padrões de código

- Use TypeScript com nomes claros e consistentes.
- Evite acoplamento entre camada visual e lógica de simulação.
- Prefira mudanças pequenas e focadas por PR.
- Documente decisões técnicas relevantes no `docs/`.

## Checklist de PR

- [ ] Código compila sem erros.
- [ ] Type check passou localmente.
- [ ] Build de produção foi validado.
- [ ] README/docs foram atualizados quando necessário.
- [ ] Não foram adicionadas dependências sem justificativa.
