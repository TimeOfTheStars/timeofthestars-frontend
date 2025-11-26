<template>
    <div class="py-12 bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-white mb-12">
                Индивидуальные награды
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Best Scorer -->
                <div
                    v-if="bestBombardier && bombardierTeam"
                    class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-blue/30 flex flex-col justify-between"
                >
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <h3 class="text-xl font-semibold text-primary-blue">
                                Лучший бомбардир
                            </h3>
                        </div>
                        <div class="flex justify-center mb-4">
                            <img
                                :src="getPlayerPhoto(bestBombardier.photo_url)"
                                alt="Best Scorer"
                                class="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                            />
                        </div>
                        <h4 class="text-2xl font-bold text-center text-white">
                            {{ bestBombardier.full_name }}
                        </h4>
                        <div
                            class="flex flex-col items-center justify-center gap-2 mt-1 text-gray-400"
                        >
                            <img
                                :src="getTeamLogo(bombardierTeam.logo_url)"
                                alt=""
                                class="w-8 h-8"
                            />
                            <span>{{ bombardierTeam.name }}</span>
                        </div>
                    </div>
                    <div class="bg-gray-700/50 p-4">
                        <div class="flex justify-around text-center">
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{ bestBombardier.stats.goals }}
                                </p>
                                <p class="text-sm text-gray-400">Голы</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{ bestBombardier.stats.assists }}
                                </p>
                                <p class="text-sm text-gray-400">Пасы</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{ bestBombardier.stats.matches }}
                                </p>
                                <p class="text-sm text-gray-400">Матчи</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-blue/30 p-6"
                >
                    <div class="text-center mb-4">
                        <h3 class="text-xl font-semibold text-primary-blue">
                            Лучший бомбардир
                        </h3>
                    </div>
                    <div class="flex justify-center mb-4">
                        <img
                            src="/pictures/players/defaultplayer.jpg"
                            alt="Best Scorer"
                            class="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                        />
                    </div>
                    <h4 class="text-2xl font-bold text-center text-white">
                        Пока неизвестно
                    </h4>
                </div>

                <!-- Best Goalie -->
                <div
                    v-if="bestGoalie && goalieTeam"
                    class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-red/30 flex flex-col justify-between"
                >
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <h3 class="text-xl font-semibold text-primary-red">
                                Лучший вратарь
                            </h3>
                        </div>
                        <div class="flex justify-center mb-4">
                            <img
                                :src="getPlayerPhoto(bestGoalie.photo_url)"
                                alt="Best Goalie"
                                class="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                            />
                        </div>
                        <h4 class="text-2xl font-bold text-center text-white">
                            {{ bestGoalie.full_name }}
                        </h4>
                        <div
                            class="flex items-center justify-center gap-2 mt-1 text-gray-400"
                        >
                            <img
                                :src="getTeamLogo(goalieTeam.logo_url)"
                                alt="Team Logo"
                                class="w-6 h-6"
                            />
                            <span>{{ goalieTeam.name }}</span>
                        </div>
                    </div>
                    <div class="bg-gray-700/50 p-4">
                        <div class="flex justify-around text-center">
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{ bestGoalie.stats.matches }}
                                </p>
                                <p class="text-sm text-gray-400">Матчи</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{
                                        bestGoalie.stats.gaa
                                            ? bestGoalie.stats.gaa.toFixed(2)
                                            : 'N/A'
                                    }}
                                </p>
                                <p class="text-sm text-gray-400">КН</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-red/30 p-6"
                >
                    <div class="text-center mb-4">
                        <h3 class="text-xl font-semibold text-primary-red">
                            Лучший вратарь
                        </h3>
                    </div>
                    <div class="flex justify-center mb-4">
                        <img
                            src="/pictures/players/defaultplayer.jpg"
                            alt="Best Goalie"
                            class="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                        />
                    </div>
                    <h4 class="text-2xl font-bold text-center text-white">
                        Пока неизвестно
                    </h4>
                </div>

                <!-- Best Defenseman -->
                <div
                    v-if="bestDefenseman && defensemanTeam"
                    class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-primary-red/30 flex flex-col justify-between"
                >
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <h3 class="text-xl font-semibold">
                                Лучший защитник
                            </h3>
                        </div>
                        <div class="flex justify-center mb-4">
                            <img
                                :src="getPlayerPhoto(bestDefenseman.photo_url)"
                                alt="Best Defenseman"
                                class="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                            />
                        </div>
                        <h4 class="text-2xl font-bold text-center text-white">
                            {{ bestDefenseman.full_name }}
                        </h4>
                        <div
                            class="flex items-center justify-center gap-2 mt-1 text-gray-400"
                        >
                            <img
                                :src="getTeamLogo(defensemanTeam.logo_url)"
                                alt="Team Logo"
                                class="w-6 h-6"
                            />
                            <span>{{ defensemanTeam.name }}</span>
                        </div>
                    </div>
                    <div class="bg-gray-700/50 p-4">
                        <div class="flex justify-around text-center">
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{
                                        bestDefenseman.stats.goals +
                                        bestDefenseman.stats.assists
                                    }}
                                </p>
                                <p class="text-sm text-gray-400">Очки</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{ bestDefenseman.stats.assists }}
                                </p>
                                <p class="text-sm text-gray-400">Пасы</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-white">
                                    {{ bestDefenseman.stats.matches }}
                                </p>
                                <p class="text-sm text-gray-400">Матчи</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="bg-gray-800 rounded-2xl overflow-hidden card-hover border border-green-500/30 p-6"
                >
                    <div class="text-center mb-4">
                        <h3 class="text-xl font-semibold text-green-500">
                            Лучший защитник
                        </h3>
                    </div>
                    <div class="flex justify-center mb-4">
                        <img
                            src="/pictures/players/defaultplayer.jpg"
                            alt="Best Defenseman"
                            class="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                        />
                    </div>
                    <h4 class="text-2xl font-bold text-center text-white">
                        Пока неизвестно
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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

const playersData = ref<Player[]>([])
const bombardierTeam = ref<Team | null>(null)
const goalieTeam = ref<Team | null>(null)
const defensemanTeam = ref<Team | null>(null)

onMounted(async () => {
    try {
        playersData.value = await $fetch(
            `https://api.timeofthestars.ru/championships/1/players`
        )
    } catch (error) {
        console.error('Ошибка при получении данных:', error)
    }
})

const getTeamLogo = (logoUrl: string | undefined) => {
    if (!logoUrl) return '/pictures/teams/default.png'
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

const bestBombardier = computed(() => {
    if (!playersData.value?.length) {
        return null
    }
    const sortedBombardiers = [...playersData.value]
        .filter(p => p.position !== 'вратарь')
        .sort((a, b) => b.stats.goals - a.stats.goals)
    return sortedBombardiers.length > 0 ? sortedBombardiers[0] : null
})

const bestGoalie = computed(() => {
    if (!playersData.value?.length) {
        return null
    }
    const goalies = playersData.value.filter(p => p.position === 'вратарь')
    if (!goalies.length) {
        return null
    }
    goalies.sort((a, b) => {
        if (a.stats.gaa === null) return 1
        if (b.stats.gaa === null) return -1
        return a.stats.gaa - b.stats.gaa
    })
    return goalies[0]
})

const bestDefenseman = computed(() => {
    if (!playersData.value?.length) {
        return null
    }
    const defensemen = playersData.value.filter(p => p.position === 'защитник')
    if (!defensemen.length) {
        return null
    }
    defensemen.sort((a, b) => b.stats.assists - a.stats.assists)
    return defensemen[0]
})

watch(bestBombardier, async newBombardier => {
    if (newBombardier && newBombardier.team_id) {
        try {
            bombardierTeam.value = await $fetch(
                `https://api.timeofthestars.ru/teams/${newBombardier.team_id}`
            )
        } catch (error) {
            console.error('Ошибка при получении данных о команде:', error)
            bombardierTeam.value = null
        }
    } else {
        bombardierTeam.value = null
    }
})

watch(bestGoalie, async newGoalie => {
    if (newGoalie && newGoalie.team_id) {
        try {
            goalieTeam.value = await $fetch(
                `https://api.timeofthestars.ru/teams/${newGoalie.team_id}`
            )
        } catch (error) {
            console.error('Ошибка при получении данных о команде:', error)
            goalieTeam.value = null
        }
    } else {
        goalieTeam.value = null
    }
})

watch(bestDefenseman, async newDefenseman => {
    if (newDefenseman && newDefenseman.team_id) {
        try {
            defensemanTeam.value = await $fetch(
                `https://api.timeofthestars.ru/teams/${newDefenseman.team_id}`
            )
        } catch (error) {
            console.error('Ошибка при получении данных о команде:', error)
            defensemanTeam.value = null
        }
    } else {
        defensemanTeam.value = null
    }
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
