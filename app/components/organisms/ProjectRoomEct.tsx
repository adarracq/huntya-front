import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Project from '@/app/models/Project'
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';
import ProjectDetails from '@/app/constants/ProjectDetails';
import Title2 from '../atoms/Title2';
import Title1 from '../atoms/Title1';
import SmallText from '../atoms/SmallText';
import IconTitleValueContainer from '../molecules/IconTitleValueContainer';

type Props = {
    project: Project;
}
export default function ProjectRoomEct(props: Props) {

    const [elements, setElements] = useState<{ title: string; icon: string; value: string | number | null; }[]>([]);


    function setElementsToDisplay() {
        let type = props.project.type;
        let isAchatOrLoc = type === 0 || type === 2;
        let categorie = ProjectDetails.categories[props.project.categorie];

        let _elements = [];
        if (categorie.rooms) {
            let eRooms = {
                title: isAchatOrLoc ? 'Pièces' : 'Pièces min.',
                icon: 'home',
                value: props.project.nbRooms
            }
            let eBedrooms = {
                title: isAchatOrLoc ? 'Chambres' : 'Chambres min.',
                icon: 'bed',
                value: props.project.nbBedrooms
            }
            let eBathrooms = {
                title: isAchatOrLoc ? 'Salles de bain' : 'Salles de bain min.',
                icon: 'shower',
                value: props.project.nbBathrooms
            }
            _elements.push(eRooms);
            _elements.push(eBedrooms);
            _elements.push(eBathrooms);
        }
        let eSurface = {
            title: isAchatOrLoc ? 'Surface' : 'Surface',
            icon: 'cube',
            value: !isAchatOrLoc ? props.project.surface + 'm²' : props.project.surfaceMin + 'm² - ' + props.project.surfaceMax + 'm²'
        }
        _elements.push(eSurface);

        if (categorie.garden) {
            let eGarden = {
                title: isAchatOrLoc ? 'Surface jardin' : 'Surface jardin',
                icon: 'tree',
                value: !isAchatOrLoc ? props.project.gardenSurface + 'm²' : props.project.gardenSurfaceMin + 'm² - ' + props.project.gardenSurfaceMax + 'm²'
            }
            _elements.push(eGarden);
        }
        if (categorie.parking) {
            let eParking = {
                title: isAchatOrLoc ? 'Place de parking' : 'Place de parking min.',
                icon: 'car',
                value: props.project.parking
            }
            _elements.push(eParking);
        }
        if (categorie.balcony) {
            let eBalcony = {
                title: isAchatOrLoc ? 'Surface extérieure' : 'Surface extérieure min.',
                icon: 'balcony',
                value: props.project.surfaceExt + 'm²'
            }
            _elements.push(eBalcony);
        }
        if (isAchatOrLoc && props.project.budgetMin && props.project.budgetMax) {
            let ePrice = {
                title: 'Budget',
                icon: 'dollar',
                value: functions.separateThousands(props.project.budgetMin) + '€ \n' + functions.separateThousands(props.project.budgetMax) + '€'
            }
            _elements.push(ePrice);
        }
        setElements(_elements);

    }

    useEffect(() => {
        setElementsToDisplay();
    }, [props.project]);


    return (
        <View style={{ gap: 16, padding: 20 }}>
            <Title1 title="Détails du projet" isLeft />
            <View >
                {elements.map((e, index) => {
                    // 2 by 2
                    if (index % 2 === 0) {
                        return (
                            <View key={index} style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                                <IconTitleValueContainer icon={e.icon} title={e.title} value={e.value?.toString() || ''} />
                                {elements[index + 1] &&
                                    <IconTitleValueContainer icon={elements[index + 1].icon} title={elements[index + 1].title} value={elements[index + 1].value?.toString() || ''} />
                                }
                            </View>
                        )
                    }
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    elementContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'column',
        flex: 1,
        alignContent: 'flex-start',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        padding: 16,
    }
})