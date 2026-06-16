<template>
    <div>
        <Kalendar :turnirData="turnirData" :carousel="true" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const turnirData = ref([])

onMounted(async () => {
    try {
        turnirData.value = await $fetch(
            `https://api.timeofthestars.ru/championships/`
        )
        if (!Array.isArray(turnirData.value)) turnirData.value = []
    } catch (err) {
        console.error(
            'Ошибка при получении чемпионатов для карусели матчей:',
            err
        )
        turnirData.value = []
    }
})
</script>
