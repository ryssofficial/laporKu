import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import DashboardSiswa from '../../app/DashboardSiswa';
import DashboardGuru from '../../app/DashboardGuru';

export default function TabIndex() {
    const { role } = useLocalSearchParams();
    if (role === 'guru') {
        return <DashboardGuru />;
    }

    return <DashboardSiswa />;
}