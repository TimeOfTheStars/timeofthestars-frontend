<template>
    <div class="playoff-bracket text-white">
        <div
            v-if="fetchError"
            class="rounded-xl border border-red-800/80 bg-red-950/40 px-6 py-8 text-center text-red-200"
        >
            Не удалось загрузить данные плей-офф. Попробуйте обновить страницу.
        </div>

        <div v-else class="pb-4">
            <div
                class="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-2 xl:gap-3"
            >
                <!-- Колонка 1: четвертьфиналы парами -->
                <div class="flex min-w-0 flex-1 flex-col gap-4">
                    <h3
                        class="text-center text-lg font-semibold tracking-wide text-gray-200"
                    >
                        Четвертьфинал
                    </h3>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-4">
                            <template
                                v-for="slot in qfPairTop"
                                :key="slot.key"
                            >
                                <PlayoffBracketSeriesTable
                                    v-if="slot.type === 'data'"
                                    :series="slot.series"
                                    :teams-by-id="teamsById"
                                    :header-class="headerClass(slot.series.stage)"
                                    :aria-label="ariaLabelForSeries(slot.series.stage)"
                                />
                                <PlayoffBracketSeriesSkeleton
                                    v-else
                                    stage="quarterfinal"
                                />
                            </template>
                        </div>
                        <div class="flex flex-col gap-4">
                            <template
                                v-for="slot in qfPairBottom"
                                :key="slot.key"
                            >
                                <PlayoffBracketSeriesTable
                                    v-if="slot.type === 'data'"
                                    :series="slot.series"
                                    :teams-by-id="teamsById"
                                    :header-class="headerClass(slot.series.stage)"
                                    :aria-label="ariaLabelForSeries(slot.series.stage)"
                                />
                                <PlayoffBracketSeriesSkeleton
                                    v-else
                                    stage="quarterfinal"
                                />
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Мост QF → SF -->
                <div
                    class="hidden min-h-0 w-8 flex-shrink-0 flex-col self-stretch pt-12 lg:flex"
                    aria-hidden="true"
                >
                    <div class="flex min-h-0 flex-1 flex-col gap-4">
                        <div class="relative min-h-[6rem] flex-1 text-gray-500">
                            <svg
                                class="absolute inset-0 h-full w-full"
                                viewBox="0 0 32 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    vector-effect="non-scaling-stroke"
                                    d="M 0 32 L 14 32 L 14 50 L 32 50"
                                />
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    vector-effect="non-scaling-stroke"
                                    d="M 0 68 L 14 68 L 14 50 L 32 50"
                                />
                            </svg>
                        </div>
                        <div class="relative min-h-[6rem] flex-1 text-gray-500">
                            <svg
                                class="absolute inset-0 h-full w-full"
                                viewBox="0 0 32 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    vector-effect="non-scaling-stroke"
                                    d="M 0 32 L 14 32 L 14 50 L 32 50"
                                />
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    vector-effect="non-scaling-stroke"
                                    d="M 0 68 L 14 68 L 14 50 L 32 50"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Колонка 2: полуфиналы -->
                <div class="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
                    <h3
                        class="text-center text-lg font-semibold tracking-wide text-gray-200"
                    >
                        Полуфинал
                    </h3>
                    <div
                        class="flex flex-col gap-4 lg:flex-1 lg:min-h-0 lg:gap-0 lg:justify-between"
                    >
                        <div
                            v-for="slot in sfSlots"
                            :key="slot.key"
                            class="flex flex-col justify-center lg:flex-1 lg:min-h-0"
                        >
                            <PlayoffBracketSeriesTable
                                v-if="slot.type === 'data'"
                                :series="slot.series"
                                :teams-by-id="teamsById"
                                :header-class="headerClass(slot.series.stage)"
                                :aria-label="ariaLabelForSeries(slot.series.stage)"
                            />
                            <PlayoffBracketSeriesSkeleton
                                v-else
                                stage="semifinal"
                            />
                        </div>
                    </div>
                </div>

                <!-- Мост SF → финал -->
                <div
                    class="hidden min-h-0 w-8 flex-shrink-0 flex-col justify-center self-stretch pt-12 lg:flex"
                    aria-hidden="true"
                >
                    <div class="relative min-h-[10rem] flex-1 text-gray-500">
                        <svg
                            class="absolute inset-0 h-full w-full"
                            viewBox="0 0 32 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                vector-effect="non-scaling-stroke"
                                d="M 0 28 L 16 28 L 16 50 L 32 50"
                            />
                            <path
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                vector-effect="non-scaling-stroke"
                                d="M 0 72 L 16 72 L 16 50 L 32 50"
                            />
                        </svg>
                    </div>
                </div>

                <!-- Колонка 3: финал -->
                <div class="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
                    <h3
                        class="text-center text-lg font-semibold tracking-wide text-gray-200"
                    >
                        Финал
                    </h3>
                    <div
                        class="flex flex-1 flex-col items-center justify-center lg:min-h-0"
                    >
                        <div class="w-full max-w-md">
                            <PlayoffBracketSeriesTable
                                v-if="finalSlot.type === 'data'"
                                :series="finalSlot.series"
                                :teams-by-id="teamsById"
                                :header-class="headerClass(finalSlot.series.stage)"
                                :aria-label="ariaLabelForSeries(finalSlot.series.stage)"
                            />
                            <PlayoffBracketSeriesSkeleton
                                v-else
                                stage="final"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const QF_COUNT = 4
const SF_COUNT = 2

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

const qfList = computed(() => stages.value?.quarterfinal ?? [])
const sfList = computed(() => stages.value?.semifinal ?? [])
const finalList = computed(() => stages.value?.final ?? [])

const qfSlots = computed(() => {
    if (status.value === 'pending') {
        return Array.from({ length: QF_COUNT }, (_, i) => ({
            type: 'skeleton',
            key: `qf-sk-${i}`,
        }))
    }
    const list = qfList.value.slice(0, QF_COUNT)
    return Array.from({ length: QF_COUNT }, (_, i) => {
        if (i < list.length) {
            return {
                type: 'data',
                series: list[i],
                key: list[i].key,
            }
        }
        return { type: 'skeleton', key: `qf-sk-${i}` }
    })
})

const qfPairTop = computed(() => qfSlots.value.slice(0, 2))
const qfPairBottom = computed(() => qfSlots.value.slice(2, 4))

const sfSlots = computed(() => {
    if (status.value === 'pending') {
        return Array.from({ length: SF_COUNT }, (_, i) => ({
            type: 'skeleton',
            key: `sf-sk-${i}`,
        }))
    }
    const list = sfList.value.slice(0, SF_COUNT)
    return Array.from({ length: SF_COUNT }, (_, i) => {
        if (i < list.length) {
            return {
                type: 'data',
                series: list[i],
                key: list[i].key,
            }
        }
        return { type: 'skeleton', key: `sf-sk-${i}` }
    })
})

const finalSlot = computed(() => {
    if (status.value === 'pending') {
        return { type: 'skeleton', key: 'f-sk' }
    }
    const s = finalList.value[0]
    if (s) {
        return { type: 'data', series: s, key: s.key }
    }
    return { type: 'skeleton', key: 'f-sk' }
})

function ariaLabelForSeries(stage) {
    switch (stage) {
        case 'quarterfinal':
            return 'Четвертьфинал, серия до двух побед'
        case 'semifinal':
            return 'Полуфинал, серия до двух побед'
        case 'final':
            return 'Финал, серия до двух побед'
        default:
            return 'Серия плей-офф'
    }
}

function headerClass(stage) {
    switch (stage) {
        case 'quarterfinal':
            return 'bg-sky-700/90'
        case 'semifinal':
            return 'bg-indigo-700/90'
        case 'final':
            return 'bg-amber-500/95'
        default:
            return 'bg-gray-600'
    }
}
</script>
