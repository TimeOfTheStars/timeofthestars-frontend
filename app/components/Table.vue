<template>
    <section class="py-16 px-4">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">
                📊 Таблица
            </h2>

            <div class="overflow-x-auto">
                <table class="w-full text-sm sm:text-base">
                    <thead class="bg-gray-700">
                        <tr>
                            <th
                                class="px-2 py-3 text-center font-semibold sm:px-4 w-12 sm:w-16"
                            >
                                <span class="sm:hidden">#</span>
                                <span class="hidden sm:inline">Место</span>
                            </th>
                            <th
                                class="px-2 py-3 text-left font-semibold sm:px-6"
                            >
                                Команда
                            </th>
                            <th
                                class="px-2 py-3 text-center font-semibold sm:px-6"
                            >
                                И
                            </th>
                            <th
                                class="px-2 py-3 text-center font-semibold sm:px-6"
                            >
                                <span class="sm:hidden">В</span>
                                <span class="hidden sm:inline">Пб</span>
                            </th>
                            <th
                                class="hidden px-6 py-4 text-center font-semibold sm:table-cell"
                            >
                                Н
                            </th>
                            <th
                                class="px-2 py-3 text-center font-semibold sm:px-6"
                            >
                                <span class="sm:hidden">П</span>
                                <span class="hidden sm:inline">Пр</span>
                            </th>
                            <th
                                class="hidden px-6 py-4 text-center font-semibold sm:table-cell"
                            >
                                Голы
                            </th>
                            <th
                                class="px-2 py-3 text-center font-semibold sm:px-6"
                            >
                                О
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="team in sortedStandings"
                            :key="team.id"
                            class="border-t border-gray-700 transition-colors hover:bg-gray-700/50"
                        >
                            <td
                                class="px-2 py-3 text-center font-semibold sm:px-4"
                            >
                                <span>{{ team.place }}</span>
                            </td>
                            <td class="px-2 py-3 sm:px-6">
                                <NuxtLink
                                    :to="`/teams/${team.id}`"
                                    class="flex items-center gap-3 transition-colors hover:text-accent-blue"
                                >
                                    <div
                                        class="relative h-8 w-8 hidden sm:block"
                                    >
                                        <img
                                            :src="team.logo"
                                            :alt="team.team"
                                            class="h-full w-full rounded-full object-contain"
                                        />
                                    </div>
                                    <span class="font-medium">{{
                                        team.team
                                    }}</span>
                                </NuxtLink>
                            </td>
                            <td class="px-2 py-3 text-center sm:px-6">
                                {{ team.games }}
                            </td>
                            <td
                                class="px-2 py-3 text-center text-green-400 sm:px-6"
                            >
                                {{ team.wins }}
                            </td>
                            <td
                                class="hidden px-6 py-4 text-center text-gray-400 sm:table-cell"
                            >
                                {{ team.draws }}
                            </td>
                            <td
                                class="px-2 py-3 text-center text-red-400 sm:px-6"
                            >
                                {{ team.losses }}
                            </td>
                            <td class="hidden px-6 py-4 text-center sm:table-cell">
                                {{ team.goals }}
                            </td>
                            <td
                                class="px-2 py-3 text-center font-bold text-accent-blue sm:px-6 text-lg"
                            >
                                {{ team.points }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    turnirData: {
        type: Object,
        required: false,
        default: null,
    },
})

// Если данные не переданы через props, получаем их из API
const turnirdata = ref([])

onMounted(async () => {
    try {
        const tournaments = await $fetch(
            `https://api.timeofthestars.ru/tournaments/${1}/teams`
        )
        turnirdata.value = tournaments
    } catch (error) {
        console.error('Ошибка при получении данных:', error)
    }
})

const tournamentTeamsData = computed(() => {
    // Если данные переданы через props (для чемпионата), используем их
    if (props.turnirData && props.turnirData.length > 0 && props.turnirData) {
        return props.turnirData
    }

    // Иначе используем данные из API (для турниров)
    else if (
        !turnirdata.value ||
        turnirdata.value.length === 0 ||
        !turnirdata.value
    ) {
        return []
    }
    return turnirdata.value
})

const sortedStandings = computed(() => {
    const processedTeams = tournamentTeamsData.value.map(team => {
        const goals_scored = team.stats?.goals_scored ?? 0
        const goals_conceded = team.stats?.goals_conceded ?? 0
        const wins = team.stats?.wins ?? 0
        const draws = team.stats?.draws ?? 0
        const extra_points = team.stats?.extra_points ?? 0
        return {
            id: team.id,
            team: team.name,
            logo: getTeamLogo(team.logo_url) || '/zvezdalogo.webp',
            games: team.stats?.games ?? 0,
            wins: team.stats?.wins ?? 0,
            draws: team.stats?.draws ?? 0,
            losses: team.stats?.losses ?? 0,
            goals: `${goals_scored}-${goals_conceded}`,
            points: team.stats?.points ?? 0,
        }
    })

    let sorted = [...processedTeams]
    sorted.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points
        }
        const a_scored = a.goals.split('-').map(Number)[0]
        const b_scored = b.goals.split('-').map(Number)[0]
        if (b_scored !== a_scored) {
            return b_scored - a_scored
        }
        return 0
    })

    return sorted.map((team, index) => {
        return {
            ...team,
            place: index + 1,
        }
    })
})

/*
const getGradientClass = place => {
    switch (place) {
        case 1:
            return 'gold-gradient'
        case 2:
            return 'silver-gradient'
        case 3:
            return 'bronze-gradient'
        default:
            return 'bg-gray-600/10'
    }
}
*/
</script>

<style>
/*
.gold-gradient {
    background: linear-gradient(
        90deg,
        rgb(255, 217, 0) 0%,
        rgba(255, 217, 0, 0.295) 40%,
        rgba(75, 85, 99, 0.1) 100%
    );
}

.silver-gradient {
    background: linear-gradient(
        90deg,
        rgb(192, 192, 192) 0%,
        rgba(192, 192, 192, 0.288) 40%,
        rgba(75, 85, 99, 0.1) 100%
    );
}

.bronze-gradient {
    background: linear-gradient(
        90deg,
        rgb(205, 128, 50) 0%,
        rgba(205, 128, 50, 0.281) 40%,
        rgba(75, 85, 99, 0.1) 100%
    );
}

.medal-0::before {
    content: '🥇';
    margin-right: 4px;
}
.medal-1::before {
    content: '🥈';
    margin-right: 4px;
}
.medal-2::before {
    content: '🥉';
    margin-right: 4px;
}
*/
</style>
