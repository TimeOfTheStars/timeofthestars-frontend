<template>
    <div class="tournament-playoff-bracket text-white">
        <div
            v-if="fetchError"
            class="rounded-xl border border-red-800/80 bg-red-950/40 px-6 py-8 text-center text-red-200"
        >
            Не удалось загрузить данные плей-офф. Попробуйте обновить страницу.
        </div>

        <div v-else-if="status === 'pending'" class="py-12 text-center text-gray-400">
            Загрузка сетки…
        </div>

        <div
            v-else
            class="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-4 xl:gap-6"
        >
            <!-- Четвертьфинал -->
            <div class="flex min-w-0 flex-1 flex-col gap-4">
                <h3
                    class="text-center text-lg font-semibold tracking-wide text-gray-200"
                >
                    Четвертьфинал
                </h3>
                <div class="flex flex-col justify-center gap-4 lg:flex-1">
                    <TournamentPlayoffMatch
                        v-if="qf"
                        :match="qf"
                        :teams-by-id="teamsById"
                        header-class="bg-sky-700/90"
                    />
                    <p v-else class="text-center text-gray-500 py-6">
                        Нет данных
                    </p>
                </div>
            </div>

            <!-- Полуфинал -->
            <div class="flex min-w-0 flex-1 flex-col gap-4">
                <h3
                    class="text-center text-lg font-semibold tracking-wide text-gray-200"
                >
                    Полуфинал
                </h3>
                <div class="flex flex-col justify-center gap-4 lg:flex-1">
                    <TournamentPlayoffMatch
                        v-for="m in semifinals"
                        :key="m.key"
                        :match="m"
                        :teams-by-id="teamsById"
                        header-class="bg-indigo-700/90"
                    />
                    <p
                        v-if="semifinals.length === 0"
                        class="text-center text-gray-500 py-6"
                    >
                        Нет данных
                    </p>
                </div>
            </div>

            <!-- Финал -->
            <div class="flex min-w-0 flex-1 flex-col gap-4">
                <h3
                    class="text-center text-lg font-semibold tracking-wide text-gray-200"
                >
                    Финал
                </h3>
                <div class="flex flex-col justify-center gap-4 lg:flex-1">
                    <TournamentPlayoffMatch
                        v-if="final"
                        :match="final"
                        :teams-by-id="teamsById"
                        header-class="bg-amber-500/95"
                    />
                    <p v-else class="text-center text-gray-500 py-6">
                        Ожидается
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    tournamentId: {
        default: null,
        validator: v => v == null || typeof v === 'number',
    },
    championshipId: {
        default: null,
        validator: v => v == null || typeof v === 'number',
    },
})

const { data, error: fetchError, status } = await usePlayoffData({
    tournamentId: toRef(props, 'tournamentId'),
    championshipId: toRef(props, 'championshipId'),
})

const teamsById = computed(() => data.value?.teamsById ?? {})
const stages = computed(() => data.value?.stages ?? null)

// Формат: одна игра на стадию (кроме полуфиналов — их две).
const qf = computed(() => stages.value?.quarterfinal?.[0] ?? null)
const semifinals = computed(() => stages.value?.semifinal ?? [])
const final = computed(() => stages.value?.final?.[0] ?? null)
</script>
