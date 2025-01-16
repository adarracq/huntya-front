import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import BodyText from '../atoms/BodyText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  onPress: () => void;
  selected: boolean;
}

export default function SimpleCheckbox(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={styles.container}>
      <BodyText text={props.title} isMedium />
      {
        props.selected ?
          <MaterialCommunityIcons name="checkbox-marked" size={20} color={Colors.mainBlueLight} />
          :
          <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color={Colors.lightGrey} />

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