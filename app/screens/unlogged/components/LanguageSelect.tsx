import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';
import BodyText from '@/app/components/atoms/BodyText';

type CountryProps = {
    flag: string;
    label: string;
    selected: boolean;
    onPress: () => void;
};

export default function LanguageSelect(props: CountryProps) {

    return (
        <TouchableOpacity
            style={props.selected ? styles.containerSelected : styles.container}
            onPress={props.onPress}
        >
            <Image source={functions.getIconSource(props.flag)}
                style={{
                    width: 30,
                    height: 30,
                    marginRight: 10
                }} />
            <BodyText text={props.label} color={props.selected ? Colors.white : Colors.darkGrey} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        backgroundColor: Colors.white
    },
    containerSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        backgroundColor: Colors.mainBlueLight,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    }
})