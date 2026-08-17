import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const focusOptions = [
    'Sales Produk',
    'Leads',
    'Content Engagement',
    'Content Share',
    'Instagram Followers',
    'Facebook Followers',
    'Store Visit',
    'Website Visit'
];

const durationOptions = ['Harian', 'Mingguan', 'Bulanan'];

export default function CreateTaskScreen() {
    const router = useRouter();
    const [focus, setFocus] = useState('');
    const [showFocusPicker, setShowFocusPicker] = useState(false);
    const [duration, setDuration] = useState('');
    const [target, setTarget] = useState('');

    // Static AI Suggestion
    const aiSuggestion = {
        title: "Strategi yang Disarankan AI",
        description: "Untuk mencapai target ini, fokus pada konten visual yang menarik dan lakukan interaksi aktif di jam prime time (18.00 - 20.00). Gunakan hashtag relevan dan ajak audiens untuk share kontenmu.",
        action: "Buat 3 konten Reels + 5 Story per minggu"
    };

    const handleCreateTask = () => {
        console.log('Current State:', { focus, duration, target }); // Debugging

        if (!focus) {
            if (Platform.OS === 'web') {
                window.alert('Eits! Kamu harus menentukan fokus tugasmu terlebih dahulu, ya!');
            } else {
                Alert.alert('Eits!', 'Kamu harus menentukan fokus tugasmu terlebih dahulu, ya!');
            }
            return;
        }

        if (!duration) {
            if (Platform.OS === 'web') {
                window.alert('Eits! Durasi tugas sangat penting untuk perkembangan usahamu, pilih ya!');
            } else {
                Alert.alert('Eits!', 'Durasi tugas sangat penting untuk perkembangan usahamu, pilih ya!');
            }
            return;
        }

        if (!target) {
            if (Platform.OS === 'web') {
                window.alert('Eits! Target angkanya jangan lupa diisi ya!');
            } else {
                Alert.alert('Eits!', 'Target angkanya jangan lupa diisi ya!');
            }
            return;
        }

        // Create new task object
        const newTask = {
            id: `task_${Date.now()}`,
            name: `${target} ${focus}`,
            achieved: 0,
            target: parseInt(target),
            duration: duration
        };

        // Navigate back to tasks page with new task param
        console.log('New Task Created:', newTask);

        // Pass the new task back to the previous screen using params
        router.dismiss();
        router.push({
            pathname: '/(tabs)/tasks',
            params: {
                newTask: JSON.stringify(newTask)
            }
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Buat Tugas Baru</Text>
                    <View style={{ width: 24 }} />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 1. Fokus Tugas (Dropdown) */}
                <View style={[styles.inputGroup, { zIndex: 2000 }]}>
                    <Text style={styles.label}>Fokus Tugas</Text>
                    <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => setShowFocusPicker(!showFocusPicker)}
                    >
                        <Text style={[styles.dropdownButtonText, !focus && { color: '#9CA3AF' }]}>
                            {focus || 'Pilih Fokus Tugas'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    {showFocusPicker && (
                        <View style={styles.dropdownList}>
                            {focusOptions.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setFocus(option);
                                        setShowFocusPicker(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.dropdownItemText,
                                        focus === option && styles.activeDropdownItemText
                                    ]}>
                                        {option}
                                    </Text>
                                    {focus === option && (
                                        <Ionicons name="checkmark" size={18} color="#4E74F9" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* 2. Durasi Tugas (Selection) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Durasi Tugas</Text>
                    <View style={styles.durationContainer}>
                        {durationOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.durationButton,
                                    duration === option && styles.activeDurationButton
                                ]}
                                onPress={() => setDuration(option)}
                            >
                                <Text style={[
                                    styles.durationText,
                                    duration === option && styles.activeDurationText
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 3. Target Tugas (Input) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Target Tugas (Dalam Angka)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: 1000"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        value={target}
                        onChangeText={setTarget}
                    />
                </View>

                {/* REKOMENDASI STRATEGI (AI AGENT) */}
                <View style={styles.aiCard}>
                    <View style={styles.aiHeader}>
                        <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                        <Text style={styles.aiTitle}>{aiSuggestion.title}</Text>
                    </View>
                    <View style={styles.aiContent}>
                        <Text style={styles.aiDescription}>{aiSuggestion.description}</Text>
                        <View style={styles.aiActionContainer}>
                            <Text style={styles.aiActionLabel}>Saran Aksi:</Text>
                            <Text style={styles.aiActionText}>{aiSuggestion.action}</Text>
                        </View>
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleCreateTask}>
                    <Text style={styles.submitButtonText}>Simpan Tugas</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        backgroundColor: '#375EE9',
    },
    header: {
        backgroundColor: '#375EE9',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 36, // Matching tasks.tsx header height
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 8,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    dropdownButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#1F2937',
    },
    dropdownList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 4,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        zIndex: 2000,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    dropdownItemText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#4B5563',
    },
    activeDropdownItemText: {
        color: '#4E74F9',
        fontWeight: '600',
    },
    durationContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    durationButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    activeDurationButton: {
        backgroundColor: '#EFF6FF',
        borderColor: '#4E74F9',
    },
    durationText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#6B7280',
    },
    activeDurationText: {
        color: '#4E74F9',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#1F2937',
    },
    // AI Strategy Card
    aiCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#818CF8',
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#4E74F9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    aiHeader: {
        backgroundColor: '#4E74F9',
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    aiTitle: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
    },
    aiContent: {
        padding: 16,
    },
    aiDescription: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#4B5563',
        lineHeight: 22,
        marginBottom: 12,
    },
    aiActionContainer: {
        backgroundColor: '#EFF6FF',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4E74F9',
    },
    aiActionLabel: {
        fontSize: 12,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#4E74F9',
        marginBottom: 2,
    },
    aiActionText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#1F2937',
    },
    submitButton: {
        backgroundColor: '#4E74F9',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#4E74F9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
