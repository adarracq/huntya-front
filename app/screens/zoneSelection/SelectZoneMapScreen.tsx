import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import SelectZonesScreen from '@/app/components/organisms/SelectZonesScreen';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';
import User from '@/app/models/User';

type Props = NativeStackScreenProps<NavParams, 'SelectZoneMap'>;
export default function SelectZoneMapScreen({ navigation, route }: Props) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        userService.getByEmail(route.params.email)
            .then((response) => {
                setUser(response);
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


    const onValidate = (selectedZonesIds: string[]) => {
        // update user with selected zones
        const updatedUser = {
            user: {
                email: user!.email,
                agentProperties: { ...user!.agentProperties, zonesId: selectedZonesIds }
            }
        };

        userService.update(updatedUser)
            .then(() => {
                navigation.navigate('AccountCreated', { type: 2, email: user!.email });
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

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {
                loading ?
                    <LoadingScreen />
                    : user &&
                    <SelectZonesScreen
                        nbZones={user!.agentProperties?.maxZones || 0}
                        selectedZones={[]} // empty because we don't have the selected zones yet
                        onValidate={onValidate}
                    />
            }
        </View>
    )
}