<template>
    <footer class="bg-gray-900 border-t border-gray-700 py-12 px-4">
        <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-8 h-8 relative">
                            <img
                                src="/______.png.webp"
                                alt="ВРЕМЯ ЗВЁЗД Logo"
                                class="w-10 h-10"
                            />
                        </div>
                        <div class="text-xl font-bold text-gradient">
                            ВРЕМЯ ЗВЁЗД
                        </div>
                    </div>
                    <p class="text-gray-400">
                        Любительская хоккейная лига для развития спорта и
                        командного духа.
                    </p>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Турниры</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li>
                            <NuxtLink
                                to="/pre-season-tournament"
                                class="hover:text-white transition-colors"
                            >
                                Предсезонный турнир
                            </NuxtLink>
                        </li>
                        <!-- <li>
                            <NuxtLink
                                to="/turnirVictory"
                                class="hover:text-white transition-colors"
                            >
                                Кубок Победы
                            </NuxtLink>
                        </li> -->
                        <!-- <li>
                            <NuxtLink
                                to="/zvezdaOtechestva"
                                class="hover:text-white transition-colors"
                            >
                                Звезда Отечества
                            </NuxtLink>
                        </li> -->
                        <li>
                            <a
                                href="https://timeofthestars.tilda.ws/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="hover:text-white transition-colors"
                            >
                                Прошлый сезон
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Информация</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li>
                            <NuxtLink
                                to="/teamsPage"
                                class="hover:text-white transition-colors"
                            >
                                Команды
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/schedule"
                                class="hover:text-white transition-colors"
                            >
                                Расписание
                            </NuxtLink>
                        </li>
                        <!-- <li>
                            <NuxtLink
                                to="/gallery"
                                class="hover:text-white transition-colors"
                            >
                                Галерея
                            </NuxtLink>
                        </li> -->
                        <!-- <li>
                                <NuxtLink
                                    to="/regPage"
                                    class="hover:text-white transition-colors"
                                >
                                    Регистрация
                                </NuxtLink>
                            </li> -->
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Контакты</h3>
                    <div class="space-y-2 text-gray-400">
                        <p>
                            <a href="mailto:help@timeofthestars.ru" class="hover:text-white transition-colors">help@timeofthestars.ru</a>
                        </p>
                        <p>📍 Ярославль, Россия</p>
                    </div>
                </div>
            </div>

            <div
                class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
            >
                <p>&copy; 2025 ВРЕМЯ ЗВЁЗД. Все права защищены.</p>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup></script>

<style></style>


