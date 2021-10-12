import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation({ navigation }) {
  function handleStart() {
    navigation.navigate('PlantSelection');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🙂</Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          agora vamos cuidar da suas plantinhas {'\n'}
          com muito cuidado.
        </Text>

        <View style={styles.button}>
          <Button buttonText={'Começar'} onPress={handleStart} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  emoji: {
    fontSize: 78,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },
  button: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50,
  },
});
