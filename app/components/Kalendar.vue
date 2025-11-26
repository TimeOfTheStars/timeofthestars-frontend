<template>
    <div class="space-y-6 md:space-y-8">
        <div>
            <h3
                class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-accent-blue flex items-center justify-center mt-8 gap-2"
            >
                <span class="text-2xl md:text-3xl">🗓️</span>
                {{ title }}
            </h3>
            <div class="space-y-3 md:space-y-4">
                <div
                    v-for="match in games"
                    :key="match.id"
                    class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                >
                    <div
                        :class="getMatchStatusClass(getMatchStatus(match))"
                        class="absolute top-4 left-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                    >
                        {{ getMatchStatus(match) }}
                    </div>
                    <div
                        class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                        <!-- Дата и время -->
                        <div
                            class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                        >
                            <div class="font-medium">
                                {{ formatDateToRussian(match.date) }}
                            </div>
                            <div>{{ formatTime(match.time) }}</div>
                            <div class="text-gray-500">
                                {{ match.location }}
                            </div>
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
                                        :src="
                                            getTeamLogo(
                                                getTeamLogoUrl(match.team_a_id)
                                            )
                                        "
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
                                    ></div>
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
                                        :src="
                                            getTeamLogo(
                                                getTeamLogoUrl(match.team_b_id)
                                            )
                                        "
                                        :alt="getTeamName(match.team_b_id)"
                                        class="object-contain rounded-full w-full h-full"
                                    />
                                </div>
                            </NuxtLink>
                        </div>

                        <!-- Статус -->
                        <div
                            :class="getMatchStatusClass(getMatchStatus(match))"
                            class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                        >
                            {{ getMatchStatus(match) }}
                        </div>
                    </div>
                    <!-- Кнопка протокола -->
                    <div class="mt-3 md:mt-4 flex justify-center">
                        <NuxtLink
                            v-if="match.score_team_a"
                            :to="`/matches/${match.scan}`"
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
                    <div class="flex items-center justify-center">
                        <NuxtLink
                            class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                            :to="match.video_url"
                        >
                            Смотреть трансляцию
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getTeamLogo } from '#imports'

const props = defineProps({
    turnirData: {
        type: Object,
        required: true,
    },
    dataType: {
        type: String,
        default: 'championship', // 'championship' or 'tournament'
    },
})

const title = computed(() => {
    return props.dataType === 'tournament'
        ? 'Расписание матчей турнира'
        : 'Расписание матчей чемпионата'
})

const games = ref([])
const teams = ref([])

onMounted(async () => {
    if (!props.turnirData || props.turnirData.length === 0) {
        return
    }
    const id = props.turnirData[0].id
    const endpoint = props.dataType + 's'

    try {
        games.value = await $fetch(
            `https://api.timeofthestars.ru/${endpoint}/${id}/games`
        )
    } catch (error) {
        console.error(`Ошибка при получении игр ${props.dataType}:`, error)
    }
    try {
        teams.value = await $fetch(
            `https://api.timeofthestars.ru/${endpoint}/${id}/teams`
        )
    } catch (error) {
        console.error(`Ошибка при получении команд ${props.dataType}:`, error)
    }
})

function getTeamName(teamId) {
    const team = teams.value.find(team => team.id === teamId)
    return team ? team.name : ''
}

function formatTime(timeString) {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
}

function formatDateToRussian(dateString) {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })
        .replace(' г.', '')
}

function getMatchStatus(match) {
    if (
        match.date === '2025-11-09' ||
        match.date === '2025-11-15' ||
        match.date === '2025-11-23'
    ) {
        return 'Перенесен'
    }
    if (match.score_team_a != null) {
        return 'Завершен'
    }

    if (!match.date) {
        return 'Неизвестно'
    }

    const now = new Date()
    const [year, month, day] = match.date.split('-').map(Number)

    let matchDateTime

    if (match.time) {
        const [hours, minutes] = match.time.split(':').map(Number)
        matchDateTime = new Date(year, month - 1, day, hours, minutes)
    } else {
        // if no time is available, check against the end of the day
        matchDateTime = new Date(year, month - 1, day, 23, 59, 59)
    }

    if (matchDateTime > now) {
        return 'Запланирован'
    } else {
        return 'В процессе'
    }
}

function getMatchStatusClass(status) {
    switch (status) {
        case 'Завершен':
            return 'bg-blue-600/20 text-blue-400'
        case 'Запланирован':
            return 'bg-green-600/20 text-green-400'
        case 'В процессе':
            return 'bg-orange-600/20 text-orange-400'
        case 'Перенесен':
            return 'bg-yellow-600/20 text-yellow-400'
        default:
            return 'bg-gray-600/20 text-gray-400'
    }
}

function getTeamLogoUrl(teamId) {
    const team = teams.value.find(team => team.id === teamId)
    return team ? team.logo_url : null
}
</script>
