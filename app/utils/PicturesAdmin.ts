const PLAYER_PLACEHOLDER_SVG =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#4b5563"><circle cx="50" cy="35" r="18"/><path d="M20 92c0-16 13-30 30-30s30 14 30 30z"/></svg>'
    )

const FALLBACKS = {
    team: '/photo.png',
    player: PLAYER_PLACEHOLDER_SVG,
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
