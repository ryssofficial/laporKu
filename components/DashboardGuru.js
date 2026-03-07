import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import {LoginGuru} from '../app/login-guru';

export default function DashboardGuru() {
    const router = useRouter();
    const menuGuru = [
        { name: 'Audit Tugas', icon: 'rule' },
        { name: 'Validasi Absensi', icon: 'fact-check' },
        { name: 'Jadwal Mengajar', icon: 'calendar-today' },
        { name: 'Seleksi Mapel', icon: 'list-alt' },
        { name: 'Validasi Tabungan', icon: 'payments' },
        { name: 'Daftar Siswa', icon: 'people' },
    ];

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <MaterialIcons name="person-pin" size={80} color="white" />
            <Text style={styles.userName}>Nama Guru</Text>
            <Text style={styles.userStatus}>Guru Sekolah Belajar</Text>
        </View>

        <View style={styles.menuGrid}>
            {menuGuru.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuCard}>
                <MaterialIcons name={item.icon} size={30} color="#ff0000" />
                <Text style={styles.menuLabel}>{item.name}</Text>
            </TouchableOpacity>
            ))}
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#333', padding: 40, alignItems: 'center', paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    userName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
    userStatus: { color: '#ccc', fontSize: 14 },
    menuGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, justifyContent: 'space-between', marginTop: 10 },
    menuCard: { backgroundColor: 'white', width: '46%', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 15, elevation: 3 },
    menuLabel: { marginTop: 10, fontSize: 13, fontWeight: '600', textAlign: 'center' }
});