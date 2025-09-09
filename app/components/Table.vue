<template>
    <section class="py-16 px-4">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">
                📊 Рейтинг команд
            </h2>

            <div
                class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
            >
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-700">
                            <tr>
                                <!--
                                <th
                                    class="px-6 py-4 text-left font-semibold"
                                >
                                    Место
                                </th>
                                -->
                                <th
                                    class="px-6 py-4 text-left font-semibold"
                                >
                                    Команда
                                </th>
                                <th
                                    class="px-6 py-4 text-center font-semibold"
                                >
                                    И
                                </th>
                                <th
                                    class="px-6 py-4 text-center font-semibold"
                                >
                                    Пб
                                </th>
                                <th
                                    class="px-6 py-4 text-center font-semibold"
                                >
                                    Н
                                </th>
                                <th
                                    class="px-6 py-4 text-center font-semibold"
                                >
                                    Пр
                                </th>
                                <th
                                    class="px-6 py-4 text-center font-semibold"
                                >
                                    Голы
                                </th>
                                <th
                                    class="px-6 py-4 text-center font-semibold"
                                >
                                    О
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(team, index) in standings"
                                :key="index"
                                :class="`border-t border-gray-700 hover:bg-gray-700/50 transition-colors ${getStatusColor(
                                    team.status
                                )} bg-opacity-10`"
                            >
                                <!--
                                <td class="px-6 py-4 font-semibold text-lg">
                                    {{ team.place }}
                                </td>
                                -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 relative">
                                            <img
                                                :src="team.logo"
                                                :alt="team.team"
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <span class="font-medium">{{
                                            team.team
                                        }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {{ team.games }}
                                </td>
                                <td
                                    class="px-6 py-4 text-center text-green-400"
                                >
                                    {{ team.wins }}
                                </td>
                                <td
                                    class="px-6 py-4 text-center text-gray-400"
                                >
                                    {{ team.draws }}
                                </td>
                                <td
                                    class="px-6 py-4 text-center text-red-400"
                                >
                                    {{ team.losses }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {{ team.goals }}
                                </td>
                                <td
                                    class="px-6 py-4 text-center font-bold text-accent-blue text-lg"
                                >
                                    {{ team.points }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-6 mt-8">
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-green-600 rounded"></div>
                    <span class="text-sm">Плей-офф</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-yellow-600 rounded"></div>
                    <span class="text-sm">Переходные матчи</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-red-600 rounded"></div>
                    <span class="text-sm">Вылет</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const standings = ref([
    {
        // place: '1',
        team: 'ХК "Торпедо"',
        logo: '/photo_53844715688281.png (4).webp',
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: '0-0',
        points: 0,
        status: '',
    },
    {
        // place: '2',
        team: 'ХК "Переславль"',
        logo: '/newPereslavl.webp',
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: '0-0',
        points: 0,
        status: '',
    },
    {
        // place: '3',
        team: 'ХК "Зубр"',
        logo: '/photo_53844715688281.png (1).webp',
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: '0-0',
        points: 0,
        status: '',
    },
    {
        // place: '4',
        team: 'ХК "Вымпел-v"',
        logo: '/photo_53844715688281.png (2).webp',
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: '0-0',
        points: 0,
        status: '',
    },
    
    {
        // place: '6',
        team: 'ХК "Ярославич"',
        logo: '/photo_53844715688281.png (3).webp',
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: '0-0',
        points: 0,
        status: '',
    },
    
    {
        // place: '8',
        team: 'ХК "БГВ"',
        logo: '/BGV.webp',
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: '0-0',
        points: 0,
        status: '',
    },
])

const getStatusColor = (status) => {
    switch (status) {
        case 'playoff':
            return 'bg-green-600'
        case 'transition':
            return 'bg-yellow-600'
        case 'relegation':
            return 'bg-red-600'
        default:
            return 'bg-gray-600'
    }
}
</script>