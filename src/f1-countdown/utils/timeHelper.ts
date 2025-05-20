export const getTimeRemaining = (targetDate: string | number) => {
    const now = new Date().getTime();
    const  end = typeof targetDate === 'string' ? new Date(targetDate).getTime() : targetDate;

    if (isNaN(end)) {
        console.log('Invalid date format', targetDate);
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const total = end - now;

    if (total <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
}
