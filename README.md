# História São Leopoldo — Mapa Interativo do Passado

Site interativo para explorar São Leopoldo/RS no tempo: mapa híbrido, pins por endereço, décadas com fotos, contribuições da comunidade e página de patrocínios.

## Repositório

- **Local (oficial):** `C:\Projetos\Site Historia São Leopoldo`
- **GitHub:** https://github.com/BlackLotusDegen/historia-sao-leopoldo

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Rotas

- `/` — landing
- `/mapa` — mapa interativo
- `/contribuir` — envio de fotos (fila de moderação)
- `/apoie` — patrocínios
- `/sobre` — missão do projeto

## Acervo

Edite `src/data/places.ts` e coloque imagens em `public/places/<id>/`.

Contribuições enviadas ficam em:

- metadados: `data/submissions/*.json`
- imagens: `public/uploads/pending/`

## Stack

Next.js, TypeScript, Tailwind CSS, MapLibre GL, Framer Motion.
