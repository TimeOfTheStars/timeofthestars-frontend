<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Header />

        <!-- Hero Section -->
        <section class="relative overflow-hidden">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-red/20"
            ></div>
            <div class="gradient-bg py-24 px-4 relative">
                <div class="max-w-6xl mx-auto text-center">
                    <!-- <div
                        class="sm:mt-6 mb-6 flex justify-center w-full md:w-[600px] h-40 sm:h-80 relative mx-auto mt-10"
                    >
                        <img
                            class="w-full h-full object-contain"
                            src="/______.png.webp"
                            alt=""
                        />
                    </div> -->

                    <p
                        class="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
                    ></p>
                    <MatchesCarousel class="mt-30" />
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <!-- <router-link to="/register">
                            <button
                                class="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                            >
                                🚀 Записаться в команду
                            </button>
                        </router-link> -->
                        <NuxtLink
                            to="/schedule"
                            class="btn-primary-professional text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                        >
                            📅 Смотреть расписание
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- League Info Section -->
        <!-- <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div
                    class="bg-gradient-to-br from-primary-blue/10 to-primary-red/10 rounded-2xl p-8 border border-gray-700"
                >
                    <div class="flex flex-col md:flex-row items-center gap-8">
                        <div class="w-24 h-24 relative flex-shrink-0">
                            <img
                                src="/______.png.webp"
                                alt="ВРЕМЯ ЗВЁЗД Logo"
                                class="w-full h-full object-contain"
                            />
                        </div>
                        <div class="text-center md:text-left">
                            <h2 class="text-3xl font-bold mb-4 text-gradient">
                                О нашей лиге
                            </h2>
                            <p class="text-gray-300 text-lg leading-relaxed">
                                ВРЕМЯ ЗВЁЗД — это ведущая любительская хоккейная
                                лига, объединяющая команды из Ярославля и
                                области. Мы создаем профессиональную среду для
                                развития хоккея среди взрослых игроков,
                                организуя качественные турниры и поддерживая
                                спортивный дух.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Stats Section -->
        <!-- <section class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            🏒
                        </div>
                        <div class="text-4xl font-bold text-gradient">15+</div>
                        <div class="text-gray-300">Команд в лиге</div>
                    </div>
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            ⚡
                        </div>
                        <div class="text-4xl font-bold text-gradient">200+</div>
                        <div class="text-gray-300">Игроков</div>
                    </div>
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            🏆
                        </div>
                        <div class="text-4xl font-bold text-gradient">50+</div>
                        <div class="text-gray-300">Матчей проведено</div>
                    </div>
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            ⭐
                        </div>
                        <div class="text-4xl font-bold text-gradient">5</div>
                        <div class="text-gray-300">Лет опыта</div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Tournament Table Section -->
        <section class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10">
                    <div class="text-center mb-8">
                        <h2 class="text-3xl md:text-4xl font-bold mb-2">
                            🏒 Турнирная сетка
                        </h2>
                        <p class="text-gray-300">
                            Чемпионат "Звезда Отечества"
                        </p>
                    </div>
                    <PlayoffBracket
                        v-if="championshipId != null"
                        :championship-id="championshipId"
                    />
                    <p v-else class="text-center text-gray-400 py-12">
                        Загрузка данных чемпионата…
                    </p>
                </div>
                <Table :turnirData="tournamentTeams" />
            </div>
        </section>

        <!-- Best Players Section -->
        <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">
                        🏆 Лучшие игроки
                    </h2>
                    <p class="text-xl text-gray-300">
                        Чемпионат "Звезда Отечества"
                    </p>
                </div>
                <BestPlayers
                    v-if="championshipId"
                    :championshipId="championshipId"
                />
            </div>
        </section>

        <!-- Tournaments Section -->
        <section class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">
                        🏆 Турниры
                    </h2>
                    <p class="text-xl text-gray-300">
                        📊 Текущие турниры лиги ⚡
                    </p>
                </div>

                <div class="m-auto">
                    <router-link
                        to="/pre-season-tournament"
                        class="block group"
                    >
                        <div
                            class="bg-gray-800 rounded-xl p-6 card-hover border-l-4 border-secondary-blue group-hover:border-accent-blue transition-colors text-center"
                        >
                            <div
                                class="text-5xl mb-4 group-hover:scale-110 transition-transform"
                            >
                                🏆
                            </div>
                            <h3
                                class="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors"
                            >
                                Предсезонный турнир
                            </h3>
                            <p class="text-gray-400 mb-4">
                                среди любительских спорткоманд
                            </p>
                            <div class="space-y-2 text-sm">
                                <div class="flex items-center gap-2"></div>
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <span>👥</span>
                                    <span>6 команд участвовали</span>
                                </div>
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <span>🏆</span>
                                    <span>Победитель: ХК Вымпел-V</span>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <NuxtLink to="/zvezdaOtechestva" class="block group">
                        <div
                            class="bg-gray-800 rounded-xl p-6 card-hover border-l-4 border-accent-blue group-hover:border-accent-red transition-colors text-center"
                        >
                            <div
                                class="w-16 h-16 relative mx-auto mb-4 group-hover:scale-110 transition-transform"
                            >
                                <img
                                    src="/zvezdalogo.webp"
                                    alt="Звезда Отечества"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                            <h3
                                class="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors"
                            >
                                Звезда Отечества
                            </h3>
                            <p class="text-gray-400 mb-4">
                                Чемпионат среди любительских спорткоманд
                            </p>
                            <div class="space-y-2 text-sm">
                                <div class="flex items-center gap-2"></div>
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <span>👥</span>
                                    <span>7 команд учавствуют</span>
                                </div>
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <span>🏆</span>
                                    <span>Победитель: не определен</span>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-12 text-center">
                    🏆 Почему выбирают нас
                </h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="text-center space-y-4 group">
                        <div
                            class="text-6xl group-hover:scale-110 transition-transform"
                        >
                            🏆
                        </div>
                        <h3 class="text-xl font-semibold">
                            Профессиональные турниры
                        </h3>
                        <p class="text-gray-400">
                            Организуем качественные соревнования с современным
                            судейством
                        </p>
                    </div>
                    <div class="text-center space-y-4 group">
                        <div
                            class="text-6xl group-hover:scale-110 transition-transform"
                        >
                            ⚡
                        </div>
                        <h3 class="text-xl font-semibold">
                            Быстрые результаты
                        </h3>
                        <p class="text-gray-400">
                            Оперативное обновление статистики и результатов
                            матчей
                        </p>
                    </div>
                    <div class="text-center space-y-4 group">
                        <div
                            class="text-6xl group-hover:scale-110 transition-transform"
                        >
                            🎯
                        </div>
                        <h3 class="text-xl font-semibold">Опытные судьи</h3>
                        <p class="text-gray-400">
                            Справедливое судейство на всех матчах и турнирах
                        </p>
                    </div>
                    <div class="text-center space-y-4 group">
                        <div
                            class="text-6xl group-hover:scale-110 transition-transform"
                        >
                            🌟
                        </div>
                        <h3 class="text-xl font-semibold">
                            Современное оборудование
                        </h3>
                        <p class="text-gray-400">
                            Качественные ледовые арены и профессиональное
                            оборудование
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- News Section -->
        <!-- <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">
                        📰 Новости лиги
                    </h2>
                    <p class="text-xl text-gray-300">
                        🏒 Последние события и результаты турниров ⚡
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article
                        class="bg-gray-700 rounded-xl overflow-hidden card-hover group"
                    >
                        <div
                            class="h-48 flex items-center justify-center group-hover:scale-105 transition-transform"
                            style="
                                background: linear-gradient(
                                    to bottom right,
                                    var(--primary-blue),
                                    var(--primary-red)
                                );
                            "
                        >
                            <span class="text-6xl">🏆</span>
                        </div>
                        <div class="p-6">
                            <div
                                class="flex items-center gap-2 text-sm text-gray-400 mb-3"
                            >
                                <span
                                    class="bg-secondary-blue px-3 py-1 rounded-full text-white"
                                >
                                    Турниры
                                </span>
                                <span>15.01.2024 • 18:30</span>
                            </div>
                            <h3
                                class="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors"
                            >
                                🏆 Завершился товарищеский турнир между
                                командами
                            </h3>
                            <p class="text-gray-300 mb-4">
                                Захватывающие матчи завершились победой команды
                                "Переславль". Игроки показали отличную технику.
                            </p>
                            <div class="flex items-center justify-between">
                                <div
                                    class="flex items-center gap-4 text-sm text-gray-400"
                                >
                                    <span>👁️ 1,250</span>
                                    <span>💬 23</span>
                                </div>
                                <button
                                    class="text-accent-blue hover:text-accent-red transition-colors font-medium"
                                >
                                    Читать далее →
                                </button>
                            </div>
                        </div>
                    </article>

                    <article
                        class="bg-gray-700 rounded-xl overflow-hidden card-hover group"
                    >
                        <div
                            class="h-48 flex items-center justify-center group-hover:scale-105 transition-transform"
                            style="
                                background: linear-gradient(
                                    to bottom right,
                                    var(--primary-blue),
                                    var(--primary-red)
                                );
                            "
                        >
                            <span class="text-6xl">⚡</span>
                        </div>
                        <div class="p-6">
                            <div
                                class="flex items-center gap-2 text-sm text-gray-400 mb-3"
                            >
                                <span
                                    class="bg-secondary-red px-3 py-1 rounded-full text-white"
                                >
                                    Результаты
                                </span>
                                <span>12.01.2024 • 16:00</span>
                            </div>
                            <h3
                                class="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors"
                            >
                                ⚡ Кубок Победы: итоги финального дня
                            </h3>
                            <p class="text-gray-300 mb-4">
                                Команда "Зубр" одержала победу в напряженном
                                финальном матче турнира.
                            </p>
                            <div class="flex items-center justify-between">
                                <div
                                    class="flex items-center gap-4 text-sm text-gray-400"
                                >
                                    <span>👁️ 890</span>
                                    <span>💬 15</span>
                                </div>
                                <button
                                    class="text-accent-blue hover:text-accent-red transition-colors font-medium"
                                >
                                    Читать далее →
                                </button>
                            </div>
                        </div>
                    </article>

                    <article
                        class="bg-gray-700 rounded-xl overflow-hidden card-hover group"
                    >
                        <div
                            class="h-48 flex items-center justify-center group-hover:scale-105 transition-transform"
                            style="
                                background: linear-gradient(
                                    to bottom right,
                                    var(--primary-blue),
                                    var(--primary-red)
                                );
                            "
                        >
                            <span class="text-6xl">🎯</span>
                        </div>
                        <div class="p-6">
                            <div
                                class="flex items-center gap-2 text-sm text-gray-400 mb-3"
                            >
                                <span
                                    class="bg-secondary-blue px-3 py-1 rounded-full text-white"
                                >
                                    Чемпионат
                                </span>
                                <span>10.01.2024 • 14:00</span>
                            </div>
                            <h3
                                class="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors"
                            >
                                🎯 Звезда Отечества: плей-офф в разгаре
                            </h3>
                            <p class="text-gray-300 mb-4">
                                Стартовал плей-офф чемпионата. Команды готовятся
                                к решающим матчам.
                            </p>
                            <div class="flex items-center justify-between">
                                <div
                                    class="flex items-center gap-4 text-sm text-gray-400"
                                >
                                    <span>👁️ 675</span>
                                    <span>💬 31</span>
                                </div>
                                <button
                                    class="text-accent-blue hover:text-accent-red transition-colors font-medium"
                                >
                                    Читать далее →
                                </button>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="text-center mt-12">
                    <button
                        class="btn-primary-professional text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                    >
                        📰 Показать больше новостей
                    </button>
                </div>
            </div>
        </section> -->

        <MapInfo />

        <!-- CTA Section -->
        <!-- <section class="py-20 px-4 bg-gray-800">
            <div class="max-w-4xl mx-auto text-center">
                <div
                    class="bg-gradient-to-br from-primary-blue/10 to-primary-red/10 rounded-2xl p-12 border border-gray-700"
                >
                    <h2
                        class="text-4xl md:text-5xl font-bold mb-6 text-gradient"
                    >
                        🚀 Хотите присоединиться к лиге?
                    </h2>
                    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        ⭐ Мы всегда рады новым талантливым командам! Свяжитесь
                        с нами для участия в турнирах. 🏒
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <router-link to="/register">
                            <button
                                class="btn-primary-professional text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                            >
                                🏒 Подать заявку на участие
                            </button>
                        </router-link>
                        <button
                            class="border-2 border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all transform hover:scale-105"
                        >
                            📚 Узнать больше
                        </button>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'
import MapInfo from '@/components/MapInfo.vue'

useHead({
    title: 'ВРЕМЯ ЗВЁЗД — любительская хоккейная лига Ярославля',
    meta: [
        {
            name: 'description',
            content:
                'Официальный сайт любительской хоккейной лиги "ВРЕМЯ ЗВЁЗД". Расписание матчей, составы команд, результаты и новости.',
        },
        {
            name: 'keywords',
            content:
                'хоккей, лига, ярославль, расписание, турнир, результаты, команды, хоккей любителей',
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: 'ВРЕМЯ ЗВЁЗД — любительская хоккейная лига Ярославля',
        },
        {
            property: 'og:description',
            content:
                'Все о любительском хоккее Ярославля: матчи, турниры, результаты и игроки.',
        },
        { property: 'og:type', content: 'website' },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://timeofthestars.ru',
        },
    ],
})

const tournamentTeams = ref([])
const championshipId = ref(null)

onMounted(async () => {
    try {
        const championships = await apiGet(
            'https://api.timeofthestars.ru/championships/'
        )
        if (Array.isArray(championships) && championships.length > 0) {
            const tournamentId = championships[0].id
            championshipId.value = tournamentId
            try {
                tournamentTeams.value = await apiGet(
                    `https://api.timeofthestars.ru/championships/${tournamentId}/teams`
                )
            } catch (err) {
                console.error('Ошибка при получении команд чемпионата:', err)
                tournamentTeams.value = []
            }
        }
    } catch (err) {
        console.error('Ошибка при получении списка чемпионатов:', err)
        championshipId.value = null
        tournamentTeams.value = []
    }
})
</script>
