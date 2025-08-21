import { ref, computed } from 'vue'

interface Team {
  id: number
  name: string
  city: string
  players_count: number
  wins: number
  losses: number
  created_at: string
  updated_at: string
  logo?: string
  [key: string]: any
}

const teams = ref<Team[] | null>(null)
const teamsMap = computed(() => {
    if (!teams.value) return new Map()
    return new Map(teams.value.map(team => [team.id, team]))
})

export async function useTeams() {
    if (!teams.value) {
        const { data, error } = await useFetch<Team[]>(
            'https://timeofthestars.ru/api/teams'
        )

        if (error.value) {
            console.error('Ошибка загрузки команд:', error.value)
        }

        if (data.value) {
            teams.value = data.value
        }
    }

    // Функция: получить команду по id
    const getTeamById = (id: number) => teamsMap.value.get(id)


    return {
        teams,
        getTeamById
    }
}