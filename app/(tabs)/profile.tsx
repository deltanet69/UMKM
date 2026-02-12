import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <View className="items-center mt-8 mb-8">
                <View className="w-24 h-24 bg-gray-200 rounded-full mb-4"></View>
                <Text className="text-xl font-bold">Nama Pengguna</Text>
                <Text className="text-gray-500">Owner UMKM</Text>
            </View>

            <View className="space-y-2">
                <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-lg flex-row justify-between"
                    onPress={() => router.push('/settings')}
                >
                    <Text className="font-medium">Pengaturan</Text>
                    <Text className="text-gray-400">{'>'}</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-gray-50 p-4 rounded-lg flex-row justify-between">
                    <Text className="font-medium">Data Usaha</Text>
                    <Text className="text-gray-400">{'>'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-red-50 p-4 rounded-lg mt-8 items-center"
                    onPress={() => router.replace('/')}
                >
                    <Text className="text-red-600 font-medium">Keluar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
