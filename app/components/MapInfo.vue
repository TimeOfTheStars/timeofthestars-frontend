<template>
    <section class="py-16 px-4 bg-gray-800">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    🏟️ Спортивные комплексы
                </h2>
                <p class="text-xl text-gray-300">
                    ⭐ Современные ледовые арены для проведения турниров 🏒
                </p>
            </div>

            <!-- Navigation Tabs -->
            <div class="flex justify-center mb-8">
                <div class="bg-gray-700 rounded-xl p-1 flex">
                    <button
                        @click="activeTab = 'list'"
                        :class="[
                            'px-6 py-3 rounded-lg font-semibold transition-all',
                            activeTab === 'list'
                                ? 'bg-primary-blue text-white shadow-lg'
                                : 'text-gray-300 hover:text-white',
                        ]"
                    >
                        📋 Список арен
                    </button>
                    <button
                        @click="activeTab = 'map'"
                        :class="[
                            'px-6 py-3 rounded-lg font-semibold transition-all',
                            activeTab === 'map'
                                ? 'bg-primary-blue text-white shadow-lg'
                                : 'text-gray-300 hover:text-white',
                        ]"
                    >
                        🗺️ Карта
                    </button>
                </div>
            </div>

            <!-- List View -->
            <div
                v-if="activeTab === 'list'"
                class="flex flex-wrap justify-center gap-6"
            >
                <div
                    v-for="stadium in stadiums"
                    :key="stadium.id"
                    class="bg-gray-700 rounded-xl p-6 card-hover w-full max-w-md"
                >
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-3xl">{{ stadium.emoji }}</div>
                        <div class="flex items-center gap-1">
                            <span class="text-yellow-400">⭐</span>
                            <span class="font-semibold">{{
                                stadium.rating
                            }}</span>
                        </div>
                    </div>

                    <h3 class="text-xl font-bold mb-3">{{ stadium.name }}</h3>
                    <p class="text-gray-300 text-sm mb-4">
                        {{ stadium.description }}
                    </p>

                    <div class="space-y-2 text-sm text-gray-400 mb-4">
                        <div class="flex items-center gap-2">
                            <span>📍</span>
                            <span>{{ stadium.address }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span>📞</span>
                            <span>{{ stadium.phone }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span>🕒</span>
                            <span>{{ stadium.hours }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span>{{ stadium.parking ? '✅' : '❌' }}</span>
                            <span>{{
                                stadium.parking
                                    ? 'Парковка доступна'
                                    : 'Парковка отсутствует'
                            }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button
                            @click="openInMaps(stadium)"
                            class="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary-blue transition-colors"
                        >
                            🗺️ Показать на карте
                        </button>
                        <button
                            @click="handleStadiumSelect(stadium)"
                            class="flex-1 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
                        >
                            📋 Подробнее
                        </button>
                    </div>
                </div>
            </div>

            <!-- Map View -->
            <div v-else class="space-y-6">
                <!-- Interactive Map Placeholder -->
                <div class="bg-gray-700 rounded-xl p-8 text-center">
                    <div class="text-6xl mb-4">🗺️</div>
                    <h3 class="text-2xl font-bold mb-4">Интерактивная карта</h3>
                    <p class="text-gray-300 mb-6">
                        Здесь отображается расположение всех спортивных
                        комплексов
                    </p>

                    <!-- Map Controls -->
                    <div class="flex flex-wrap justify-center gap-4 mb-6">
                        <button
                            class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            🗺️ Яндекс.Карты
                        </button>
                        <button
                            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            📍 Google Maps
                        </button>
                    </div>

                    <!-- Stadium Quick Access -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <button
                            v-for="stadium in stadiums"
                            :key="stadium.id"
                            @click="openInMaps(stadium)"
                            class="bg-gray-600 hover:bg-gray-500 p-4 rounded-lg transition-colors"
                        >
                            <div class="text-2xl mb-2">{{ stadium.emoji }}</div>
                            <div class="font-semibold text-sm">
                                {{ stadium.name }}
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Selected Stadium Details -->
                <div v-if="selectedStadium" class="bg-gray-700 rounded-xl p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="text-4xl">{{ selectedStadium.emoji }}</div>
                        <div>
                            <h3 class="text-2xl font-bold">
                                {{ selectedStadium.name }}
                            </h3>
                            <div class="flex items-center gap-2">
                                <span class="text-yellow-400">⭐</span>
                                <span class="font-semibold">{{
                                    selectedStadium.rating
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <p class="text-gray-300 mb-6">
                        {{ selectedStadium.description }}
                    </p>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-3">
                                📍 Контактная информация
                            </h4>
                            <div class="space-y-2 text-sm text-gray-300">
                                <div>📍 {{ selectedStadium.address }}</div>
                                <div>📞 {{ selectedStadium.phone }}</div>
                                <div>🕒 {{ selectedStadium.hours }}</div>
                                <div>
                                    {{ selectedStadium.parking ? '✅' : '❌' }}
                                    {{
                                        selectedStadium.parking
                                            ? 'Парковка доступна'
                                            : 'Парковка отсутствует'
                                    }}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-semibold mb-3">🚗 Как добраться</h4>
                            <div class="space-y-2 text-sm text-gray-300 mb-4">
                                <div>
                                    🚌 Общественный транспорт: автобусы №1, 5,
                                    12
                                </div>
                                <div>
                                    🚗 На автомобиле: съезд с Московского
                                    проспекта
                                </div>
                                <div>
                                    🚶 Пешком: 10 минут от ст. м. "Спортивная"
                                </div>
                            </div>

                            <button
                                @click="openInMaps(selectedStadium)"
                                class="w-full bg-gradient-to-r from-primary-blue to-primary-red text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                🗺️ Построить маршрут
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Useful Information
            <div class="mt-12 grid md:grid-cols-2 gap-8">
                <div class="bg-gray-700 rounded-xl p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <span class="text-2xl">🏒</span>
                        Требования к экипировке
                    </h3>
                    <ul class="space-y-2 text-gray-300">
                        <li class="flex items-center gap-2">
                            <span>🛡️</span>
                            <span>Шлем с защитной маской</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>⛸️</span>
                            <span>Коньки хоккейные</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>🦺</span>
                            <span>Защитная экипировка</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>🏒</span>
                            <span>Клюшка по возрасту</span>
                        </li>
                    </ul>
                </div>

                <div class="bg-gray-700 rounded-xl p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <span class="text-2xl">📝</span>
                        Правила посещения
                    </h3>
                    <ul class="space-y-2 text-gray-300">
                        <li class="flex items-center gap-2">
                            <span>⏰</span>
                            <span>Приходить за 30 минут до начала</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>📄</span>
                            <span>Иметь при себе документы</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>⚠️</span>
                            <span>Соблюдать правила безопасности</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>🤝</span>
                            <span>Уважать других игроков</span>
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Stadium {
    id: string
    name: string
    address: string
    phone: string
    hours: string
    parking: boolean
    rating: number
    emoji: string
    coordinates: {
        lat: number
        lng: number
    }
    description: string
}

export default defineComponent({
    setup() {
        const stadiums: Stadium[] = [
            {
                id: 'torpedo',
                name: 'Ледовый дворец «Торпедо»',
                address: 'Ярославль, улица Чкалова, 20А',
                phone: '+7 (4852) 30-37-58',
                hours: '07:00 - 23:00',
                parking: true,
                rating: 4.7,
                emoji: '🏒',
                coordinates: { lat: 57.639482, lng: 39.848224 },
                description:
                    'Современная ледовая арена, база хоккейного клуба «Локомотив».',
            },
            {
                id: 'olympic',
                name: 'ГУОР по хоккею',
                address: 'Ярославль, улица Дядьковская, 7',
                phone: '+7 (4852) 47-65-55',
                hours: '08:00 - 22:00',
                parking: true,
                rating: 4.9,
                emoji: '🥅',
                coordinates: { lat: 57.583416, lng: 39.900425 },
                description:
                    'Государственное училище олимпийского резерва с качественным льдом для тренировок.',
            },
        ]

        const selectedStadium = ref<Stadium | null>(null)
        const activeTab = ref<'list' | 'map'>('list')

        const handleStadiumSelect = (stadium: Stadium) => {
            selectedStadium.value = stadium
            activeTab.value = 'map'
        }

        const openInMaps = (stadium: Stadium) => {
            const query = encodeURIComponent(stadium.address)
            window.open(`https://yandex.ru/maps/?text=${query}`, '_blank')
        }

        const openExternalMap = (type: 'yandex' | 'google') => {
            const urls = {
                yandex: 'https://yandex.ru/maps/16/yaroslavl/',
                google: 'https://www.google.com/maps/place/Yaroslavl,+Yaroslavl+Oblast,+Russia/',
            }
            window.open(urls[type], '_blank')
        }

        return {
            stadiums,
            selectedStadium,
            activeTab,
            handleStadiumSelect,
            openInMaps,
            openExternalMap,
        }
    },
})
</script>
