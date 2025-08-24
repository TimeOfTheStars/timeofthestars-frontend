<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Header />

        <!-- Tournament Header -->
        <section class="relative overflow-hidden">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-red/20"
            ></div>
            <div class="gradient-bg py-20 px-4 relative">
                <div class="max-w-6xl mx-auto text-center">
                    <div class="flex justify-center mb-6">
                        <img
                            class="w-60 h-70"
                            src="/zvezdalogo.webp"
                            alt="Zvezda Logo"
                        />
                    </div>

                    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">
                        Звезда Отечества
                    </h1>
                    <p class="text-xl text-white/90 mb-8">
                        Чемпионат среди любительских спорткоманд
                    </p>
                    <div
                        class="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-500/30"
                    >
                        <div
                            class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        ></div>
                        <span class="text-white font-semibold">
                            Плей-офф в процессе
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tournament Stats -->
        <section class="py-8 sm:py-12 md:py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div
                    class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center"
                >
                    <!-- Команды -->
                    <div class="space-y-1 sm:space-y-2 group p-3 sm:p-0">
                        <div
                            class="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300"
                        >
                            👥
                        </div>
                        <div
                            class="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient"
                        >
                            8
                        </div>
                        <div class="text-gray-300 text-sm sm:text-base">
                            Команд
                        </div>
                    </div>

                    <!-- Матчи -->
                    <div class="space-y-1 sm:space-y-2 group p-3 sm:p-0">
                        <div
                            class="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300"
                        >
                            🏒
                        </div>
                        <div
                            class="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient"
                        >
                            112
                        </div>
                        <div class="text-gray-300 text-sm sm:text-base">
                            Матчей
                        </div>
                    </div>

                    <!-- Голы -->
                    <div class="space-y-1 sm:space-y-2 group p-3 sm:p-0">
                        <div
                            class="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300"
                        >
                            ⚽
                        </div>
                        <div
                            class="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient"
                        >
                            756
                        </div>
                        <div class="text-gray-300 text-sm sm:text-base">
                            Голов
                        </div>
                    </div>

                    <!-- Плей-офф -->
                    <div class="space-y-1 sm:space-y-2 group p-3 sm:p-0">
                        <div
                            class="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300"
                        >
                            🏆
                        </div>
                        <div
                            class="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient"
                        >
                            4
                        </div>
                        <div class="text-gray-300 text-sm sm:text-base">
                            В плей-офф
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section
            class="py-6 sm:py-8 px-4 bg-red-900/20 border-y border-red-500/30"
        >
            <div class="max-w-6xl mx-auto">
                <div
                    class="bg-red-900/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-500/30"
                >
                   
                    <div
                        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-0"
                    >
                        <div class="flex items-center gap-2 sm:gap-4">
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"
                                ></div>
                                <span
                                    class="text-red-400 font-semibold text-sm sm:text-base"
                                >
                                    ФИНАЛ СЕГОДНЯ
                                </span>
                            </div>
                            <div class="text-white text-sm sm:text-base">
                                18.04.2025 • 20:00
                            </div>
                        </div>
                    </div>

                    
                    <div
                        class="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
                    >
                        
                        <div
                            class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto"
                        >
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0"
                            >
                                <img
                                    src="/photo_53844715688281.png (1).webp"
                                    alt="ХК Зубр"
                                    class="object-contain rounded-full w-full h-full"
                                />
                            </div>
                            <span
                                class="font-medium text-sm sm:text-base truncate"
                                >ХК "Зубр"</span
                            >
                        </div>

                        
                        <div
                            class="text-xl sm:text-2xl font-bold text-white px-2 sm:px-0"
                        >
                            VS
                        </div>

                        
                        <div
                            class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end"
                        >
                            <span
                                class="font-medium text-sm sm:text-base truncate"
                                >ХК "Локомотив"</span
                            >
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0"
                            >
                                <img
                                    src="/photo.png"
                                    alt="ХК Локомотив"
                                    class="object-contain rounded-full w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Navigation Tabs -->
        <section class="py-8 px-4 bg-gray-800 border-b border-gray-700">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-wrap justify-center gap-4">
                    <button
                        @click="scrollTo('participants')"
                        class="bg-primary-blue text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                    >
                        👥 Участники
                    </button>
                    <button
                        @click="scrollTo('playoff')"
                        class="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                    >
                        🏆 Плей-офф
                    </button>
                    <button
                        @click="scrollTo('standings')"
                        class="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                    >
                        📊 Таблица
                    </button>
                    <button
                        @click="scrollTo('matches')"
                        class="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                    >
                        🏒 Матчи
                    </button>
                </div>
            </div>
        </section>

        <!-- Participants -->
        <section id="participants" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    👥 Участники чемпионата
                </h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div
                        v-for="(team, index) in teams"
                        :key="index"
                        class="bg-gray-800 rounded-xl p-6 card-hover border border-gray-700"
                    >
                        <TurnirParticipants :team="team" />
                    </div>
                </div>
            </div>
        </section>

        <section
            id="playoff"
            class="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-gray-800"
        >
            <div class="max-w-6xl mx-auto">
                <h2
                    class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
                >
                    🏆 Плей-офф
                </h2>

                <div class="space-y-8 sm:space-y-12">
                    <div class="text-center">
                        <h3
                            class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gradient"
                        >
                            ФИНАЛ
                        </h3>
                        <div
                            class="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 max-w-lg mx-auto border-2 border-yellow-500/30"
                        >
                            <div
                                class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4"
                            >
                                18.04.2025 • 20:00
                            </div>

                            <div
                                class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4"
                            >
                                <div
                                    class="flex flex-col items-center sm:items-start sm:flex-row sm:gap-3"
                                >
                                    <div
                                        class="w-12 h-12 sm:w-14 sm:h-14 relative mb-2 sm:mb-0"
                                    >
                                        <img
                                            src="/photo_53844715688281.png (1).webp"
                                            alt="ХК Зубр"
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                    <div class="text-center sm:text-left">
                                        <div
                                            class="font-semibold text-sm sm:text-base"
                                        >
                                            ХК "Зубр"
                                        </div>
                                        <div
                                            class="text-xs sm:text-sm text-gray-400"
                                        >
                                            Полуфинал: 4-3
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="bg-yellow-600 px-4 py-2 rounded-lg text-white font-bold text-lg sm:text-xl my-2 sm:my-0"
                                >
                                    VS
                                </div>

                                <div
                                    class="flex flex-col items-center sm:items-end sm:flex-row-reverse sm:gap-3"
                                >
                                    <div
                                        class="w-12 h-12 sm:w-14 sm:h-14 relative mb-2 sm:mb-0"
                                    >
                                        <img
                                            src="/photo.png"
                                            alt="ХК Локомотив"
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                    <div class="text-center sm:text-right">
                                        <div
                                            class="font-semibold text-sm sm:text-base"
                                        >
                                            ХК "Локомотив"
                                        </div>
                                        <div
                                            class="text-xs sm:text-sm text-gray-400"
                                        >
                                            Полуфинал: 3-4
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <h3
                            class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-accent-red"
                        >
                            Матч за 3 место
                        </h3>
                        <div
                            class="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-lg mx-auto"
                        >
                            <div
                                class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4"
                            >
                                16.04.2025 • 20:30
                            </div>

                            <div
                                class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
                            >
                                <div
                                    class="flex flex-col items-center sm:flex-row sm:gap-3"
                                >
                                    <div
                                        class="w-10 h-10 sm:w-12 sm:h-12 relative mb-2 sm:mb-0"
                                    >
                                        <img
                                            src="/photo_53844715688281.png (4).webp"
                                            alt="ХК Торпедо"
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                    <div class="text-center sm:text-left">
                                        ХК "Торпедо"
                                    </div>
                                </div>

                                <div
                                    class="bg-green-600 px-4 py-2 rounded text-white font-bold text-lg my-2 sm:my-0"
                                >
                                    6-4
                                </div>

                                <div
                                    class="flex flex-col items-center sm:flex-row-reverse sm:gap-3"
                                >
                                    <div
                                        class="w-10 h-10 sm:w-12 sm:h-12 relative mb-2 sm:mb-0"
                                    >
                                        <img
                                            src="/FGFGF (1).png"
                                            alt="ХК Вымпел-k"
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                    <div class="text-center sm:text-right">
                                        ХК "Вымпел-k"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <h3
                            class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6"
                        >
                            Полуфинал
                        </h3>
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
                        >
                            <div
                                class="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6"
                            >
                                <div
                                    class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4"
                                >
                                    13.04.2025 • 19:30
                                </div>

                                <div
                                    class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
                                >
                                    <div
                                        class="flex flex-col items-center sm:flex-row sm:gap-2"
                                    >
                                        <div
                                            class="w-8 h-8 sm:w-10 sm:h-10 relative mb-2 sm:mb-0"
                                        >
                                            <img
                                                src="/photo_53844715688281.png (4).webp"
                                                alt="ХК Торпедо"
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <div
                                            class="text-center sm:text-left text-sm"
                                        >
                                            ХК "Торпедо"
                                        </div>
                                    </div>

                                    <div
                                        class="bg-green-600 px-3 py-1 rounded text-white font-bold text-base my-2 sm:my-0"
                                    >
                                        3-2(б)
                                    </div>

                                    <div
                                        class="flex flex-col items-center sm:flex-row-reverse sm:gap-2"
                                    >
                                        <div
                                            class="w-8 h-8 sm:w-10 sm:h-10 relative mb-2 sm:mb-0"
                                        >
                                            <img
                                                src="/FGFGF (1).png"
                                                alt="ХК Вымпел-k"
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <div
                                            class="text-center sm:text-right text-sm"
                                        >
                                            ХК "Вымпел-k"
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6"
                            >
                                <div
                                    class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4"
                                >
                                    15.04.2025 • 20:00
                                </div>

                                <div
                                    class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
                                >
                                    <div
                                        class="flex flex-col items-center sm:flex-row sm:gap-2"
                                    >
                                        <div
                                            class="w-8 h-8 sm:w-10 sm:h-10 relative mb-2 sm:mb-0"
                                        >
                                            <img
                                                src="/photo_53844715688281.png (1).webp"
                                                alt="ХК Зубр"
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <div
                                            class="text-center sm:text-left text-sm"
                                        >
                                            ХК "Зубр"
                                        </div>
                                    </div>

                                    <div
                                        class="bg-green-600 px-3 py-1 rounded text-white font-bold text-base my-2 sm:my-0"
                                    >
                                        4-3
                                    </div>

                                    <div
                                        class="flex flex-col items-center sm:flex-row-reverse sm:gap-2"
                                    >
                                        <div
                                            class="w-8 h-8 sm:w-10 sm:h-10 relative mb-2 sm:mb-0"
                                        >
                                            <img
                                                src="/photo.png"
                                                alt="ХК Локомотив"
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <div
                                            class="text-center sm:text-right text-sm"
                                        >
                                            ХК "Локомотив"
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Standings -->
        <section id="standings">
            <Table />
        </section>

        <!-- Recent Matches -->
        <section id="matches" class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    🏒 Последние матчи
                </h2>

                <div
                    class="space-y-3 sm:space-y-4 max-w-4xl mx-auto px-2 sm:px-0"
                >
                    <div
                        v-for="(match, index) in matches"
                        :key="index"
                        class="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 card-hover"
                    >
                        <Matches :match="match" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Social and Partners -->
        <section class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-2 gap-12">
                    <div class="text-center">
                        <h3 class="text-3xl font-bold mb-6">
                            📱 Следите за новостями
                        </h3>
                        <p class="text-gray-400 mb-6">
                            Получайте последние новости и результаты матчей
                        </p>
                        <a
                            href="https://vk.com/time_of_stars_cup"
                            class="inline-flex items-center gap-3 bg-primary-blue text-white px-8 py-4 rounded-xl hover:bg-secondary-blue transition-colors font-semibold"
                        >
                            <span class="text-2xl">📱</span>
                            Группа ВКонтакте
                        </a>
                    </div>

                    <div class="text-center">
                        <h3 class="text-3xl font-bold mb-6">
                            🤝 Партнёры турнира
                        </h3>
                        <div class="space-y-4">
                            <div class="bg-gray-800 rounded-xl p-4 card-hover">
                                <div
                                    class="flex items-center justify-center gap-3"
                                >
                                    <span class="text-3xl">🍕</span>
                                    <span class="text-xl font-semibold"
                                        >Pizza Fabrika</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { data: turnirdata } = useFetch(
    'https://api.timeofthestars.ru/api/tournaments'
)

const teams = computed(() => {
    if (!turnirdata.value || turnirdata.value.length === 0) {
        return []
    }
    return turnirdata.value[0].teams || []
})
const matches = computed(() => {
    if (!turnirdata.value || turnirdata.value.length === 0) {
        return []
    }
    return turnirdata.value[0].games || []
})

const scrollTo = id => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
.gradient-bg {
    background: linear-gradient(135deg, #1e3a8a 0%, #9f1239 100%);
}
.text-gradient {
    background: linear-gradient(90deg, #3b82f6 0%, #ef4444 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
