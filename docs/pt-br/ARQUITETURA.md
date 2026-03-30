# Arquitetura

## Visão geral

A aplicação adota uma arquitetura em camadas, separando claramente UI, estado de simulação, engine numérica e rendering.

## Camadas

### 1) Camada de Aplicação (React)

- `src/main.tsx`: bootstrap da aplicação.
- `src/App.tsx`: composição raiz com provider global.
- `src/components/*`: layout, painéis e componentes visuais reutilizáveis.

Responsabilidade: composição de interface e interação com estado global, sem lógica numérica pesada.

### 2) Estado Global (Context)

- `src/context/SimulationContext.tsx`

Responsabilidade:

- manter `SimulationConfig` e `SimulationState`;
- expor ações de domínio (`togglePlayPause`, `resetSimulation`, `addObstacle`, `applyPreset`);
- sincronizar UI com engine de simulação.

### 3) Engine de Simulação

- `src/engine/core/FluidEngine.ts`
- `src/engine/simulation/FluidSolver.ts`
- `src/engine/simulation/ObstacleManager.ts`
- `src/engine/simulation/ParticleSystem.ts`
- `src/engine/core/InputController.ts`

Responsabilidade:

- aplicar passo temporal da simulação;
- processar injeção de força/densidade;
- controlar obstáculos e partículas;
- traduzir eventos de input para coordenadas normalizadas.

### 4) Rendering WebGL2

- `src/engine/rendering/WebGLRenderer.ts`
- `src/engine/rendering/webgl/*`
- `src/engine/rendering/shaders/*`

Responsabilidade:

- gerenciar contexto WebGL2, shaders, buffers e texturas;
- enviar dados do solver para GPU;
- desenhar fluido, partículas e obstáculos por modo de visualização.
- alternar entre backend `classic` e `experimental-gpu`.

### 5) Offloading e Benchmark

- `src/workers/solver-benchmark.worker.ts`
- `src/services/benchmark/runBenchmarkInWorker.ts`

Responsabilidade:

- executar benchmark determinístico fora da thread principal;
- gerar métricas comparáveis entre versões (FPS estimado + checksum).
### 6) Hooks de Orquestração

- `src/hooks/useCanvas.ts`
- `src/hooks/useAnimationLoop.ts`

Responsabilidade:

- criar e configurar instância da engine;
- controlar ciclo de animação via `requestAnimationFrame`;
- atualizar métricas de FPS e manter render em tempo real.

## Fluxo de execução

1. React monta o `SimulationProvider`.
2. O `Canvas` inicializa engine e recursos WebGL.
3. O loop de animação calcula `deltaTime`, atualiza solver e renderiza cada frame.
4. Controles da UI alteram `config/state` no context.
5. Mudanças de `config` são propagadas para a engine por `updateConfig`.

## Decisões técnicas importantes

- Uso de `Float32Array` para campos numéricos do solver.
- Limite de `deltaTime` para estabilidade em quedas de frame.
- Renderização contínua mesmo com simulação pausada para manter resposta visual da interface.
- Separação entre input, simulação e rendering para facilitar testes e evolução por módulo.
