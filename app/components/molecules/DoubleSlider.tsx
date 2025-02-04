import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import BodyText from '../atoms/BodyText'
import Colors from '@/app/constants/Colors'
import { functions } from '@/app/utils/Functions'

type Props = {
    title: string,
    min: number,
    max: number,
    minValue?: number,
    maxValue?: number,
    step?: number,
    onChange: (value: number[]) => void,
}
export default function DoubleSlider(props: Props) {

    const [min, setMin] = useState(functions.separateThousands(props.minValue || props.min).toString());
    const [max, setMax] = useState(functions.separateThousands(props.maxValue || props.max).toString());

    return (
        <View style={{ gap: 0 }}>
            <BodyText text={props.title} isMedium />
            <MultiSlider
                values={[props.minValue || props.min, props.maxValue || props.max]}
                sliderLength={Dimensions.get('window').width - 40}
                onValuesChange={(values) => {
                    props.onChange(values);
                    setMax(functions.separateThousands(values[1]).toString());
                    setMin(functions.separateThousands(values[0]).toString());
                }}
                min={props.min}
                max={props.max}
                step={props.step || 1}
                allowOverlap
                snapped
                selectedStyle={{
                    backgroundColor: Colors.mainBlue,
                    height: 4,
                    marginTop: -2
                }}
                unselectedStyle={{ backgroundColor: Colors.lightGrey, }}
                markerStyle={{
                    backgroundColor: Colors.white,
                    height: 24,
                    width: 24,
                    borderWidth: 3,
                    borderColor: Colors.lightGrey,
                    borderRadius: 6,
                }}
                pressedMarkerStyle={{
                    backgroundColor: Colors.white,
                    height: 24,
                    width: 24,
                    borderWidth: 3,
                    borderColor: Colors.mainBlue,
                    borderRadius: 6,
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.valueContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={{ width: 100, textAlign: 'center' }}
                        value={min}
                        onChangeText={(text) => {
                            // we remove the thousands separator
                            let value = parseInt(text.replace(/\s/g, ''));
                            // if NaN, we dont update the value
                            if (!value) {
                                setMin('');
                                return;
                            }
                            setMin(functions.separateThousands(value));
                            props.onChange([value, props.maxValue || props.max]);
                        }}
                    />
                </View>
                <View style={styles.valueContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={{ width: 100, textAlign: 'center' }}
                        value={max}
                        onChangeText={(text) => {
                            // we remove the thousands separator
                            let value = parseInt(text.replace(/\s/g, ''));
                            // if NaN, we dont update the value
                            if (!value) {
                                setMax('');
                                return;
                            }
                            setMax(functions.separateThousands(value));
                            props.onChange([props.minValue || props.min, value]);
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    valueContainer: {
        borderRadius: 12,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    }
})