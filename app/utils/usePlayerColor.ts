interface TeamColors {
    home: string;
    away: string;
    homeName: string;
    awayName: string;
}

const teamColorMap: Record<string | number, TeamColors> = {
    1: {
        home: 'from-gray-100 to-gray-300',
        homeName: 'Белая',
        away: 'from-green-700 to-green-900',
        awayName: 'Темно-зеленая',
    },
    2: {
        home: 'from-gray-100 to-gray-300',
        homeName: 'Белая',
        away: 'from-red-500 to-red-700',
        awayName: 'Красная',
    },
    3: {
        home: 'from-gray-100 to-gray-300',
        homeName: 'Белая',
        away: 'from-gray-800 to-black',
        awayName: 'Черная',
    },
    4: {
        home: 'from-gray-100 to-gray-300',
        homeName: 'Белая',
        away: 'from-red-500 to-red-700',
        awayName: 'Красная',
    },
    5: {
        home: 'from-gray-100 to-gray-300',
        homeName: 'Белая',
        away: 'from-red-500 to-red-700',
        awayName: 'Красная',
    },
    6: {
        home: 'from-gray-100 to-gray-300',
        homeName: 'Белая',
        away: 'from-red-500 to-red-700',
        awayName: 'Красная',
    },
    7: {
        home: 'from-cyan-500 to-cyan-700',
        homeName: 'Бирюзовая',
        away: 'from-orange-500 to-orange-700',
        awayName: 'Оранжевая',
    },
    8: {
        home: 'from-fuchsia-500 to-fuchsia-700',
        homeName: 'Фуксия',
        away: 'from-lime-500 to-lime-700',
        awayName: 'Лаймовая',
    },
};

const defaultColors: TeamColors = {
    home: 'from-gray-500 to-gray-700',
    homeName: 'Серая',
    away: 'from-slate-500 to-slate-700',
    awayName: 'Темно-серая',
};

export default (teamId: string | number): TeamColors => {
    return teamColorMap[teamId] || defaultColors;
};