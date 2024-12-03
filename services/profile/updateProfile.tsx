import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiURL from '../../constants/apiURL/apiURL';

const api = axios.create({
    baseURL: `${apiURL}/api`,
    headers: {
        'Content-Type': 'multipart/form-data',
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

// Function to update the user's profile
export const updateProfile = async (profileData: Record<string, any>, profileImage: any) => {
    try {
        const response = await api.post('/user/profile/update', profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};