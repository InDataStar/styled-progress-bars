import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

interface WaveProgressBarProps {
  progress?: number; // 0-100
  end?: number; // 0-100
  width?: number;
  height?: number;
  waveHeight?: number;
  colors?: string[];
  duration?: number;
  backgroundColor?: string;
  borderRadius?: number;
  showLabel?: boolean;
}

const WaveProgressBar = ({
  progress = 0,
  end = 50,
  width = 300,
  height = 50,
  waveHeight = 10,
  colors = ['#4c669f', '#3b5998'],
  duration = 1000,
  backgroundColor = '#e0e0e0',
  borderRadius = 10,
  showLabel = true,
}: WaveProgressBarProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress, duration]);

  // Animated width of the wave container
  const waveWidth = animatedValue.interpolate({
    inputRange: [0, end],
    outputRange: [0, width],
  });

  // Wave path
  const wavePath = `
    M0 ${height / 2}
    Q ${width / 4} ${height / 2 - waveHeight}, ${width / 2} ${height / 2}
    T ${width} ${height / 2}
    L ${width} ${height}
    L0 ${height}
    Z
  `;

  return (
    <View style={[styles.container, { width, height, borderRadius, backgroundColor }]}>
      {/* Animated container for the wave */}
      <Animated.View style={{ width: waveWidth, height, overflow: 'hidden' }}>
        <Svg width={width} height={height}>
          <Defs>
            <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              {colors.map((color, index) => (
                <Stop
                  key={index}
                  offset={`${(index / (colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </SvgGradient>
          </Defs>

          <Path d={wavePath} fill="url(#grad)" />
        </Svg>
      </Animated.View>

      {/* Optional percentage label */}
      {showLabel && (
        <View
          style={{
            position: 'absolute',
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{Math.round(progress)}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
});

export default WaveProgressBar;
