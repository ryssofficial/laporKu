import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

/**
 * Pemetaan nama ikon SF Symbols ke Material Icons untuk Android.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name] || 'help-outline'} // Fallback jika nama tidak ditemukan
      style={style}
    />
  );
}