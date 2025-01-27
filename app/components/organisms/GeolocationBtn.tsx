import { View, Text, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';
import Coordinates from '@/app/models/Coordinates';
import Colors from '@/app/constants/Colors';
import IconButton from '../molecules/IconButton';

type Props = {
    onPress: () => void;
    onResult: (coords: Coordinates) => void;
    style?: ViewStyle;
}
export default function GeolocationBtn(props: Props) {

    const [location, setLocation] = useState<Coordinates | null>(null);


    const getPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Please grant permission to access your location.');
        }
        else {
            getCurrentLocation();
        }
    }

    const getCurrentLocation = async () => {
        props.onPress();
        const { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);
        props.onResult(coords);
    }


    return (
        <IconButton
            onPress={getPermissions}
            backgroundColor={Colors.mainBlue}
            icon={'geolocation'}
            iconColor={Colors.white}
            style={props.style ? props.style : {}}
        />
    )
}