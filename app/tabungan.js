import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HalamanTabungan() {
    const router = useRouter();
    const [history, setHistory] = useState([]);

    // Ganti dengan IP Laptop kamu jika server sudah siap
    const API_URL = "http://IP_LAPTOP_KAMU:3000/tabungan";

    // 2. Fungsi Fetch (Analisis dari DB)
    const fetchHistory = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Gagal mengambil data");
            const data = await response.json();
            setHistory(data);
        } catch (e) { 
            console.log("Server belum aktif, menggunakan data simulasi."); 
        }
    };

    useEffect(() => { 
        const loadLocalData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('@history_sebel');
                if (savedData !== null) {
                    setHistory(JSON.parse(savedData));
                } else {
                    // Data awal jika storage masih kosong
                    const initialData = [
                        { id: '1', title: 'Uang Saku', date: '08 Maret 2026', amount: 50000, type: 'in' },
                        { id: '2', title: 'Beli Jajan', date: '07 Maret 2026', amount: 15000, type: 'out' },
                    ];
                    setHistory(initialData);
                }
            } catch (e) {
                console.log("Gagal memuat data lokal");
            }
        };

        loadLocalData();
    }, []);

    const saveToLocal = async (newData) => {
        try {
            await AsyncStorage.setItem('@history_sebel', JSON.stringify(newData));
        } catch (e) {
            console.log("Gagal menyimpan data");
        }
    };

    const tambahDataTesting = async () => {
        const dataBaru = { 
            id: Date.now().toString(), // ID unik pakai waktu sekarang
            title: 'jajan', 
            date: '08 Maret 2026', 
            amount: 200000, 
            type: 'in' 
        };
        
        const historyTerbaru = [dataBaru, ...history]; // Gabungkan data baru ke atas daftar
        setHistory(historyTerbaru); // Update tampilan
        await saveToLocal(historyTerbaru); // Simpan permanen ke storage
    };

    const totalMasuk = history
        .filter(item => item.type === 'in')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalKeluar = history
        .filter(item => item.type === 'out')
        .reduce((acc, curr) => acc + curr.amount, 0);

        // 3. Logika Analisis Saldo Dinamis
    const totalSaldo = history.reduce((acc, curr) => {
        return curr.type === 'in' ? acc + curr.amount : acc - curr.amount;
    }, 0);

    const navMenu = [
        { name: 'Tambah Saldo', icon: 'add-circle', path: '/tambah-tabungan' },
        { name: 'Tarik Saldo', icon: 'remove-circle', path: '/ambil-tabungan' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Saldo Anda</Text>
                <Text style={styles.balanceAmount}>
                    Rp {totalSaldo.toLocaleString('id-ID')}
                </Text>

                <TouchableOpacity onPress={tambahDataTesting} style={{backgroundColor: '#eee', padding: 10, margin: 20, borderRadius: 10}}>
                    <Text style={{textAlign: 'center'}}>+ Tes Tambah Transaksi</Text>
                </TouchableOpacity>
            </View>

            {/* 2. Ringkasan Analisis (Diletakkan di luar FlatList agar tidak berulang) */}
            <View style={styles.analysisContainer}>
                <View style={styles.analysisBox}>
                    <Text style={styles.analysisLabel}>Pemasukan</Text>
                    <Text style={[styles.analysisValue, { color: '#2e7d32' }]}>
                        +Rp {totalMasuk.toLocaleString('id-ID')}
                    </Text>
                </View>
                <View style={styles.analysisBox}>
                    <Text style={styles.analysisLabel}>Pengeluaran</Text>
                    <Text style={[styles.analysisValue, { color: '#d32f2f' }]}>
                        -Rp {totalKeluar.toLocaleString('id-ID')}
                    </Text>
                </View>
            </View>

            {/* 3. Menu Navigasi */}
            <View style={styles.navGrid}>
                {navMenu.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.menuCard} 
                        onPress={() => router.push(item.path)}
                    >
                        <View style={styles.iconCircle}>
                            <MaterialIcons name={item.icon} size={32} color="#ff0000" />
                        </View>
                        <Text style={styles.menuLabel}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 4. Daftar Riwayat */}
            <View style={styles.containerTableHistory}>
                <Text style={styles.historyTitle}>Riwayat Transaksi</Text>

                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.historyItem}>
                            <View style={styles.historyLeft}>
                                <View style={[styles.iconBox, { backgroundColor: item.type === 'in' ? '#e8f5e9' : '#ffebee' }]}>
                                    <MaterialIcons 
                                        name={item.type === 'in' ? 'south-west' : 'north-east'} 
                                        size={20} 
                                        color={item.type === 'in' ? '#2e7d32' : '#d32f2f'} 
                                    />
                                </View>
                                <View>
                                    <Text style={styles.historyTextTitle}>{item.title}</Text>
                                    <Text style={styles.historyDate}>{item.date}</Text>
                                </View>
                            </View>
                            <Text style={[styles.historyAmount, { color: item.type === 'in' ? '#2e7d32' : '#d32f2f' }]}>
                                {item.type === 'in' ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }} 
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

// Styling tetap sama seperti sebelumnya...
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    balanceCard: { backgroundColor: '#ff0000', margin: 20, padding: 25, borderRadius: 20, alignItems: 'center' },
    balanceLabel: { color: '#fff', opacity: 0.8, fontSize: 14 },
    balanceAmount: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
    navGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
    menuCard: { backgroundColor: '#fff', width: '47%', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 3, borderWidth: 1, borderColor: '#eee' },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff5f5', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }, 
    menuLabel: { fontSize: 14, fontWeight: '600', color: '#444', textAlign: 'center' }, 
    containerTableHistory: { flex: 1, marginTop: 25, paddingHorizontal: 20 },
    historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    historyItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, elevation: 1 },
    historyLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    historyTextTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
    historyDate: { fontSize: 12, color: '#888', marginTop: 2 },
    historyAmount: { fontSize: 15, fontWeight: 'bold' }, 
    analysisContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
    analysisBox: { backgroundColor: '#fff', width: '47%', padding: 15, borderRadius: 12, elevation: 1 },
    analysisLabel: { fontSize: 12, color: '#888' },
    analysisValue: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },

});