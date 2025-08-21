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
                    <div class="text-7xl mb-6">🏆</div>
                    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">
                        КУБОК ПОБЕДЫ
                    </h1>
                    <p class="text-xl text-white/90 mb-8">Хоккейный турнир</p>
                    <div
                        class="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30"
                    >
                        <span class="text-green-400">✅</span>
                        <span class="text-white font-semibold">
                            Турнир завершен
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tournament Stats -->
        <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            👥
                        </div>
                        <div class="text-4xl font-bold text-gradient">5</div>
                        <div class="text-gray-300">Команд</div>
                    </div>
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            🏒
                        </div>
                        <div class="text-4xl font-bold text-gradient">15</div>
                        <div class="text-gray-300">Матчей</div>
                    </div>
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            ⚽
                        </div>
                        <div class="text-4xl font-bold text-gradient">124</div>
                        <div class="text-gray-300">Голов</div>
                    </div>
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            🏆
                        </div>
                        <div class="text-4xl font-bold text-gradient">1</div>
                        <div class="text-gray-300">Победитель</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Navigation Tabs -->
        <section class="py-8 px-4 bg-gray-800 border-b border-gray-700">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-wrap justify-center gap-4">
                    <button @click="scrollTo('participants')" class="bg-primary-blue text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                        👥 Участники
                    </button>
                    <button @click="scrollTo('calendar')" class="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors">
                        📅 Календарь
                    </button>
                    <button @click="scrollTo('standings')" class="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors">
                        📊 Таблица
                    </button>
                    <button @click="scrollTo('results')" class="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors">
                        🏆 Результаты
                    </button>
                </div>
            </div>
        </section>

        <!-- Participants -->
        <section id="participants" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    👥 Участники турнира
                </h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        v-for="team in teams"
                        :key="team.id"
                        class="bg-gray-800 rounded-xl p-6 card-hover border border-gray-700"
                    >
                        <TurnirParticipants :team="team" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Calendar -->
        <section id="calendar" class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
             <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    📅 Календарь турнира
                </h2>
                <div class="bg-gray-800 rounded-xl p-8 text-center">
                    <div class="text-6xl mb-4">📅</div>
                    <p class="text-gray-300">
                        Календарь турнира будет доступен здесь
                    </p>
                </div>
            </div>
            </div>
        </section>

         <section id="results" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    🏆 Результаты матчей
                </h2>
                <div class="space-y-4 max-w-4xl mx-auto">
                    <div
                        v-for="(match, index) in matches"
                        :key="index"
                        class="bg-gray-800 rounded-xl p-6 card-hover"
                    >
                        <Matches :match="match" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Standings -->
        <section id="standings">
            <Table/>
        </section>

        <!-- Winner -->
        <section class="py-20 px-4 bg-gray-800">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-12">
                    🏆 Победитель Кубка Победы
                </h2>

                <div class="relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-red/20 rounded-2xl"
                    ></div>

                    <div
                        class="bg-gradient-to-br from-primary-blue to-primary-red p-4 sm:p-8 md:p-12 rounded-xl md:rounded-2xl relative w-full max-w-4xl mx-auto"
                    >
                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8"
                        >
                            <!-- Логотип -->
                            <div
                                class="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative mx-auto mb-4 sm:mb-6"
                            >
                                <img
                                    src="/photo_53844715688281.png (1).webp"
                                    alt="ХК Зубр"
                                    class="object-contain rounded-full w-full h-full"
                                />
                            </div>

                            <!-- Название и город -->
                            <div class="text-center">
                                <h3
                                    class="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-white truncate"
                                >
                                    ХК "Зубр"
                                </h3>
                                <p
                                    class="text-white/80 mb-6 sm:mb-8 text-base sm:text-lg"
                                >
                                    г. Ярославль
                                </p>
                            </div>

                            <!-- Статистика -->
                            <div
                                class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                            >
                                <!-- Процент побед -->
                                <div class="bg-white/10 rounded-lg p-3 sm:p-4">
                                    <div
                                        class="text-white/80 mb-1 sm:mb-2 text-sm sm:text-base"
                                    >
                                        4 победы из 6 игр
                                    </div>
                                    <div
                                        class="text-xl sm:text-2xl font-bold text-white"
                                    >
                                        66%
                                    </div>
                                    <div
                                        class="text-white/60 text-xs sm:text-sm"
                                    >
                                        Процент побед
                                    </div>
                                </div>

                                <!-- Очки -->
                                <div class="bg-white/10 rounded-lg p-3 sm:p-4">
                                    <div
                                        class="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                                    >
                                        7
                                    </div>
                                    <div
                                        class="text-white/80 text-sm sm:text-base"
                                    >
                                        Очков
                                    </div>
                                </div>
                            </div>

                            <!-- Дополнительная информация -->
                            <div class="mt-6 sm:mt-8">
                                <div
                                    class="text-white/80 text-base sm:text-lg text-center sm:text-left"
                                >
                                    Заслуженная победа в напряженной борьбе!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partners -->
        <section class="py-16 px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h3 class="text-3xl flex justify-center font-bold mb-8">
                    🤝 Партнёры турнира
                </h3>
                <div class="flex justify-center text-center">
                    <div class="bg-gray-800 rounded-xl p-6 card-hover">
                        <div class="flex items-center gap-4">
                            <span class="text-4xl">🍕</span>
                            <div>
                                <h4 class="text-xl font-semibold">
                                    Pizza Fabrika
                                </h4>
                                <p class="text-gray-400">
                                    Официальный партнер по питанию
                                </p>
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
const { data: turnirdata } = useFetch('https://api.timeofthestars.ru/api/tournaments');

console.log(turnirdata.value); 
const teams = computed(() => {
  if (!turnirdata.value || turnirdata.value.length === 0) {
    return [];
  }
  return turnirdata.value[0].teams || [];
});
const matches = computed(() => {
  if (!turnirdata.value || turnirdata.value.length === 0) {
    return [];
  }
  return turnirdata.value[0].games || [];
});

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

console.log(matches.value); 
</script>