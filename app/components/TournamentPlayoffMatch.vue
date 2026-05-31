<template>
    <div
        class="overflow-hidden rounded-lg border border-gray-600 bg-gray-800/80 shadow-lg"
        role="group"
    >
        <div class="h-2.5 shrink-0 md:h-3" :class="headerClass" aria-hidden="true" />
        <table class="w-full table-fixed border-collapse text-sm">
            <colgroup>
                <col class="w-auto" />
                <col class="w-16 sm:w-20" />
            </colgroup>
            <thead>
                <tr class="border-b border-gray-600 bg-gray-900/50">
                    <th
                        class="border-r border-gray-600 px-2 py-2 text-left font-medium text-gray-300"
                    >
                        Команда
                    </th>
                    <th
                        class="px-2 py-2 text-center font-medium text-gray-300"
                    >
                        Счёт
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="teamId in match.teamIds"
                    :key="teamId"
                    class="border-b border-gray-700 last:border-b-0"
                    :class="{ 'bg-emerald-900/25': winnerId === teamId }"
                >
                    <td
                        class="border-r border-gray-600 px-2 py-2 font-medium text-gray-100"
                    >
                        <span
                            class="block min-w-0 truncate leading-tight"
                            :title="teamsById[teamId] ?? `Команда #${teamId}`"
                        >
                            {{ teamsById[teamId] ?? `Команда #${teamId}` }}
                        </span>
                    </td>
                    <td
                        class="px-2 py-2 text-center"
                        :class="cellClass(teamId)"
                    >
                        {{ cellDisplay(teamId) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    match: { type: Object, required: true },
    teamsById: { type: Object, required: true },
    headerClass: { type: String, required: true },
})

// Берём первую (единственную) игру серии.
const slot = computed(() => props.match.gameSlots?.[0] ?? null)
const winnerId = computed(() => slot.value?.winnerId ?? null)

function cellDisplay(teamId) {
    const s = slot.value
    if (!s || !s.played) return '—'
    const v = s.scores?.[teamId]
    return v == null ? '—' : String(v)
}

function cellClass(teamId) {
    const s = slot.value
    if (!s || !s.played) return 'text-gray-500'
    const [a, b] = props.match.teamIds
    const sa = s.scores?.[a]
    const sb = s.scores?.[b]
    if (sa == null || sb == null) return 'text-gray-500'
    if (sa === sb) return 'text-gray-300'
    return winnerId.value === teamId
        ? 'bg-sky-900/70 font-bold text-white'
        : 'text-gray-300'
}
</script>
