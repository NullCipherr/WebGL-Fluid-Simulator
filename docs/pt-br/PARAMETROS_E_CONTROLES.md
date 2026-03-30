# Parâmetros e Controles

## Presets disponíveis

Definidos em `SimulationContext`:

- `calm`
- `viscous`
- `chaotic`
- `smoke`

Cada preset aplica um conjunto de parâmetros físicos e de visualização.

## Parâmetros de fluido

- `density`: intensidade de densidade injetada.
- `impulseForce`: força aplicada ao arrastar/clicar.
- `vorticity`: intensidade de turbulência/vorticidade.
- `dissipation`: decaimento da densidade ao longo do tempo.
- `velocityDissipation`: decaimento da velocidade.

## Parâmetros de rendering

- `viewMode`: `density`, `velocity`, `pressure`, `particles`.
- `colorPalette`: `default`, `fire`, `ocean`, `plasma`.
- `glowIntensity`: intensidade visual de brilho.
- `showGrid`: exibe grade de apoio visual.
- `showTrails`: mantém trilhas/partículas no render.

## Interação no canvas

- Clique esquerdo: injeta densidade + força.
- Clique direito: aplica força reversa (repulsão).
- Arrastar: aplica força contínua com interpolação entre pontos.
- Drag sobre obstáculo: reposiciona obstáculo.
- Touch com dois dedos: comportamento equivalente ao clique direito.

## Obstáculos

- Tipos suportados: `circle` e `rect`.
- Inserção via sidebar esquerda.
- Limpeza global via ação `Clear All`.

## Ajustes avançados

- `gridSize`: resolução principal da grade do solver.
- Valores maiores aumentam detalhe visual e custo computacional.

## Faixas recomendadas por hardware

As sugestões abaixo ajudam a manter boa fluidez visual sem sobrecarga:

### Perfil de entrada (notebooks básicos / iGPU antiga)

- `gridSize`: `64` a `128`
- `viewMode` preferido: `density`
- `showTrails`: desligado
- `vorticity`: `0` a `8`
- `glowIntensity`: `0` a `0.4`

### Perfil intermediário (iGPU moderna / desktop médio)

- `gridSize`: `128` a `256`
- `viewMode` preferido: `density` ou `velocity`
- `showTrails`: ligado com moderação
- `vorticity`: `5` a `20`
- `glowIntensity`: `0.2` a `0.7`

### Perfil avançado (GPU dedicada)

- `gridSize`: `256` a `512`
- `viewMode`: todos, incluindo `particles`
- `showTrails`: ligado
- `vorticity`: `15` a `50`
- `glowIntensity`: `0.4` a `1.0`

## Sinais de ajuste necessário

- FPS abaixo de 45 com frequência: reduzir `gridSize` primeiro.
- Frame time acima de 20ms: desligar `showTrails` e reduzir `vorticity`.
- Uso de memória crescente em sessões longas: aplicar reset periódico da simulação.
