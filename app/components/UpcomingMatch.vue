<template>
    <div class="flex items-center justify-between mb-4">
        <div
            class="bg-primary-blue px-3 py-1 rounded-full text-white text-sm font-medium"
        >
            {{ match.tournaments[0].name }}
        </div>
        <div class="text-gray-400 text-sm">
            {{ match.date }} • {{ match.time }}
        </div>
    </div>

    <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 relative">
                <img
                    :src="getTeamLogo(match.team_a_id)"
                    :alt="match.team1"
                    class="w-full h-full object-contain rounded-full"
                />
            </div>
            <span class="font-medium">{{ match.team_a.name }}</span>
        </div>
        <div class="text-2xl font-bold text-gray-400">VS</div>
        <div class="flex items-center gap-3">
            <span class="font-medium">{{ match.team_b.name }}</span>
            <div class="w-12 h-12 relative">
                <img
                    :src="getTeamLogo(match.team_b_id)"
                    :alt="match.team2"
                    class="w-full h-full object-contain rounded-full"
                />
            </div>
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

</script>
