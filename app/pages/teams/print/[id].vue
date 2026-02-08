<template>
    <div class="print-page-root">
        <div class="no-print print-toolbar">
            <button type="button" class="print-btn" @click="onPrint">
                Печать
            </button>
        </div>
        <div v-if="!teamData" class="placeholder">
            Загрузка…
        </div>
        <template v-else>
            <h1 class="print-title">Заявочный лист команды {{ teamData.name }}</h1>
            <div
                v-for="(chunk, pageIndex) in playerChunks"
                :key="pageIndex"
                class="print-sheet"
            >
                <div class="print-grid">
                    <div
                        v-for="player in chunk"
                        :key="player.id"
                        class="print-cell"
                    >
                        <div class="cell-header">
                            <span class="cell-num">№{{ player.stats?.number ?? '—' }}</span>
                            <span class="cell-pos">{{ positionShort(player.position) }}</span>
                        </div>
                        <div class="cell-photo">
                            <img
                                v-if="player.photo_url"
                                :src="getPlayerPhoto(player.photo_url)"
                                :alt="player.full_name"
                                class="cell-photo-img"
                                @error="onPhotoError"
                            />
                            <div v-else class="cell-photo-placeholder">Фото</div>
                        </div>
                        <div class="cell-name">{{ player.full_name || '—' }}</div>
                        <div class="cell-line"></div>
                        <div v-if="formattedBirthDate(player.birth_date)" class="cell-extra">
                            {{ formattedBirthDate(player.birth_date) }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { getPlayerPhoto } from '@/utils/PicturesAdmin'

const route = useRoute()
const teamId = computed(() => Number(route.params.id))

const { data } = await useAsyncData(
    () => `team-print-${teamId.value}`,
    async () => {
        if (!teamId.value) return { teamsList: [], playersList: [] }
        const basePath =
            teamId.value === 3
                ? 'https://api.timeofthestars.ru/tournaments/1'
                : 'https://api.timeofthestars.ru/championships/1'
        let teamsList = []
        let playersList = []
        try {
            teamsList = await $fetch(`${basePath}/teams`)
        } catch {
            teamsList = []
        }
        try {
            playersList = await $fetch(`${basePath}/players`)
        } catch {
            playersList = []
        }
        return { teamsList, playersList }
    }
)

const teamsList = computed(() => data.value?.teamsList || [])
const playersList = computed(() => data.value?.playersList || [])

const teamData = computed(() =>
    teamsList.value.find(t => t.id === teamId.value)
)

const teamPlayers = computed(() => {
    if (!playersList.value?.length) return []
    return playersList.value.filter(p => p.team_id === teamId.value)
})

const CELLS_PER_PAGE = 30
const playerChunks = computed(() => {
    const list = teamPlayers.value
    const chunks = []
    for (let i = 0; i < list.length; i += CELLS_PER_PAGE) {
        chunks.push(list.slice(i, i + CELLS_PER_PAGE))
    }
    return chunks
})

function positionShort(position) {
    if (!position) return '—'
    const p = String(position).toLowerCase()
    if (p.includes('нападающий') || p.includes('форвард')) return 'Нп'
    if (p.includes('защитник')) return 'Зщ'
    if (p.includes('вратарь')) return 'Вр'
    return '—'
}

function formattedBirthDate(value) {
    if (!value) return ''
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ''
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}.${month}.${year}`
}

function onPrint() {
    window.print()
}

function onPhotoError(e) {
    const el = e.target
    if (el && el.parentElement) {
        const placeholder = document.createElement('div')
        placeholder.className = 'cell-photo-placeholder'
        placeholder.textContent = 'Фото'
        el.parentElement.replaceChild(placeholder, el)
    }
}

useHead(
    computed(() => ({
        title: `Заявочный лист — ${teamData.value?.name || 'Команда'} | ВРЕМЯ ЗВЁЗД`,
    }))
)
</script>

<style scoped>
.print-page-root {
    max-width: 210mm;
    margin: 0 auto;
    padding: 12px;
    font-family: system-ui, -apple-system, sans-serif;
    color: #000;
    background: #fff;
}

.no-print.print-toolbar {
    margin-bottom: 16px;
}

.print-btn {
    padding: 10px 24px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background: #2563eb;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.print-btn:hover {
    background: #1d4ed8;
}

.placeholder {
    padding: 24px;
    text-align: center;
    color: #666;
}

.print-title {
    margin: 0 0 16px;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
}

.print-sheet {
    page-break-after: always;
}

.print-sheet:last-child {
    page-break-after: auto;
}

.print-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border: 1px solid #000;
    border-right: none;
    border-bottom: none;
}

.print-cell {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    padding: 6px 8px;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.cell-header {
    display: flex;
    flex-direction: column;
    font-size: 10px;
    margin-bottom: 4px;
}

.cell-num,
.cell-pos {
    line-height: 1.2;
}

.cell-photo {
    width: 100%;
    aspect-ratio: 1;
    max-width: 64px;
    margin: 0 auto 4px;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.cell-photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cell-photo-placeholder {
    font-size: 10px;
    color: #6b7280;
}

.cell-name {
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2px;
}

.cell-line {
    border-bottom: 1px solid #000;
    margin-bottom: 2px;
}

.cell-extra {
    font-size: 9px;
    text-align: center;
    color: #374151;
}
</style>

<style>
@media print {
    .print-page-root {
        padding: 0;
        max-width: none;
    }

    .no-print {
        display: none !important;
    }

    body {
        background: #fff;
    }

    .print-sheet {
        page-break-after: always;
    }

    .print-sheet:last-child {
        page-break-after: auto;
    }

    .print-grid {
        grid-template-columns: repeat(5, 1fr);
    }

    .print-cell {
        height: 46mm;
        min-height: 46mm;
        box-sizing: border-box;
    }

    .cell-photo {
        max-width: 100%;
        aspect-ratio: 1;
    }
}
</style>
