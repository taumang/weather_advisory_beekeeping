const api = {
    key: "77278187e14ff4191735bfb0e76d7643",
    base: "https://api.openweathermap.org/data/2.5/"
};

export interface WeatherData {
    main: {
        temp_min(temp_min: unknown): import("react").ReactNode;
        temp: number;
        location: string;
    };
    
    [key: string]: unknown;
}

export const fetchWeatherData = async (location: string): Promise<WeatherData | null> => {
    try {
        const response = await fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`);
        if (!response.ok) {
            console.error('Failed to fetch weather data:', response.statusText);
            return null;
        }
        const data: WeatherData = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};
