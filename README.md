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

Copie `.env.example` para `.env` e preencha:

```
WEBHOOK_URL=https://sua-automacao.exemplo.com/webhook/vale-cafe-nps
WEBHOOK_SECRET=algum-segredo-opcional
```

A cada envio, o back-end (`src/app/api/submit/route.ts`) faz um `POST` em
`WEBHOOK_URL` com este formato:

```jsonc
{
  "event": "nps.response.created",
  "id": "uuid-da-resposta",
  "submittedAt": "2026-09-15T20:22:57.861Z",
  "submittedAtLocal": "15/09/2026, 17:22",
  "rating": { "value": "positive", "emoji": "😄", "label": "Gostei muito" },
  "foundEverything": "texto da resposta (ou null se pulou)",
  "feedback": "texto da resposta (ou null se pulou)",
  "nps": { "score": 9, "category": "Promotor" },
  "completed": true,
  "whatsappText": "*Nova avaliação — Vale Café*\n\n🕒 15/09/2026, 17:22\n\n📊 Avaliação: 😄 Gostei muito\n..."
}
```

O campo `whatsappText` já vem pronto (com emojis e quebras de linha) — na
automação basta mapear esse campo direto pro corpo da mensagem de
WhatsApp, sem precisar montar o texto lá.

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
