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
                                <th class="px-4 py-4 text-center font-semibold w-16">
                                    Место
                                </th>
                                <th class="px-6 py-4 text-left font-semibold">
                                    Команда
                                </th>
                                <th class="px-6 py-4 text-center font-semibold">
                                    И
                                </th>
                                <th class="px-6 py-4 text-center font-semibold">
                                    Пб
                                </th>
                                <th class="px-6 py-4 text-center font-semibold">
                                    Н
                                </th>
                                <th class="px-6 py-4 text-center font-semibold">
                                    Пр
                                </th>
                                <th class="px-6 py-4 text-center font-semibold">
                                    Голы
                                </th>
                                <th class="px-6 py-4 text-center font-semibold">
                                    О
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="team in sortedStandings"
                                :key="team.id"
                                :class="`border-t border-gray-700 hover:bg-gray-700/50 transition-colors ${getStatusColor(
                                    team.status
                                )} table-row-${team.place-1} bg-opacity-10`"
                            >
                                <td class="px-4 py-4 text-center font-semibold">
                                    <span :class="['medal-' + (team.place-1)]">{{ team.place }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <NuxtLink :to="`/teams/${team.id}`" class="flex items-center gap-3 hover:text-accent-blue transition-colors">
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
                                    </NuxtLink>
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

            
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const standings = ref([
    {
        id: 5,
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
        id: 1,
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
        id: 2,
        team: 'ХК "Зубр"',
        logo: '/photo_53844715688281.png (1).webp',
        games: 1,
        wins: 1,
        draws: 0,
        losses: 0,
        goals: '8-2',
        points: 2,
        status: '',
    },
    {
        id: 3,
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
        id: 4,
        team: 'ХК "Ярославич"',
        logo: '/photo_53844715688281.png (3).webp',
        games: 1,
        wins: 0,
        draws: 0,
        losses: 1,
        goals: '2-8',
        points: 0,
        status: '',
    },
    
    {
        id: 6,
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
]);

// Вычисляем разность голов для каждой команды
const standingsWithGoalDiff = computed(() => {
    return standings.value.map(team => {
        const [scored, conceded] = team.goals.split('-').map(Number);
        return {
            ...team,
            goalDifference: scored - conceded
        };
    });
});

// Сортируем команды по очкам и разности голов
const sortedStandings = computed(() => {
    let sorted = [...standingsWithGoalDiff.value];
    
    // Сортируем по очкам (по убыванию)
    sorted.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        // При равенстве очков учитываем разность голов
        if (b.goalDifference !== a.goalDifference) {
            return b.goalDifference - a.goalDifference;
        }
        return 0;
    });
    
    // Добавляем место в зависимости от позиции в рейтинге
    return sorted.map((team, index) => {
        return {
            ...team,
            place: index + 1
        };
    });
});

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

<style>
.table-row-0 { background-color: rgba(255, 217, 0, 0.796); }
.table-row-1 { background-color: rgb(116, 116, 116); }
.table-row-2 { background-color: rgba(214, 133, 52, 0.881); }
.medal-0::before { content: "🥇"; margin-right: 4px; }
.medal-1::before { content: "🥈"; margin-right: 4px; }
.medal-2::before { content: "🥉"; margin-right: 4px; }
</style>    