import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { height } = Dimensions.get('window');

export default function RegisterOwnerInfo() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        whatsapp?: string;
        password?: string;
        confirmPassword?: string;
    }>({});
    const [touched, setTouched] = useState<{
        name?: boolean;
        email?: boolean;
        whatsapp?: boolean;
        password?: boolean;
        confirmPassword?: boolean;
    }>({});

    // Validate password requirements
    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 8) errors.push('minimal 8 karakter');
        if (!/[A-Z]/.test(password)) errors.push('harus ada huruf besar');
        if (!/[0-9]/.test(password)) errors.push('harus ada angka');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('harus ada karakter spesial');
        return errors;
    };

    // Validate email format
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate single field
    const validateField = (field: string, value: string) => {
        let error = '';

        switch (field) {
            case 'name':
                if (!value.trim()) error = 'Nama pemilik usaha wajib diisi';
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email wajib diisi';
                } else if (!validateEmail(value)) {
                    error = 'Format email tidak valid';
                }
                break;
            case 'whatsapp':
                if (!value.trim()) {
                    error = 'Nomor WhatsApp wajib diisi';
                } else if (value.length < 10) {
                    error = 'Nomor WhatsApp minimal 10 digit';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password wajib diisi';
                } else {
                    const passwordErrors = validatePassword(value);
                    if (passwordErrors.length > 0) {
                        error = `Password ${passwordErrors.join(', ')}`;
                    }
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    error = 'Konfirmasi password wajib diisi';
                } else if (value !== formData.password) {
                    error = 'Password tidak cocok';
                }
                break;
        }

        return error;
    };

    // Handle field blur
    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
        const error = validateField(field, formData[field as keyof typeof formData]);
        setErrors({ ...errors, [field]: error });
    };

    // Handle form change
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });

        // Clear error when user starts typing
        if (touched[field as keyof typeof touched]) {
            const error = validateField(field, value);
            setErrors({ ...errors, [field]: error });
        }
    };

    const handleNext = () => {
        // Mark all fields as touched
        const allTouched = {
            name: true,
            email: true,
            whatsapp: true,
            password: true,
            confirmPassword: true,
        };
        setTouched(allTouched);

        // Validate all fields
        const newErrors: typeof errors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            if (error) newErrors[key as keyof typeof errors] = error;
        });

        setErrors(newErrors);

        // If no errors, proceed to next step
        if (Object.keys(newErrors).length === 0) {
            router.push('/(auth)/register/business-info');
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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    {/* Header with back button */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Title */}
                        <Text style={styles.title}>Informasi Pemilik Usaha</Text>

                        {/* Form */}
                        <View style={styles.form}>
                            {/* Nama Pemilik Usaha */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nama Pemilik Usaha</Text>
                                <TextInput
                                    style={[styles.input, touched.name && errors.name && styles.inputError]}
                                    placeholder="Monica Zulkarnain"
                                    placeholderTextColor="#9CA3AF"
                                    value={formData.name}
                                    onChangeText={(text) => handleChange('name', text)}
                                    onBlur={() => handleBlur('name')}
                                />
                                {touched.name && errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}
                            </View>

                            {/* Email Aktif */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email Aktif</Text>
                                <TextInput
                                    style={[styles.input, touched.email && errors.email && styles.inputError]}
                                    placeholder="monic_97@gmail.com"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                    onBlur={() => handleBlur('email')}
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                            </View>

                            {/* No WhatsApp */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>No WhatsApp</Text>
                                <TextInput
                                    style={[styles.input, touched.whatsapp && errors.whatsapp && styles.inputError]}
                                    placeholder="082293710011"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    value={formData.whatsapp}
                                    onChangeText={(text) => handleChange('whatsapp', text)}
                                    onBlur={() => handleBlur('whatsapp')}
                                />
                                {touched.whatsapp && errors.whatsapp && (
                                    <Text style={styles.errorText}>{errors.whatsapp}</Text>
                                )}
                            </View>

                            {/* Password */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={[styles.passwordContainer, touched.password && errors.password && styles.inputError]}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        secureTextEntry={!passwordVisible}
                                        placeholder="******************"
                                        placeholderTextColor="#9CA3AF"
                                        value={formData.password}
                                        onChangeText={(text) => handleChange('password', text)}
                                        onBlur={() => handleBlur('password')}
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
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                            </View>

                            {/* Confirm Password */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <View style={[styles.passwordContainer, touched.confirmPassword && errors.confirmPassword && styles.inputError]}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        secureTextEntry={!confirmPasswordVisible}
                                        placeholder="******************"
                                        placeholderTextColor="#9CA3AF"
                                        value={formData.confirmPassword}
                                        onChangeText={(text) => handleChange('confirmPassword', text)}
                                        onBlur={() => handleBlur('confirmPassword')}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={confirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                                            size={22}
                                            color="#9CA3AF"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Next Button - Fixed at bottom */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleNext}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.nextButtonText}>Next</Text>
                            <View style={styles.arrowContainer}>
                                <Text style={styles.arrow}>›</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
    keyboardView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 32,
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#000000',
        marginBottom: 32,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: '#000000',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#000000',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 20,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#000000',
    },
    eyeIcon: {
        padding: 4,
    },
    inputError: {
        borderColor: '#EF4444',
        borderWidth: 2,
    },
    errorText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#EF4444',
        marginTop: 4,
    },
    buttonContainer: {
        paddingHorizontal: 32,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    nextButton: {
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
    nextButtonText: {
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
        bottom: height * 0.45,
        left: 20,
    },
    purpleCircle: {
        width: 200,
        height: 200,
        backgroundColor: '#DDD6FE',
        opacity: 0.5,
        bottom: -100,
        right: -100,
    },
});
