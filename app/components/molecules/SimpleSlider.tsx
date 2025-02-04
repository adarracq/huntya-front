import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/app/constants/Colors';
import { TextInput } from 'react-native-gesture-handler';
import BodyText from '../atoms/BodyText';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { functions } from '@/app/utils/Functions';

type Props = {
    title: string,
    value: number,
    min: number,
    max: number,
    step?: number,
    onChange: (value: number) => void,
}
export default function SimpleSlider(props: Props) {

    const [val, setVal] = useState(functions.separateThousands(props.value || props.min).toString());

    return (
        <View style={{ gap: 0 }}>
            <BodyText text={props.title} isMedium />
            <MultiSlider
                values={[props.value || props.min]}
                sliderLength={Dimensions.get('window').width - 40}
                onValuesChange={(values) => {
                    props.onChange(values[0]);
                    setVal(functions.separateThousands(values[0]).toString());
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
            <View style={{}}>
                <View style={styles.valueContainer}>
                    <TextInput
                        keyboardType='numeric'
                        style={{ width: 100, textAlign: 'center' }}
                        value={val}
                        onChangeText={(text) => {
                            // we remove the thousands separator
                            let value = parseInt(text.replace(/\s/g, ''));
                            // if NaN, we dont update the value
                            if (!value) {
                                setVal('');
                                return;
                            }
                            setVal(functions.separateThousands(value));
                            props.onChange(value);
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