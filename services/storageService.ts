// src/utils/asyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'loggedInUser';

export const storeUser = async (user: object): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (e) {
    console.error('Error storing user information', e);
  }
};

export const getUser = async (): Promise<object | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving user information', e);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Error removing user information', e);
  }
};