<template>
    <cursor-follower />
    <header
        class="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 fixed w-full top-0 z-51"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center h-16">
                <!-- Лого -->
                <div class="flex-1 md:mr-20">
                    <NuxtLink to="/" class="flex items-center space-x-2">
                        <div class="text-2xl">🏒</div>
                        <div
                            class="text-xl font-bold text-gradient whitespace-nowrap"
                        >
                            ВРЕМЯ ЗВЁЗД
                        </div>
                    </NuxtLink>
                </div>

                <!-- Навигация десктоп -->
                <nav
                    class="hidden md:flex items-center justify-center space-x-8"
                >
                    <NuxtLink
                        data-glow-magnetic
                        to="/"
                        class="text-gray-300 hover:text-white glow-effect active-text-gradient transition-colors"
                    >
                        Главная
                    </NuxtLink>

                    <!-- Dropdown: Товарищеские турниры -->
                    <div class="relative group">
                        <button
                            data-glow-magnetic
                            class="flex items-center space-x-1 text-gray-300 glow-effect hover:text-white active-text-gradient transition-colors"
                        >
                            <span>Товарищеские турниры</span>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                class="w-5 h-5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <div
                            class="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        >
                            <NuxtLink
                                v-for="(
                                    tournament, index
                                ) in friendlyTournaments"
                                :key="index"
                                :to="tournament.href"
                                class="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
                                @click="closeAllDropdowns"
                            >
                                <span class="text-2xl mr-3">{{
                                    tournament.emoji
                                }}</span>
                                <div>
                                    <div class="text-white font-medium">
                                        {{ tournament.name }}
                                    </div>
                                    <div class="text-sm text-gray-400">
                                        {{ tournament.status }}
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Dropdown: Чемпионаты -->
                    <div class="relative group">
                        <button
                            data-glow-magnetic
                            class="flex items-center space-x-1 text-gray-300 hover:text-white glow-effect active-text-gradient transition-colors"
                        >
                            <span>Чемпионаты</span>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                class="w-5 h-5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <div
                            class="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        >
                            <NuxtLink
                                v-for="(championship, index) in championships"
                                :key="index"
                                :to="championship.href"
                                class="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
                                @click="closeAllDropdowns"
                            >
                                <span class="text-2xl mr-3">{{
                                    championship.emoji
                                }}</span>
                                <div>
                                    <div class="text-white font-medium">
                                        {{ championship.name }}
                                    </div>
                                    <div class="text-sm text-gray-400">
                                        {{ championship.status }}
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>

                    <NuxtLink
                        data-glow-magnetic
                        to="/teamsPage"
                        class="text-gray-300 hover:text-white glow-effect active-text-gradient transition-colors"
                        >Команды</NuxtLink
                    >
                    <NuxtLink
                        data-glow-magnetic
                        to="/schedule"
                        class="text-gray-300 hover:text-white glow-effect active-text-gradient transition-colors"
                        >Расписание</NuxtLink
                    >
                    <NuxtLink
                        data-glow-magnetic
                        to="/gallery"
                        class="text-gray-300 hover:text-white glow-effect active-text-gradient transition-colors"
                        >Галерея</NuxtLink
                    >
                </nav>

                <!-- Кнопка CTA -->
                <!-- <div class="hidden md:block">
                    <NuxtLink to="/regpage">
                        <button
                            class="btn-primary-professional border-none px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            🚀 Записаться
                        </button>
                    </NuxtLink>
                </div> -->
                <div class="flex-1 flex justify-end">
                    <!-- Мобильное меню -->
                    <button
                        class="md:hidden text-gray-300 hover:text-white"
                        @click="toggleMobileMenu"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Мобильная навигация -->
            <div
                v-if="isMenuOpen"
                class="md:hidden py-4 border-t border-gray-800 space-y-4"
            >
                <NuxtLink
                    to="/"
                    class="block text-gray-300 hover:text-white active-text-gradient transition-colors"
                    @click="closeMobileMenu"
                >
                    Главная
                </NuxtLink>

                <div>
                    <button
                        class="flex items-center justify-between w-full text-gray-300 hover:text-white active-text-gradient transition-colors"
                        @click="toggleDropdown('friendly')"
                    >
                        <span class="text-gray-400 text-sm font-medium"
                            >Товарищеские турниры</span
                        >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            class="w-4 h-4"
                            :class="{
                                'transform rotate-180':
                                    activeDropdown === 'friendly',
                            }"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <div v-if="activeDropdown === 'friendly'" class="pl-4">
                        <NuxtLink
                            v-for="(tournament, index) in friendlyTournaments"
                            :key="index"
                            :to="tournament.href"
                            class="flex items-center py-2 text-gray-300 hover:text-white transition-colors"
                            @click="closeMobileMenu"
                        >
                            <span class="text-lg mr-2">{{
                                tournament.emoji
                            }}</span>
                            <span>{{ tournament.name }}</span>
                        </NuxtLink>
                    </div>
                </div>

                <div>
                    <button
                        class="flex items-center justify-between w-full text-gray-300 hover:text-white active-text-gradient transition-colors"
                        @click="toggleDropdown('championships')"
                    >
                        <span class="text-gray-400 text-sm font-medium"
                            >Чемпионаты</span
                        >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            class="w-4 h-4"
                            :class="{
                                'transform rotate-180':
                                    activeDropdown === 'championships',
                            }"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <div v-if="activeDropdown === 'championships'" class="pl-4">
                        <NuxtLink
                            v-for="(championship, index) in championships"
                            :key="index"
                            :to="championship.href"
                            class="flex items-center py-2 text-gray-300 hover:text-white transition-colors"
                            @click="closeMobileMenu"
                        >
                            <span class="text-lg mr-2">{{
                                championship.emoji
                            }}</span>
                            <span>{{ championship.name }}</span>
                        </NuxtLink>
                    </div>
                </div>

                <NuxtLink
                    to="/teamsPage"
                    class="block text-gray-300 hover:text-white active-text-gradient transition-colors"
                    @click="closeMobileMenu"
                >
                    Команды
                </NuxtLink>
                <NuxtLink
                    to="/schedule"
                    class="block text-gray-300 hover:text-white active-text-gradient transition-colors"
                    @click="closeMobileMenu"
                >
                    Расписание
                </NuxtLink>
                <NuxtLink
                    to="/gallery"
                    class="block text-gray-300 hover:text-white active-text-gradient transition-colors"
                    @click="closeMobileMenu"
                >
                    Галерея
                </NuxtLink>

                <!-- <NuxtLink to="/regpage" @click="closeMobileMenu">
                    <button
                        class="w-full bg-gradient-to-r from-primary-blue to-primary-red text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        🚀 Записаться
                    </button>
                </NuxtLink> -->
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const activeDropdown = ref('')
const isMenuOpen = ref(false)

const toggleDropdown = name => {
    activeDropdown.value = activeDropdown.value === name ? '' : name
}

const toggleMobileMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    if (!isMenuOpen.value) {
        activeDropdown.value = ''
    }
}

const closeMobileMenu = () => {
    isMenuOpen.value = false
    activeDropdown.value = ''
}

const closeAllDropdowns = () => {
    activeDropdown.value = ''
}

const friendlyTournaments = [
    {
        name: 'Товарищеский турнир',
        emoji: '🌸',
        status: 'Завершён',
        href: '/turnirOne',
    },
    {
        name: 'Кубок Победы',
        emoji: '☀️',
        status: 'Идёт',
        href: '/turnirVictory',
    },
]
const championships = [
    {
        name: 'Звезда Отечества',
        emoji: '🥇',
        status: 'Идёт',
        href: '/zvezdaOtechestva',
    },
]
</script>
