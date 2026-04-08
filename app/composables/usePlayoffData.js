const API_BASE = 'https://api.timeofthestars.ru'

const PLAYOFF_STAGES = new Set(['quarterfinal', 'semifinal', 'final'])

function normalizePair(teamAId, teamBId) {
    const a = Number(teamAId)
    const b = Number(teamBId)
    return a < b ? [a, b] : [b, a]
}

function seriesKey(teamAId, teamBId) {
    const [x, y] = normalizePair(teamAId, teamBId)
    return `${x}:${y}`
}

function parseGameDateTime(game) {
    const d = game.date ?? ''
    const t = game.time ?? '00:00:00'
    const ms = Date.parse(`${d}T${t}`)
    return Number.isFinite(ms) ? ms : 0
}

function isPlayedGame(game) {
    const a = game.score_team_a
    const b = game.score_team_b
    return (
        (typeof a === 'number' || (typeof a === 'string' && a !== '')) &&
        (typeof b === 'number' || (typeof b === 'string' && b !== '')) &&
        !Number.isNaN(Number(a)) &&
        !Number.isNaN(Number(b))
    )
}

function toScoreNumber(v) {
    if (v == null || v === '') return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
}

function scoreForTeam(game, teamId) {
    const tid = Number(teamId)
    if (game.team_a_id === tid) return toScoreNumber(game.score_team_a)
    if (game.team_b_id === tid) return toScoreNumber(game.score_team_b)
    return null
}

function winnerOfGame(game) {
    if (!isPlayedGame(game)) return null
    const a = Number(game.team_a_id)
    const b = Number(game.team_b_id)
    const sa = toScoreNumber(game.score_team_a)
    const sb = toScoreNumber(game.score_team_b)
    if (sa == null || sb == null) return null
    if (sa > sb) return a
    if (sb > sa) return b
    return null
}

function seriesWinnerFromGames(sortedGames) {
    const wins = {}
    for (const g of sortedGames) {
        const w = winnerOfGame(g)
        if (w == null) continue
        wins[w] = (wins[w] ?? 0) + 1
        if (wins[w] >= 2) return w
    }
    return null
}

function buildGameSlots(sortedGames, teamMin, teamMax) {
    const slots = []
    for (let i = 0; i < 5; i++) {
        const game = sortedGames[i] ?? null
        if (!game) {
            slots.push({
                game: null,
                played: false,
                scores: { [teamMin]: null, [teamMax]: null },
                winnerId: null,
            })
            continue
        }
        const played = isPlayedGame(game)
        const sMin = scoreForTeam(game, teamMin)
        const sMax = scoreForTeam(game, teamMax)
        slots.push({
            game,
            played,
            scores: { [teamMin]: sMin, [teamMax]: sMax },
            winnerId: played ? winnerOfGame(game) : null,
        })
    }
    return slots
}

function sortSeriesList(list) {
    return [...list].sort((a, b) => {
        const ta = a.firstGameMs ?? 0
        const tb = b.firstGameMs ?? 0
        return ta - tb
    })
}

export function usePlayoffData(options) {
    const tournamentIdRef = computed(() => {
        const v = unref(options.tournamentId)
        if (v == null || v === '') return null
        const n = Number(v)
        return Number.isFinite(n) ? n : null
    })

    const championshipIdRef = computed(() => {
        const v = unref(options.championshipId)
        if (v == null || v === '') return null
        const n = Number(v)
        return Number.isFinite(n) ? n : null
    })

    const asyncKey = computed(
        () =>
            `playoff-bracket-c${championshipIdRef.value ?? 'x'}-t${tournamentIdRef.value ?? 'x'}`
    )

    return useAsyncData(
        asyncKey,
        async () => {
            let rawGames = []
            const tid = tournamentIdRef.value
            const cid = championshipIdRef.value

            if (cid != null) {
                try {
                    const withQuery = await $fetch(`${API_BASE}/games/`, {
                        query: { championship_id: cid },
                    })
                    const arr = Array.isArray(withQuery) ? withQuery : []
                    if (arr.length > 0) {
                        rawGames = arr
                    } else {
                        rawGames = await $fetch(
                            `${API_BASE}/championships/${cid}/games`
                        )
                    }
                } catch {
                    try {
                        rawGames = await $fetch(
                            `${API_BASE}/championships/${cid}/games`
                        )
                    } catch {
                        rawGames = []
                    }
                }
            } else if (tid != null) {
                try {
                    const withQuery = await $fetch(`${API_BASE}/games/`, {
                        query: { tournament_id: tid },
                    })
                    const arr = Array.isArray(withQuery) ? withQuery : []
                    if (arr.length > 0) {
                        rawGames = arr
                    } else {
                        rawGames = await $fetch(
                            `${API_BASE}/tournaments/${tid}/games`
                        )
                    }
                } catch {
                    try {
                        rawGames = await $fetch(
                            `${API_BASE}/tournaments/${tid}/games`
                        )
                    } catch {
                        rawGames = []
                    }
                }
            } else {
                try {
                    rawGames = await $fetch(`${API_BASE}/games/`)
                } catch {
                    rawGames = []
                }
            }

            if (!Array.isArray(rawGames)) rawGames = []

            const playoffGames = rawGames.filter(g =>
                PLAYOFF_STAGES.has(g?.playoff_stage)
            )

            const teamIdSet = new Set()
            for (const g of playoffGames) {
                if (g.team_a_id != null) teamIdSet.add(Number(g.team_a_id))
                if (g.team_b_id != null) teamIdSet.add(Number(g.team_b_id))
            }

            let teamsList = []
            try {
                teamsList = await $fetch(`${API_BASE}/teams/`)
            } catch {
                teamsList = []
            }
            if (!Array.isArray(teamsList)) teamsList = []

            /** @type {Record<number, string>} */
            const teamsById = {}
            for (const t of teamsList) {
                if (t?.id != null) {
                    teamsById[Number(t.id)] =
                        typeof t.name === 'string' && t.name
                            ? t.name
                            : `Команда #${t.id}`
                }
            }
            for (const id of teamIdSet) {
                if (teamsById[id] == null) {
                    teamsById[id] = `Команда #${id}`
                }
            }

            const bySeries = new Map()
            for (const g of playoffGames) {
                const k = seriesKey(g.team_a_id, g.team_b_id)
                if (!bySeries.has(k)) bySeries.set(k, [])
                bySeries.get(k).push(g)
            }

            const byStage = {
                quarterfinal: [],
                semifinal: [],
                final: [],
            }

            for (const [, games] of bySeries) {
                const sorted = [...games].sort(
                    (a, b) => parseGameDateTime(a) - parseGameDateTime(b)
                )
                const first = sorted[0]
                const stage = first?.playoff_stage
                if (!PLAYOFF_STAGES.has(stage)) continue

                const [teamMin, teamMax] = normalizePair(
                    first.team_a_id,
                    first.team_b_id
                )
                const firstGameMs = parseGameDateTime(first)
                const seriesWinnerId = seriesWinnerFromGames(sorted)
                const gameSlots = buildGameSlots(sorted, teamMin, teamMax)

                const row = {
                    key: seriesKey(first.team_a_id, first.team_b_id),
                    stage,
                    teamIds: [teamMin, teamMax],
                    games: sorted,
                    gameSlots,
                    seriesWinnerId,
                    firstGameMs,
                }
                if (byStage[stage]) byStage[stage].push(row)
            }

            byStage.quarterfinal = sortSeriesList(byStage.quarterfinal)
            byStage.semifinal = sortSeriesList(byStage.semifinal)
            byStage.final = sortSeriesList(byStage.final)

            return {
                playoffGames,
                teamsById,
                stages: byStage,
            }
        },
        { watch: [asyncKey] }
    )
}
