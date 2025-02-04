import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors';
import Project from '../../models/Project';
import ProjectDetails from '@/app/constants/ProjectDetails';
import PlusMinusInput from '../molecules/PlusMinusInput';
import BodyText from '../atoms/BodyText';
import DoubleSlider from '../molecules/DoubleSlider';
import SimpleSlider from '../molecules/SimpleSlider';

type Props = {
    project: Project;
    onChangeRooms: (value: number) => void;
    onChangeBedrooms: (value: number) => void;
    onChangeBathrooms: (value: number) => void;
    onChangeSurface: (value: number) => void;
    onChangeSurfaceMinMax: (value: number[]) => void;
    onChangeGardenSurface: (value: number) => void;
    onChangeGardenSurfaceMinMax: (value: number[]) => void;
    onChangeBudgetMinMax: (value: number[]) => void;
    onChangeSurfaceExt: (value: number) => void;
    onChangeParking: (value: number) => void;
}

export default function SelectProjectDetails(props: Props) {

    const categorie = ProjectDetails.categories.find(t => t.value == props.project.categorie);

    return (
        <View style={{ gap: 10 }}>
            {
                categorie?.rooms && <>
                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <BodyText text={(props.project.type == 1 || props.project.type == 3) ? 'Nb. Pièces' : 'Nb. Pièces Min.'} isMedium style={{ width: '50%' }} />
                        <PlusMinusInput
                            value={props.project.nbRooms ? props.project.nbRooms : 1}
                            onChangeValue={props.onChangeRooms}
                            minVal={1}
                            maxVal={10}
                        />
                    </View>
                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <BodyText text={(props.project.type == 1 || props.project.type == 3) ? 'Nb. Chambres' : 'Nb Chambres Min.'} isMedium style={{ width: '50%' }} />
                        <PlusMinusInput
                            value={props.project.nbBedrooms ? props.project.nbBedrooms : 0}
                            onChangeValue={props.onChangeBedrooms}
                            minVal={0}
                            maxVal={10}
                        />
                    </View>
                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <BodyText text={(props.project.type == 1 || props.project.type == 3) ? 'Nb. Salles de bain' : 'Nb Salles de bain Min.'} isMedium style={{ width: '50%' }} />
                        <PlusMinusInput
                            value={props.project.nbBathrooms ? props.project.nbBathrooms : 0}
                            onChangeValue={props.onChangeBathrooms}
                            minVal={0}
                            maxVal={10}
                        />
                    </View>
                </>
            }
            {
                (props.project.type == 0 || props.project.type == 2) ?
                    <DoubleSlider
                        title='Superficie (m²)'
                        min={0}
                        max={500}
                        minValue={props.project.surfaceMin ? props.project.surfaceMin : 0}
                        maxValue={props.project.surfaceMax ? props.project.surfaceMax : 500}
                        onChange={props.onChangeSurfaceMinMax}
                    />
                    :
                    <SimpleSlider
                        title='Superficie (m²)'
                        value={props.project.surface ? props.project.surface : 0}
                        onChange={props.onChangeSurface}
                        min={0}
                        max={500}
                    />
            }

            {
                // if house or field, show garden surface

                categorie?.garden ?
                    (props.project.type == 0 || props.project.type == 2) ?
                        <DoubleSlider
                            title='Surface terrain (m²)'
                            min={0}
                            max={100000}
                            minValue={props.project.gardenSurfaceMin ? props.project.gardenSurfaceMin : 0}
                            maxValue={props.project.gardenSurfaceMax ? props.project.gardenSurfaceMax : 100000}
                            onChange={props.onChangeGardenSurfaceMinMax}
                        />
                        :
                        <SimpleSlider
                            title='Surface terrain (m²)'
                            value={props.project.gardenSurface ? props.project.gardenSurface : 0}
                            onChange={props.onChangeGardenSurface}
                            min={0}
                            max={10000}
                            step={10}
                        />
                    :
                    null
            }
            {
                // if apartment or loft and is location show balcony

                categorie?.balcony &&
                (props.project.type == 1 || props.project.type == 3) &&

                <SimpleSlider
                    title='Surface extérieure (m²)'
                    value={props.project.surfaceExt ? props.project.surfaceExt : 0}
                    onChange={props.onChangeSurfaceExt}
                    min={0}
                    step={10}
                    max={10000}
                />

            }
            {
                categorie?.parking &&
                <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <BodyText text={(props.project.type == 1 || props.project.type == 3) ?
                        'Place(s) de parking'
                        :
                        'Place(s) de parking Min.'
                    } isMedium style={{ width: '50%' }} />
                    <PlusMinusInput
                        value={props.project.parking ? props.project.parking : 0}
                        onChangeValue={props.onChangeParking}
                        minVal={0}
                        maxVal={100}
                    />
                </View>
            }
            {
                // if buy or rent, show budget

                (props.project.type == 0 || props.project.type == 2) &&
                <DoubleSlider
                    title='Budget'
                    min={0}
                    max={props.project.type == 0 ? 1000000 : 10000}
                    minValue={props.project.budgetMin ? props.project.budgetMin : 0}
                    maxValue={props.project.budgetMax ? props.project.budgetMax : props.project.type == 0 ? 2000000 : 10000}
                    step={props.project.type == 0 ? 5000 : 50}
                    onChange={props.onChangeBudgetMinMax}
                />
            }
        </View>
    )
}
