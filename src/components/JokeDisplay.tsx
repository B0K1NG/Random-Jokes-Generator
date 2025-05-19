import React, { useEffect, useState } from 'react';
import { getJoke } from '../services/jokeApi';

const JokeDisplay: React.FC = () => {
    const [joke, setJoke] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showJoke, setShowJoke] = useState<boolean>(false);

        const fetchJoke = async () => {
            setError(null);
            try {
                const jokeText = await getJoke();
                setJoke(jokeText);
            } catch (error) {
                setError("Failed to fetch a joke. Please try again later.");
            }
        } 

        useEffect(() => {
            fetchJoke();
        }, []);

        const handleGenerateJoke = () => {
            fetchJoke();
            setShowJoke(true);
        }

        const toggleShowJoke = () => {
            setShowJoke((prevShowJoke) => !prevShowJoke);
        }
    
    return (
        <>
            <div className='joke-display'>
                <h2>Joke of the day</h2>
                {error && <p>{error}</p>}

                {showJoke && (
                    <div className='joke'>
                        <p>{joke}</p>
                    </div>
                )}
                <button onClick={handleGenerateJoke}>🎲 Crack a New Joke!</button>
                <button onClick={toggleShowJoke}>
                    {showJoke ? "🙈 Hide the Punchline" : "👀 Show Me the Laughs"}</button>
            </div>
        </>
    )
}

export default JokeDisplay;