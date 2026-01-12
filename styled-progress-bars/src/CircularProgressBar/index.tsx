import { useRef, useEffect, type JSX } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

interface CircularProgressBarProps {
  progress?: number; // 0-100
  end?: number; // 0-100
  radius?: number;
  strokeWidth?: number;
  colors?: string[];
  duration?: number; // animation duration in ms
}

const CircularProgressBar = ({
  progress = 0,
  end = 50,
  radius = 50,
  strokeWidth = 10,
  colors = ['#4c669f', '#3b5998'],
  duration = 500,
}: CircularProgressBarProps): JSX.Element => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration,
      useNativeDriver: false, // must be false for strokeDashoffset
    }).start();
  }, [progress, duration]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, end],
    outputRange: [circumference, 0],
  });

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2}>
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

        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          //stroke="#e0e0e0"
          stroke="transparent"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Circle */}
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
