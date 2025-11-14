const FALLBACKS = {
    team: '/photo.png',
    player: '/pictures/players/defaultplayer.jpg',
    scan: '',
    generic: '/photo.png',
}

export function checkImageExists(url: string): Promise<boolean> {
    return new Promise(resolve => {
        const img = new Image()

        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)

        img.src = url
    })
}

export async function getSafeImage(
    url: string,
    fallback: string = FALLBACKS.generic
): Promise<string> {
    if (!url) return fallback
    const exists = await checkImageExists(url)
    return exists ? url : fallback
}

export function onImageError(
    event: Event,
    type: keyof typeof FALLBACKS = 'generic'
) {
    const target = event.target as HTMLImageElement
    target.src = FALLBACKS[type] ?? FALLBACKS.generic
}

export function getTeamLogo(logoUrl: string): string {
    if (!logoUrl) {
        return FALLBACKS.team
    }

    return `/pictures/teams/${logoUrl}`
}

export function getPlayerPhoto(photo: string): string {
    if (!photo) {
        return FALLBACKS.player
    }

    return `/pictures/players/${photo}`
}

export function getScan(scan: string): string {
    if (!scan) {
        return FALLBACKS.scan
    }

    return `/pictures/scans/${scan}`
}
