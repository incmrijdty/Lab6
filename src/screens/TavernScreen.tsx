import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TavernScreen(): React.ReactElement {
  return (
    <ImageBackground
      source={require('../../assets/medieval_wood.jpg')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {/* Lewa pochodnia */}
        <LottieView
          source={require('../../assets/torch_animation.json')}
          autoPlay
          loop
          style={styles.torchLeft}
        />

        {/* Główna treść ekranu (np. menu karczmy) */}
        <View style={styles.content}>
          <Text style={styles.title}>Karczma</Text>
        </View>

        {/* Prawa pochodnia */}
        <LottieView
          source={require('../../assets/torch_animation.json')}
          autoPlay
          loop
          style={styles.torchRight}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row', // to rozstawia pochodnie po bokach, a treść w środku
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  torchLeft: {
    width: 60,
    height: 120,
  },
  torchRight: {
    width: 60,
    height: 120,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#D4AF37',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'MedievalSharp_400Regular'
  },
});
