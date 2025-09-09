<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden mt-16">
        <Header />
        
        <!-- Вставляем компонент календаря -->
        <Kalendar :turnirData="turnirdata" />
    </div>
</template>

<script setup>
// Импортируем компонент календаря
import Kalendar from '@/components/Kalendar.vue'

// Получаем данные турнира
const { data: turnirdata } = useFetch(
    'https://api.timeofthestars.ru/api/tournaments'
)
</script>