import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';
import Ionicons from '@expo/vector-icons/Ionicons';
import { functions } from '@/app/utils/Functions';

type TopMenusProps = {
    leftText: string;
    rightText: string;
    selectedId: number;
    topInfo?: {
        icon?: string;
        text: string;
        side: 'left' | 'right';
    }
    leftIcon?: string;
    rightIcon?: string;
    onPressLeft: () => void;
    onPressRight: () => void;
}

export default function TopMenus(props: TopMenusProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPressLeft}
                style={[styles.button, {
                    borderTopLeftRadius: props.topInfo?.side === 'left' ? 0 : 8,
                    borderBottomLeftRadius: 8,
                    backgroundColor: props.selectedId === 0 ? Colors.mainBlue : Colors.white,
                }]}>
                {
                    props.leftIcon &&
                    <Image
                        source={functions.getIconSource(props.leftIcon)}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: props.selectedId === 0 ? Colors.white : Colors.mainBlue
                        }} />
                }
                <Title2 title={props.leftText}
                    color={props.selectedId === 0 ? Colors.white : Colors.black} />
                {
                    props.topInfo && props.topInfo.side === 'left' &&
                    <View style={styles.topInfo}>
                        <Image source={props.topInfo.icon ? functions.getIconSource(props.topInfo.icon) : null} style={styles.icon} />
                        <SmallText text={props.topInfo.text} color={Colors.white} isBold />
                    </View>
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressRight}
                style={[styles.button, {
                    borderTopRightRadius: props.topInfo?.side === 'right' ? 0 : 8,
                    borderBottomRightRadius: 8,
                    backgroundColor: props.selectedId === 1 ? Colors.mainBlue : Colors.white,
                }]}>
                {
                    props.rightIcon &&
                    <Image
                        source={functions.getIconSource(props.rightIcon)}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: props.selectedId === 1 ? Colors.white : Colors.mainBlue
                        }} />
                }
                <Title2 title={props.rightText}
                    color={props.selectedId === 1 ? Colors.white : Colors.black} />
                {
                    props.topInfo && props.topInfo.side === 'right' &&
                    <View style={styles.topInfo}>
                        <Image source={props.topInfo.icon ? functions.getIconSource(props.topInfo.icon) : null} style={styles.icon} />
                        <SmallText text={props.topInfo.text} color={Colors.white} isBold />
                    </View>
                }
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        height: 40,
    },
    topInfo: {
        position: 'absolute',
        top: -20,
        height: 20,
        width: '100%',
        backgroundColor: Colors.lightGreen,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: Colors.white
    }
})