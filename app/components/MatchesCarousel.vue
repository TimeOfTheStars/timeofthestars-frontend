<template>
    <div>
        <Kalendar :turnirData="turnirData" :carousel="true" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const turnirData = ref([])

onMounted(async () => {
    turnirData.value = await $fetch(
        `https://api.timeofthestars.ru/championships/`
    )
})
</script>
