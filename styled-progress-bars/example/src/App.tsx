import { Button, SafeAreaView,StyleSheet, View  } from 'react-native'; 
import { useState,useEffect } from 'react';
import { 
  SemiCircularProgressBar,
WaveProgressBar,
} from 'styled-progress-bars'; 

export default function App() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  useEffect(()=>{
    const interval = setInterval(()=>{
      setProgress((prev) => (prev >= 100? 0:prev+10))
    },500)
    return ()=>clearInterval(interval);
  },[])
  return (
    <SafeAreaView  style={styles.container}>  
    <WaveProgressBar
          progress={progress}
          width={250}
          height={40}
          end={50}
          waveHeight={10}
          colors={['#ff6a00', '#ee0979']}
          duration={500}
          borderRadius={20}
          showLabel={false}
          backgroundColor="transparent"
        /> 
      <SemiCircularProgressBar
        progress={progress}
        radius={80}
        end={50}
        strokeWidth={12}
        colors={['#00c6ff', '#0072ff']}
        duration={500}
      />  
    </SafeAreaView>
  );
}
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
