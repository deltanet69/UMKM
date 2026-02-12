import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TasksScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            <Text className="text-2xl font-bold">Tugas UMKM</Text>
            <Text className="text-gray-500">Daftar Tugas Harian</Text>
        </SafeAreaView>
    );
}
