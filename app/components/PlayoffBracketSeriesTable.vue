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
                    v-for="teamId in series.teamIds"
                    :key="teamId"
                    class="border-b border-gray-700 last:border-b-0"
                    :class="{
                        'bg-emerald-900/25': series.seriesWinnerId === teamId,
                    }"
                >
                    <td
                        class="border-r border-gray-600 px-2 py-2 font-medium text-gray-100"
                    >
                        {{ teamsById[teamId] ?? `Команда #${teamId}` }}
                    </td>
                    <td
                        v-for="(slot, colIdx) in series.gameSlots"
                        :key="colIdx"
                        class="border-r border-gray-600 px-2 py-2 text-center last:border-r-0"
                        :class="cellClass(slot, teamId)"
                    >
                        {{ cellDisplay(slot, teamId) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    series: { type: Object, required: true },
    teamsById: { type: Object, required: true },
    headerClass: { type: String, required: true },
    ariaLabel: { type: String, default: 'Серия плей-офф' },
})

function cellDisplay(slot, teamId) {
    if (!slot.played) return '—'
    const v = slot.scores[teamId]
    return v == null ? '—' : String(v)
}

function cellClass(slot, teamId) {
    if (!slot.played) return 'text-gray-500'
    const [a, b] = props.series.teamIds
    const sa = slot.scores[a]
    const sb = slot.scores[b]
    if (sa == null || sb == null) return 'text-gray-500'
    if (sa === sb) return 'text-gray-300'
    const won = slot.winnerId === teamId
    if (!won) return 'text-gray-300'
    return 'bg-sky-900/70 font-bold text-white'
}
</script>
