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
}

export default function SimpleRadioButton(props: RadioButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={styles.container}>
      <BodyText text={props.title} isMedium />
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
  },

})