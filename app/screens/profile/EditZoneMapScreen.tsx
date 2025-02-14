import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import SelectZonesScreen from '@/app/components/organisms/SelectZonesScreen';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';
import User from '@/app/models/User';
import { zoneService } from '@/app/services/zone.service';
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import Zone from '@/app/models/Zone';

type Props = NativeStackScreenProps<ProfileNavParams, 'EditZone'>;
export default function EditZoneScreen({ navigation, route }: Props) {

    const [loading, setLoading] = useState(true);
    const [zones, setZones] = useState<Zone[]>([]);


    const onValidate = (selectedZoneCodes: string[]) => {
        // update user with selected zones
        const updatedUser = {
            user: {
                email: route.params.user.email,
                agentProperties: { ...route.params.user.agentProperties, zoneCodes: selectedZoneCodes }
            }
        };

        userService.update(updatedUser)
            .then(() => {
                zoneService.addToZones({
                    zones: selectedZoneCodes,
                    type: 'agent',
                }).then((response) => {
                    showMessage({
                        message: "Succès",
                        description: "Vos zones ont été mises à jour",
                        type: "success",
                    });
                    navigation.goBack();
                }).catch((error) => {
                    showMessage({
                        message: "Erreur",
                        description: "Une erreur s'est produite",
                        type: "danger",
                    });
                    console.log(error);
                });
            })
            .catch((error) => {
                showMessage({
                    message: "Erreur",
                    description: "Une erreur s'est produite",
                    type: "danger",
                });
                console.log(error);
            });
    }

    function getZones() {
        zoneService.getMany(route.params.user.agentProperties?.zoneCodes || [])
            .then((response) => {
                setZones(response);
                setLoading(false);
            })
            .catch((error) => {
                showMessage({
                    message: "Erreur",
                    description: "Une erreur s'est produite",
                    type: "danger",
                });
                console.log(error);
            });
    }

    const canChangeZones = () => {
        let can = false;
        if (route.params.user.agentProperties?.lastZoneUpdateDate) {
            const lastUpdate = new Date(route.params.user.agentProperties.lastZoneUpdateDate);
            const now = new Date();
            const diff = now.getTime() - lastUpdate.getTime();
            const days = diff / (1000 * 3600 * 24);
            if (days >= 30) {
                can = true;
            }
        }
        if (!can) {
            Alert.alert(
                'Attention',
                'Vous ne pouvez changer de zones que tous les 30 jours.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                        style: 'cancel'
                    },
                ]
            );
        }

    }

    useEffect(() => {
        getZones();
        canChangeZones();
    }, []);


    return (
        <View style={{ flex: 1 }}>

            <SelectZonesScreen
                nbZones={route.params.user.agentProperties?.maxZones || 0}
                selectedZones={zones}
                onValidate={onValidate}
            />

        </View>
    )
}