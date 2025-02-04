import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StyleSheet } from 'react-native';
import Colors from '@/app/constants/Colors';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import Button from '@/app/components/atoms/Button';
import ProjectDetails from '@/app/constants/ProjectDetails';
import { ScrollView } from 'react-native-gesture-handler';
import SelectProjectDetails from '@/app/components/organisms/SelectProjectDetails';

type Props = NativeStackScreenProps<ProfileNavParams, 'NewProject2Details'>;
export default function NewProject2DetailsScreen({ navigation, route }: Props) {

    const [project, setProject] = useState(route.params.project);


    const next = () => {
        navigation.navigate('NewProject3Descr', { project: project });
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24, paddingBottom: 130 }}>
                <ProgressBar progress={3} total={4} title="Projet" width={80} />
                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
                    <Title0 title={'Définissez les détails de votre projet'} isLeft style={{ marginBottom: 16 }} />
                    <SelectProjectDetails
                        project={project}
                        onChangeBedrooms={(value) => {
                            let nbRooms = project.nbRooms;
                            if (!nbRooms || nbRooms < value)
                                nbRooms = value;
                            setProject({ ...project, nbBedrooms: value, nbRooms });
                        }}
                        onChangeBathrooms={(value) => setProject({ ...project, nbBathrooms: value })}
                        onChangeRooms={(value) => setProject({ ...project, nbRooms: value })}
                        onChangeSurface={(value) => setProject({ ...project, surface: value })}
                        onChangeSurfaceMinMax={(values) => {
                            console.log(values);
                            setProject({ ...project, surfaceMin: values[0], surfaceMax: values[1] })
                        }}
                        onChangeGardenSurface={(value) => setProject({ ...project, gardenSurface: value })}
                        onChangeGardenSurfaceMinMax={(values) => setProject({ ...project, gardenSurfaceMin: values[0], gardenSurfaceMax: values[1] })}
                        onChangeBudgetMinMax={(values) => setProject({ ...project, budgetMin: values[0], budgetMax: values[1] })}
                        onChangeSurfaceExt={(value) => setProject({ ...project, surfaceExt: value })}
                        onChangeParking={(value) => setProject({ ...project, parking: value })}
                    />
                </ScrollView>
            </View>
            <Button title="Suivant" onPress={next}
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