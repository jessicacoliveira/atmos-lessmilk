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
