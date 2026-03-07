import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DashboardSiswa() {
    const menuSiswa = [
        { name: 'Tabungan', icon: 'account-balance-wallet' },
        { name: 'Nilai', icon: 'assignment' },
        { name: 'Jadwal', icon: 'event' },
        { name: 'Absensi', icon: 'check-circle' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="account-circle" size={80} color="white" />
                <Text style={styles.userName}>Nama Siswa</Text>
                <Text style={styles.userStatus}>Siswa Sekolah Belajar</Text>
            </View>

            <View style={styles.menuGrid}>
                {menuSiswa.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuCard}>
                    <MaterialIcons name={item.icon} size={32} color="#ff0000" />
                    <Text style={styles.menuLabel}>{item.name}</Text>
                </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#ff0000', padding: 40, alignItems: 'center', paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    userName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
    userStatus: { color: '#ffcccc', fontSize: 14 },
    menuGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, justifyContent: 'space-between', marginTop: 10 },
    menuCard: { backgroundColor: 'white', width: '46%', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 15, elevation: 4 },
    menuLabel: { marginTop: 10, fontWeight: '600', color: '#333' }
});