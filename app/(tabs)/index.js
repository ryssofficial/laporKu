import React from 'react';
import { useLocalSearchParams } from 'expo-router';
// Mengambil komponen dari folder components yang sudah kamu buat
import DashboardSiswa from '../../components/DashboardSiswa';
import DashboardGuru from '../../components/DashboardGuru';

export default function TabIndex() {
    const { role } = useLocalSearchParams();

    // Jika parameter role adalah 'guru', tampilkan dashboard guru
    if (role === 'guru') {
        return <DashboardGuru />;
    }

    // Jika tidak, tampilkan dashboard siswa
    return <DashboardSiswa />;
}