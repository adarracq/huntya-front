import { View, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import Colors from '@/app/constants/Colors';
import AppIntroSlider from 'react-native-app-intro-slider';
import BodyText from '@/app/components/atoms/BodyText';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';

const slides = [
    {
        key: 1,
        title: 'Définissez vos opportunités locales',
        text: 'Choisissez les zones où vous voulez être visible pour vos clients.',
        image: require('../../assets/images/zoneOnboarding/1.png'),
    },
    {
        key: 2,
        title: 'Explorez les projets autour de vous',
        text: 'Accédez aux besoins immobiliers dans chaque zone.',
        image: require('../../assets/images/zoneOnboarding/2.png'),
    }
];

type Props = NativeStackScreenProps<NavParams, 'SelectZoneOnBoarding'>;
export default function SelectZoneOnBoardingScreen({ navigation, route }: Props) {

    const renderItem = ({ item }: { item: { key: number; title: string; text: string; image: any; } }) => {
        return (
            <View
                style={styles.container}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 50,
                }}>
                    <Image source={item.image}
                        style={{
                            width: Dimensions.get('window').width - 40,
                            height: 300,
                            resizeMode: 'contain',
                        }}
                    />
                    <View style={{ gap: 16, alignItems: 'center', paddingHorizontal: 20 }}>
                        <Title0 title={item.title} />
                        <BodyText text={item.text} color={Colors.darkGrey} centered />
                    </View>
                </View>
            </View>
        );
    };

    const renderNextButton = () => {
        return (
            <View style={{
                width: 70,
                height: 50,
                backgroundColor: Colors.lightBlue,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16
            }}>
                <Image source={require('../../assets/icons/arrow-right.png')} style={{ width: 30, resizeMode: 'contain', tintColor: Colors.mainBlue }} />
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <Button
                title='Selectionner mes zones'
                onPress={() => {
                    navigation.navigate('SelectZoneMap', { email: route.params.email })
                }}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                style={{ width: Dimensions.get('window').width - 40 }}
            />
        )
    }

    return (
        <View
            style={{ paddingBottom: 20, flex: 1, backgroundColor: Colors.white }}>
            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                renderNextButton={renderNextButton}
                renderDoneButton={renderDoneButton}
                activeDotStyle={{
                    backgroundColor: Colors.mainBlue,
                    width: 30,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20
    }
});