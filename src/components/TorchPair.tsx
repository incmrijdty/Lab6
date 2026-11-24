import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function TorchPair(): React.ReactElement {
  return (
    <View pointerEvents="none" style={styles.container}>
      <LottieView
        source={require('../../assets/torch_animation.json')}
        autoPlay
        loop
        style={styles.torch}
      />
      <LottieView
        source={require('../../assets/torch_animation.json')}
        autoPlay
        loop
        style={styles.torch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  torch: {
    width: 96,
    height: 172,
  },
});
