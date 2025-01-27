import BodyText from '@/app/components/atoms/BodyText';
import Button from '@/app/components/atoms/Button';
import Title0 from '@/app/components/atoms/Title0';
import Colors from '@/app/constants/Colors';
import { NavParams } from '@/app/navigations/UnloggedNav';
import { functions } from '@/app/utils/Functions';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { LinearGradient } from 'expo-linear-gradient'

const slides = [
    {
        key: 1,
        title: 'Une solution, deux perspectives',
        text: 'Gagnez en temps, visibilité et efficacité, que vous soyez particulier ou agent immobilier.',
        image: require('../../assets/images/onboarding/1.png'),
    },
    {
        key: 2,
        title: 'L’immobilier simplifié près de chez vous',
        text: 'Trouvez les meilleurs agents et déposez vos projets immobiliers partout en France, où que vous soyez.',
        image: require('../../assets/images/onboarding/2.png'),
    },
    {
        key: 3,
        title: 'Gagnez en visibilité et attirez plus de prospects',
        text: 'Gérez votre activité efficacement tout en augmentant votre visibilité.',
        image: require('../../assets/images/onboarding/3.png'),
    }
];

type Props = NativeStackScreenProps<NavParams, 'OnBoarding'>;

export default function OnBoardingScreen({ navigation, route }: Props) {


    const renderItem = ({ item }: { item: { key: number; title: string; text: string; image: any; } }) => {
        return (
            <View
                style={styles.container}>
                <Image source={require('../../assets/images/typo_white.png')}
                    style={{
                        width: 150,
                        height: 50,
                        resizeMode: 'contain',
                    }}
                />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 50,
                    paddingBottom: 50
                }}>
                    <Image source={item.image}
                        style={{
                            width: Dimensions.get('window').width - 100,
                            height: 300,
                            resizeMode: 'contain',
                        }}
                    />
                    <View style={{ gap: 16, alignItems: 'center' }}>
                        {
                            item.key != 1 &&
                            <View style={{
                                backgroundColor: Colors.lightGreen,
                                borderRadius: 16,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 6
                            }}>
                                <Image source={
                                    item.key == 2 ?
                                        functions.getIconSource('profile') :
                                        functions.getIconSource('briefcase')
                                }
                                    style={{
                                        width: 16,
                                        height: 16,
                                        tintColor: Colors.white,
                                    }} />

                                <BodyText text={item.key == 2 ? 'PARTICULIER' : 'AGENT IMMOBILIER'}
                                    color={Colors.white} isBold />
                            </View>
                        }
                        <Title0 title={item.title} color={Colors.white} />
                        <BodyText text={item.text} color={Colors.white} centered />
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
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16
            }}>
                <Image source={require('../../assets/icons/arrow-right.png')} style={{ width: 30, resizeMode: 'contain', }} />
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <Button
                title='Commencer'
                onPress={() => {
                    navigation.navigate('Login');
                }}
                backgroundColor={Colors.white}
                textColor={Colors.black}
                style={{ width: Dimensions.get('window').width - 40 }}
            />
        )
    }

    return (
        <LinearGradient
            colors={[Colors.mainBlueDark, Colors.mainBlue, Colors.mainBlueLight]}
            style={{ paddingBottom: 20, flex: 1 }}>
            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                renderNextButton={renderNextButton}
                renderDoneButton={renderDoneButton}
                activeDotStyle={{
                    backgroundColor: Colors.white,
                    width: 30
                }}
            />
            <Button title='bypass for dev'
                onPress={() => {
                    navigation.navigate('SelectZoneMap', { email: 'antoine.cheval.darracq@gmail.com' });
                }}
                backgroundColor={Colors.white}
                textColor={Colors.black}
            />
        </LinearGradient>
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