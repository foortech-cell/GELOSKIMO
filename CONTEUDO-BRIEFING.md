# Briefing de conteúdo — Landing Page Gelo Skimó

Baseado em tudo levantado durante o desenvolvimento do sistema Gelo Skimó Connect
(contratos de comodato, laudos técnicos, catálogo real de produtos, clientes,
identidade visual). Objetivo: apontar o que já está bom e o que falta pra a
landing page (`index.html`) refletir o negócio completo, não só a linha de
gelo de coco saborizado.

Legenda: `[MANTER]` já está bom · `[AJUSTAR]` existe mas precisa mudar · `[NOVO]` não existe ainda

---

## 0. Meta / SEO

`[AJUSTAR]`

Atual: título e description falam só do gelo de coco saborizado.

Sugestão — ampliar pra cobrir as duas frentes do negócio (consumo + revenda/B2B) e
a região de atuação (bom pra SEO local):

```html
<title>Gelo Skimó | Gelo de Coco Saborizado e Cubo de Gelo — Curitiba e Região</title>
<meta name="description" content="Gelo Skimó — gelo de coco saborizado em 5 sabores, cubo de gelo de 1kg a 10kg, gelo em barra e potável. Entrega própria em Curitiba e região. Atendemos bares, eventos, mercados, açougues e revendedores.">
```

---

## 1. Hero

`[MANTER]` — tagline "Gelo que vira festa" está ótima, mantém a energia do brand.

`[AJUSTAR]` pequeno — o eyebrow diz "❄ Gelo de coco 100% natural ❄", mas o site
cobre bem mais que isso (cubo, barra, potável, comodato de máquina). Considerar
trocar por algo mais abrangente ou manter focado no produto-estrela (gelo
saborizado) já que é o hero — tudo bem deixar como está, só não deixar essa a
ÚNICA menção de produto na página toda.

---

## 2. Marquee de sabores

`[MANTER]` — funciona bem como está.

---

## 3. Seção "Sobre o produto" (`#produto`)

`[AJUSTAR]` — o texto menciona "cubo de gelo em diversos tamanhos" mas o catálogo
real é mais completo. Vale ajustar pra:

> "Além disso, somos fornecedores de **gelo em cubo, gelo em barra e gelo potável**,
> em diversos tamanhos (1kg a 10kg), atendendo cliente final, revendedores e
> empresas com entregas pontuais em que você pode confiar."

---

## 4. Sabores

`[MANTER]` — 5 sabores (Coco, Maçã Verde, Melancia, Maracujá, Morango), cards e
ícones já batem com o catálogo real do sistema. Nada a mudar.

---

## 5. Cubos de gelo (`#cubos`)

`[AJUSTAR]` — hoje só mostra 4 cards de cubo (1/3/5/10kg). O catálogo real do
sistema tem mais variações que não aparecem:

- **Gelo em barra** (3kg e 10kg) — formato diferente do cubo, vale ao menos uma
  menção/variação visual.
- **Gelo potável** (1kg e 5kg) — produto distinto (água potável congelada,
  não é só resfriamento), pode interessar a um público diferente (eventos que
  servem em copo, por exemplo).

Sugestão: manter os 4 cards de cubo como estão (ficaram bons) e adicionar uma
linha extra ou 2 cards adicionais pra Barra e Potável, ou um pequeno texto
abaixo do grid: *"Também disponível em barra (3kg e 10kg) e versão potável
(1kg e 5kg) — consulte disponibilidade."*

---

## 6. NOVO — Sustentabilidade / Energia Solar

`[NOVO]` — **isso não aparece no site hoje e é um diferencial real.** O selo
"Produzido com energia solar" está na própria logo oficial (ícone de sol +
globo), mas a landing page não menciona em nenhum lugar. Isso é o tipo de coisa
que pode pesar pra cliente B2B (mercado, padaria) que se importa com
sustentabilidade/ESG, e é gratuito pra usar como diferencial de marketing.

Sugestão: um pequeno bloco/selo (não precisa ser uma seção gigante), por exemplo
logo abaixo do hero ou como um "badge" flutuante:

> ☀️ **Produzido com energia solar** — gelo sustentável, do jeito que o planeta
> agradece.

---

## 7. Usos (`#uses`, sem id de âncora hoje)

`[MANTER]` — os 4 cards (Bares & Drinks / Eventos & Baladas / Churrasco / Revenda)
estão bons. Só atenção: o card "Revenda" aqui e a seção `#revenda` mais abaixo
falam da mesma coisa (freezer exclusivo) — ver ponto 9.

---

## 8. NOVO — Comodato de Equipamento & Manutenção Técnica

`[NOVO]` — **esse é o maior buraco do site.** Pelos contratos e laudos técnicos
que existem no negócio de vocês, a Gelo Skimó não vende só gelo — também:

- Empresta (comodato) **máquinas/freezers de gelo** pra clientes maiores
  (mercados, padarias, açougues), com contrato de exclusividade (o equipamento
  só guarda produto Gelo Skimó).
- Presta **manutenção técnica**: instalação, carga de gás, troca de motor/peças,
  laudo técnico de higienização (com validade legal de 6 meses).

Isso é uma frente de negócio B2B inteira que hoje não existe na landing page —
ela só fala de "freezer exclusivo" no contexto de pequena revenda (ponto 9), não
do comodato de equipamento maior pra clientes industriais/comerciais.

Sugestão de nova seção (`#comodato` ou `#empresas`), entre "Cubos" e "Revenda":

> **Eyebrow:** Pra empresas
> **Título:** Equipamento próprio, sem investimento inicial
> **Texto:** Instalamos e damos manutenção completa no seu equipamento de gelo —
> sem custo de aquisição. Cuidamos de tudo: instalação, manutenção preventiva,
> troca de peças e laudo técnico de higienização em dia. Você só se preocupa em
> vender.
> **CTA:** "Quero saber mais" (WhatsApp)

Isso também abre espaço pra citar os segmentos reais que vocês atendem
(mercados, açougues, padarias, conveniências) — ver ponto 10.

---

## 9. Revenda / Freezer exclusivo (`#revenda`)

`[AJUSTAR]` — está bom, mas depois de criar a seção de Comodato (ponto 8), vale
deixar claro que **isso aqui é outra coisa**: um freezer pequeno de ponto de
venda pra revender os sachês de gelo saborizado (varejo), enquanto o Comodato é
sobre a máquina/equipamento maior de produção (atacado/B2B). Pode manter o
texto quase igual, só ajustando pra não parecer repetição da seção nova.

---

## 10. NOVO (opcional) — Segmentos atendidos

`[NOVO]`, baixa prioridade mas ajuda a credibilidade. Uma faixa simples tipo
"Atendemos" com ícones/rótulos dos segmentos reais (sem precisar citar nomes de
clientes específicos):

> Mercados · Açougues · Padarias · Conveniências · Bares · Eventos · Empresas

Isso já existe parcialmente (`cubes__audience`: "Cliente final · Revendedores ·
Empresas"), só precisa ficar um pouco mais específico/concreto.

---

## 11. Contato / Footer

`[AJUSTAR]` — o WhatsApp `(41) 99911-8175` já está correto e consistente em todo
o site — **vale levar esse número pro sistema (Gelo Skimó Connect) também**, já
que o campo de telefone de contato lá ainda está em branco.

Faltando no footer:
- **Região de atendimento** (ex: "Curitiba e região" / "Fazenda Rio Grande, PR")
  — ajuda SEO local e deixa claro pra quem é de fora que talvez não atendam.
- **CNPJ** — segurança/credibilidade pra cliente B2B que vai precisar de nota
  fiscal.
- **E-mail de contato**, se tiverem um (não vi nenhum documentado ainda —
  perguntar).
- **Redes sociais** (Instagram etc.), se existirem.

---

## Resumo — prioridade sugerida

1. **Alta:** Nova seção de Comodato/Manutenção Técnica (ponto 8) — é a maior
   lacuna, representa uma parte real do negócio que hoje é invisível no site.
2. **Alta:** Selo de energia solar/sustentabilidade (ponto 6) — diferencial
   gratuito, fácil de encaixar.
3. **Média:** Ampliar "Cubos de gelo" pra incluir barra e potável (ponto 5).
4. **Média:** Completar footer com região, CNPJ, e-mail (ponto 11).
5. **Baixa:** Segmentos atendidos mais específicos (ponto 10), ajustes de
   texto/SEO (pontos 0, 3, 9).
