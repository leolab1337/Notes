import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';



export const Loading = () => {
  let componentState = -1;
  const [dot, setDot] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    componentState = window.setTimeout(() => {
      // if dot smaller than 3, add 1. Otherwise mark 1
      const _dot = dot < 3 ? dot + 1 : 1;
      setDot(_dot);
    }, 1000);
    return () => clearTimeout(componentState);
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.window, styles.wrapper]}>
        <ActivityIndicator size="large" color="#8f60d5" />
        <Text style={styles.content}>Loading{'.'.repeat(dot)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  window: {
    backgroundColor: 'rgba(255, 99, 71, 0.8)',
  },
  content: {
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8f60d5',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Loading;
