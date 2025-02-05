import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StyleSheet } from 'react-native';
import Colors from '@/app/constants/Colors';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import Project from '@/app/models/Project';
import DropDown from '@/app/components/molecules/DropDown';
import ProjectDetails from '@/app/constants/ProjectDetails';
import Button from '@/app/components/atoms/Button';

type Props = NativeStackScreenProps<ProfileNavParams, 'NewProject0Type'>;
export default function NewProject0TypeScreen({ navigation, route }: Props) {

    const [type, setType] = useState(-1);
    const [categorie, setCategorie] = useState(-1);

    const next = () => {
        if (!route.params.user._id
            || !route.params.user.firstname
            || !route.params.user.email
        ) return;


        let project = new Project(
            route.params.user._id,
            route.params.user.firstname,
            route.params.user.email,
            route.params.user.imageUrl ?? '',
        );
        project.type = type;
        project.categorie = categorie;
        navigation.navigate('NewProject1Zone', { project: project });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={1} total={4} title="Projet" width={80} />
                <Title0 title={'Quel est votre type de projet ?'} isLeft />
                <DropDown
                    title="Type de projet"
                    placeholder="Selectionnez un type de projet"
                    value={type}
                    type='radio'
                    items={ProjectDetails.types}
                    onSelectItem={(item) => {
                        setType(item.id);
                    }}
                />
                <DropDown
                    title="Catégorie"
                    placeholder="Selectionnez une catégorie"
                    value={categorie}
                    type='radio'
                    items={ProjectDetails.categories}
                    onSelectItem={(item) => {
                        setCategorie(item.id);
                    }}
                />
            </View>
            <Button title="Suivant" onPress={next}
                disabled={type == -1 || categorie == -1}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                style={styles.nextBtn}
            />

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
    }
})