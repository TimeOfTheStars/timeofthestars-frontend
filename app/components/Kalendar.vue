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
                <!-- ПAST: кнопка раскрытия -->
                <div class="flex flex-col gap-2">
                    <button
                        @click="isPastExpanded = !isPastExpanded"
                        class="w-full flex items-center justify-between p-3 md:p-4 bg-gray-800 hover:bg-gray-700 rounded-lg md:rounded-xl transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <span
                                class="text-lg md:text-xl transition-transform duration-300"
                                :class="{ 'rotate-90': isPastExpanded }"
                                >➤</span
                            >
                            <div class="flex flex-col text-left">
                                <span
    tate                            class="text-sm md:text-base text-accent-blue font-semibold"
                                    >Прошлые матчи</span
                                >
                                <span class="text-xs md:text-sm text-gray-400"
                                    >Всего: {{ pastMatches.length }}</span
                                >
                            </div>
                        </div>
                        <span class="text-xs text-gray-400"
                            >Нажмите, чтобы открыть</span
                        >
                    </button>

                    <div
                        class="overflow-hidden transition-all duration-300 ease-in-out"
                        :style="{
                            maxHeight: isPastExpanded ? '9999px' : '0px',
                        }"
                    >
                        <div class="space-y-3 md:space-y-4 pl-2 md:pl-4">
                            <div
                                v-for="match in pastMatches"
                                :key="`past-${match.id}`"
                                class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                            >
                                <!-- match card -->
                                <div
                                    :class="
                                        getMatchStatusClass(
                                            getMatchStatus(match)
                                        )
                                    "
                                    class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                                >
                                    {{ getMatchStatus(match) }}
                                </div>
                                <div
                                    class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                                >
                                    <div
                                        class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                                    >
                                        <div class="font-medium">
                                            {{
                                                formatDateToRussian(match.date)
                                            }}
                                        </div>
                                        <div>{{ formatTime(match.time) }}</div>
                                        <div class="text-gray-500">
                                            {{ match.location }}
                                        </div>
                                    </div>
                                    <div
                                        class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                                    >
                                        <NuxtLink
                                            :to="`/teams/${match.team_a_id}`"
                                            class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                        >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                            >
                                                <img
                                                    :src="
                                                        getTeamLogo(
                                                            getTeamLogoUrl(
                                                                match.team_a_id
                                                            )
                                                        )
                                                    "
                                                    :alt="
                                                        getTeamName(
                                                            match.team_a_id
                                                        )
                                                    "
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{
                                                    getTeamName(match.team_a_id)
                                                }}</span
                                            >
                                        </NuxtLink>
                                        <div
                                            class="flex flex-col items-center justify-self-center"
                                        >
                                            <div
                                                class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                            >
                                                <div>
                                                    {{
                                                        match.score_team_a !=
                                                        null
                                                            ? `${match.score_team_a} - ${match.score_team_b}`
                                                            : 'vs'
                                                    }}
                                                </div>
                                                <div
                                                    v-if="
                                                        match.bullet_win_team !==
                                                        null
                                                    "
                                                    class="text-base font-normal opacity-90"
                                                ></div>
                                            </div>
                                        </div>
                                        <NuxtLink
                                            :to="`/teams/${match.team_b_id}`"
                                            class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                        >
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{
                                                    getTeamName(match.team_b_id)
                                                }}</span
                                            >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                            >
                                                <img
                                                    :src="
                                                        getTeamLogo(
                                                            getTeamLogoUrl(
                                                                match.team_b_id
                                                            )
                                                        )
                                                    "
                                                    :alt="
                                                        getTeamName(
                                                            match.team_b_id
                                                        )
                                                    "
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                        </NuxtLink>
                                    </div>
                                    <div
                                        :class="
                                            getMatchStatusClass(
                                                getMatchStatus(match)
                                            )
                                        "
                                        class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                                    >
                                        {{ getMatchStatus(match) }}
                                    </div>
                                </div>
                                <div class="mt-3 md:mt-4 flex justify-center">
                                    <NuxtLink
                                        v-if="match.score_team_a"
                                        :to="`/matches/${match.scan}`"
                                        class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                        >Смотреть протокол</NuxtLink
                                    >
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
                                        v-if="match.video_url"
                                        class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                        :to="match.video_url"
                                        >Смотреть трансляцию</NuxtLink
                                    >
                                    <button
                                        v-else
                                        class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                        disabled
                                        aria-disabled="true"
                                        title="Трансляция недоступна"
                                    >
                                        Смотреть трансляцию
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Текущие матчи -->
                <div class="space-y-3 md:space-y-4">
                    <div
                        v-for="match in currentMatches"
                        :key="match.id"
                        class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                    >
                        <div
                            :class="getMatchStatusClass(getMatchStatus(match))"
                            class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                        >
                            {{ getMatchStatus(match) }}
                        </div>
                        <div
                            class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
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
                            <div
                                class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                            >
                                <NuxtLink
                                    :to="`/teams/${match.team_a_id}`"
                                    class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                >
                                    <div
                                        class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                    >
                                        <img
                                            :src="
                                                getTeamLogo(
                                                    getTeamLogoUrl(
                                                        match.team_a_id
                                                    )
                                                )
                                            "
                                            :alt="getTeamName(match.team_a_id)"
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                    <span
                                        class="font-medium text-sm truncate"
                                        >{{
                                            getTeamName(match.team_a_id)
                                        }}</span
                                    >
                                </NuxtLink>
                                <div
                                    class="flex flex-col items-center justify-self-center"
                                >
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
                                        <div
                                            v-if="
                                                match.bullet_win_team !== null
                                            "
                                            class="text-base font-normal opacity-90"
                                        ></div>
                                    </div>
                                </div>
                                <NuxtLink
                                    :to="`/teams/${match.team_b_id}`"
                                    class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                >
                                    <span
                                        class="font-medium text-sm truncate"
                                        >{{
                                            getTeamName(match.team_b_id)
                                        }}</span
                                    >
                                    <div
                                        class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                    >
                                        <img
                                            :src="
                                                getTeamLogo(
                                                    getTeamLogoUrl(
                                                        match.team_b_id
                                                    )
                                                )
                                            "
                                            :alt="getTeamName(match.team_b_id)"
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                </NuxtLink>
                            </div>
                            <div
                                :class="
                                    getMatchStatusClass(getMatchStatus(match))
                                "
                                class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                            >
                                {{ getMatchStatus(match) }}
                            </div>
                        </div>
                        <div class="mt-3 md:mt-4 flex justify-center">
                            <NuxtLink
                                v-if="match.score_team_a"
                                :to="`/matches/${match.scan}`"
                                class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                >Смотреть протокол</NuxtLink
                            >
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
                                v-if="match.video_url"
                                class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                :to="match.video_url"
                                >Смотреть трансляцию</NuxtLink
                            >
                            <button
                                v-else
                                class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                disabled
                                aria-disabled="true"
                                title="Трансляция недоступна"
                            >
                                Смотреть трансляцию
                            </button>
                        </div>
                    </div>
                </div>

                <!-- FUTURE: кнопка раскрытия -->
                <div class="flex flex-col gap-2">
                    <button
                        @click="isFutureExpanded = !isFutureExpanded"
                        class="w-full flex items-center justify-between p-3 md:p-4 bg-gray-800 hover:bg-gray-700 rounded-lg md:rounded-xl transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <span
                                class="text-lg md:text-xl transition-transform duration-300"
                                :class="{ 'rotate-90': isFutureExpanded }"
                                >➤</span
                            >
                            <div class="flex flex-col text-left">
                                <span
                                    class="text-sm md:text-base text-accent-blue font-semibold"
                                    >Будущие матчи</span
                                >
                                <span class="text-xs md:text-sm text-gray-400"
                                    >Всего: {{ futureMatches.length }}</span
                                >
                            </div>
                        </div>
                        <span class="text-xs text-gray-400"
                            >Нажмите, чтобы открыть</span
                        >
                    </button>

                    <div
                        class="overflow-hidden transition-all duration-300 ease-in-out"
                        :style="{
                            maxHeight: isFutureExpanded ? '9999px' : '0px',
                        }"
                    >
                        <div class="space-y-3 md:space-y-4 pl-2 md:pl-4">
                            <div
                                v-for="match in futureMatches"
                                :key="`future-${match.id}`"
                                class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                            >
                                <div
                                    :class="
                                        getMatchStatusClass(
                                            getMatchStatus(match)
                                        )
                                    "
                                    class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                                >
                                    {{ getMatchStatus(match) }}
                                </div>
                                <div
                                    class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                                >
                                    <div
                                        class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                                    >
                                        <div class="font-medium">
                                            {{
                                                formatDateToRussian(match.date)
                                            }}
                                        </div>
                                        <div>{{ formatTime(match.time) }}</div>
                                        <div class="text-gray-500">
                                            {{ match.location }}
                                        </div>
                                    </div>
                                    <div
                                        class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                                    >
                                        <NuxtLink
                                            :to="`/teams/${match.team_a_id}`"
                                            class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                        >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                            >
                                                <img
                                                    :src="
                                                        getTeamLogo(
                                                            getTeamLogoUrl(
                                                                match.team_a_id
                                                            )
                                                        )
                                                    "
                                                    :alt="
                                                        getTeamName(
                                                            match.team_a_id
                                                        )
                                                    "
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{
                                                    getTeamName(match.team_a_id)
                                                }}</span
                                            >
                                        </NuxtLink>
                                        <div
                                            class="flex flex-col items-center justify-self-center"
                                        >
                                            <div
                                                class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                            >
                                                <div>
                                                    {{
                                                        match.score_team_a !=
                                                        null
                                                            ? `${match.score_team_a} - ${match.score_team_b}`
                                                            : 'vs'
                                                    }}
                                                </div>
                                                <div
                                                    v-if="
                                                        match.bullet_win_team !==
                                                        null
                                                    "
                                                    class="text-base font-normal opacity-90"
                                                ></div>
                                            </div>
                                        </div>
                                        <NuxtLink
                                            :to="`/teams/${match.team_b_id}`"
                                            class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                        >
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{
                                                    getTeamName(match.team_b_id)
                                                }}</span
                                            >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                            >
                                                <img
                                                    :src="
                                                        getTeamLogo(
                                                            getTeamLogoUrl(
                                                                match.team_b_id
                                                            )
                                                        )
                                                    "
                                                    :alt="
                                                        getTeamName(
                                                            match.team_b_id
                                                        )
                                                    "
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                        </NuxtLink>
                                    </div>
                                    <div
                                        :class="
                                            getMatchStatusClass(
                                                getMatchStatus(match)
                                            )
                                        "
                                        class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                                    >
                                        {{ getMatchStatus(match) }}
                                    </div>
                                </div>
                                <div class="mt-3 md:mt-4 flex justify-center">
                                    <NuxtLink
                                        v-if="match.score_team_a"
                                        :to="`/matches/${match.scan}`"
                                        class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                        >Смотреть протокол</NuxtLink
                                    >
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
                                        v-if="match.video_url"
                                        class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                        :to="match.video_url"
                                        >Смотреть трансляцию</NuxtLink
                                    >
                                    <button
                                        v-else
                                        class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                        disabled
                                        aria-disabled="true"
                                        title="Трансляция недоступна"
                                    >
                                        Смотреть трансляцию
                                    </button>
                                </div>
                            </div>
                        </div>
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

// Функция для получения номера недели года
function getWeekNumber(dateString) {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const firstDayOfYear = new Date(year, 0, 1)
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// Функция для получения первого дня недели
function getWeekStart(dateString) {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const dayOfWeek = date.getDay() || 7
    const diff = date.getDate() - dayOfWeek + 1
    const weekStart = new Date(date.setDate(diff))
    return weekStart.toISOString().split('T')[0]
}

// Получение номера текущей недели
const currentWeekNumber = computed(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return getWeekNumber(`${year}-${month}-${day}`)
})

// Collapsed state for past / future sections
const isPastExpanded = ref(false)
const isFutureExpanded = ref(false)

// Разделение матчей на прошлые, текущие и будущие по номеру недели
const pastMatches = computed(() => {
    return games.value
        .filter(m => m.date && getWeekNumber(m.date) < currentWeekNumber.value)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const currentMatches = computed(() => {
    return games.value
        .filter(
            m => m.date && getWeekNumber(m.date) === currentWeekNumber.value
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
})

const futureMatches = computed(() => {
    return games.value
        .filter(m => m.date && getWeekNumber(m.date) > currentWeekNumber.value)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
})

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
        match.date === '2025-11-23' ||
        match.date === '2025-11-29'
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
