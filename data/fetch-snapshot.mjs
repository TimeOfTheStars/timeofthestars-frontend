// Снимок данных живого API в локальный JSON.
// Запуск: `npm run snapshot` (или `node data/fetch-snapshot.mjs`).
// Делать ПОКА бэкенд ещё доступен — после его отключения данные брать неоткуда.
//
// Результат: data/api-snapshot.json — один объект, ключи = пути API (как в коде
// после https://api.timeofthestars.ru), значения = ответы. Плюс data/_manifest.json
// со списком снятых ключей, статусами и временем.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const BASE = 'https://api.timeofthestars.ru'
const DATA_DIR = dirname(fileURLToPath(import.meta.url))

const snapshot = {}
const manifest = []

async function grab(path) {
    const url = `${BASE}${path}`
    try {
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        if (!res.ok) {
            manifest.push({ path, status: res.status, ok: false })
            console.warn(`  ✗ ${path} → HTTP ${res.status}`)
            return null
        }
        const json = await res.json()
        snapshot[path] = json
        const count = Array.isArray(json) ? json.length : 1
        manifest.push({ path, status: 200, ok: true, count })
        console.log(`  ✓ ${path} (${count})`)
        return json
    } catch (err) {
        manifest.push({ path, status: 0, ok: false, error: String(err) })
        console.warn(`  ✗ ${path} → ${err}`)
        return null
    }
}

const idsOf = list => (Array.isArray(list) ? list.map(x => x?.id).filter(v => v != null) : [])

async function main() {
    console.log('Снимаю списки…')
    const tournaments = await grab('/tournaments/')
    const championships = await grab('/championships/')
    const teams = await grab('/teams/')
    await grab('/games/')

    const tournamentIds = idsOf(tournaments)
    const championshipIds = idsOf(championships)
    const teamIds = idsOf(teams)
    const playerIds = new Set()

    console.log('Снимаю под-ресурсы турниров…')
    for (const id of tournamentIds) {
        await grab(`/tournaments/${id}/teams`)
        await grab(`/tournaments/${id}/games`)
        const players = await grab(`/tournaments/${id}/players`)
        idsOf(players).forEach(pid => playerIds.add(pid))
    }

    console.log('Снимаю под-ресурсы чемпионатов…')
    for (const id of championshipIds) {
        await grab(`/championships/${id}/teams`)
        await grab(`/championships/${id}/games`)
        const players = await grab(`/championships/${id}/players`)
        idsOf(players).forEach(pid => playerIds.add(pid))
        // usePlayoffData дополнительно дёргает /games/?championship_id=… — мирроним
        await grab(`/games/?championship_id=${id}`)
    }

    console.log('Снимаю детали команд…')
    for (const id of teamIds) {
        await grab(`/teams/${id}`)
    }

    console.log(`Снимаю детали игроков (${playerIds.size})…`)
    for (const id of [...playerIds].sort((a, b) => a - b)) {
        await grab(`/players/${id}`)
    }

    const meta = {
        generatedAt: new Date().toISOString(),
        base: BASE,
        keys: Object.keys(snapshot).length,
        endpoints: manifest,
    }

    await writeFile(
        join(DATA_DIR, 'api-snapshot.json'),
        JSON.stringify(snapshot, null, 2),
        'utf8'
    )
    await writeFile(
        join(DATA_DIR, '_manifest.json'),
        JSON.stringify(meta, null, 2),
        'utf8'
    )

    const ok = manifest.filter(m => m.ok).length
    console.log(
        `\nГотово: ${ok}/${manifest.length} эндпоинтов снято → data/api-snapshot.json`
    )
}

main()
