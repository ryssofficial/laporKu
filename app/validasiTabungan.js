import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabunganScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Data Tabungan</Text>
            </View>
            
            <View style={styles.content}>
                <MaterialIcons name="account-balance-wallet" size={100} color="#ff0000" />
                <Text style={styles.infoText}>Halaman Tabungan Sementara</Text>
                <Text style={styles.subText}>Saldo Anda: Rp 0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { backgroundColor: '#ff0000', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    infoText: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
    subText: { color: '#666', marginTop: 5 }
});