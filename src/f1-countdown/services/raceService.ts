import raceData from '../data/races2025.json';

export interface RaceInfo {
    raceName: string;
    circuitName: string;
    location: string;
    dateTime: number;
}

export const getNextRace = async (): Promise<RaceInfo> => {
    const now = new Date();

    const next = raceData
        .filter(r => new Date(r.dateTime) > now)
        .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())[0];

    if (!next) {
        throw new Error('No upcoming race found');
    }
    
    const normalizedDate = new Date(next.dateTime).getTime();

    return {
        raceName: next.raceName,
        circuitName: next.circuitName,
        dateTime: normalizedDate,
        location: next.location,
    }
}