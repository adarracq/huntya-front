import { View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Colors from '@/app/constants/Colors';
import SmallText from '@/app/components/atoms/SmallText';
import { functions } from '@/app/utils/Functions';
import BodyText from '@/app/components/atoms/BodyText';
import { convService } from '@/app/services/conv.service';
import { showMessage } from 'react-native-flash-message';
import User from '@/app/models/User';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';

type Props = {
    open: boolean;
    convID: string;
    user: User;
}
export default function ReportDrawer(props: Props) {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const [loading, setLoading] = useState(false);

    function report() {
        setLoading(true);
        convService.report({
            convId: props.convID,
            userId: props.user._id,
            firstname: props.user.firstname,
            lastname: props.user.lastname
        })
            .then(() => {
                setLoading(false);
                actionSheetRef.current?.hide();
                showMessage({
                    message: 'Succès',
                    description: 'L\'utilisateur a été signalé',
                    type: 'success',
                    icon: 'success'
                });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                showMessage({
                    message: 'Erreur',
                    description: 'Une erreur est survenue lors de la signalement',
                    type: 'danger',
                    icon: 'danger'
                });
            });
    }


    // open the action sheet 
    useEffect(() => {
        if (props.open)
            actionSheetRef.current?.show();
    }, [props.open])

    return (
        <>{loading && <LoadingScreen />}
            <ActionSheet ref={actionSheetRef}
                containerStyle={{
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    backgroundColor: Colors.white,
                }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 35, gap: 24 }}>
                    <SmallText text='Actions' isLeft />
                    <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}
                        onPress={report}>
                        <Image source={functions.getIconSource('shield2')}
                            style={{ width: 24, height: 24, tintColor: Colors.mainRed }} />
                        <BodyText text='Signaler cet utilisateur' color={Colors.mainRed} isMedium />
                    </TouchableOpacity>
                </View>
            </ActionSheet >
        </>
    )
}