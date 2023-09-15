export class RequestUtil {
    /**
     * Fetches data from a given url
     * @param url
     * @returns {Promise<any>}
     */
    static async fetchData(url) {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (e) {
            console.log("Error fetching data: " + e);
        }
    }
}