# indatastar-styled-progress-bars

A React Native library providing **beautiful animated progress bars**, including:  

- 🌓 **SemiCircularProgressBar** – animated semicircle progress  
- 🌊 **WaveProgressBar** – horizontal animated wave progress  
- 🔵 **CircularProgressBar** – animated circular progress  

Built with **React Native**, **React Native SVG**, and **Animated API**.
---
## ✨ Features


- 🎨 **Gradient Support** – Easily apply smooth gradients to your progress bars.
- ⚡ **Animated Progress** – Smooth, performant animations using React Native’s Animated API.
- 📐 **Customizable Sizes** – Adjust width, height, radius, stroke width, and wave height.
- 🎯 **Flexible Progress Range** – Set your own maximum (`end`) value.
- 💻 **TypeScript Ready** – Fully typed props with IntelliSense support.
- 🔄 **Auto & Manual Updates** – Works with dynamic or controlled state updates.
- ✅ **Expo & React Native Compatible** – Works in Expo and bare React Native projects.
- 🌈 **Multiple Styles** – Wave, semicircular, and circular progress indicators.


## Installation

```bash
# Using npm
npm install indatastar-styled-progress-bars react-native-svg

# Using yarn
yarn add indatastar-styled-progress-bars react-native-svg
```

## 🚀 Usage


###  CircularProgressBar

```
import { CircularProgressBar } from 'indatastar-styled-progress-bars';

<CircularProgressBar
  progress={75}
  end={100}
  radius={60}
  strokeWidth={10}
  colors={['#8e2de2', '#4a00e0']}
  duration={600}
/>
```
### 📋 Props
| Prop        | Type     | Default                  | Description               |
|-------------|----------|--------------------------|---------------------------|
| progress    | number   | 0                        | Current progress value    |
| end         | number   | 50                       | Maximum progress value    |
| radius      | number   | 50                       | Radius of semicircle      |
| strokeWidth | number   | 10                       | Stroke width              |
| colors      | string[] | ['#4c669f', '#3b5998']   | Gradient colors           |
| duration    | number   | 500                      | Animation duration (ms)   |


#### 🌊 WaveProgressBar
```
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WaveProgressBar } from 'indatastar-styled-progress-bars';

export default function WaveProgressDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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

```
### 📋 Props
| Prop            | Type      | Default                     | Description                           |
|-----------------|-----------|----------------------------|---------------------------------------|
| progress        | number    | 0                          | Current progress value                |
| end             | number    | 50                         | Maximum progress value                |
| width           | number    | 300                        | Width of the progress bar             |
| height          | number    | 50                         | Height of the progress bar            |
| waveHeight      | number    | 10                         | Height of the wave                     |
| colors          | string[]  | ['#4c669f', '#3b5998']    | Gradient colors                        |
| duration        | number    | 1000                       | Animation duration in milliseconds    |
| backgroundColor | string    | #e0e0e0                    | Background color of the container     |
| borderRadius    | number    | 10                         | Border radius of the container        |
| showLabel       | boolean   | true                        | Whether to show percentage label      |


#### 🌓SemiCircularProgressBar
```
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SemiCircularProgressBar } from 'indatastar-styled-progress-bars';

export default function SemiCircularProgressDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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

```
### 📋 Props

| Prop        | Type      | Default               | Description                  |
|------------|-----------|---------------------|------------------------------|
| progress    | number    | 0                   | Current progress value       |
| end         | number    | 50                  | Maximum progress value       |
| radius      | number    | 50                  | Radius of semicircle         |
| strokeWidth | number    | 10                  | Width of the stroke          |
| colors      | string[]  | ['#4c669f', '#3b5998'] | Gradient colors             |
| duration    | number    | 500                 | Animation duration in milliseconds |

## 📄 License
MIT




