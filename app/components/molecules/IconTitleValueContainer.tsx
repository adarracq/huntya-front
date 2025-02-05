import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';

type Props = {
    icon: string;
    title: string;
    value: string;
    onClickLink?: () => void;
}
export default function IconTitleValueContainer(props: Props) {
    return (
        <View style={styles.elementContainer}>
            <View style={{ flexDirection: 'column', alignContent: 'flex-start', gap: 8 }}>
                <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: Colors.lightBlue,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={functions.getIconSource(props.icon)} style={{
                        width: 20,
                        height: 20,
                        tintColor: Colors.mainBlue,
                    }} />
                </View>
                <View>
                    <SmallText text={props.title} isLeft />
                    {
                        props.onClickLink ?
                            <TouchableOpacity onPress={props.onClickLink}>
                                <Title2 title={props.value} isLeft color={Colors.mainBlue} />
                            </TouchableOpacity>
                            :
                            <Title2 title={props.value} isLeft />

                    }
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    elementContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'column',
        flex: 1,
        alignContent: 'flex-start',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        padding: 12,
    }
})