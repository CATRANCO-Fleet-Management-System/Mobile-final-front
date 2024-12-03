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

// Function to fetch all terminals
export const getAllTerminals = async () => {
    try {
        const response = await api.get('/user/dispatcher/terminals/all'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching all terminals:', error);
        throw error;
    }
};

// Function to fetch a specific terminal by ID
export const getTerminalById = async (id: string | number) => {
    try {
        const response = await api.get(`/user/dispatcher/terminals/${id}`); 
        return response.data;
    } catch (error) {
        console.error(`Error fetching terminal with ID ${id}:`, error); 
        throw error;
    }
};

// Function to create a new terminal
export const createTerminal = async (terminalData: Record<string, any>) => {
    try {
        const response = await api.post('/user/dispatcher/terminals/create', terminalData); 
        return response.data;
    } catch (error) {
        console.error('Error creating terminal:', error); 
        throw error;
    }
};

// Function to update an existing terminal by ID
export const updateTerminal = async (id: string | number, terminalData: Record<string, any>) => {
    try {
        const response = await api.patch(`/user/dispatcher/terminals/update/${id}`, terminalData); 
        return response.data;
    } catch (error) {
        console.error(`Error updating terminal with ID ${id}:`, error); 
        throw error;
    }
};

// Function to delete a terminal by ID
export const deleteTerminal = async (id: string | number) => {
    try {
        const response = await api.delete(`/user/dispatcher/terminals/delete/${id}`); 
        return response.data;
    } catch (error) {
        console.error(`Error deleting terminal with ID ${id}:`, error);
        throw error;
    }
};
