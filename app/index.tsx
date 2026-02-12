import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Decorative circles */}
            <View style={[styles.circle, styles.redCircle]} />
            <View style={[styles.circle, styles.yellowTopCircle]} />
            <View style={[styles.circle, styles.purpleCircle]} />
            <View style={[styles.circle, styles.yellowBottomCircle]} />
            <View style={[styles.circle, styles.blueCircle]} />

            <SafeAreaView style={styles.safeArea}>
                {/* Main content container */}
                <View style={styles.content}>
                    {/* Logo section - centered */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/images/umkm/logoo.png')}
                            style={styles.logo}
                            contentFit="contain"
                        />
                        {/* <Text style={styles.tagline}>
                            A thinking partner for your everyday business.
                        </Text> */}
                    </View>

                    {/* Bottom section */}
                    <View style={styles.bottomSection}>
                        {/* Mari Mulai Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push('/(auth)/register')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Mari Mulai</Text>
                            <View style={styles.arrowContainer}>
                                <Text style={styles.arrow}>›</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Login link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginLabel}>Sudah punya akun? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 90,
    },
    tagline: {
        marginTop: 12,
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
    },
    bottomSection: {
        gap: 20,
    },
    button: {
        backgroundColor: '#4E74F9',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        flex: 1,
        textAlign: 'center',
    },
    arrowContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLabel: {
        fontSize: 16,
        color: '#374151',
        fontFamily: 'Poppins_400Regular',
    },
    loginLink: {
        fontSize: 16,
        color: '#4E74F9',
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
