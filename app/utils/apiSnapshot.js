// Замена $fetch к https://api.timeofthestars.ru на чтение из локального снимка
// (data/api-snapshot.json). Бэкенд отключён — данные берём из снимка.
//
// apiGet(url|path, { query }) → Promise, как у $fetch:
//   apiGet('https://api.timeofthestars.ru/teams/')
//   apiGet(`${API_BASE}/championships/1/players`)
//   apiGet('/games/', { query: { championship_id: 1 } })
// Возвращает копию данных или null, если ключа в снимке нет.
//
// Обновить данные (пока бэкенд жив): npm run snapshot.

import snapshot from '../../data/api-snapshot.json'

const BASE = 'https://api.timeofthestars.ru'

function buildKey(path, opts) {
    let p = String(path ?? '')
    if (p.startsWith(BASE)) p = p.slice(BASE.length)
    if (!p.startsWith('/')) p = '/' + p
    const query = opts && opts.query
    if (query && Object.keys(query).length) {
        const qs = Object.entries(query)
            .filter(([, v]) => v != null)
            .map(([k, v]) => `${k}=${v}`)
            .join('&')
        if (qs) p += (p.includes('?') ? '&' : '?') + qs
    }
    return p
}

function pick(key) {
    if (key in snapshot) return snapshot[key]
    // терпимость к завершающему слешу в пути (часть до '?')
    const qIndex = key.indexOf('?')
    const path = qIndex === -1 ? key : key.slice(0, qIndex)
    const query = qIndex === -1 ? '' : key.slice(qIndex)
    const altPath = path.endsWith('/') ? path.slice(0, -1) : path + '/'
    const altKey = altPath + query
    if (altKey in snapshot) return snapshot[altKey]
    return null
}

// Синхронное чтение (для тех мест, где раньше был useFetch).
export function apiData(path, opts) {
    const value = pick(buildKey(path, opts))
    return value == null ? null : structuredClone(value)
}

// Асинхронная замена $fetch — возвращает Promise.
export function apiGet(path, opts) {
    return Promise.resolve(apiData(path, opts))
}
