import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import Colors from '@/app/constants/Colors';
import Button from '@/app/components/atoms/Button';
import Title0 from '@/app/components/atoms/Title0';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import { functions } from '@/app/utils/Functions';
import TopMenus from '@/app/components/molecules/TopMenus';
import BodyText from '@/app/components/atoms/BodyText';
import Plans from '@/app/constants/Plans';
import PlanBenefit from './components/PlanBenefit';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Title1 from '@/app/components/atoms/Title1';
import RadioButton from '@/app/components/molecules/RadioButton';
import SmallText from '@/app/components/atoms/SmallText';

type Props = NativeStackScreenProps<NavParams, 'SelectPlan'>;
export default function SelectPlanScreen({ navigation, route }: Props) {

    const [plan, setPlan] = useState(1);
    const [billing, setBilling] = useState(1);
    const plans = Plans.plans;

    const actionSheetRef = useRef<ActionSheetRef>(null);

    const next = () => {
        navigation.navigate('Paiement', {
            email: route.params.email,
            plan: plan,
            billing: billing
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={8} total={9} title="Abonnement" width={80} />
                <Title0 title={'Sélectionnez votre abonnement'} isLeft />

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
            <Button title="Sélectionner cet abonnement" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                onPress={() => actionSheetRef.current?.show()} />

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
    }
})