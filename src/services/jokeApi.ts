export const getJoke = async (): Promise<string> => {

    const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
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