export function getTeamLogo(logoUrl: string): string {
    if (!logoUrl) {
        return '/photo.png'
    }
    return `/pictures/teams/${logoUrl}`
}

export function getPlayerPhoto(photo: string): string {
    if (!photo) {
        return ''
    }
    console.log(photo)
    return `/pictures/players/${photo}`
}

export function getScan(scan: string): string {
    if (!scan) {
        return ''
    }

    return `/pictures/scans/${scan}`
}
