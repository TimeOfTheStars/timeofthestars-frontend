<template>
    <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2"
    >
        <div
            class="bg-primary-blue px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium self-start"
        >
            {{ match.tournaments[0].name }}
        </div>
        <div class="text-gray-400 text-xs sm:text-sm">
            {{ formatDate(match.date) }} • {{ formatTime(match.time) }}
        </div>
    </div>

    <div class="flex items-center justify-around gap-2">
        <div
            class="w-1/3 flex flex-col items-center text-center gap-2 md:flex-row md:gap-3 md:justify-start"
        >
            <div class="w-12 h-12 relative flex-shrink-0">
                <img
                    :src="getTeamLogo(match.team_a_id)"
                    :alt="match.team_a.name"
                    class="w-full h-full object-contain rounded-full"
                />
            </div>
            <span class="font-medium text-sm md:text-base">{{
                match.team_a.name
            }}</span>
        </div>

        <div class="text-xl md:text-2xl font-bold text-gray-400">VS</div>

        <div
            class="w-1/3 flex flex-col items-center text-center gap-2 md:flex-row-reverse md:gap-3"
        >
            <div class="w-12 h-12 relative flex-shrink-0">
                <img
                    :src="getTeamLogo(match.team_b_id)"
                    :alt="match.team_b.name"
                    class="w-full h-full object-contain rounded-full"
                />
            </div>
            <span class="font-medium text-sm md:text-base">{{
                match.team_b.name
            }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    match: {
        type: Object,
        required: true,
        validator: value => {
            return value.id
        },
    },
})

function formatTime(timeString) {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
}

function formatDate(dateString) {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })
}
</script>
