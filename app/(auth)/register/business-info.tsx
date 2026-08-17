import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function RegisterBusinessInfo() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        businessName: '',
        location: '',
    });
    const [businessAge, setBusinessAge] = useState('1-3 Tahun');
    const [platforms, setPlatforms] = useState<string[]>(['Instagram']);
    const [goals, setGoals] = useState<string[]>(['Followers']); // Changed to array for multiple choice
    const [errors, setErrors] = useState<{
        businessName?: string;
        location?: string;
        platforms?: string;
        goals?: string;
    }>({});
    const [touched, setTouched] = useState<{
        businessName?: boolean;
        location?: boolean;
    }>({});

    const togglePlatform = (platform: string) => {
        if (platforms.includes(platform)) {
            setPlatforms(platforms.filter(item => item !== platform));
        } else {
            setPlatforms([...platforms, platform]);
        }
        // Clear error when user selects
        if (errors.platforms) {
            setErrors({ ...errors, platforms: undefined });
        }
    };

    const toggleGoal = (goal: string) => {
        if (goals.includes(goal)) {
            setGoals(goals.filter(item => item !== goal));
        } else {
            setGoals([...goals, goal]);
        }
        // Clear error when user selects
        if (errors.goals) {
            setErrors({ ...errors, goals: undefined });
        }
    };

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
        validateField(field);
    };

    const validateField = (field: string) => {
        let error = '';

        switch (field) {
            case 'businessName':
                if (!formData.businessName.trim()) {
                    error = 'Nama usaha wajib diisi';
                }
                break;
            case 'location':
                if (!formData.location.trim()) {
                    error = 'Domisili wajib diisi';
                }
                break;
        }

        setErrors({ ...errors, [field]: error });
        return error;
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });

        // Clear error when user starts typing
        if (touched[field as keyof typeof touched]) {
            validateField(field);
        }
    };

    const handleNext = () => {
        // Mark all fields as touched
        setTouched({
            businessName: true,
            location: true,
        });

        // Validate all fields
        const newErrors: typeof errors = {};

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Nama usaha wajib diisi';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'Domisili wajib diisi';
        }
        if (platforms.length === 0) {
            newErrors.platforms = 'Pilih minimal 1 platform';
        }
        if (goals.length === 0) {
            newErrors.goals = 'Pilih minimal 1 tujuan';
        }

        setErrors(newErrors);

        // If no errors, proceed to next step
        if (Object.keys(newErrors).length === 0) {
            router.push('/(auth)/register/otp');
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
                        <Text style={styles.title}>Detail Informasi Usaha</Text>

                        {/* Form */}
                        <View style={styles.form}>
                            {/* Nama Usaha */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nama usaha anda :</Text>
                                <TextInput
                                    style={[styles.input, touched.businessName && errors.businessName && styles.inputError]}
                                    placeholder="Why Donut's"
                                    placeholderTextColor="#9CA3AF"
                                    value={formData.businessName}
                                    onChangeText={(text) => handleChange('businessName', text)}
                                    onBlur={() => handleBlur('businessName')}
                                />
                                {touched.businessName && errors.businessName && (
                                    <Text style={styles.errorText}>{errors.businessName}</Text>
                                )}
                            </View>

                            {/* Domisili */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Domisili :</Text>
                                <TextInput
                                    style={[styles.input, touched.location && errors.location && styles.inputError]}
                                    placeholder="Kuningan, Jakarta Selatan"
                                    placeholderTextColor="#9CA3AF"
                                    value={formData.location}
                                    onChangeText={(text) => handleChange('location', text)}
                                    onBlur={() => handleBlur('location')}
                                />
                                {touched.location && errors.location && (
                                    <Text style={styles.errorText}>{errors.location}</Text>
                                )}
                            </View>

                            {/* Lama Usaha */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Lama usaha anda :</Text>
                                <View style={styles.buttonRow}>
                                    {['0-1 Tahun', '1-3 Tahun', '>3 Tahun'].map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            onPress={() => setBusinessAge(item)}
                                            style={[
                                                styles.optionButton,
                                                businessAge === item && styles.optionButtonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                businessAge === item && styles.optionTextSelected
                                            ]}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Platform yang Dipakai - Multiple Choice */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Platform yang sudah dipakai :</Text>
                                <View style={styles.buttonWrap}>
                                    {['Instagram', 'WhatsApp', 'Marketplace', 'Facebook', 'Tiktok'].map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            onPress={() => togglePlatform(item)}
                                            style={[
                                                styles.optionButton,
                                                platforms.includes(item) && styles.optionButtonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                platforms.includes(item) && styles.optionTextSelected
                                            ]}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Tujuan Utama - Multiple Choice */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Tujuan utama usaha :</Text>
                                <View style={styles.buttonWrap}>
                                    {['Penjualan', 'Followers', 'Branding', 'Lainnya'].map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            onPress={() => toggleGoal(item)}
                                            style={[
                                                styles.optionButton,
                                                goals.includes(item) && styles.optionButtonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                goals.includes(item) && styles.optionTextSelected
                                            ]}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {errors.goals && (
                                    <Text style={styles.errorText}>{errors.goals}</Text>
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#000000',
        marginBottom: 32,
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 12,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#000000',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    buttonWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    optionButton: {
        backgroundColor: '#F9FAFB',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
        minWidth: 100,
        alignItems: 'center',
    },
    optionButtonSelected: {
        borderColor: '#4E74F9',
        backgroundColor: '#FFFFFF',
    },
    optionText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#9CA3AF',
    },
    optionTextSelected: {
        color: '#4E74F9',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
    },
    inputError: {
        borderColor: '#EF4444',
        borderWidth: 2,
    },
    errorText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    arrowContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',

    },
    arrow: {
        color: '#FFFFFF',
        fontSize: 28,
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
