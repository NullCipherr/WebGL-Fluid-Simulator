# Performance

## Estado atual

O projeto possui otimizações estruturais no hot path da simulação e renderização, mas ainda não possui benchmark oficial versionado.

## Práticas já implementadas

- Campos do solver em `Float32Array`.
- Cap de `deltaTime` para reduzir instabilidade numérica.
- Reuso de buffer de partículas no renderer.
- Atualização da malha de simulação proporcional ao `gridSize`.

## Variáveis que mais impactam desempenho

- `gridSize`
- `viewMode` (especialmente `particles`)
- `showTrails`
- frequência e intensidade de input no canvas
- dimensão do viewport

## Protocolo sugerido de benchmark local

1. Rodar em ambiente limpo (`npm ci && npm run dev`).
2. Testar `gridSize` em 128, 256 e 512.
3. Capturar FPS médio por 60s em cada `viewMode`.
4. Medir CPU/GPU e memória no DevTools.
5. Consolidar em tabela no próprio documento.

## Próximo passo recomendado

Criar script de coleta automatizada de métricas de frame e memória para comparação entre commits.
