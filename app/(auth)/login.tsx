import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

// Hardcoded credentials for development
const HARDCODED_EMAIL = 'admin@growumkm.com';
const HARDCODED_PASSWORD = 'admin123';

export default function Login() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Reset error
        setError('');

        // Validate inputs
        if (!email || !password) {
            setError('Email dan password harus diisi');
            return;
        }

        // Check credentials
        if (email.toLowerCase() === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
            // Success - navigate to tabs
            router.replace('/(tabs)');
        } else {
            setError('Email atau password salah');
        }
    };

    return (
        <View style={styles.container}>
            {/* Decorative circles */}
            <View style={[styles.circle, styles.redCircle]} />
            <View style={[styles.circle, styles.yellowTopCircle]} />
            <View style={[styles.circle, styles.purpleCircle]} />
            <View style={[styles.circle, styles.yellowBottomCircle]} />
            <View style={[styles.circle, styles.blueCircle]} />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/images/umkm/logo.png')}
                            style={styles.logo}
                            contentFit="contain"
                        />
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        {/* Title */}
                        <Text style={styles.title}>LOGIN</Text>
                        <Text style={styles.subtitle}>Masukkan alamat email terdaftar</Text>

                        {/* Email Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email/WhatsApp"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />

                        {/* Password Input */}
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!passwordVisible}
                                placeholder="Password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                                    size={22}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Error Message */}
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Ionicons name="warning-outline" size={18} color="#EF4444" />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginButtonText}>LOGIN</Text>
                        </TouchableOpacity>


                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Register link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerLabel}>Belum punya akun? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text style={styles.registerLink}>Daftar Sekarang</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 260,
        height: 70,
        marginTop: 30,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -40,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        marginBottom: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
    },
    eyeIcon: {
        padding: 4,
    },
    loginButton: {
        backgroundColor: '#4E74F9',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    forgotPassword: {
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#EF4444',
        marginTop: 14,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEE2E2',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        gap: 8,
    },
    errorText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: '#EF4444',
        flex: 1,
    },
    hintContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    hintText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#9CA3AF',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    registerLabel: {
        fontSize: 16,
        color: '#374151',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
    },
    registerLink: {
        fontSize: 16,
        color: '#4E74F9',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#4E74F9',
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
    yellowTopCircle: {
        width: 256,
        height: 256,
        backgroundColor: '#FEF3C7',
        opacity: 0.5,
        top: 80,
        right: -128,
    },
    purpleCircle: {
        width: 256,
        height: 256,
        backgroundColor: '#DDD6FE',
        opacity: 0.5,
        bottom: -80,
        left: -128,
    },
    yellowBottomCircle: {
        width: 128,
        height: 128,
        backgroundColor: '#FDE047',
        opacity: 0.7,
        bottom: 128,
        right: -80,
    },
    blueCircle: {
        width: 64,
        height: 64,
        backgroundColor: '#93C5FD',
        opacity: 0.6,
        bottom: height * 0.35,
        left: 48,
    },
});
