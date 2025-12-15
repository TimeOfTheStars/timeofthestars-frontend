<template>
    <div class="py-12 bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Лучшие снайперы -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center text-white mb-12">
                    Лучшие снайперы
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        v-for="player in topSnipers"
                        :key="player.id"
                        class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-blue/30"
                    >
                        <div class="p-4 flex items-center sm:flex-col sm:p-6">
                            <div class="flex-shrink-0 sm:mb-4">
                                <img
                                    :src="getPlayerPhoto(player.photo_url)"
                                    alt="Player photo"
                                    class="w-16 h-16 rounded-full object-cover border-2 border-gray-700 sm:w-32 sm:h-32 sm:border-4"
                                    @error="
                                        $event.target.src =
                                            '/pictures/players/defaultplayer.jpg'
                                    "
                                />
                            </div>
                            <div
                                class="ml-4 sm:ml-0 flex-grow sm:text-center"
                            >
                                <h4
                                    class="text-lg font-bold text-white sm:text-2xl"
                                >
                                    {{ player.full_name }}
                                </h4>
                                <div
                                    v-if="player.team"
                                    class="flex items-center gap-2 mt-1 text-gray-400 sm:justify-center"
                                >
                                    <img
                                        :src="
                                            getTeamLogo(player.team.logo_url)
                                        "
                                        alt=""
                                        class="w-5 h-5 sm:w-8 sm:h-8"
                                    />
                                    <span class="text-sm sm:text-base">{{
                                        player.team.name
                                    }}</span>
                                </div>
                                <div class="mt-2 sm:hidden">
                                    <div class="flex gap-4 text-left">
                                        <div>
                                            <p
                                                class="text-base font-bold text-white"
                                            >
                                                {{ player.stats.matches }}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                                Матчи
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-bold text-white"
                                            >
                                                {{ player.stats.goals }}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                                Голы
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden sm:block bg-gray-700/50 p-4">
                            <div class="flex justify-around text-center">
                                <div>
                                    <p
                                        class="text-2xl font-bold text-white"
                                    >
                                        {{ player.stats.matches }}
                                    </p>
                                    <p class="text-sm text-gray-400">Матчи</p>
                                </div>
                                <div>
                                    <p
                                        class="text-2xl font-bold text-white"
                                    >
                                        {{ player.stats.goals }}
                                    </p>
                                    <p class="text-sm text-gray-400">Голы</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Лучшие бомбардиры -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center text-white mb-12">
                    Лучшие бомбардиры
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        v-for="player in topScorers"
                        :key="player.id"
                        class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-red/30"
                    >
                        <div class="p-4 flex items-center sm:flex-col sm:p-6">
                            <div class="flex-shrink-0 sm:mb-4">
                                <img
                                    :src="getPlayerPhoto(player.photo_url)"
                                    alt="Player photo"
                                    class="w-16 h-16 rounded-full object-cover border-2 border-gray-700 sm:w-32 sm:h-32 sm:border-4"
                                    @error="
                                        $event.target.src =
                                            '/pictures/players/defaultplayer.jpg'
                                    "
                                />
                            </div>
                            <div
                                class="ml-4 sm:ml-0 flex-grow sm:text-center"
                            >
                                <h4
                                    class="text-lg font-bold text-white sm:text-2xl"
                                >
                                    {{ player.full_name }}
                                </h4>
                                <div
                                    v-if="player.team"
                                    class="flex items-center gap-2 mt-1 text-gray-400 sm:justify-center"
                                >
                                    <img
                                        :src="
                                            getTeamLogo(player.team.logo_url)
                                        "
                                        alt=""
                                        class="w-5 h-5 sm:w-8 sm:h-8"
                                    />
                                    <span class="text-sm sm:text-base">{{
                                        player.team.name
                                    }}</span>
                                </div>
                                <div class="mt-2 sm:hidden">
                                    <div class="flex gap-4 text-left">
                                        <div>
                                            <p
                                                class="text-base font-bold text-white"
                                            >
                                                {{ player.stats.matches }}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                                Матчи
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-bold text-white"
                                            >
                                                {{
                                                    player.stats.goals +
                                                    player.stats.assists
                                                }}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                                Очки
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden sm:block bg-gray-700/50 p-4">
                            <div class="flex justify-around text-center">
                                <div>
                                    <p
                                        class="text-2xl font-bold text-white"
                                    >
                                        {{ player.stats.matches }}
                                    </p>
                                    <p class="text-sm text-gray-400">Матчи</p>
                                </div>
                                <div>
                                    <p
                                        class="text-2xl font-bold text-white"
                                    >
                                        {{
                                            player.stats.goals +
                                            player.stats.assists
                                        }}
                                    </p>
                                    <p class="text-sm text-gray-400">Очки</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Лучшие ассистенты -->
            <div>
                <h2 class="text-3xl font-bold text-center text-white mb-12">
                    Лучшие ассистенты
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        v-for="player in topAssistants"
                        :key="player.id"
                        class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-green-500/30"
                    >
                        <div class="p-4 flex items-center sm:flex-col sm:p-6">
                            <div class="flex-shrink-0 sm:mb-4">
                                <img
                                    :src="getPlayerPhoto(player.photo_url)"
                                    alt="Player photo"
                                    class="w-16 h-16 rounded-full object-cover border-2 border-gray-700 sm:w-32 sm:h-32 sm:border-4"
                                    @error="
                                        $event.target.src =
                                            '/pictures/players/defaultplayer.jpg'
                                    "
                                />
                            </div>
                            <div
                                class="ml-4 sm:ml-0 flex-grow sm:text-center"
                            >
                                <h4
                                    class="text-lg font-bold text-white sm:text-2xl"
                                >
                                    {{ player.full_name }}
                                </h4>
                                <div
                                    v-if="player.team"
                                    class="flex items-center gap-2 mt-1 text-gray-400 sm:justify-center"
                                >
                                    <img
                                        :src="
                                            getTeamLogo(player.team.logo_url)
                                        "
                                        alt=""
                                        class="w-5 h-5 sm:w-8 sm:h-8"
                                    />
                                    <span class="text-sm sm:text-base">{{
                                        player.team.name
                                    }}</span>
                                </div>
                                <div class="mt-2 sm:hidden">
                                    <div class="flex gap-4 text-left">
                                        <div>
                                            <p
                                                class="text-base font-bold text-white"
                                            >
                                                {{ player.stats.matches }}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                                Матчи
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-bold text-white"
                                            >
                                                {{ player.stats.assists }}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                                Пасы
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden sm:block bg-gray-700/50 p-4">
                            <div class="flex justify-around text-center">
                                <div>
                                    <p
                                        class="text-2xl font-bold text-white"
                                    >
                                        {{ player.stats.matches }}
                                    </p>
                                    <p class="text-sm text-gray-400">Матчи</p>
                                </div>
                                <div>
                                    <p
                                        class="text-2xl font-bold text-white"
                                    >
                                        {{ player.stats.assists }}
                                    </p>
                                    <p class="text-sm text-gray-400">Пасы</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Player {
    full_name: string
    birth_date: string | null
    position: string
    grip: string
    photo_url: string | null
    id: number
    team_id: number
    team_name: string
    stats: {
        number: number
        matches: number
        goals: number
        assists: number
        penalties: number
        gaa: number | null
    }
}

interface Team {
    name: string
    slug: string
    city: string
    players_count: number
    logo_url: string
    id: number
}

interface ProcessedPlayer extends Player {
    team: Team | null
}

const props = defineProps({
    championshipId: {
        type: Number,
        default: 1,
    },
})

const playersData = ref<Player[]>([])
const teamsData = ref<Team[]>([])

onMounted(async () => {
    try {
        const [players, teams] = await Promise.all([
            $fetch<Player[]>(
                `https://api.timeofthestars.ru/championships/${props.championshipId}/players`
            ),
            $fetch<Team[]>(
                `https://api.timeofthestars.ru/championships/${props.championshipId}/teams`
            ),
        ])
        playersData.value = players
        teamsData.value = teams
    } catch (error) {
        console.error('Ошибка при получении данных:', error)
    }
})

const getTeamLogo = (logoUrl: string | undefined) => {
    if (!logoUrl) return '/pictures/teams/vremyazvezd.png'
    return logoUrl.startsWith('http') ? logoUrl : `/pictures/teams/${logoUrl}`
}

const getPlayerPhoto = (photoUrl: string | null | undefined) => {
    if (!photoUrl) {
        return '/pictures/players/defaultplayer.jpg'
    }
    if (photoUrl.startsWith('http')) {
        return photoUrl
    }
    return `/pictures/players/${photoUrl}`
}

const processedPlayers = computed<ProcessedPlayer[]>(() => {
    if (!playersData.value?.length) {
        return []
    }

    if (!teamsData.value?.length) {
        return playersData.value.map(player => ({ ...player, team: null }))
    }

    return playersData.value.map(player => {
        const team = teamsData.value.find(t => t.id === player.team_id)
        return {
            ...player,
            team: team || null,
        }
    })
})

const topSnipers = computed(() => {
    return [...processedPlayers.value]
        .filter(p => p.position !== 'вратарь')
        .sort((a, b) => {
            if (b.stats.goals !== a.stats.goals) {
                return b.stats.goals - a.stats.goals
            }
            return a.stats.matches - b.stats.matches // Fewer matches is better
        })
        .slice(0, 5)
})

const topScorers = computed(() => {
    const getPoints = (p: ProcessedPlayer) => p.stats.goals + p.stats.assists
    return [...processedPlayers.value]
        .filter(p => p.position !== 'вратарь')
        .sort((a, b) => {
            if (getPoints(b) !== getPoints(a)) {
                return getPoints(b) - getPoints(a)
            }
            return a.stats.matches - b.stats.matches // Fewer matches is better
        })
        .slice(0, 5)
})

const topAssistants = computed(() => {
    return [...processedPlayers.value]
        .filter(p => p.position !== 'вратарь')
        .sort((a, b) => {
            if (b.stats.assists !== a.stats.assists) {
                return b.stats.assists - a.stats.assists
            }
            return a.stats.matches - b.stats.matches // Fewer matches is better
        })
        .slice(0, 5)
})
</script>

<style scoped>
.card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>
