import { View, Text, ViewStyle, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BodyText from '../atoms/BodyText';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'
import Coordinates from '@/app/models/Coordinates';
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';

type Props = {
    onSelectAddress: (coords: Coordinates, address: any) => void;
    //isSearching: (isSearching: boolean) => void;
}
export default function SearchAddress(props: Props) {

    const [isFocused, setIsFocused] = useState(false);



    const onSearch = async (data: any) => {
        // ask for permission to access location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Please grant permission to access your location.');
        }
        else {
            const coords = await Location.geocodeAsync(data.description);

            props.onSelectAddress(coords[0], data);

            setIsFocused(false);
        }
    }


    if (!isFocused) {
        return (
            <View style={styles.searchBarContainer}>
                <Pressable
                    onPress={() => {
                        setIsFocused(true);
                    }}
                    style={styles.searchBar}
                >
                    <Image
                        source={functions.getIconSource('simple-marker')}
                        style={{ width: 20, height: 20 }} />
                    <BodyText text={'Rechercher une adresse...'} color={Colors.lightGrey} />
                </Pressable>
            </View>
        )
    } else {
        return (
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setIsFocused(false);
                    }}
                    style={styles.backArrow}
                >
                    <Image
                        source={functions.getIconSource('arrow-left0')}
                        style={{ width: 20, height: 20, tintColor: Colors.darkGrey, marginLeft: 8 }}
                    />
                </TouchableOpacity>
                <View style={styles.searchBarContainer}>
                    <View style={[styles.searchBar, styles.searchBarFocused]}>
                    </View>
                </View>
                <View style={{ padding: 20, flex: 1, zIndex: 2 }} >
                    <GooglePlacesAutocomplete
                        placeholder='Rechercher une adresse...'
                        minLength={4} // minimum length of text to search
                        onPress={(data) => {
                            onSearch(data);
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                            language: 'fr', // language of the results
                        }}
                        textInputProps={{
                            autoFocus: true,
                            fontFamily: 'text-regular',
                            backgroundColor: 'transparent',
                            height: 50,
                            marginLeft: 40,
                            marginTop: 20,
                            zIndex: 1,
                        }}
                        styles={{
                            textInput: {
                                fontFamily: 'text-regular',
                            },
                            description: {
                                fontFamily: 'text-regular',
                            },
                            poweredContainer: {
                                display: 'none',
                            },
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBarContainer: {
        position: 'absolute',
        top: 20,
        padding: 20,
        width: '100%',
        zIndex: 2,
    },
    backArrow: {
        position: 'absolute',
        top: 36,
        padding: 20,
        zIndex: 3,
    },
    searchBar: {
        height: 50,
        width: '100%',
        borderRadius: 12,
        shadowColor: "#000000",
        paddingLeft: 16,
        gap: 16,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    searchBarFocused: {
        borderColor: Colors.mainBlue,
        borderWidth: 2,
    },
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: Colors.mainBlue,
        marginRight: 16,
    },
    searchContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        zIndex: 2,
    }
})