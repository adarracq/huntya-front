import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Colors from '@/app/constants/Colors';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';
import { functions } from '@/app/utils/Functions';

type Props = NativeStackScreenProps<NavParams, 'SetLanguages'>;
export default function SetLanguagesScreen({ navigation, route }: Props) {

    const user = route.params.user;

    const next = () => {

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 30 }}>
                <ProgressBar progress={4} title="Langues" width={80}
                    total={user.type === 0 ? 4 : 8}
                />
                <Title0 title={'Quelle(s) langue(s) parlez-vous ?'} isLeft />
                <View style={{ gap: 16 }}>


                </View>

            </View>
            <Button title="Suivant" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                onPress={next} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.white
    },
})