<template>
    <div class="w-20 h-20 relative mx-auto mb-4">
        <img
            :src="getTeamLogo(team.id)"
            :alt="team.name"
            class="w-full h-full object-contain rounded-full"
        />
    </div>
    <h3 class="text-lg font-bold mb-1">{{ team.name }}</h3>
    <p class="text-gray-400 text-sm mb-4">
        {{ team.city }}
    </p>

    <div class="grid grid-cols-3 gap-2 text-center">
        <div>
            <div class="text-lg font-bold text-green-400">
                {{ team.pivot?.wins ?? 0 }}
            </div>
            <div class="text-xs text-gray-400">Победы</div>
        </div>
        <div>
            <div class="text-lg font-bold text-red-400">
                {{ team.pivot?.losses ?? 0 }}
            </div>
            <div class="text-xs text-gray-400">Поражения</div>
        </div>
        <div>
            <div class="text-lg font-bold text-accent-blue">
                {{ team.players_count ?? 0 }}
            </div>
            <div class="text-xs text-gray-400">Игроки</div>
        </div>
    </div>

    <NuxtLink :to="`/teams/${team.id}`">
        <div
            class="w-full block mt-4 bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary-blue transition-colors"
        >
            Подробнее о команде
        </div>
    </NuxtLink>
</template>

<script setup>
import { getTeamLogo } from '@/utils/PicturesAdmin.ts'

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
