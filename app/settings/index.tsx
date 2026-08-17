import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Pengaturan</Text>
                    <View style={{ width: 24 }} />
                </View>
            </SafeAreaView>

            <View style={styles.content}>
                <TouchableOpacity style={styles.settingItem}>
                    <Ionicons name="person-outline" size={24} color="#4B5563" />
                    <Text style={styles.settingText}>Edit Profil</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Ionicons name="lock-closed-outline" size={24} color="#4B5563" />
                    <Text style={styles.settingText}>Ubah Password</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Ionicons name="notifications-outline" size={24} color="#4B5563" />
                    <Text style={styles.settingText}>Notifikasi</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.settingItem, styles.logoutButton]}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    <Text style={[styles.settingText, styles.logoutText]}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#1F2937',
    },
    content: {
        padding: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#1F2937',
        marginLeft: 16,
    },
    logoutButton: {
        marginTop: 24,
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#EF4444',
        fontWeight: '500',
    },
});
