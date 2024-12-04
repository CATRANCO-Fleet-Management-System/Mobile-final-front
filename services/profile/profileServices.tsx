import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiURL from '../../constants/apiURL/apiURL';

const api = axios.create({
    baseURL: `${apiURL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Function to view the user's profile
export const viewProfile = async () => {
    try {
        const response = await api.get('/user/profile/view');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

// Function to delete the user's profile image
export const deleteProfileImage = async (id: string | number) => {
    try {
        const response = await api.delete(`/user/profile/${id}/delete-image`);
        return response.data;
    } catch (error) {
        console.error('Error deleting profile image:', error);
        throw error;
    }
};
