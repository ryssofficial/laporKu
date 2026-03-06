import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import React from 'react';

export function HapticTab(props) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Memberikan feedback getaran lembut di iOS
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        // Menjalankan fungsi onPressIn bawaan jika ada
        props.onPressIn?.(ev);
      }}
    />
  );
}