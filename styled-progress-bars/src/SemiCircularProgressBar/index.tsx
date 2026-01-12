import React, { useEffect, useRef, type JSX } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Svg, { Path , Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg'; 
import type {PathProps} from 'react-native-svg';

interface SemiCircularProgressBarProps{
  progress?:number;
  end?:number;
  radius?:number;
  strokeWidth?:number;
  colors?:string[];
  duration?:number;
}

const SemiCircularProgressBar = ({
  progress = 0,
  end = 50,
  radius = 50,
  strokeWidth = 10,
  colors = ['#4c669f', '#3b5998'],
  duration = 500,
}: SemiCircularProgressBarProps): JSX.Element => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const centerX = radius + strokeWidth;
  const centerY = radius + strokeWidth; 
  const circumference = Math.PI * radius;

// Cast AnimatedPath so TS allows Animated values
const AnimatedPath = Animated.createAnimatedComponent(Path) as React.ComponentType<
  PathProps & { strokeDashoffset?: Animated.AnimatedInterpolation<number> }
>;



  const path = `M ${centerX - radius},${centerY}
              A ${radius},${radius} 0 0 1 ${centerX + radius},${centerY}`;

  const strokeDashoffset =animatedValue.interpolate({
    inputRange:[0,end],
    outputRange:[circumference,0],
  })

  useEffect(()=>{
    Animated.timing(animatedValue,{
      toValue:progress,
      duration,
      useNativeDriver:false
    }).start();
  },[progress])


  return(
    <View style={styles.container}>
      <Svg
        width={radius*2+strokeWidth*2}
        height={radius+strokeWidth*2}
      >
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
 
        <Path
          d={path}
          stroke="rgba(224,224,224,0.3)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
 
        <AnimatedPath
  d={path}
  stroke="url(#grad)"
  strokeWidth={strokeWidth}
  fill="none"
  strokeDasharray={`${circumference}`}
  strokeDashoffset={strokeDashoffset as any} // TS-safe cast
  strokeLinecap="round"
/>

      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SemiCircularProgressBar;
 

