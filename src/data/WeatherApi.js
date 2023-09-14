const API_KEY = "66ef064fdc6a4c1bb88142620231309";


export class WeatherApi {
    /**
     * Fetches the city data from the weather api such as latitude and longitude
     * @param city
     * @returns {Promise<any>}
     */
    static async fetchCityData(city) {
        try {
            const cityDataResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`);
            return cityDataResponse.json();
        } catch (e) {
            console.log("Error fetching city data: " + e);
        }
    }

    /**
     * Fetches the weather data of a city from the weather api
     * @param city
     * @returns {Promise<any>}
     */
    static async fetchWeatherData(city) {
        try {
            const weatherDataResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
            return weatherDataResponse.json();
        } catch (e) {
            console.log("Error fetching weather data: " + e);
        }
    }

    /**
     * Fetches the hourly forecast of the current day from the weather api
     * @param lat
     * @param lon
     * @returns {Promise<any>}
     */
    static async fetchForecastData(lat, lon){
        try {
            const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,showers,snowfall,cloudcover,windspeed_10m&forecast_days=1`);
            return forecastResponse.json();
        } catch (e) {
            console.log("Error fetching forecast data: " + e);
        }
    }
}