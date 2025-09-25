const STORAGE_KEY = 'todoAppData';

export const storageService = {
    saveData(data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(STORAGE_KEY, serializedData);
        } catch (error) {
            console.error("Unable to save data.", error);
        }
    }
    ,

    getData() {
        try {
            const serializedData = localStorage.getItem(STORAGE_KEY);
            return serializedData ? JSON.parse(serializedData) : null;
        } catch (error) {
            console.error("Unable to load data: ", error);
            return null;
        }
    },


    deleteData() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error("Error clearing storage", error);
            return false;
        }

    },

    clearData() {

    }
}

