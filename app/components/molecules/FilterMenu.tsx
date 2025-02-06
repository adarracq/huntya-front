import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Title2 from '../atoms/Title2';
import BodyText from '../atoms/BodyText';

type TopMenuProps = {
    text: string;
    selected?: boolean;
    onPress: () => void;
}

export default function FilterMenu(props: TopMenuProps) {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={[styles.container, {
                borderBottomColor: props.selected ? Colors.mainBlue : Colors.white
            }]}>
            <BodyText
                text={props.text}
                color={props.selected ? Colors.mainBlue : Colors.darkGrey}
                isBold={props.selected}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 4,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.white,
        borderBottomWidth: 2,
    },
})