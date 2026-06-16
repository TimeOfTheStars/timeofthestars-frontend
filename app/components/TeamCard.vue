<template>
    <div class="w-20 h-20 relative mx-auto mb-4">
        <img
            :src="getTeamLogo(team?.logo_url)"
            :alt="team.name"
            class="w-full h-full object-contain rounded-full"
        />
    </div>
    <h3 class="text-lg font-bold mb-1">{{ team.name }}</h3>
    <p class="text-gray-400 text-sm mb-4">
        {{ team.city }}
    </p>

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
