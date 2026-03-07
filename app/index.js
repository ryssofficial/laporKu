import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function LoginSiswa() {
  const router = useRouter();
  const [nis, setNis] = useState('');
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name="school" size={50} color="#ff0000" style={{alignSelf: 'center'}} />
        <Text style={styles.title}>Login Siswa SEBEL</Text>
        <Text style={styles.subtitle}>Masukkan NIS dan password anda</Text>

        <Text style={styles.label}>NIS (Nomor Induk Siswa)</Text>
        <TextInput style={styles.input} placeholder="Masukkan NIS anda" value={nis} onChangeText={setNis} />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Masukkan password" secureTextEntry />

        <TouchableOpacity style={styles.btn} onPress={() => router.replace({ pathname: '/(tabs)', params: { role: 'siswa' } })}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login-guru')}>
          <Text style={styles.footer}>Bukan Siswa? <Text style={styles.link}>Login Guru</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 15, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
  btn: { backgroundColor: '#ff0000', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  footer: { textAlign: 'center', marginTop: 20 },
  link: { color: '#ff0000', fontWeight: 'bold' }
});