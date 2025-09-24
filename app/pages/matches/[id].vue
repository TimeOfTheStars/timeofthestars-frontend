<template>
    <div class="scan-page-container">
        <!-- Sticky button to go home -->
        <NuxtLink
            v-if="imageSrc"
            to="/"
            class="btn-home-sticky btn-primary-professional"
        >
            На главную
        </NuxtLink>

        <div v-if="imageSrc" class="scan-image-wrapper">
            <img :src="imageSrc" alt="Match Scan" class="scan-image" />
        </div>

        <div v-else class="not-found-container animate-fadeInUp">
            <div class="card-professional not-found-card">
                <h1 class="text-gradient-professional not-found-title">
                    Скан не найден
                </h1>
                <p class="text-muted-professional not-found-text">
                    К сожалению, для этого матча скан-копия протокола еще не
                    загружена.
                </p>
                <NuxtLink
                    to="/"
                    class="btn-primary-professional not-found-button"
                >
                    Вернуться на главную
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getScan } from '../../utils/PicturesAdmin'

const route = useRoute()
const scanIdParam = route.params.id

const idString =
    (Array.isArray(scanIdParam) ? scanIdParam[0] : scanIdParam) || ''
const id = parseInt(idString, 10)

const imageSrc = !isNaN(id) ? getScan(id) : ''
</script>

<style>
.scan-page-container {
    min-height: 100vh;
    background: var(--background);
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align to top */
}

.scan-image-wrapper {
    width: 100%;
    max-width: 1200px; /* Limit max width of the image container */
}

.scan-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: calc(100vh - 4rem); /* Full viewport height minus padding */
}

.not-found-card {
    padding: 3rem 4rem;
    border-radius: 12px;
    max-width: 600px;
}

.not-found-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.not-found-text {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.not-found-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: white;
    border-radius: 8px;
}

.btn-home-sticky {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 0.75rem 1.5rem;
    border-radius: 50px; /* Pill shape */
    z-index: 1000;
    text-decoration: none;
    color: white;
    font-weight: 600;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}
</style>
