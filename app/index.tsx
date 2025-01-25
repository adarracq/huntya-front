import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorageUser from './utils/AsyncStorageUser';
import { UserContext } from './contexts/UserContext';
import FlashMessage from 'react-native-flash-message';
import UnLoggedNav from './navigations/UnloggedNav';
import User from './models/User';
import 'react-native-get-random-values';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

export default function App() {
    // Load fonts and hide splash screen
    const [fontsLoaded, fontsError] = Font.useFonts({
        'title-regular': require('./assets/fonts/sf_pro_regular.otf'),
        'title-bold': require('./assets/fonts/sf_pro_bold.otf'),
        'title-medium': require('./assets/fonts/sf_pro_medium.otf'),
        'title-italic': require('./assets/fonts/sf_pro_italic.otf'),
        'text-regular': require('./assets/fonts/sf_pro_regular.otf'),
        'text-bold': require('./assets/fonts/sf_pro_bold.otf'),
        'text-italic': require('./assets/fonts/sf_pro_italic.otf'),
        'text-medium': require('./assets/fonts/sf_pro_medium.otf'),
    });

    // Main
    const [userLoaded, setUserLoaded] = useState(false);
    const [user, setUser] = useState<User>();

    // We retrieve the user data in local storage
    function getUserFromStorage() {
        console.log('Getting user from storage...');
        AsyncStorageUser.getUser().then(resp => {
            setUserLoaded(true);
            if (resp.email)
                setUser(resp);
            else
                setUser(undefined);
        })
    }

    useEffect(() => {
        getUserFromStorage();
        //AsyncStorageUser.Logout();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (userLoaded && fontsLoaded || fontsError) {
            console.log('Hiding splash screen...');
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontsError]);

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <UserContext.Provider
            value={[user, setUser]}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                {
                    userLoaded && user ? (
                        <UnLoggedNav />
                    ) : <UnLoggedNav />
                }
                <FlashMessage position="top" statusBarHeight={10} />
            </View>
        </UserContext.Provider>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});