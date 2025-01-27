import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '@/app/constants/Colors';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import BodyText from '@/app/components/atoms/BodyText';


type Props = NativeStackScreenProps<NavParams, 'AccountCreated'>;
export default function AccountCreatedScreen({ navigation, route }: Props) {

    const next = () => {
        if (route.params.type === 0) {
            // TODO : login user
        } else if (route.params.type === 1) {
            navigation.navigate('SelectZoneOnBoarding', { email: route.params.email })
        }
        else if (route.params.type === 2) {
            //TODO : login agent
        }
    }
    return (
        <LinearGradient
            colors={[Colors.mainBlueDark, Colors.mainBlue, Colors.mainBlueLight]}
            style={styles.container}>
            <View></View>
            <View style={{ gap: 20 }}>
                <Image source={
                    route.params.type === 0 ?
                        require('@/app/assets/images/completed.png')
                        :
                        route.params.type === 1 ?
                            require('@/app/assets/images/completed2.png')
                            :
                            require('@/app/assets/images/completed3.png')
                }
                    style={{
                        width: Dimensions.get('window').width - 100,
                        height: 300,
                        resizeMode: 'contain',
                        marginBottom: 30,
                    }}
                />
                <Title0 title={route.params.type == 2 ?
                    'Votre compte est prêt à être utilisé'
                    :
                    'Félicitations !\nVotre compte est créé'
                }
                    color={Colors.white} />
                <BodyText
                    text={
                        route.params.type === 0 ?
                            'Vous pouvez dès maintenant créer votre annonce et trouver votre agent immobilier.'
                            :
                            route.params.type === 1 ?
                                'Vous pouvez désormais sélectionner vos zones de chalandises'
                                :
                                'Vous pouvez désormais utiliser l’application pour trouver vos premiers clients.'
                    }
                    color={Colors.white}
                    centered
                />

            </View>
            <Button title={route.params.type == 2 ?
                'Commencer'
                :
                'Continuer'
            } backgroundColor={Colors.white}
                onPress={next} />

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingVertical: 60,
        justifyContent: 'space-between'
    },
})