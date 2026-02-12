import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

export default function RegisterStep4() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
        if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <View className="flex-row items-center mt-4 mb-6">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Ionicons name="arrow-back" size={24} color="#303030" />
                </TouchableOpacity>
            </View>

            <Text className="text-xl font-poppins-bold mb-2 text-text">Konfirmasi Pendaftaran</Text>
            <Text className="text-textSec font-poppins mb-8">Kode OTP sudah dikirimkan ke email terdaftar</Text>

            <View className="flex-row justify-between mb-4">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => { inputs.current[index] = ref }}
                        className={`w-12 h-14 border rounded-xl text-center text-xl font-poppins-bold ${digit ? 'border-primary bg-blue-50 text-primary' : 'border-gray-300 bg-white'}`}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                    />
                ))}
            </View>

            <TouchableOpacity>
                <Text className="text-primary font-poppins-medium mb-8">Kirim ulang OTP <Text className="text-blue-400">00:47</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-primary w-full p-4 rounded-xl items-center mt-4"
                onPress={() => router.replace('/(tabs)')}
            >
                <Text className="text-white font-poppins-semibold text-lg">Konfirmasi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
