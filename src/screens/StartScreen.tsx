import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts, MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import type { RootStackParamList } from '../../App';
import TorchPair from '../components/TorchPair';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

const FALLBACK_TITLE = 'Gra Lochy i Smoki';
const FALLBACK_VERSION = 'Wersja niedostępna';

export default function StartScreen({ navigation }: Props): React.ReactElement {
  const [fontsLoaded] = useFonts({ MedievalSharp_400Regular });
  const [title, setTitle] = useState(FALLBACK_TITLE);
  const [version, setVersion] = useState(FALLBACK_VERSION);
  const [gameInfoError, setGameInfoError] = useState(false);
  const { width, height } = useWindowDimensions();
  const dragonX = useRef(new Animated.Value(-140)).current;
  const dragonY = useRef(new Animated.Value(90)).current;

  useEffect(() => {
    let mounted = true;

    async function loadGameInfo() {
      try {
        const asset = Asset.fromModule(require('../../assets/game_info.txt'));
        await asset.downloadAsync();
        if (!asset.localUri && !asset.uri) {
          throw new Error('Nie można odczytać zasobu');
        }

        const text = await FileSystem.readAsStringAsync(asset.localUri ?? asset.uri);
        const lines = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);

        if (lines.length < 2 || lines.some((line) => line.length > 100)) {
          throw new Error('Niepoprawna zawartość pliku');
        }

        if (mounted) {
          setTitle(lines[0]);
          setVersion(lines[1]);
          setGameInfoError(false);
        }
      } catch (error) {
        console.error('Failed to load assets/game_info.txt', error);
        if (mounted) {
          setTitle(FALLBACK_TITLE);
          setVersion(FALLBACK_VERSION);
          setGameInfoError(true);
        }
      }
    }

    loadGameInfo();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const flyDragon = () => {
      const randomTop = 50 + Math.random() * Math.max(60, height * 0.32);
      const randomDuration = 4200 + Math.random() * 1800;

      dragonX.setValue(-140);
      dragonY.setValue(randomTop);

      Animated.parallel([
        Animated.timing(dragonX, {
          toValue: width + 140,
          duration: randomDuration,
          useNativeDriver: true,
        }),
        Animated.timing(dragonY, {
          toValue: randomTop - 35 - Math.random() * 70,
          duration: randomDuration,
          useNativeDriver: true,
        }),
      ]).start();
    };

    flyDragon();
    const timer = setInterval(flyDragon, 5000);
    return () => clearInterval(timer);
  }, [dragonX, dragonY, width, height]);

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
          <Animated.Text
            style={[
              styles.dragon,
              {
                transform: [
                  { translateX: dragonX },
                  { translateY: dragonY },
                ],
              },
            ]}
          >
            🐉
          </Animated.Text>

          <TorchPair />

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.version}>{version}</Text>
            {gameInfoError && (
              <Text style={styles.error}>
                Nie udało się wczytać informacji o grze
              </Text>
            )}

            <Pressable
              onPress={() => navigation.navigate('Tavern')}
              style={({ pressed }) => [
                styles.startButton,
                pressed && styles.startButtonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    styles.startButtonText,
                    pressed && styles.startButtonTextPressed,
                  ]}
                >
                  Rozpocznij przygodę
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('TextError')}
              style={({ pressed }) => [
                styles.demoButton,
                pressed && styles.demoButtonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text style={[styles.demoButtonText, pressed && styles.demoButtonTextPressed]}>
                  Pokaż ekran błędu
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
  title: {
    color: '#D4AF37',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 38,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 4,
  },
  version: {
    color: '#F5DEB3',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 34,
  },
  error: {
    color: '#FFAB91',
    fontSize: 14,
    marginBottom: 20,
  },
  dragon: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 58,
  },
  startButton: {
    minWidth: 260,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F0C75E',
    backgroundColor: '#6B3421',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  startButtonPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: '#8B4A2F',
  },
  startButtonText: {
    color: '#FFF1B8',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  startButtonTextPressed: {
    color: '#FFFFFF',
  },
  demoButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B89A67',
    backgroundColor: 'rgba(25, 16, 10, 0.8)',
  },
  demoButtonPressed: {
    backgroundColor: 'rgba(94, 62, 33, 0.95)',
    transform: [{ scale: 0.97 }],
  },
  demoButtonText: {
    color: '#E8D8B5',
    fontFamily: 'MedievalSharp_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  demoButtonTextPressed: {
    color: '#FFFFFF',
  },
});