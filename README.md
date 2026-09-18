# Vale Café — Pesquisa de Avaliação (NPS)

Formulário de avaliação em tela cheia, feito para rodar num tablet fixo no
balcão do espaço Vale Café. Tela de abertura animada, uma pergunta por vez
(com transições suaves), resposta por carinha (😄 😐 😞), duas perguntas
abertas opcionais e a pergunta clássica de NPS (0 a 10). A cada resposta
enviada, dispara um webhook com todos os campos + horário, pronto para
virar mensagem de WhatsApp numa automação (n8n, Make, Zapier etc).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000 — em Chrome, use `F11` para tela cheia
(simula o tablet). Para rodar em produção:

```bash
npm run build
npm run start
```

## Configurando o webhook do WhatsApp

A URL que recebe os eventos vem de uma ferramenta de automação (n8n,
Make.com, Zapier...): você cria lá um fluxo com um gatilho do tipo
"Webhook", a ferramenta gera uma URL única, e você cola essa URL na
variável de ambiente `WEBHOOK_URL` (no EasyPanel: aba **Ambiente** do
serviço). É essa automação — não este app — que efetivamente envia a
mensagem pro grupo do WhatsApp; aqui só disparamos o POST com os dados.

Em desenvolvimento local, copie `.env.example` para `.env` e preencha:

```
WEBHOOK_URL=https://sua-automacao.exemplo.com/webhook/vale-cafe-nps
WEBHOOK_SECRET=algum-segredo-opcional
```

A cada envio, o back-end (`src/app/api/submit/route.ts`) faz **um** `POST`
em `WEBHOOK_URL` com este formato:

```jsonc
{
  "event": "nps.response.created",
  "id": "uuid-da-resposta",
  "submittedAt": "2026-09-18T18:25:15.706Z",
  "submittedAtLocal": "18/09/2026, 15:25",
  "questions": [
    { "question": "Como foi sua experiência aqui na Vale?", "answer": "😄 Gostei muito" },
    { "question": "Encontrou tudo o que procurava ou sentiu falta de algum item?", "answer": "Faltou leite de aveia" },
    { "question": "Tem algum elogio de algo que gostou ou alguma crítica de onde podemos melhorar?", "answer": "Atendimento excelente!" },
    { "question": "De 0 a 10, o quanto você indicaria a Vale para um amigo ou familiar?", "answer": "9 (Promotor)" }
  ],
  "rating": { "value": "positive", "emoji": "😄", "label": "Gostei muito" },
  "foundEverything": "texto da resposta (ou null se pulou)",
  "feedback": "texto da resposta (ou null se pulou)",
  "nps": { "score": 9, "category": "Promotor" },
  "completed": true,
  "whatsappText": "*Nova avaliação — Vale Café*\n📅 18/09/2026 às 15:25\n\n❓ *Como foi sua experiência aqui na Vale?*\n😄 Gostei muito\n\n❓ *Encontrou tudo...*\n..."
}
```

- `questions` traz cada pergunta feita junto com a resposta dada (perguntas
  opcionais que o cliente pulou não aparecem na lista) — útil se a
  automação quiser tratar cada uma separadamente.
- `whatsappText` já vem pronto: título "Nova avaliação", dia e hora
  (fuso de São Paulo) e, em seguida, cada pergunta em negrito seguida da
  resposta (ou da nota, no caso do NPS), com emojis e quebras de linha.
  Na automação basta mapear esse campo direto pro corpo da mensagem de
  WhatsApp, sem precisar montar o texto lá.
- Se `WEBHOOK_SECRET` estiver definido, ele vai no header
  `x-vale-webhook-secret` pra a automação validar a origem da chamada.

Se `WEBHOOK_URL` não estiver configurado, o formulário continua
funcionando normalmente (só não dispara nada) — útil pra testar a
interface antes de plugar a automação.

## Onde as respostas ficam salvas

Além do webhook, toda resposta é gravada em `data/submissions.jsonl`
(uma linha JSON por resposta) como backup local. Esse arquivo não vai
para o Git.

## Editando o conteúdo (perguntas, textos, tempos)

Tudo fica centralizado em [src/config/content.ts](src/config/content.ts):
textos da tela de abertura, pergunta da avaliação por carinha, as duas
perguntas abertas, a pergunta de NPS (0 a 10), texto de agradecimento,
tempo de inatividade até voltar pro início (`INACTIVITY_TIMEOUT_MS`,
padrão 45s) e tempo da tela de agradecimento (`THANKS_AUTO_RETURN_MS`,
padrão 6s).

## Marca

Cores extraídas da logo em [tailwind.config.ts](tailwind.config.ts)
(`vale.charcoal`, `vale.sage`, `vale.cream`, etc). As logos (clara e
escura, em PNG com fundo transparente) estão em `public/brand/dark` e
`public/brand/white`, copiadas das pastas originais na raiz do projeto.
Para trocar a logo, basta substituir os arquivos em `public/brand/`
mantendo os mesmos nomes.

## Colocando no tablet (modo quiosque)

Numa Smart TV/tablet Android, use um navegador em modo quiosque
apontando pra URL onde o app estiver publicado (ex: um PC/mini-PC na
mesma rede rodando `npm run start`, ou um deploy na nuvem). No Chrome
Android/Windows:

```
chrome --kiosk --incognito http://SEU-IP-OU-DOMINIO:3000
```

A tela já foi pensada pra isso: sem seleção de texto, sem zoom
acidental, e ela mesma volta pro início sozinha se alguém sair no meio
do formulário.
