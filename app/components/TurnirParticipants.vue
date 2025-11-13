<template>
    <div class="flex items-center space-x-4 mb-4">
        <div class="w-16 h-16 relative">
            <img
                :src="getTeamLogo(team.logo_url)"
                :alt="team.name"
                class="w-full h-full object-contain rounded-full"
            />
        </div>
        <div>
            <h3 class="text-lg font-semibold">
                {{ team.name }}
            </h3>
            <p class="text-gray-400">{{ team.city }}</p>
        </div>
    </div>

    <div class="grid grid-cols-4 gap-4 text-center">
        <div>
            <div class="text-xl font-bold text-green-400">
                {{ team.stats.wins || 0 }}
            </div>
            <div class="text-xs text-gray-400">Победы</div>
        </div>
        <div>
            <div class="text-xl font-bold text-red-400">
                {{ team.stats.losses || 0 }}
            </div>
            <div class="text-xs text-gray-400">Поражения</div>
        </div>
        <div>
            <div class="text-xl font-bold text-accent-blue">
                {{ team.stats.points }}
            </div>
            <div class="text-xs text-gray-400">Очки</div>
        </div>
        <div>
            <div class="text-xl font-bold text-blue-400">
                {{ team?.stats?.games || 0 }}
            </div>
            <div class="text-xs text-gray-400">Игры</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    team: {
        type: Object,
        required: true,
        validator: value => {
            return value.id
        },
    },
})
</script>
