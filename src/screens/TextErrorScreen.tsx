import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts, MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import type { RootStackParamList } from '../../App';
import TorchPair from '../components/TorchPair';

type Props = NativeStackScreenProps<RootStackParamList, 'TextError'>;

export default function TextErrorScreen({ navigation }: Props): React.ReactElement {
  const [fontsLoaded] = useFonts({ MedievalSharp_400Regular });

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/medieval_wood.jpg')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <TorchPair />
          <View style={styles.content}>
            <Text style={styles.heading}>Ekran błędu odczytu</Text>
            <Text style={styles.message}>
              Nie udało się wczytać informacji o grze.
            </Text>
            <Text style={styles.fallbackTitle}>Gra Lochy i Smoki</Text>
            <Text style={styles.fallbackVersion}>Wersja niedostępna</Text>
            <Pressable
              onPress={() => navigation.navigate('Start')}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
                  Wróć do działającego ekranu
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#171008',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    zIndex: 1,
    alignItems: 'center',
  },
  heading: {
    color: '#D4AF37',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    color: '#FFAB91',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 24,
  },
  fallbackTitle: {
    color: '#F5DEB3',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  fallbackVersion: {
    color: '#F5DEB3',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#F0C75E',
    backgroundColor: '#6B3421',
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: '#8B4A2F',
  },
  buttonText: {
    color: '#FFF1B8',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  buttonTextPressed: {
    color: '#FFFFFF',
  },
});
