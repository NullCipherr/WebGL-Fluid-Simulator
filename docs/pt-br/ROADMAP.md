# Roadmap Técnico v2

Roadmap atualizado após a entrega dos ciclos anteriores (curto, médio e longo).
Foco agora em robustez de produção, previsibilidade de performance e evolução arquitetural.

## Sprint 1 (curto prazo)

- [ ] Exportar benchmark para JSON versionável em `benchmarks/results/`.
- [ ] Adicionar comparação automática entre benchmark atual e baseline anterior.
- [ ] Criar smoke test E2E do fluxo principal (abrir app, interagir canvas, validar HUD).
- [ ] Implementar `healthcheck` para ambiente Docker local.
- [ ] Adicionar fallback visual quando WebGL2 não estiver disponível.

## Sprint 2 (médio prazo)

- [ ] Introduzir suíte de testes de regressão visual para shaders (snapshot de frames).
- [ ] Definir budget de performance por preset (`fps`, `frame time`, memória estimada).
- [ ] Persistir perfil completo de sessão (preset, backend, câmera/layout) com versionamento.
- [ ] Melhorar benchmark worker para múltiplos cenários canônicos (CPU-bound e fill-rate-bound).
- [ ] Implementar telemetria técnica local opcional (somente em modo dev).

## Sprint 3 (longo prazo)

- [ ] Prototipar etapa de simulação em GPU com ping-pong de texturas (incremental).
- [ ] Avaliar trilha de migração para WebGPU com feature flag experimental.
- [ ] Adicionar testes de regressão de performance em CI com alerta de degradação.
- [ ] Publicar guia de hardening para deploy (cache, compressão, headers e observabilidade).
- [ ] Estruturar release process com changelog automatizado e versionamento semântico.
