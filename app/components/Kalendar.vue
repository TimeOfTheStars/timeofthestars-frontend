<template>
    <div>
        <div v-if="carousel">
            <h3
                class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-accent-blue flex items-center justify-center gap-2"
            >
                <span class="text-2xl md:text-3xl">🗓️</span>
                {{ title }}
            </h3>
            <Swiper
                v-if="carouselMatches.length > 0"
                :modules="[SwiperNavigation]"
                :key="initialSlide"
                :initial-slide="initialSlide"
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }"
                :slides-per-view="1"
                :space-between="16"
                :breakpoints="{
                    '768': {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                }"
                class="relative"
            >
                <SwiperSlide
                    v-for="match in carouselMatches"
                    :key="match.id"
                    class="pb-12"
                >
                    <div
                        class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative h-full"
                    >
                        <div
                            :class="
                                getMatchStatusClass(getMatchStatus(match))
                            "
                            class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                        >
                            {{ getMatchStatus(match) }}
                        </div>
                        <div
                            class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                            <div
                                class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                            >
                                <div class="font-medium">
                                    {{ formatDateToRussian(match.date) }}
                                </div>
                                <div>{{ formatTime(match.time) }}</div>
                                <div class="text-gray-500">
                                    {{ match.location }}
                                </div>
                            </div>
                            <div v-if="carousel" class="flex-1 flex flex-col items-center gap-2">
                                <NuxtLink
                                        :to="`/teams/${match.team_a_id}`"
                                        class="flex items-center gap-2 md:gap-3 min-w-0"
                                    >
                                        <div
                                            class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                        >
                                            <img
                                                :src="
                                                    getTeamLogo(
                                                        getTeamLogoUrl(
                                                            match.team_a_id
                                                        )
                                                    )
                                                "
                                                :alt="
                                                    getTeamName(match.team_a_id)
                                                "
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <span
                                            class="font-medium text-sm truncate"
                                            >{{
                                                getTeamName(match.team_a_id)
                                            }}</span
                                        >
                                </NuxtLink>
                                <div
                                    class="flex flex-col items-center"
                                >
                                    <div
                                        class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center"
                                    >
                                        <div>
                                            {{
                                                match.score_team_a != null
                                                    ? `${match.score_team_a} - ${match.score_team_b}`
                                                    : 'vs'
                                            }}
                                        </div>
                                        <div
                                            v-if="
                                                match.bullet_win_team !==
                                                null
                                            "
                                            class="text-base font-normal opacity-90"
                                        ></div>
                                    </div>
                                </div>
                                <NuxtLink
                                    :to="`/teams/${match.team_b_id}`"
                                    class="flex items-center gap-2 md:gap-3 min-w-0"
                                >
                                    <span
                                        class="font-medium text-sm truncate"
                                        >{{
                                            getTeamName(match.team_b_id)
                                        }}</span
                                    >
                                    <div
                                        class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                    >
                                        <img
                                            :src="
                                                getTeamLogo(
                                                    getTeamLogoUrl(
                                                        match.team_b_id
                                                    )
                                                )
                                            "
                                            :alt="
                                                getTeamName(match.team_b_id)
                                            "
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                </NuxtLink>
                            </div>
                            <div v-else class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden">
                                <NuxtLink
                                    :to="`/teams/${match.team_a_id}`"
                                    class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                >
                                    <div
                                        class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                    >
                                        <img
                                            :src="
                                                getTeamLogo(
                                                    getTeamLogoUrl(
                                                        match.team_a_id
                                                    )
                                                )
                                            "
                                            :alt="
                                                getTeamName(match.team_a_id)
                                            "
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                    <span
                                        class="font-medium text-sm truncate"
                                        >{{
                                            getTeamName(match.team_a_id)
                                        }}</span
                                    >
                                </NuxtLink>
                                <div
                                    class="flex flex-col items-center justify-self-center"
                                >
                                    <div
                                        class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                    >
                                        <div>
                                            {{
                                                match.score_team_a != null
                                                    ? `${match.score_team_a} - ${match.score_team_b}`
                                                    : 'vs'
                                            }}
                                        </div>
                                        <div
                                            v-if="
                                                match.bullet_win_team !==
                                                null
                                            "
                                            class="text-base font-normal opacity-90"
                                        ></div>
                                    </div>
                                </div>
                                <NuxtLink
                                    :to="`/teams/${match.team_b_id}`"
                                    class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                >
                                    <span
                                        class="font-medium text-sm truncate"
                                        >{{
                                            getTeamName(match.team_b_id)
                                        }}</span
                                    >
                                    <div
                                        class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                    >
                                        <img
                                            :src="
                                                getTeamLogo(
                                                    getTeamLogoUrl(
                                                        match.team_b_id
                                                    )
                                                )
                                            "
                                            :alt="
                                                getTeamName(match.team_b_id)
                                            "
                                            class="object-contain rounded-full w-full h-full"
                                        />
                                    </div>
                                </NuxtLink>
                            </div>
                            <div
                                :class="
                                    getMatchStatusClass(
                                        getMatchStatus(match)
                                    )
                                "
                                class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                            >
                                {{ getMatchStatus(match) }}
                            </div>
                        </div>
                        <div class="mt-3 md:mt-4 flex justify-center">
                            <NuxtLink
                                v-if="match.score_team_a"
                                :to="`/matches/${match.scan}`"
                                class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                >Смотреть протокол</NuxtLink
                            >
                            <button
                                v-else
                                class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                disabled
                                aria-disabled="true"
                                title="Протокол будет доступен после завершения матча"
                            >
                                Смотреть протокол
                            </button>
                        </div>
                        <div class="flex items-center justify-center">
                            <NuxtLink
                                v-if="match.video_url"
                                class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                :to="match.video_url"
                                >Смотреть трансляцию</NuxtLink
                            >
                            <button
                                v-else
                                class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                disabled
                                aria-disabled="true"
                                title="Трансляция недоступна"
                            >
                                Смотреть трансляцию
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </Swiper>
            <div v-else class="text-center py-8 text-gray-400">
                Нет запланированных матчей.
            </div>
        </div>
        <div v-else class="space-y-6 md:space-y-8">
            <div>
                <h3
                    class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-accent-blue flex items-center justify-center gap-2"
                >
                    <span class="text-2xl md:text-3xl">🗓️</span>
                    {{ title }}
                </h3>

                <div class="space-y-3 md:space-y-4">
                    <!-- ПAST: кнопка раскрытия -->
                    <div class="flex flex-col gap-2">
                        <button
                            @click="isPastExpanded = !isPastExpanded"
                            class="w-full flex items-center justify-between p-3 md:p-4 bg-gray-800 hover:bg-gray-700 rounded-lg md:rounded-xl transition-colors"
                        >
                            <div class="flex items-center gap-3">
                                <span
                                    class="text-lg md:text-xl transition-transform duration-300"
                                    :class="{ 'rotate-90': isPastExpanded }"
                                    >➤</span
                                >
                                <div class="flex flex-col text-left">
                                    <span
                                        tate
                                        class="text-sm md:text-base text-accent-blue font-semibold"
                                        >Прошлые матчи</span
                                    >
                                    <span
                                        class="text-xs md:text-sm text-gray-400"
                                        >Всего: {{ pastMatches.length }}</span
                                    >
                                </div>
                            </div>
                            <span class="text-xs text-gray-400"
                                >Нажмите, чтобы открыть</span
                            >
                        </button>

                        <div
                            class="overflow-hidden transition-all duration-300 ease-in-out"
                            :style="{
                                maxHeight: isPastExpanded ? '9999px' : '0px',
                            }"
                        >
                            <div class="space-y-3 md:space-y-4 pl-2 md:pl-4">
                                <div
                                    v-for="match in pastMatches"
                                    :key="`past-${match.id}`"
                                    class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                                >
                                    <!-- match card -->
                                    <div
                                        :class="
                                            getMatchStatusClass(
                                                getMatchStatus(match)
                                            )
                                        "
                                        class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                                    >
                                        {{ getMatchStatus(match) }}
                                    </div>
                                    <div
                                        class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                                    >
                                        <div
                                            class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                                        >
                                            <div class="font-medium">
                                                {{
                                                    formatDateToRussian(
                                                        match.date
                                                    )
                                                }}
                                            </div>
                                            <div>
                                                {{ formatTime(match.time) }}
                                            </div>
                                            <div class="text-gray-500">
                                                {{ match.location }}
                                            </div>
                                        </div>
                                        <div
                                            class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                                        >
                                            <NuxtLink
                                                :to="`/teams/${match.team_a_id}`"
                                                class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                            >
                                                <div
                                                    class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                                >
                                                    <img
                                                        :src="
                                                            getTeamLogo(
                                                                getTeamLogoUrl(
                                                                    match.team_a_id
                                                                )
                                                            )
                                                        "
                                                        :alt="
                                                            getTeamName(
                                                                match.team_a_id
                                                            )
                                                        "
                                                        class="object-contain rounded-full w-full h-full"
                                                    />
                                                </div>
                                                <span
                                                    class="font-medium text-sm truncate"
                                                    >{{
                                                        getTeamName(
                                                            match.team_a_id
                                                        )
                                                    }}</span
                                                >
                                            </NuxtLink>
                                            <div
                                                class="flex flex-col items-center justify-self-center"
                                            >
                                                <div
                                                    class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                                >
                                                    <div>
                                                        {{
                                                            match.score_team_a !=
                                                            null
                                                                ? `${match.score_team_a} - ${match.score_team_b}`
                                                                : 'vs'
                                                        }}
                                                    </div>
                                                    <div
                                                        v-if="
                                                            match.bullet_win_team !==
                                                            null
                                                        "
                                                        class="text-base font-normal opacity-90"
                                                    ></div>
                                                </div>
                                            </div>
                                            <NuxtLink
                                                :to="`/teams/${match.team_b_id}`"
                                                class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                            >
                                                <span
                                                    class="font-medium text-sm truncate"
                                                    >{{
                                                        getTeamName(
                                                            match.team_b_id
                                                        )
                                                    }}</span
                                                >
                                                <div
                                                    class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                                >
                                                    <img
                                                        :src="
                                                            getTeamLogo(
                                                                getTeamLogoUrl(
                                                                    match.team_b_id
                                                                )
                                                            )
                                                        "
                                                        :alt="
                                                            getTeamName(
                                                                match.team_b_id
                                                            )
                                                        "
                                                        class="object-contain rounded-full w-full h-full"
                                                    />
                                                </div>
                                            </NuxtLink>
                                        </div>
                                        <div
                                            :class="
                                                getMatchStatusClass(
                                                    getMatchStatus(match)
                                                )
                                            "
                                            class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                                        >
                                            {{ getMatchStatus(match) }}
                                        </div>
                                    </div>
                                    <div
                                        class="mt-3 md:mt-4 flex justify-center"
                                    >
                                        <NuxtLink
                                            v-if="match.score_team_a"
                                            :to="`/matches/${match.scan}`"
                                            class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                            >Смотреть протокол</NuxtLink
                                        >
                                        <button
                                            v-else
                                            class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                            disabled
                                            aria-disabled="true"
                                            title="Протокол будет доступен после завершения матча"
                                        >
                                            Смотреть протокол
                                        </button>
                                    </div>
                                    <div
                                        class="flex items-center justify-center"
                                    >
                                        <NuxtLink
                                            v-if="match.video_url"
                                            class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                            :to="match.video_url"
                                            >Смотреть трансляцию</NuxtLink
                                        >
                                        <button
                                            v-else
                                            class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                            disabled
                                            aria-disabled="true"
                                            title="Трансляция недоступна"
                                        >
                                            Смотреть трансляцию
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Текущие матчи -->
                    <div class="space-y-3 md:space-y-4">
                        <div
                            v-for="match in currentMatches"
                            :key="match.id"
                            class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                        >
                            <div
                                :class="
                                    getMatchStatusClass(getMatchStatus(match))
                                "
                                class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                            >
                                {{ getMatchStatus(match) }}
                            </div>
                            <div
                                class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                            >
                                <div
                                    class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                                >
                                    <div class="font-medium">
                                        {{ formatDateToRussian(match.date) }}
                                    </div>
                                    <div>{{ formatTime(match.time) }}</div>
                                    <div class="text-gray-500">
                                        {{ match.location }}
                                    </div>
                                </div>
                                <div
                                    class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                                >
                                    <NuxtLink
                                        :to="`/teams/${match.team_a_id}`"
                                        class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                    >
                                        <div
                                            class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                        >
                                            <img
                                                :src="
                                                    getTeamLogo(
                                                        getTeamLogoUrl(
                                                            match.team_a_id
                                                        )
                                                    )
                                                "
                                                :alt="
                                                    getTeamName(match.team_a_id)
                                                "
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                        <span
                                            class="font-medium text-sm truncate"
                                            >{{
                                                getTeamName(match.team_a_id)
                                            }}</span
                                        >
                                    </NuxtLink>
                                    <div
                                        class="flex flex-col items-center justify-self-center"
                                    >
                                        <div
                                            class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                        >
                                            <div>
                                                {{
                                                    match.score_team_a != null
                                                        ? `${match.score_team_a} - ${match.score_team_b}`
                                                        : 'vs'
                                                }}
                                            </div>
                                            <div
                                                v-if="
                                                    match.bullet_win_team !==
                                                    null
                                                "
                                                class="text-base font-normal opacity-90"
                                            ></div>
                                        </div>
                                    </div>
                                    <NuxtLink
                                        :to="`/teams/${match.team_b_id}`"
                                        class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                    >
                                        <span
                                            class="font-medium text-sm truncate"
                                            >{{
                                                getTeamName(match.team_b_id)
                                            }}</span
                                        >
                                        <div
                                            class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                        >
                                            <img
                                                :src="
                                                    getTeamLogo(
                                                        getTeamLogoUrl(
                                                            match.team_b_id
                                                        )
                                                    )
                                                "
                                                :alt="
                                                    getTeamName(match.team_b_id)
                                                "
                                                class="object-contain rounded-full w-full h-full"
                                            />
                                        </div>
                                    </NuxtLink>
                                </div>
                                <div
                                    :class="
                                        getMatchStatusClass(
                                            getMatchStatus(match)
                                        )
                                    "
                                    class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                                >
                                    {{ getMatchStatus(match) }}
                                </div>
                            </div>
                            <div class="mt-3 md:mt-4 flex justify-center">
                                <NuxtLink
                                    v-if="match.score_team_a"
                                    :to="`/matches/${match.scan}`"
                                    class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                    >Смотреть протокол</NuxtLink
                                >
                                <button
                                    v-else
                                    class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                    disabled
                                    aria-disabled="true"
                                    title="Протокол будет доступен после завершения матча"
                                >
                                    Смотреть протокол
                                </button>
                            </div>
                            <div class="flex items-center justify-center">
                                <NuxtLink
                                    v-if="match.video_url"
                                    class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                    :to="match.video_url"
                                    >Смотреть трансляцию</NuxtLink
                                >
                                <button
                                    v-else
                                    class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                    disabled
                                    aria-disabled="true"
                                    title="Трансляция недоступна"
                                >
                                    Смотреть трансляцию
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- FUTURE: кнопка раскрытия -->
                    <div class="flex flex-col gap-2">
                        <button
                            @click="isFutureExpanded = !isFutureExpanded"
                            class="w-full flex items-center justify-between p-3 md:p-4 bg-gray-800 hover:bg-gray-700 rounded-lg md:rounded-xl transition-colors"
                        >
                            <div class="flex items-center gap-3">
                                <span
                                    class="text-lg md:text-xl transition-transform duration-300"
                                    :class="{
                                        'rotate-90': isFutureExpanded,
                                    }"
                                    >➤</span
                                >
                                <div class="flex flex-col text-left">
                                    <span
                                        class="text-sm md:text-base text-accent-blue font-semibold"
                                        >Будущие матчи</span
                                    >
                                    <span
                                        class="text-xs md:text-sm text-gray-400"
                                        >Всего:
                                        {{ futureMatches.length }}</span
                                    >
                                </div>
                            </div>
                            <span class="text-xs text-gray-400"
                                >Нажмите, чтобы открыть</span
                            >
                        </button>

                        <div
                            class="overflow-hidden transition-all duration-300 ease-in-out"
                            :style="{
                                maxHeight: isFutureExpanded
                                    ? '9999px'
                                    : '0px',
                            }"
                        >
                            <div class="space-y-3 md:space-y-4 pl-2 md:pl-4">
                                <div
                                    v-for="match in futureMatches"
                                    :key="`future-${match.id}`"
                                    class="bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 card-hover relative"
                                >
                                    <div
                                        :class="
                                            getMatchStatusClass(
                                                getMatchStatus(match)
                                            )
                                        "
                                        class="absolute top-4 right-4 px-2 py-1 rounded-full text-xs md:hidden text-center"
                                    >
                                        {{ getMatchStatus(match) }}
                                    </div>
                                    <div
                                        class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                                    >
                                        <div
                                            class="text-xs md:text-sm text-gray-400 w-full md:w-32"
                                        >
                                            <div class="font-medium">
                                                {{
                                                    formatDateToRussian(
                                                        match.date
                                                    )
                                                }}
                                            </div>
                                            <div>
                                                {{ formatTime(match.time) }}
                                            </div>
                                            <div class="text-gray-500">
                                                {{ match.location }}
                                            </div>
                                        </div>
                                        <div
                                            class="flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 overflow-hidden"
                                        >
                                            <NuxtLink
                                                :to="`/teams/${match.team_a_id}`"
                                                class="flex items-center gap-2 md:gap-3 min-w-0 justify-self-start"
                                            >
                                                <div
                                                    class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                                >
                                                    <img
                                                        :src="
                                                            getTeamLogo(
                                                                getTeamLogoUrl(
                                                                    match.team_a_id
                                                                )
                                                            )
                                                        "
                                                        :alt="
                                                            getTeamName(
                                                                match.team_a_id
                                                            )
                                                        "
                                                        class="object-contain rounded-full w-full h-full"
                                                    />
                                                </div>
                                                <span
                                                    class="font-medium text-sm truncate"
                                                    >{{
                                                        getTeamName(
                                                            match.team_a_id
                                                        )
                                                    }}</span
                                                >
                                            </NuxtLink>
                                            <div
                                                class="flex flex-col items-center justify-self-center"
                                            >
                                                <div
                                                    class="bg-primary-blue px-3 py-1 md:px-4 md:py-2 rounded-lg text-white font-bold text-sm md:text-base whitespace-nowrap text-center md:min-w-24"
                                                >
                                                    <div>
                                                        {{
                                                            match.score_team_a !=
                                                            null
                                                                ? `${match.score_team_a} - ${match.score_team_b}`
                                                                : 'vs'
                                                        }}
                                                    </div>
                                                    <div
                                                        v-if="
                                                            match.bullet_win_team !==
                                                            null
                                                        "
                                                        class="text-base font-normal opacity-90"
                                                    ></div>
                                                </div>
                                            </div>
                                            <NuxtLink
                                                :to="`/teams/${match.team_b_id}`"
                                                class="flex items-center gap-2 md:gap-3 min-w-0 justify-end justify-self-end"
                                            >
                                                <span
                                                    class="font-medium text-sm truncate"
                                                    >{{
                                                        getTeamName(
                                                            match.team_b_id
                                                        )
                                                    }}</span
                                                >
                                                <div
                                                    class="w-6 h-6 md:w-8 md:h-8 relative shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                                                >
                                                    <img
                                                        :src="
                                                            getTeamLogo(
                                                                getTeamLogoUrl(
                                                                    match.team_b_id
                                                                )
                                                            )
                                                        "
                                                        :alt="
                                                            getTeamName(
                                                                match.team_b_id
                                                            )
                                                        "
                                                        class="object-contain rounded-full w-full h-full"
                                                    />
                                                </div>
                                            </NuxtLink>
                                        </div>
                                        <div
                                            :class="
                                                getMatchStatusClass(
                                                    getMatchStatus(match)
                                                )
                                            "
                                            class="hidden md:block px-3 py-1 rounded-full text-sm w-32 text-center"
                                        >
                                            {{ getMatchStatus(match) }}
                                        </div>
                                    </div>
                                    <div
                                        class="mt-3 md:mt-4 flex justify-center"
                                    >
                                        <NuxtLink
                                            v-if="match.score_team_a"
                                            :to="`/matches/${match.scan}`"
                                            class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition"
                                            >Смотреть протокол</NuxtLink
                                        >
                                        <button
                                            v-else
                                            class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                            disabled
                                            aria-disabled="true"
                                            title="Протокол будет доступен после завершения матча"
                                        >
                                            Смотреre протокол
                                        </button>
                                    </div>
                                    <div
                                        class="flex items-center justify-center"
                                    >
                                        <NuxtLink
                                            v-if="match.video_url"
                                            class="inline-flex px-4 mt-3 py-2 rounded-lg bg-primary-blue text-white text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer"
                                            :to="match.video_url"
                                            >Смотреть трансляцию</NuxtLink
                                        >
                                        <button
                                            v-else
                                            class="inline-flex items-center justify-center px-4 mt-3 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm md:text-base font-medium cursor-not-allowed"
                                            disabled
                                            aria-disabled="true"
                                            title="Трансляция недоступна"
                                        >
                                            Смотреть трансляцию
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getTeamLogo } from '#imports'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
    turnirData: {
        type: Object,
        required: true,
    },
    dataType: {
        type: String,
        default: 'championship', // 'championship' or 'tournament'
    },
    carousel: {
        type: Boolean,
        default: false,
    },
})

const title = computed(() => {
    return props.dataType === 'tournament'
        ? 'Расписание матчей турнира'
        : 'Матчи чемпионата'
})

const games = ref([])
const teams = ref([])

// Функция для парсинга даты из строки "YYYY-MM-DD"
function parseDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
}

// Получение границ текущей недели (понедельник - воскресенье)
function getCurrentWeekBounds() {
    const now = new Date()
    const dayOfWeek = now.getDay()
    // Преобразуем: воскресенье (0) -> 6, понедельник (1) -> 0, и т.д.
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - adjustedDay)
    weekStart.setHours(0, 0, 0, 0)
    
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)
    
    return { weekStart, weekEnd }
}

const currentWeekBounds = computed(() => getCurrentWeekBounds())

// Collapsed state for past / future sections
const isPastExpanded = ref(false)
const isFutureExpanded = ref(false)

// Все матчи отсортированные строго по дате (от старых к новым)
const carouselMatches = computed(() => {
    return [...games.value].sort((a, b) => {
        const dateA = parseDate(a.date)
        const dateB = parseDate(b.date)
        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        // Если даты равны - сортируем по времени
        if (a.time && b.time) {
            return a.time.localeCompare(b.time)
        }
        return 0
    })
})

// Начальный слайд - показываем самый свежий матч относительно текущей даты
const initialSlide = computed(() => {
    if (!carouselMatches.value.length) return 0

    const now = new Date()
    now.setHours(0, 0, 0, 0)

    // Находим индекс первого матча, который ещё не прошёл (дата >= сегодня)
    const firstUpcomingIndex = carouselMatches.value.findIndex(match => {
        const matchDate = parseDate(match.date)
        return matchDate >= now
    })

    // Если есть предстоящие матчи - показываем последний прошедший (если есть) или первый предстоящий
    if (firstUpcomingIndex > 0) {
        // Показываем последний прошедший матч (слайд перед первым будущим)
        return firstUpcomingIndex - 1
    } else if (firstUpcomingIndex === 0) {
        // Все матчи в будущем - показываем первый
        return 0
    } else {
        // Все матчи в прошлом - показываем последний
        return carouselMatches.value.length - 1
    }
})

// Разделение матчей на прошлые, текущие и будущие по полной дате
const pastMatches = computed(() => {
    const { weekStart } = currentWeekBounds.value
    return games.value
        .filter(m => m.date && parseDate(m.date) < weekStart)
        .sort((a, b) => parseDate(a.date) - parseDate(b.date))
})

const currentMatches = computed(() => {
    const { weekStart, weekEnd } = currentWeekBounds.value
    return games.value
        .filter(m => {
            if (!m.date) return false
            const matchDate = parseDate(m.date)
            return matchDate >= weekStart && matchDate <= weekEnd
        })
        .sort((a, b) => parseDate(a.date) - parseDate(b.date))
})

const futureMatches = computed(() => {
    const { weekEnd } = currentWeekBounds.value
    return games.value
        .filter(m => m.date && parseDate(m.date) > weekEnd)
        .sort((a, b) => parseDate(a.date) - parseDate(b.date))
})

watch(
    () => props.turnirData,
    async newTurnirData => {
        if (!newTurnirData || newTurnirData.length === 0) {
            games.value = []
            teams.value = []
            return
        }
        const id = newTurnirData[0].id
        const endpoint = props.dataType + 's'

        try {
            games.value = await $fetch(
                `https://api.timeofthestars.ru/${endpoint}/${id}/games`
            )
        } catch (error) {
            console.error(`Ошибка при получении игр ${props.dataType}:`, error)
            games.value = []
        }
        try {
            teams.value = await $fetch(
                `https://api.timeofthestars.ru/${endpoint}/${id}/teams`
            )
        } catch (error) {
            console.error(
                `Ошибка при получении команд ${props.dataType}:`,
                error
            )
            teams.value = []
        }
    },
    { immediate: true, deep: true }
)

function getTeamName(teamId) {
    const team = teams.value.find(team => team.id === teamId)
    return team ? team.name : ''
}

function formatTime(timeString) {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
}

function formatDateToRussian(dateString) {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })
        .replace(' г.', '')
}

function getMatchStatus(match) {
    if (
        match.date === '2025-11-09' ||
        match.date === '2025-11-23' ||
        match.date === '2025-11-29' ||
        match.date === '2025-12-14' ||
        match.date === '2025-12-16' ||
        match.date === '2025-12-19' ||
        match.date === '2025-12-20' ||
        match.date === '2026-01-16'
    ) {
        return 'Перенесен'
    }
    if (match.score_team_a != null) {
        return 'Завершен'
    }

    if (!match.date) {
        return 'Неизвестно'
    }

    const now = new Date()
    const [year, month, day] = match.date.split('-').map(Number)

    let matchDateTime

    if (match.time) {
        const [hours, minutes] = match.time.split(':').map(Number)
        matchDateTime = new Date(year, month - 1, day, hours, minutes)
    } else {
        // if no time is available, check against the end of the day
        matchDateTime = new Date(year, month - 1, day, 23, 59, 59)
    }

    if (matchDateTime > now) {
        return 'Запланирован'
    } else {
        return 'В процессе'
    }
}

function getMatchStatusClass(status) {
    switch (status) {
        case 'Завершен':
            return 'bg-blue-600/20 text-blue-400'
        case 'Запланирован':
            return 'bg-green-600/20 text-green-400'
        case 'В процессе':
            return 'bg-orange-600/20 text-orange-400'
        case 'Перенесен':
            return 'bg-yellow-600/20 text-yellow-400'
        default:
            return 'bg-gray-600/20 text-gray-400'
    }
}

function getTeamLogoUrl(teamId) {
    const team = teams.value.find(team => team.id === teamId)
    return team ? team.logo_url : null
}
</script>
<style>
.swiper-button-prev,
.swiper-button-next {
    display: none;
    color: #00a1ff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    top: 45%;
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
    background-color: rgba(0, 0, 0, 0.7);
}
.swiper-button-prev::after,
.swiper-button-next::after {
    font-size: 18px;
    font-weight: bold;
}

@media (min-width: 768px) {
    .swiper-button-prev,
    .swiper-button-next {
        display: flex;
        width: 50px;
        height: 50px;
    }
    .swiper-button-prev::after,
    .swiper-button-next::after {
        font-size: 24px;
    }
}
</style>
