<template>
    <div
        class="overflow-hidden rounded-lg border border-gray-600 bg-gray-800/80 shadow-lg"
        :aria-label="ariaLabel"
        role="group"
    >
        <div
            class="h-2.5 shrink-0 md:h-3"
            :class="headerClass"
            aria-hidden="true"
        />
        <table class="w-full border-collapse text-sm">
            <thead>
                <tr class="border-b border-gray-600 bg-gray-900/50">
                    <th
                        class="border-r border-gray-600 px-2 py-2 text-left font-medium text-gray-300"
                    >
                        Команда
                    </th>
                    <th
                        class="border-r border-gray-600 px-2 py-2 text-center font-medium text-gray-300"
                    >
                        Игра 1
                    </th>
                    <th
                        class="border-r border-gray-600 px-2 py-2 text-center font-medium text-gray-300"
                    >
                        Игра 2
                    </th>
                    <th class="px-2 py-2 text-center font-medium text-gray-300">
                        Игра 3
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="n in 2"
                    :key="n"
                    class="border-b border-gray-700 last:border-b-0"
                >
                    <td
                        class="border-r border-gray-600 px-2 py-2 text-gray-500"
                    >
                        &nbsp;
                    </td>
                    <td
                        v-for="c in 3"
                        :key="c"
                        class="border-r border-gray-600 px-2 py-2 text-center text-gray-500 last:border-r-0"
                    >
                        &nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    stage: {
        type: String,
        required: true,
        validator: s =>
            s === 'quarterfinal' || s === 'semifinal' || s === 'final',
    },
})

const ariaLabel = computed(() => {
    switch (props.stage) {
        case 'quarterfinal':
            return 'Четвертьфинал, ожидаются данные'
        case 'semifinal':
            return 'Полуфинал, ожидаются данные'
        case 'final':
            return 'Финал, ожидаются данные'
        default:
            return 'Серия плей-офф'
    }
})

const headerClass = computed(() => {
    switch (props.stage) {
        case 'quarterfinal':
            return 'bg-sky-700/90'
        case 'semifinal':
            return 'bg-indigo-700/90'
        case 'final':
            return 'bg-amber-500/95'
        default:
            return 'bg-gray-600'
    }
})
</script>
