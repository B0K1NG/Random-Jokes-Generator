import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/timeHelper';
import { getNextRace } from '../services/raceService'

const CountdownTimer: React.FC = () => {
    // console.log(getTimeRemaining('2027-10-22T14:00:00Z'));
    const [raceName, setRaceName] = useState<string>('');
    const [circuitName, setCircuitName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [dateTime, setDateTime] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = 
        useState<{ days: number; hours: number; minutes: number; seconds: number }>
            ({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });

    useEffect(() => {
        const fetchRaceData = async () => {
            try {
                const raceData = await getNextRace();
                console.log('Fetched race data:', raceData);

                setRaceName(raceData.raceName);
                setCircuitName(raceData.circuitName);
                setLocation(raceData.location);
                setDateTime(raceData.dateTime);
            }
            catch (error) {
                console.error('Could not fetch the data', error);
            }
        };
        fetchRaceData();
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            const time = getTimeRemaining(dateTime);
            setTimeRemaining(time);
        });
        return () => clearInterval(interval);
    }, [dateTime]);


    

    return (
        <div>
            <h1>Next F1 Race</h1>
            {raceName && dateTime ? (
                <>
                <h2>{raceName}</h2>
                <p>{circuitName} — {location}</p>

                <span>{timeRemaining.days}d </span>
                <span>{timeRemaining.hours}h </span>
                <span>{timeRemaining.minutes}m </span>
                <span>{timeRemaining.seconds}s </span>
                </>
            ) : (
                <p>Loading race info...</p>
            )}
        
        </div>
    );
};

export default CountdownTimer;