import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from "../firebase/config";

const dbRef = ref(getDatabase(firebase));

/**
 * Fetches data from the database
 * @param path
 * @returns {Promise<string|unknown[]|*[]>}
 */
export const fetchDataFromDatabase = async (path) => {
    try {
        let snapshot = await get(child(dbRef, path));
        if (!snapshot.exists()) return [];
        const values = snapshot.val();
        return Object.values(values);
    } catch (error) {
        console.error(error);
        return "error";
    }
};

/**
 * Sets data to the database
 * @param path
 * @param data
 * @returns {Promise<void>}
 */
export const setDataToDatabase = async (path, data) => {
    try {
        await set(child(dbRef, path), data);
    } catch (error) {
        console.error(error);
    }
};
