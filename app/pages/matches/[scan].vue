<template>
    <div class="scan-page-container">
        <!-- Sticky button to go home -->
        <NuxtLink
            v-if="showImage && imageSrc"
            to="/schedule"
            class="btn-home-sticky btn-primary-professional"
        >
            На главную
        </NuxtLink>

        <!-- Image area: show when we are sure it exists, or unknown (fallback to onerror) -->
        <div
            v-if="exists === true || (exists === null && imageSrc)"
            class="scan-image-wrapper"
        >
            <img
                :src="imageSrc"
                alt="Match Scan"
                class="scan-image"
                @error="onImageError"
                @load="onImageLoad"
            />
        </div>

        <!-- Not found / error -->
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
                    to="/schedule"
                    class="btn-primary-professional not-found-button"
                    >В расписание</NuxtLink
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getScan } from '../../utils/PicturesAdmin'
import { useHead } from '#imports'

const route = useRoute()
const scanIdParam = route.params.scan

let scanId: string | null = null
if (Array.isArray(scanIdParam)) {
    scanId = scanIdParam[0] || null
} else if (scanIdParam) {
    scanId = String(scanIdParam)
}

const imageSrc = scanId ? getScan(scanId) : null

// exists: true = file exists (HEAD ok)
// null = unknown (we'll render image and rely on onerror)
// false = definitely not exists
const exists = ref<boolean | null>(null)
const showImage = ref(true)
const loading = ref(true)

function onImageError() {
    showImage.value = false
    loading.value = false
    exists.value = false
}

function onImageLoad() {
    loading.value = false
    showImage.value = true
}

onMounted(async () => {
    // If there is no imageSrc — nothing to check
    if (!imageSrc) {
        exists.value = false
        loading.value = false
        showImage.value = false
        return
    }

    // Try checking quickly with HEAD to avoid rendering broken image when possible
    try {
        const res = await fetch(imageSrc, { method: 'HEAD' })
        if (res.ok) {
            exists.value = true
            loading.value = false
            showImage.value = true
            return
        }
        // Some servers (like certain nginx configs) may not allow HEAD and return 405
        if (res.status === 405) {
            // Unknown — fallback to rendering <img> and rely on onerror
            exists.value = null
            loading.value = true
            showImage.value = true
            return
        }

        // Not ok and not 405 — treat as not found
        exists.value = false
        loading.value = false
        showImage.value = false
    } catch (e) {
        // Network error or CORS — cannot determine. Fallback to letting <img> try to load.
        exists.value = null
        loading.value = true
        showImage.value = true
    }
})

useHead({
    title: `Скан протокола матча №${scanId} - ВРЕМЯ ЗВЁЗД`,
    meta: [
        {
            name: 'description',
            content: `Скан-копия официального протокола матча №${scanId} любительской хоккейной лиги \"ВРЕМЯ ЗВЁЗД\".`,
        },
        {
            name: 'keywords',
            content: `хоккей, протокол, матч, скан, №${scanId}, ярославль, время звезд`,
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: `Протокол матча №${scanId} - ВРЕМЯ ЗВЁЗД`,
        },
        {
            property: 'og:description',
            content: `Официальный протокол матча №${scanId}.`,
        },
        { property: 'og:type', content: 'article' },
        // og:image will be set only if imageSrc truthy to avoid pointing to empty string
        ...(imageSrc ? [{ property: 'og:image', content: imageSrc }] : []),
    ],
})
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
    white-space: nowrap; /* Prevent text wrapping */
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
    white-space: nowrap; /* Prevent text wrapping */
}

@media (max-width: 768px) {
    .scan-page-container {
        padding: 1rem;
    }

    .not-found-card {
        padding: 2rem;
        max-width: 90%;
    }

    .not-found-title {
        font-size: 1.8rem;
    }

    .not-found-text {
        font-size: 1rem;
    }

    .btn-home-sticky {
        bottom: 1rem;
        right: 1rem;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}
</style>
