<template>
    <div class="space-y-6 md:space-y-8">
        <div>
            <h3
                class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-accent-blue flex items-center justify-center mt-8 gap-2"
            >
                <span class="text-2xl md:text-3xl">🗓️</span>
                Расписание матчей чемпионата
            </h3>
            <div class="space-y-3 md:space-y-4">
                <div
                    v-for="match in turnirDataCurrent.games"
                    :key="match.id"
                    class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover"
                >
                    <div
                        class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                        <!-- Дата и время -->
                        <div
                            class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                        >
                            <div class="font-medium">
                                {{ formatDate(match.date) }}
                            </div>
                            <div>{{ formatTime(match.time) }}</div>
                        </div>

                        <!-- Команды и счет -->
                        <div
                            class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                        >
                            <!-- Команда 1 -->
                            <NuxtLink
                                :to="`/teams/${match.team_a_id}`"
                                class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                            >
                                <div
                                    class="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                >
                                    <img
                                        :src="getTeamLogo(match.team_a_id)"
                                        :alt="getTeamName(match.team_a_id)"
                                        class="object-contain rounded-full w-full h-full"
                                    />
                                </div>
                                <span class="font-medium text-sm truncate">{{
                                    getTeamName(match.team_a_id)
                                }}</span>
                            </NuxtLink>

                            <!-- Счет и буллиты -->
                            <div
                                class="flex flex-col items-center justify-self-center"
                            >
                                <!-- Объединенный блок счета -->
                                <div
                                    class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                >
                                    <div>
                                        {{
                                            match.score_team_a != null
                                                ? `${match.score_team_a} - ${match.score_team_b}`
                                                : 'vs'
                                        }}
                                    </div>
                                    <!-- Буллиты в скобках -->
                                    <div
                                        v-if="match.bullet_win_team !== null"
                                        class="text-base font-normal opacity-90"
                                    >
                                        ({{ formatBulletScore(match) }} б)
                                    </div>
                                </div>
                            </div>

                            <!-- Команда 2 -->
                            <NuxtLink
                                :to="`/teams/${match.team_b_id}`"
                                class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                            >
                                <span class="font-medium text-sm truncate">{{
                                    getTeamName(match.team_b_id)
                                }}</span>
                                <div
                                    class="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                >
                                    <img
                                        :src="getTeamLogo(match.team_b_id)"
                                        :alt="getTeamName(match.team_b_id)"
                                        class="object-contain rounded-full w-full h-full"
                                    />
                                </div>
                            </NuxtLink>
                        </div>

                        <!-- Статус -->
                        <div
                            class="bg-green-600/20 text-green-400 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ml-auto md:ml-0 md:w-32 text-center"
                        >
                            {{ getMatchStatus(match) }}
                        </div>
                    </div>
                    <!-- Кнопка протокола -->
                    <div class="mt-3 md:mt-4 flex justify-center">
                        <NuxtLink
                            v-if="isMatchCompleted(match)"
                            :to="`/matches/${match.id}`"
                            class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                        >
                            Смотреть протокол
                        </NuxtLink>
                        <button
                            v-else
                            class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                            disabled
                            aria-disabled="true"
                            title="Протокол будет доступен после завершения матча"
                        >
                            Смотреть протокол
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    turnirData: {
        type: Object,
        required: true,
    },
})

// Получаем первый турнир из массива
const turnirDataCurrent = computed(() => {
    if (!props.turnirData || props.turnirData.length === 0) {
        return { games: [], teams: [] }
    }
    return props.turnirData[0]
})

// Функция для получения названия команды по ID
const getTeamName = teamId => {
    const team = turnirDataCurrent.value.teams.find(t => t.id === teamId)
    return team ? team.name : `Команда ${teamId}`
}

// Функция для форматирования даты
const formatDate = dateString => {
    if (!dateString) return 'Дата уточняется'
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
    })
}

// Функция для форматирования времени
const formatTime = timeString => {
    if (!timeString) return 'Время уточняется'
    return timeString.slice(0, 5)
}

// Функция для форматирования счета буллитов
const formatBulletScore = match => {
    if (match.bullet_win_team === match.team_a_id) {
        return `${match.score_team_a + 1} - ${match.score_team_b}`
    } else if (match.bullet_win_team === match.team_b_id) {
        return `${match.score_team_a} - ${match.score_team_b + 1}`
    }
    return ''
}

const getMatchStatus = match => {
    if (match.score_team_a != null && match.score_team_b != null)
        return 'Завершен'

    const matchDate = new Date(match.date + 'T' + match.time)
    const now = new Date()

    if (matchDate > now) return 'Запланирован'
    return 'В процессе'
}

const isMatchCompleted = match => {
    return match.score_team_a != null && match.score_team_b != null
}
</script>
