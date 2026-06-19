# data/ — локальный снимок API

Заготовка на случай отключения бэкенда. Все данные с `https://api.timeofthestars.ru`
сняты в JSON, чтобы фронт мог работать без живого API.

## Файлы

- **`api-snapshot.json`** — один объект. Ключ = путь API (как в коде после
  `https://api.timeofthestars.ru`), значение = ответ. Пример:
  ```json
  {
    "/teams/": [ … ],
    "/teams/1": { … },
    "/championships/1/players": [ … ],
    "/players/215": { … }
  }
  ```
- **`_manifest.json`** — что снято, статусы, время снимка (`generatedAt`).
- **`fetch-snapshot.mjs`** — скрипт, который пересоздаёт снимок. Запуск:
  `npm run snapshot` (делать, ПОКА бэкенд жив).

## Что снято (живые эндпоинты)

- Списки: `/tournaments/`, `/championships/`, `/teams/`, `/games/`
- По турнирам/чемпионатам: `/{tournaments|championships}/{id}/{teams,games,players}`
- Детали: `/teams/{id}`, `/players/{id}`
- `/games/?championship_id={id}` (используется в `usePlayoffData`)

Мёртвые уже сейчас (404, в снимок не вошли): всё `/api/*`,
`/teams/{id}/games`, `/teams/{id}/players`, `/championships/{id}/players-stats`.

## Как переключить фронт на снимок (когда бэк выключат)

Сейчас компоненты зовут `$fetch('https://api.timeofthestars.ru' + path)`.
Заменить на чтение из снимка — например, общий хелпер:

```js
// app/composables/useApiData.js
import snapshot from '~/data/api-snapshot.json'
export function apiData(path) {
    return snapshot[path] ?? null
}
```

и в компонентах `await $fetch(URL)` → `apiData('/teams/')` и т.п.
Внимание: `players/[id].vue` сейчас бьёт в мёртвый `/api/players/{id}` —
при распайке использовать `/players/{id}` (он в снимке есть).
