<template>   <h2 class="text-3xl font-bold mb-8 text-center">
                    📅 Календарь игр
                </h2>

                <div class="space-y-6 md:space-y-8">
                    <div>
                        <h3
                            class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-accent-blue flex items-center gap-2"
                        >
                            <span class="text-2xl md:text-3xl">🗓️</span>
                            1-2 мая
                        </h3>
                        <div class="space-y-3 md:space-y-4">
                            <div
                                v-for="(match, index) in matches.slice(0, 4)"
                                :key="index"
                                class="bg-gray-700 rounded-lg md:rounded-xl p-4 md:p-6 card-hover"
                            >
                                <div
                                    class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                                >
                                    <!-- Дата и время -->
                                    <div
                                        class="text-xs md:text-sm text-gray-400 w-full md:w-20"
                                    >
                                        <div class="font-medium">
                                            {{ match.date }}
                                        </div>
                                        <div>{{ match.time }}</div>
                                    </div>

                                    <!-- Команды и счет -->
                                    <div
                                        class="flex-1 flex flex-col sm:flex-row items-center gap-3 md:gap-6 overflow-hidden"
                                    >
                                        <!-- Команда 1 -->
                                        <div
                                            class="flex items-center gap-2 md:gap-3 flex-1 min-w-0"
                                        >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0"
                                            >
                                                <img
                                                    :src="match.logo1"
                                                    :alt="match.team1"
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{ match.team1 }}</span
                                            >
                                        </div>

                                        <!-- Счет -->
                                        <div
                                            class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap mx-auto sm:mx-0"
                                        >
                                            {{ match.score }}
                                        </div>

                                        <!-- Команда 2 -->
                                        <div
                                            class="flex items-center gap-2 md:gap-3 flex-1 min-w-0 justify-end"
                                        >
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{ match.team2 }}</span
                                            >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0"
                                            >
                                                <img
                                                    :src="match.logo2"
                                                    :alt="match.team2"
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Статус -->
                                    <div
                                        class="bg-green-600/20 text-green-400 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ml-auto md:ml-0"
                                    >
                                        Завершен
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                
                    <div>
                        <h3
                            class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-accent-red flex items-center gap-2"
                        >
                            <span class="text-2xl md:text-3xl">🗓️</span>
                            3-4 мая
                        </h3>
                        <div class="space-y-3 md:space-y-4">
                            <div
                                v-for="(match, index) in matches.slice(4)"
                                :key="index"
                                class="bg-gray-700 rounded-lg md:rounded-xl p-4 md:p-6 card-hover"
                            >
                                <div
                                    class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                                >
                                    <!-- Дата и время -->
                                    <div
                                        class="text-xs md:text-sm text-gray-400 w-full md:w-20"
                                    >
                                        <div class="font-medium">
                                            {{ match.date }}
                                        </div>
                                        <div>{{ match.time }}</div>
                                    </div>

                                    <!-- Команды и счет -->
                                    <div
                                        class="flex-1 flex flex-col sm:flex-row items-center gap-3 md:gap-6 overflow-hidden"
                                    >
                                        <!-- Команда 1 -->
                                        <div
                                            class="flex items-center gap-2 md:gap-3 flex-1 min-w-0"
                                        >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0"
                                            >
                                                <img
                                                    :src="match.logo1"
                                                    :alt="match.team1"
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{ match.team1 }}</span
                                            >
                                        </div>

                                        <!-- Счет -->
                                        <div
                                            class="bg-primary-red px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap mx-auto sm:mx-0"
                                        >
                                            {{ match.score }}
                                        </div>

                                        <!-- Команда 2 -->
                                        <div
                                            class="flex items-center gap-2 md:gap-3 flex-1 min-w-0 justify-end"
                                        >
                                            <span
                                                class="font-medium text-sm truncate"
                                                >{{ match.team2 }}</span
                                            >
                                            <div
                                                class="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0"
                                            >
                                                <img
                                                    :src="match.logo2"
                                                    :alt="match.team2"
                                                    class="object-contain rounded-full w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Статус -->
                                    <div
                                        class="bg-green-600/20 text-green-400 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ml-auto md:ml-0"
                                    >
                                        Завершен
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></template>