import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StyleSheet } from 'react-native';
import Colors from '@/app/constants/Colors';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import InputField from '@/app/components/molecules/InputField';
import Button from '@/app/components/atoms/Button';
import { projectService } from '@/app/services/project.service';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { showMessage } from 'react-native-flash-message';
import { zoneService } from '@/app/services/zone.service';
import Project from '@/app/models/Project';
type Props = NativeStackScreenProps<ProfileNavParams, 'NewProject3Descr'>;
export default function NewProject3DescrScreen({ navigation, route }: Props) {

    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const create = () => {
        let project = { ...route.params.project, description, date: new Date() };
        setLoading(true);
        // first we add the zone if project is in a zone
        zoneService.getZoneFromCoords(project.coords)
            .then((zone) => {
                project.zoneId = zone;
                create1(project);
            })
            .catch((error) => {
                console.log(error);
                create1(project);
            });
    }

    const create1 = (project: {}) => {
        console.log('project', project);
        projectService.create(project)
            .then(() => {
                setLoading(false);
                showMessage({
                    message: "Projet créé",
                    description: "Votre projet a été créé avec succès",
                    type: "success",
                });
                // start a new stack of screens from profile screen
                navigation.popTo('HomeProfile')
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                showMessage({
                    message: "Erreur",
                    description: "Une erreur s'est produite lors de la création du projet",
                    type: "danger",
                });
            })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={4} total={4} title="Description" width={80} />
                <Title0 title={'Décrivez votre projets en quelques mots'} isLeft />
                <InputField
                    title="Déscription"
                    placeholder='Rédigez une description de votre projet'
                    value={description || ''}
                    onChangeText={(text) => setDescription(text)}
                    isMultiline
                    height={200}
                />
            </View>
            <Button title="Créer le projet" onPress={create}
                disabled={!description || description.length < 10}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                style={styles.nextBtn}
            />
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

    nextBtn: {
        position: 'absolute',
        bottom: 35,
        left: 20,
        width: Dimensions.get('window').width - 40
    }
})