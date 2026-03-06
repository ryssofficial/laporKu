// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

/**
 * Pemetaan SF Symbols (iOS) ke Material Icons (Android/Web).
 * Jika Anda ingin menambah ikon baru, tambahkan di sini.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

/**
 * Komponen IconSymbol yang kompatibel dengan JavaScript.
 * Menggunakan MaterialIcons untuk tampilan yang konsisten di Android.
 */
export function IconSymbol({ name, size = 24, color, style }) {
  return (
    <MaterialIcons 
      color={color} 
      size={size} 
      name={MAPPING[name]} 
      style={style} 
    />
  );
}