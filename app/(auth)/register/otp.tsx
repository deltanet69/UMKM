import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

const { height } = Dimensions.get('window');

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
        <View style={styles.container}>
            {/* Decorative circles */}
            <View style={[styles.circle, styles.redCircle]} />
            <View style={[styles.circle, styles.yellowCircle]} />
            <View style={[styles.circle, styles.blueCircle]} />
            <View style={[styles.circle, styles.purpleCircle]} />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>

                    {/* Title and Description */}
                    <Text style={styles.title}>Konfirmasi Pendaftaran</Text>
                    <Text style={styles.description}>Kode OTP sudah dikirimkan ke email terdaftar</Text>

                    {/* OTP Input Boxes */}
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => { inputs.current[index] = ref }}
                                style={styles.otpInput}
                                maxLength={1}
                                keyboardType="number-pad"
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                            />
                        ))}
                    </View>

                    {/* Resend OTP Timer */}
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>Kirim ulang OTP  </Text>
                        <Text style={styles.timerValue}>00:47</Text>
                    </View>
                </View>

                {/* Confirmation Button - Fixed at Bottom */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => router.replace('/(tabs)')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.confirmButtonText}>Konfirmasi</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginTop: 8,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#000000',
        marginTop: 24,
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#6B7280',
        marginBottom: 32,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 2,
        borderColor: '#5D7CE5',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        backgroundColor: '#FFFFFF',
        color: '#000000',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#000000',
    },
    timerValue: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#5D7CE5',
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    confirmButton: {
        backgroundColor: '#4E74F9',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
    },
    // Decorative circles
    circle: {
        position: 'absolute',
        borderRadius: 9999,
    },
    redCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#FCA5A5',
        opacity: 0.6,
        top: -80,
        left: -80,
    },
    yellowCircle: {
        width: 128,
        height: 128,
        backgroundColor: '#FDE047',
        opacity: 0.7,
        bottom: 200,
        right: -80,
    },
    blueCircle: {
        width: 80,
        height: 80,
        backgroundColor: '#93C5FD',
        opacity: 0.6,
        bottom: height * 0.4,
        left: 20,
    },
    purpleCircle: {
        width: 200,
        height: 200,
        backgroundColor: '#DDD6FE',
        opacity: 0.5,
        bottom: -100,
        left: -100,
    },
});
