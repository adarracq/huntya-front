import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Fontisto from '@expo/vector-icons/Fontisto';
import BodyText from '../atoms/BodyText';
import Title2 from '../atoms/Title2';
import { functions } from '@/app/utils/Functions';

type RadioButtonProps = {
  title: string;
  onPress: () => void;
  selected: boolean;
  icon: string;
  subtitle: string;
}

export default function RadioButton(props: RadioButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={[styles.container,
      {
        borderColor: props.selected ? Colors.mainBlue : Colors.lightGrey,
        borderWidth: props.selected ? 2 : 1,
        backgroundColor: props.selected ? Colors.lightBlue : Colors.white
      }
      ]}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <View style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: props.selected ? Colors.white : Colors.veryLightGrey,
          borderRadius: 12
        }}>
          <Image source={functions.getIconSource(props.icon)}
            style={{
              width: 16,
              height: 16,
              tintColor: props.selected ? Colors.mainBlue : Colors.darkGrey
            }} />
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Title2 title={props.title} />
          <BodyText text={props.subtitle} color={Colors.darkGrey} />
        </View>
      </View>
      {
        props.selected ?
          <Fontisto name="radio-btn-active" size={16} color={Colors.mainBlue} />
          :
          <Fontisto name="radio-btn-passive" size={16} color={Colors.lightGrey} />

      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    height: 68,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },

})