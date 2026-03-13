import AsyncStorage from '@react-native-async-storage/async-storage';

export const simpanToken = async (token) => {
    try {
        await AsyncStorage.setItem('user_token', token);
    } catch (e) {
        console.error("Gagal simpan ke storage", e);
    }
};

export const ambilToken = async () => {
    try {
        const token = await AsyncStorage.getItem('user_token');
        return token;
    } catch (e) {
        return null;
    }
};

export const hapusToken = async () => {
    try {
        await AsyncStorage.removeItem('user_token');
    } catch (e) {
        console.error("Gagal hapus storage");
    }
};

export const loginAUTH = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        const response = await fetch(url);
        const dataJSON = await response.json();

        return {
            ...dataJSON,
            accessToken: "token_dummy_123" 
        };
    } catch(error) {
        console.error("Logic Error", error.message);
        throw error;
    }
};