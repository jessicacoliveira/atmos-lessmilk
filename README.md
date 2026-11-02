# Módulos auxiliares
## motion.atm

O motion.atm agrupa tasks que pegam uma ou mais propriedades de uma tabela e leva cada uma do valor atual até o valor fornecido, no tempo especificado, seguindo uma fórmula da física que utiliza velocidade constante (MU) ou aceleração constante (MUV).

```
await Motion.linear(rect, [ x = 0.8, y = 0.2 ], 500)
```

No exemplo acima, x e y do rect vão dos valores atuais até 0.8 e 0.2 em 500ms, com velocidade constante (**linear**).

Como cada movimento é uma task, com `await` o código aguarda até o movimento terminar antes de seguir para a linha de baixo. Com `spawn`, o movimento roda "em paralelo" enquanto o código segue sendo executado.

### Movimentos

| Movimento | O que faz | Descrição física |
|---|---|---|
| `Motion.linear` | velocidade constante | MU: `v = (pf - p0) / t` |
| `Motion.accelerate` | parte do repouso e acelera | MUV: `a = 2 (pf - p0) / t²` |
| `Motion.decelerate` | parte rápido e freia até parar | MUV: `v0 = 2 (pf - p0) / t`, `a = -v0 / t` |
| `Motion.bounce_end` | cai até o alvo e quica 3 vezes | queda acelerada com 3 quiques, cada um com metade do tempo e 1/4 da altura do anterior |

## particles.atm

O `particles.atm` agrupa tasks que criam partículas e substituem o emitter do phaser. Cada partícula nasce numa posição, voa com uma velocidade e uma gravidade e termina depois de um tempo. Cada tipo é descrito por uma tabela, de nome `kind`, que cada jogo define de acordo com a sua necessidade.

Seis jogos usam partículas e tinham tasks próprias para emiti-las. O módulo foi uma tentativa de unificar essas tasks.

```
val CONFETTI = [ sprite = [ :box, :wall, :hole ], w = 0.1, h = 0.125, gravity = 0.5, lifespan = 5000, speed = [0.1, 0.35], spin = true ]

await Particles.flow(CONFETTI, 0.5, -0.5, 100, 250)
```

No exemplo acima, 100 partículas nascem no ponto (0.5, -0.5), uma a cada 250ms. Cada uma sorteia uma das três imagens (:box, :wall ou :hole), uma direção e uma velocidade, gira, cai com gravidade 0.5 e some depois de 5000ms.

### Tasks

| Task | O que faz |
|---|---|
| `Particles.one(kind, x, y, vx, vy)` | lança uma partícula |
| `Particles.burst(kind, x, y, quantity)` | lança `quantity` partículas de uma vez (explosão) |
| `Particles.flow(kind, x, y, quantity, every)` | lança uma partícula a cada `every` ms, `quantity` no total (rajada) |

### Campos do `kind`

Os campos têm nome, então a ordem não importa.

| Campo | Obrigatório | Padrão | O que é |
|---|---|---|---|
| `sprite` | sim | — | :chave da layer da imagem, ou uma lista de chaves (cada partícula sorteia uma) |
| `w`, `h` | sim | — | tamanho |
| `lifespan` | sim | — | tempo de vida, em ms |
| `speed` | no `burst` e no `flow` | — | `[mínimo, máximo]` da velocidade |
| `mode` | não | `'%'` | unidade do retângulo (`'%'` ou `'!'`) |
| `scale` | não | 1 | `[mínimo, máximo]`, sorteado por partícula |
| `gravity` | não | 0 | somada à velocidade vertical a cada segundo |
| `spin` | não | não gira | se true, partícula gira em torno do próprio eixo |
| `out_kill` | não | não | se true, partícula morre ao sair da tela |
| `layer` | não | `:world` | camada em que a partícula é desenhada |
