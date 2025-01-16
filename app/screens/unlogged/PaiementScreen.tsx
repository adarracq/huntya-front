import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';
import Plans from '@/app/constants/Plans';
import TopMenus from '@/app/components/molecules/TopMenus';
import InputField from '@/app/components/molecules/InputField';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<NavParams, 'Paiement'>;
export default function PaiementScreen({ navigation, route }: Props) {

    const [loading, setLoading] = useState(false);
    const [paiementType, setPaiementType] = useState(0);
    const plans = Plans.plans;
    const price = 'Payez maintenant ' +
        (route.params.billing == 0 ?
            plans[route.params.plan].monthly.total :
            plans[route.params.plan].yearly.total);

    const [creditCardValues, setCreditCardValues] = useState({
        cardMail: '',
        cardNumber: '',
        cardDate: '',
        cardCvv: '',
        cardName: '',
    });

    function getExpirationDate() {
        if (route.params.billing == 1) {
            return new Date(new Date().setMonth(new Date().getMonth() + 1));
        }
        if (route.params.billing == 0) {
            return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }
    }

    const next = () => {
        // TODO: send the payment info to the server
        setLoading(true);
        let boosts = route.params.plan == 0 ? [] : [
            new Date(new Date().setMonth(new Date().getMonth() + 1)),
            new Date(new Date().setMonth(new Date().getMonth() + 1)),
            new Date(new Date().setMonth(new Date().getMonth() + 1)),
            new Date(new Date().setMonth(new Date().getMonth() + 1)),
            new Date(new Date().setMonth(new Date().getMonth() + 1)),
        ];
        let params = {
            email: route.params.email,
            user:
            {
                email: route.params.email,
                agentProperties:
                {
                    subscription:
                    {
                        plan: route.params.plan,
                        billing: route.params.billing,
                        subscriptionDate: new Date(),
                        expirationDate: getExpirationDate(),
                        boosts: boosts,
                        isBoosted: false,
                        leadsLeft: route.params.plan == 0 ? 3 : 1000
                    }
                }
            }
        }

        userService.update(params)
            .then(() => {
                setLoading(false);
                navigation.navigate('AccountCreated', { type: 1 });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                showMessage({
                    message: 'Erreur',
                    description: 'Une erreur est survenue lors de la création du compte',
                    type: 'danger',
                })
            })

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={9} total={9} title="Paiement" width={80} />
                <Title0 title={'Renseignez vos informations de paiement'} isLeft />
                <TopMenus
                    leftText="Carte"
                    rightText="Paypal"
                    leftIcon='credit-card'
                    rightIcon='paypal'
                    selectedId={paiementType}
                    onPressLeft={() => setPaiementType(0)}
                    onPressRight={() => setPaiementType(1)}
                />
                <View style={{ gap: 16 }}>
                    <InputField
                        title="E-mail"
                        placeholder="pierre.dupont@gmail.com"
                        value={creditCardValues.cardMail}
                        onChangeText={(text) => setCreditCardValues({ ...creditCardValues, cardMail: text })}
                    />
                    <InputField
                        title="Numéro de carte"
                        placeholder="**** **** **** ****"
                        value={creditCardValues.cardNumber}
                        isCreditCard
                        keyBoardType='numeric'
                        onChangeText={(text) => setCreditCardValues({ ...creditCardValues, cardNumber: text })}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                        <InputField
                            title="Date d'expiration"
                            placeholder="MM/YY"
                            keyBoardType='numeric'
                            value={creditCardValues.cardDate}
                            onChangeText={(text) => setCreditCardValues({ ...creditCardValues, cardDate: text })}
                            style={{ width: Dimensions.get('window').width / 2 - 28 }}
                        />
                        <InputField
                            title="CVV"
                            placeholder="***"
                            keyBoardType='numeric'
                            value={creditCardValues.cardCvv}
                            onChangeText={(text) => setCreditCardValues({ ...creditCardValues, cardCvv: text })}
                            style={{ width: Dimensions.get('window').width / 2 - 28 }}
                        />
                    </View>
                    <InputField
                        title="Nom du titulaire de la carte"
                        placeholder="Pierre Dupont"
                        value={creditCardValues.cardName}
                        onChangeText={(text) => setCreditCardValues({ ...creditCardValues, cardName: text })}
                    />
                </View>

            </View>
            <Button title={price}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={next} />
            {
                loading && <LoadingScreen />
            }
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