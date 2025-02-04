import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Colors from '@/app/constants/Colors';
import Plans from '@/app/constants/Plans';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { functions } from '@/app/utils/Functions';
import Title0 from '@/app/components/atoms/Title0';
import TopMenus from '@/app/components/molecules/TopMenus';
import BodyText from '@/app/components/atoms/BodyText';
import PlanBenefit from '../unlogged/components/PlanBenefit';
import Button from '@/app/components/atoms/Button';
import Title1 from '@/app/components/atoms/Title1';
import RadioButton from '@/app/components/molecules/RadioButton';
import SmallText from '@/app/components/atoms/SmallText';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title2 from '@/app/components/atoms/Title2';

type Props = NativeStackScreenProps<ProfileNavParams, 'EditPlan'>;
export default function EditPlanScreen({ navigation, route }: Props) {
    const currentPlan = route.params.user?.agentProperties?.subscription?.plan || 1;
    const currentBilling = route.params.user?.agentProperties?.subscription?.billing || 1;
    const [plan, setPlan] = useState(currentPlan);
    const [billing, setBilling] = useState(currentBilling);
    const plans = Plans.plans;

    const actionSheetRef = useRef<ActionSheetRef>(null);

    const next = () => {
        /*navigation.navigate('Paiement', {
            email: route.params.email,
            plan: plan,
            billing: billing
        });*/
    }

    const unsuscribe = () => {
        /*navigation.navigate('Unsubscribe', {
            email: route.params.email
        });*/
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24, marginTop: 20 }}>
                <Title0 title={'Mon abonnement'} isLeft />

                <TopMenus
                    leftText="Basique"
                    rightText="Premium"
                    selectedId={plan}
                    topInfo={
                        {
                            icon: 'heart-full',
                            text: 'LE PLUS POPULAIRE',
                            side: 'right'
                        }
                    }
                    onPressLeft={() => setPlan(0)}
                    onPressRight={() => setPlan(1)}
                />
                {
                    currentPlan == plan &&
                    <View style={styles.selectedContainer}>
                        <AntDesign name="checkcircle" size={16} color={Colors.white} />
                        <BodyText text='VOTRE ABONNEMENT'
                            color={Colors.white} isMedium />
                    </View>
                }
                <View style={styles.priceContainer}>
                    <Title0 title={plans[plan].priceLabel} isLeft />
                    <BodyText text=" / mois" color={Colors.darkGrey} isBold />
                </View>
                {
                    plans[plan].benefits.map((benefit, index) => (
                        <View key={index} style={{ gap: 8 }}>
                            <PlanBenefit icon={benefit.icon} title={benefit.title} text={benefit.info} />
                        </View>
                    ))
                }

            </View>
            <View style={{ gap: 20, marginBottom: 20 }}>
                <Button backgroundColor={Colors.mainBlue} textColor={Colors.white}
                    disabled={currentPlan == plan}
                    title={
                        currentPlan == plan ? 'Abonnement actuel' : 'Changer d\'abonnement'
                    }
                    onPress={() => actionSheetRef.current?.show()} />
                <TouchableOpacity onPress={unsuscribe}>
                    <Title2 title="Résilier mon abonnement" color={Colors.mainRed} />
                </TouchableOpacity>
            </View>

            <ActionSheet ref={actionSheetRef}
                containerStyle={styles.actionSheet}>
                <View style={{ gap: 24 }}>
                    <Title1 title='Sélectionnez votre plan' isLeft style={{ paddingLeft: 16 }} />
                    <View style={{ gap: 16 }}>
                        <RadioButton
                            title={plans[plan].monthly.title}
                            subtitle={plans[plan].monthly.priceLabel}
                            selected={billing === 0}
                            onPress={() => setBilling(0)}
                        />
                        <RadioButton
                            title={plans[plan].yearly.title}
                            subtitle={plans[plan].yearly.priceLabel}
                            selected={billing === 1}
                            onPress={() => setBilling(1)}
                        />
                    </View>
                    <Button title="Passer au paiement" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                        onPress={next} />
                    <View style={styles.safePaiement}>
                        <Image source={functions.getIconSource('shield-check')} style={{ width: 20, height: 20 }} />
                        <SmallText text="Paiement sécurisé" isBold />
                    </View>
                </View>
            </ActionSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.white,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    actionSheet: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    safePaiement: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    selectedContainer: {
        backgroundColor: Colors.lightGreen,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
        alignSelf: 'flex-start'
    },
})