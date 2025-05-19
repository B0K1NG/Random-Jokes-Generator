const JOKE_API_URL = import.meta.env.VITE_JOKE_API_URL;

export const getJoke = async (): Promise<string> => {

    if (!JOKE_API_URL) {
        throw new Error('JOKE_API_URL is not defined');
    }

    const response = await fetch(JOKE_API_URL);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    if (data.type === "single") {
        return data.joke;
    } else if (data.type === "twopart") {
        return`${data.setup} ${data.delivery}`;
    } else {
        return "No joke found.";
    }
}