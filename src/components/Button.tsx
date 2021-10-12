import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonPros extends TouchableOpacityProps {
  buttonText: String;
}

export function Button({ buttonText, ...rest }: ButtonPros) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
