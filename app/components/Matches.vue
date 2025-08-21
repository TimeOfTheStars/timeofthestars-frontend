<template>
    <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-400 w-32">
                                <div>{{ match.date }}</div>
                                <div>{{ match.time }}</div>
                            </div>
                            <div
                                class="flex items-center gap-6 flex-1 justify-center"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 relative">
                                        <img
                                            :src="getTeamLogo(match.team_a_id)"
                                            :alt="match.team1"
                                            class="w-full h-full object-contain rounded-full"
                                        />
                                    </div>
                                    <span class="font-medium">{{
                                        match.team_a_id
                                    }}</span>
                                </div>
                                <div
                                    class="bg-primary-blue px-4 py-2 rounded-lg text-white font-bold text-lg"
                                >
                                    {{ match.score }}
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="font-medium">{{
                                        match.team_b_id
                                    }}</span>
                                    <div class="w-10 h-10 relative">
                                        <img
                                            :src="getTeamLogo(match.team_b_id)"
                                            :alt="match.team2"
                                            class="w-full h-full object-contain rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
</template>

<script setup>
defineProps({
    match:{
        type:Object,
        required:true,
    }
})
</script>