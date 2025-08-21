const teamLogos: Record<number, string> = {
    1: '/photo_53844715688281.png.webp',
    2: '/photo_53844715688281.png (1).webp',
    3: '/photo_53844715688281.png (2).webp',
    4: '/photo_53844715688281.png (3).webp',
    5: '/photo_53844715688281.png (4).webp',
    6: '/FGFGF (1).png',
    7: '/photo.png.webp',
    8: '/photo.png',
    99: '/photo.png', // запасной логотип
}

export function getTeamLogo(id: number): string {
    return teamLogos[id] ?? '/photo.png'
}