import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Mock Data berdasarkan tabel 'mata_pelajaran' dan 'rombel' di SQL Anda
const MASTER_MAPEL = [
    { id: 1, name: 'Matematika', kurikulum: 'Merdeka' },
    { id: 2, name: 'Bahasa Indonesia', kurikulum: 'Merdeka' },
    { id: 3, name: 'IPA', kurikulum: 'K-13' },
    { id: 4, name: 'PJOK', kurikulum: 'Merdeka' }, 
    { id: 4, name: 'PJOK', kurikulum: 'Merdeka' }, 
];

const MASTER_ROMBEL = [
    { id: 101, nama_kelas: 'VI-A' },
    { id: 102, nama_kelas: 'VI-B' },
];

export default function SeleksiMapel() {
    const router = useRouter();
    const [selectedHari, setSelectedHari] = useState('Senin');
    const [selectedRombel, setSelectedRombel] = useState('');
    const [selectedMapel, setSelectedMapel] = useState('');
    const [listJadwal, setListJadwal] = useState([]);

    // Memuat data jadwal dari penyimpanan lokal (simulasi tabel jadwal)
    useEffect(() => { 
        const loadJadwal = async () => {
            try {
                const savedData = await AsyncStorage.getItem('@jadwal_lokal');
                if (savedData) setListJadwal(JSON.parse(savedData));
            } catch (e) {
                console.log("Gagal memuat data");
            }
        };
        loadJadwal(); 
    }, []);

    const simpanJadwal = async () => {
        if (!selectedRombel || !selectedMapel) {
            Alert.alert("Peringatan", "Silakan pilih Kelas dan Mata Pelajaran!");
            return;
        }

        const dataBaru = {
            id: Date.now().toString(),
            hari: selectedHari,
            kelas: MASTER_ROMBEL.find(r => r.id == selectedRombel)?.nama_kelas,
            mapel: MASTER_MAPEL.find(m => m.id == selectedMapel)?.name,
            kurikulum: MASTER_MAPEL.find(m => m.id == selectedMapel)?.kurikulum
        };

        const update = [dataBaru, ...listJadwal];
        setListJadwal(update);
        await AsyncStorage.setItem('@jadwal_lokal', JSON.stringify(update));
        Alert.alert("Berhasil", "Jadwal kelas telah diperbarui di penyimpanan lokal.");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Atur Jadwal Mapel</Text>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.label}>Tentukan Hari</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={selectedHari} onValueChange={(v) => setSelectedHari(v)}>
                        <Picker.Item label="Senin" value="Senin" />
                        <Picker.Item label="Selasa" value="Selasa" />
                        <Picker.Item label="Rabu" value="Rabu" />
                        <Picker.Item label="Kamis" value="Kamis" />
                        <Picker.Item label="Jumat" value="Jumat" />
                    </Picker>
                </View>

                <Text style={styles.label}>Pilih Rombongan Belajar (Kelas)</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={selectedRombel} onValueChange={(v) => setSelectedRombel(v)}>
                        <Picker.Item label="-- Pilih Kelas --" value="" />
                        {MASTER_ROMBEL.map(r => (
                            <Picker.Item key={r.id} label={r.nama_kelas} value={r.id} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Pilih Mata Pelajaran (Sesuai Kurikulum)</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={selectedMapel} onValueChange={(v) => setSelectedMapel(v)}>
                        <Picker.Item label="-- Pilih Mapel --" value="" />
                        {MASTER_MAPEL.map(m => (
                            <Picker.Item key={m.id} label={`${m.name} (${m.kurikulum})`} value={m.id} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity style={styles.btnSimpan} onPress={simpanJadwal}>
                    <Text style={styles.btnText}>Simpan ke Jadwal</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listSection}>
                <Text style={styles.listTitle}>Riwayat Penetapan Jadwal:</Text>
                {listJadwal.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        <View>
                            <Text style={styles.itemDay}>{item.hari} - {item.kelas}</Text>
                            <Text style={styles.itemTitle}>{item.mapel}</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.kurikulum}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { backgroundColor: '#333', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
    title: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
    formCard: { backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 15, elevation: 4 },
    label: { fontWeight: 'bold', color: '#444', marginBottom: 8, marginTop: 10 },
    pickerWrapper: { backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 15, overflow: 'hidden' },
    btnSimpan: { backgroundColor: '#d32f2f', padding: 15, borderRadius: 10, marginTop: 10, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    listSection: { padding: 15 },
    listTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    itemCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    itemDay: { fontSize: 12, color: '#777' },
    itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
    badge: { backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: '#2e7d32', fontSize: 10, fontWeight: 'bold' }
});