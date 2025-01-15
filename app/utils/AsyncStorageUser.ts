import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../models/User';


const setUser = async (value: User) => {
    await AsyncStorage.setItem('userData', JSON.stringify(value))
}

const getUser = async () => {
    const value = await AsyncStorage.getItem('userData');
    return JSON.parse(value || '{}')
}

const Logout = () => {
    AsyncStorage.clear()
}

export default {
    setUser,
    getUser,
    Logout,
}
