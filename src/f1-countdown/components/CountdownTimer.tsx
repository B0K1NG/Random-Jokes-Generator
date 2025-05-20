import React, { useState, useEffect } from 'react';


import { getTimeRemaining } from '../utils/timeHelper';
import { getNextRace } from '../services/raceService'
import { format } from 'date-fns';

const CountdownTimer: React.FC = () => {
    // console.log(getTimeRemaining('2027-10-22T14:00:00Z'));
    const [raceName, setRaceName] = useState<string>('');
    const [circuitName, setCircuitName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [dateTime, setDateTime] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = 
        useState<{ days: number; hours: number; minutes: number; seconds: number }>
            ({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
    const [icon, setIcon] = useState<string>('');
    const [background, setBackground] = useState<string>('');

    useEffect(() => {
        const fetchRaceData = async () => {
            try {
                const raceData = await getNextRace();
                // console.log('Fetched race data:', raceData);
                setRaceName(raceData.raceName);
                setCircuitName(raceData.circuitName);
                setLocation(raceData.location);
                setDateTime(raceData.dateTime);
                setIcon(raceData.raceIcon);
                setBackground(raceData.raceIcon);
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

    useEffect(() => {
        if (dateTime) {
            const formattedDate = format(new Date(dateTime), 'MMM dd, h:mm a');
            setFormattedDate(formattedDate);
        }
    }, [dateTime]);

    return (
    <div
        className="countdown-timer"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="countdown-timer__overlay">
            {raceName && dateTime ? (
                <>
                    <div className="countdown-timer__header">
                        <img
                            src={icon}
                            alt={`${raceName} icon`}
                            className="countdown-timer__icon"
                        />
                        <h2 className="countdown-timer__race-name">{raceName}</h2>
                    </div>
                    <p className="countdown-timer__circuit">{circuitName} — {location}</p>
                    <p className="countdown-timer__date">{formattedDate}</p>
                    <div className="countdown-timer__countdown">
                        <div className="countdown-timer__unit">
                            <span className="countdown-timer__value">{timeRemaining.days}</span>
                            <span className="countdown-timer__label">DAYS</span>
                        </div>
                        <div className="countdown-timer__unit">
                            <span className="countdown-timer__value">{timeRemaining.hours}</span>
                            <span className="countdown-timer__label">HOURS</span>
                        </div>
                        <div className="countdown-timer__unit">
                            <span className="countdown-timer__value">{timeRemaining.minutes}</span>
                            <span className="countdown-timer__label">MINUTES</span>
                        </div>
                        <div className="countdown-timer__unit">
                            <span className="countdown-timer__value">{timeRemaining.seconds}</span>
                            <span className="countdown-timer__label">SECONDS</span>
                        </div>
                    </div>
                </>
            ) : (
                <p className="countdown-timer__loading">Loading race info...</p>
            )}
        </div>
    </div>
    );
}

export default CountdownTimer;