import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';

export function ExternalLink({ href, ...rest }) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Mencegah perilaku default (membuka browser luar) di Android/iOS
          event.preventDefault();
          // Membuka link di dalam browser internal aplikasi
          await openBrowserAsync(href);
        }
      }}
    />
  );
}