import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import Title2 from '../atoms/Title2';

type Props = {
    title: string;
    icon: string;
    children: any;
}
export default function FloatingBottomArea(props: Props) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <View style={[styles.titleRow, { borderBottomWidth: isExpanded ? 1 : 0 }]}>
                <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', padding: 20 }}>
                    <Image
                        source={functions.getIconSource(props.icon)}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: Colors.mainBlue,
                        }} />
                    <Title2 title={props.title} />
                </View>
                <TouchableOpacity style={{ padding: 20 }}
                    onPress={() => setIsExpanded(!isExpanded)}>
                    <Image source={
                        isExpanded ?
                            functions.getIconSource('arrow-down')
                            : functions.getIconSource('arrow-top')
                    }
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: Colors.darkGrey
                        }}
                    />
                </TouchableOpacity>
            </View>
            {isExpanded && props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        position: 'absolute',
        bottom: 50,
        left: 20,
        width: Dimensions.get('window').width - 40,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    titleRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: Colors.lightGrey,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
        marginRight: 5,
    }
})