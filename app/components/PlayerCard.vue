<template>
    <div>
        <div class="w-16 h-16 relative mx-auto mb-4">
            <img
                :src="player.logo"
                :alt="player.team"
                class="w-full h-full object-contain rounded-full"
            />
        </div>
        <h3 class="text-xl font-bold mb-2">
            {{ player.name }}
        </h3>
        <p class="text-gray-400 mb-4">{{ player.team }}</p>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <div class="text-2xl font-bold text-accent-blue">
                    {{ player.goals }}
                </div>
                <div class="text-sm text-gray-400">Голы</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-accent-red">
                    {{ player.assists }}
                </div>
                <div class="text-sm text-gray-400">Передачи</div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    player: {
        type: Object,
        required: true,
        validator: value => {
            return value.id && value.name
        },
    },
})
</script>

<style></style>
