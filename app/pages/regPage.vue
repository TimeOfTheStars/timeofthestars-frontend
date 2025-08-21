<template>
    <div class="min-h-screen bg-gray-900 text-white">
        <Header />

        <!-- Success Message -->
        <div v-if="isSubmitted" class="py-20 px-4">
            <div class="max-w-2xl mx-auto text-center">
                <div
                    class="bg-gray-800 rounded-2xl p-12 border border-gray-700"
                >
                    <div class="text-6xl mb-6">🎉</div>
                    <h1 class="text-3xl font-bold mb-4 text-gradient">
                        Заявка успешно отправлена!
                    </h1>
                    <p class="text-gray-300 mb-8">
                        Спасибо за регистрацию команды "{{
                            formData.teamName
                        }}". Мы свяжемся с вами в течение 24 часов для
                        подтверждения участия.
                    </p>
                    <div class="bg-gray-700 rounded-xl p-6 mb-8">
                        <h3 class="font-semibold mb-4">Что дальше?</h3>
                        <ul class="text-left space-y-2 text-gray-300">
                            <li class="flex items-center gap-2">
                                <span class="text-green-400">✓</span>
                                Проверим вашу заявку
                            </li>
                            <li class="flex items-center gap-2">
                                <span class="text-blue-400">📞</span>
                                Свяжемся с капитаном команды
                            </li>
                            <li class="flex items-center gap-2">
                                <span class="text-yellow-400">📋</span>
                                Отправим документы для участия
                            </li>
                            <li class="flex items-center gap-2">
                                <span class="text-purple-400">🏒</span>
                                Включим в расписание турниров
                            </li>
                        </ul>
                    </div>
                    <RouterLink
                        to="/"
                        class="bg-gradient-to-r from-primary-blue to-primary-red text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
                    >
                        Вернуться на главную
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- Registration Form -->
        <div v-else>
            <!-- Header Section -->
            <section class="relative overflow-hidden">
                <div
                    class="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-red/20"
                ></div>
                <div class="gradient-bg py-16 px-4 relative">
                    <div class="max-w-4xl mx-auto text-center">
                        <div class="text-6xl mb-6">🏒</div>
                        <h1
                            class="text-4xl md:text-5xl font-bold mb-4 text-white"
                        >
                            Регистрация команды
                        </h1>
                        <p class="text-xl text-white/90 max-w-2xl mx-auto">
                            Присоединяйтесь к TIME OF THE STARS и станьте частью
                            лучшей любительской хоккейной лиги!
                        </p>
                    </div>
                </div>
            </section>

            <!-- Form Section -->
            <section class="py-16 px-4">
                <div class="max-w-4xl mx-auto">
                    <form @submit.prevent="handleSubmit" class="space-y-8">
                        <!-- Team Information -->
                        <div
                            class="bg-gray-800 rounded-xl p-8 border border-gray-700"
                        >
                            <h2
                                class="text-2xl font-bold mb-6 flex items-center gap-2"
                            >
                                <span class="text-3xl">🏒</span>
                                Информация о команде
                            </h2>

                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        Название команды *
                                    </label>
                                    <input
                                        type="text"
                                        v-model="formData.teamName"
                                        @input="clearError('teamName')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            {
                                                'border-red-500':
                                                    errors.teamName,
                                            },
                                        ]"
                                        placeholder="ХК Название"
                                    />
                                    <p
                                        v-if="errors.teamName"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.teamName }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        Город *
                                    </label>
                                    <input
                                        type="text"
                                        v-model="formData.city"
                                        @input="clearError('city')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            { 'border-red-500': errors.city },
                                        ]"
                                        placeholder="Ярославль"
                                    />
                                    <p
                                        v-if="errors.city"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.city }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        Количество игроков *
                                    </label>
                                    <select
                                        v-model="formData.playersCount"
                                        @change="clearError('playersCount')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            {
                                                'border-red-500':
                                                    errors.playersCount,
                                            },
                                        ]"
                                    >
                                        <option value="">
                                            Выберите количество
                                        </option>
                                        <option value="15-18">
                                            15-18 игроков
                                        </option>
                                        <option value="19-22">
                                            19-22 игрока
                                        </option>
                                        <option value="23-25">
                                            23-25 игроков
                                        </option>
                                        <option value="25+">
                                            Более 25 игроков
                                        </option>
                                    </select>
                                    <p
                                        v-if="errors.playersCount"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.playersCount }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        Уровень опыта *
                                    </label>
                                    <select
                                        v-model="formData.experience"
                                        @change="clearError('experience')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            {
                                                'border-red-500':
                                                    errors.experience,
                                            },
                                        ]"
                                    >
                                        <option value="">
                                            Выберите уровень
                                        </option>
                                        <option
                                            v-for="level in experienceLevels"
                                            :key="level.value"
                                            :value="level.value"
                                        >
                                            {{ level.label }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="errors.experience"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.experience }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Captain Information -->
                        <div
                            class="bg-gray-800 rounded-xl p-8 border border-gray-700"
                        >
                            <h2
                                class="text-2xl font-bold mb-6 flex items-center gap-2"
                            >
                                <span class="text-3xl">👨‍💼</span>
                                Контактная информация капитана
                            </h2>

                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        ФИО капитана *
                                    </label>
                                    <input
                                        type="text"
                                        v-model="formData.captainName"
                                        @input="clearError('captainName')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            {
                                                'border-red-500':
                                                    errors.captainName,
                                            },
                                        ]"
                                        placeholder="Иванов Иван Иванович"
                                    />
                                    <p
                                        v-if="errors.captainName"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.captainName }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        Номер телефона *
                                    </label>
                                    <input
                                        type="tel"
                                        v-model="formData.captainPhone"
                                        @input="clearError('captainPhone')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            {
                                                'border-red-500':
                                                    errors.captainPhone,
                                            },
                                        ]"
                                        placeholder="+7 (999) 123-45-67"
                                    />
                                    <p
                                        v-if="errors.captainPhone"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.captainPhone }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-2"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        v-model="formData.captainEmail"
                                        @input="clearError('captainEmail')"
                                        :class="[
                                            'w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors',
                                            {
                                                'border-red-500':
                                                    errors.captainEmail,
                                            },
                                        ]"
                                        placeholder="captain@team.ru"
                                    />
                                    <p
                                        v-if="errors.captainEmail"
                                        class="text-red-400 text-sm mt-1"
                                    >
                                        {{ errors.captainEmail }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Tournament Selection -->
                        <div
                            class="bg-gray-800 rounded-xl p-8 border border-gray-700"
                        >
                            <h2
                                class="text-2xl font-bold mb-6 flex items-center gap-2"
                            >
                                <span class="text-3xl">🏆</span>
                                Выбор турниров
                            </h2>

                            <div class="space-y-4">
                                <label
                                    v-for="tournament in tournaments"
                                    :key="tournament.id"
                                    class="flex items-start gap-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        :value="tournament.id"
                                        v-model="formData.tournaments"
                                        @change="clearError('tournaments')"
                                        class="mt-1 w-5 h-5 text-primary-blue bg-gray-600 border-gray-500 rounded focus:ring-primary-blue focus:ring-2"
                                    />
                                    <div>
                                        <div class="font-semibold">
                                            {{ tournament.name }}
                                        </div>
                                        <div class="text-sm text-gray-400">
                                            {{ tournament.description }}
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <p
                                v-if="errors.tournaments"
                                class="text-red-400 text-sm mt-2"
                            >
                                Выберите хотя бы один турнир
                            </p>
                        </div>

                        <!-- Additional Information -->
                        <div
                            class="bg-gray-800 rounded-xl p-8 border border-gray-700"
                        >
                            <h2
                                class="text-2xl font-bold mb-6 flex items-center gap-2"
                            >
                                <span class="text-3xl">📝</span>
                                Дополнительная информация
                            </h2>

                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Расскажите о команде (необязательно)
                                </label>
                                <textarea
                                    v-model="formData.additionalInfo"
                                    rows="4"
                                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors resize-none"
                                    placeholder="Опыт участия в турнирах, достижения, особые пожелания..."
                                ></textarea>
                            </div>
                        </div>

                        <!-- Agreement -->
                        <div
                            class="bg-gray-800 rounded-xl p-8 border border-gray-700"
                        >
                            <label
                                class="flex items-start gap-3 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    v-model="formData.agreement"
                                    @change="clearError('agreement')"
                                    :class="[
                                        'mt-1 w-5 h-5 text-primary-blue bg-gray-600 border rounded focus:ring-primary-blue focus:ring-2',
                                        { 'border-red-500': errors.agreement },
                                    ]"
                                />
                                <div class="text-sm">
                                    <span>Я согласен с </span>
                                    <a
                                        href="#"
                                        class="text-primary-blue hover:text-accent-blue transition-colors"
                                    >
                                        правилами участия в турнирах
                                    </a>
                                    <span> и </span>
                                    <a
                                        href="#"
                                        class="text-primary-blue hover:text-accent-blue transition-colors"
                                    >
                                        политикой обработки персональных данных
                                    </a>
                                    <span> *</span>
                                </div>
                            </label>
                            <p
                                v-if="errors.agreement"
                                class="text-red-400 text-sm mt-2"
                            >
                                Необходимо согласие с правилами
                            </p>
                        </div>

                        <!-- Submit Button -->
                        <div class="text-center">
                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                :class="[
                                    'bg-gradient-to-r from-primary-blue to-primary-red text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg',
                                    {
                                        'opacity-50 cursor-not-allowed':
                                            isSubmitting,
                                    },
                                ]"
                            >
                                <span
                                    v-if="isSubmitting"
                                    class="flex items-center gap-2"
                                >
                                    <div
                                        class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                    ></div>
                                    Отправка заявки...
                                </span>
                                <span v-else>🚀 Подать заявку на участие</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <!-- Info Section -->
            <section class="py-16 px-4 bg-gray-800">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8 text-center">
                        ❓ Часто задаваемые вопросы
                    </h2>

                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-6">
                            <div class="bg-gray-700 rounded-xl p-6">
                                <h3 class="font-semibold mb-2">
                                    Какие требования к команде?
                                </h3>
                                <p class="text-gray-300 text-sm">
                                    Минимум 15 игроков, возраст от 18 лет,
                                    базовые навыки игры в хоккей.
                                </p>
                            </div>

                            <div class="bg-gray-700 rounded-xl p-6">
                                <h3 class="font-semibold mb-2">
                                    Сколько стоит участие?
                                </h3>
                                <p class="text-gray-300 text-sm">
                                    Регистрационный взнос составляет 15,000₽ за
                                    сезон. Включает участие во всех выбранных
                                    турнирах.
                                </p>
                            </div>

                            <div class="bg-gray-700 rounded-xl p-6">
                                <h3 class="font-semibold mb-2">
                                    Когда начинается сезон?
                                </h3>
                                <p class="text-gray-300 text-sm">
                                    Новый сезон стартует в сентябре. Регистрация
                                    открыта круглый год.
                                </p>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div class="bg-gray-700 rounded-xl p-6">
                                <h3 class="font-semibold mb-2">
                                    Нужна ли своя экипировка?
                                </h3>
                                <p class="text-gray-300 text-sm">
                                    Да, каждый игрок должен иметь полную
                                    хоккейную экипировку согласно требованиям
                                    безопасности.
                                </p>
                            </div>

                            <div class="bg-gray-700 rounded-xl p-6">
                                <h3 class="font-semibold mb-2">
                                    Как проходят матчи?
                                </h3>
                                <p class="text-gray-300 text-sm">
                                    Матчи проводятся по выходным на ледовых
                                    аренах Ярославля. Длительность игры - 3
                                    периода по 20 минут.
                                </p>
                            </div>

                            <div class="bg-gray-700 rounded-xl p-6">
                                <h3 class="font-semibold mb-2">
                                    Есть ли ограничения по возрасту?
                                </h3>
                                <p class="text-gray-300 text-sm">
                                    Лига для взрослых игроков от 18 лет. Верхних
                                    ограничений нет.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const formData = ref({
    teamName: '',
    city: '',
    captainName: '',
    captainPhone: '',
    captainEmail: '',
    playersCount: '',
    experience: '',
    tournaments: [],
    additionalInfo: '',
    agreement: false,
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errors = ref({})

const tournaments = [
    {
        id: 'friendly',
        name: 'Товарищеские турниры',
        description: 'Регулярные товарищеские матчи',
    },
    {
        id: 'victory',
        name: 'Кубок Победы',
        description: 'Ежегодный престижный турнир',
    },
    {
        id: 'zvezda',
        name: 'Звезда Отечества',
        description: 'Главный чемпионат лиги',
    },
    {
        id: 'seasonal',
        name: 'Сезонные турниры',
        description: 'Специальные сезонные соревнования',
    },
]

const experienceLevels = [
    { value: 'beginner', label: 'Начинающие (до 1 года)' },
    { value: 'amateur', label: 'Любители (1-3 года)' },
    { value: 'experienced', label: 'Опытные (3-5 лет)' },
    { value: 'professional', label: 'Профессионалы (5+ лет)' },
]

const clearError = field => {
    if (errors.value[field]) {
        errors.value[field] = undefined
    }
}

const validateForm = () => {
    errors.value = {}

    if (!formData.value.teamName.trim())
        errors.value.teamName = 'Название команды обязательно'
    if (!formData.value.city.trim()) errors.value.city = 'Город обязателен'
    if (!formData.value.captainName.trim())
        errors.value.captainName = 'Имя капитана обязательно'
    if (!formData.value.captainPhone.trim())
        errors.value.captainPhone = 'Телефон обязателен'
    if (!formData.value.captainEmail.trim())
        errors.value.captainEmail = 'Email обязателен'
    if (!formData.value.playersCount)
        errors.value.playersCount = 'Количество игроков обязательно'
    if (!formData.value.experience)
        errors.value.experience = 'Уровень опыта обязателен'
    if (formData.value.tournaments.length === 0)
        errors.value.tournaments = ['Выберите хотя бы один турнир']
    if (!formData.value.agreement) errors.value.agreement = true

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (
        formData.value.captainEmail &&
        !emailRegex.test(formData.value.captainEmail)
    ) {
        errors.value.captainEmail = 'Некорректный email'
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (
        formData.value.captainPhone &&
        !phoneRegex.test(formData.value.captainPhone)
    ) {
        errors.value.captainPhone = 'Некорректный номер телефона'
    }

    return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        isSubmitted.value = true
    } catch (error) {
        console.error('Ошибка при отправке формы:', error)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
.text-gradient {
    background: linear-gradient(to right, #4f46e5, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>