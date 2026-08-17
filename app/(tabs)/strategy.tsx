import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function StrategyScreen() {
    const router = useRouter();
    const { sawResult } = useAppContext();
    
    const topStrategy = sawResult?.recommendations[0];

    if (!topStrategy) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Detail Strategi</Text>
                    <View style={styles.headerRight} />
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Belum ada strategi. Silakan lakukan Analisis Usaha terlebih dahulu.</Text>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => router.push('/analysis')}
                    >
                        <Text style={styles.actionButtonText}>Mulai Analisis</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.headerLeft} />
                <Text style={styles.headerTitle}>Detail Strategi</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.strategyHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: topStrategy.mainColor + '20' }]}>
                        <Ionicons name={topStrategy.mainIcon as any} size={40} color={topStrategy.mainColor} />
                    </View>
                    <Text style={styles.strategyTitle}>{topStrategy.name}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{topStrategy.compatibility}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Kenapa strategi ini cocok?</Text>
                    <Text style={styles.description}>
                        {topStrategy.description}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fokus Strategi</Text>
                    <View style={styles.flowContainer}>
                        {topStrategy.flow.map((step, index) => (
                            <React.Fragment key={index}>
                                <View style={styles.flowItem}>
                                    <View style={[styles.flowIcon, { backgroundColor: topStrategy.mainColor }]}>
                                        <Ionicons name={step.icon as any} size={24} color="#FFFFFF" />
                                    </View>
                                    <Text style={styles.flowText}>{step.text}</Text>
                                </View>
                                {index < topStrategy.flow.length - 1 && (
                                    <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: topStrategy.mainColor }]}
                    onPress={() => router.push('/tasks')}
                >
                    <Text style={styles.actionButtonText}>Lihat Action Plan (Tugas)</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

import React from 'react';
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#375EE9',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        width: 24,
    },
    backButton: {
        width: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    headerRight: {
        width: 24,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    strategyHeader: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    strategyTitle: {
        fontSize: 24,
        fontFamily: 'Poppins',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    badge: {
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#10B981',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
        backgroundColor: '#F9FAFB',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color: '#4B5563',
        lineHeight: 24,
    },
    flowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    flowItem: {
        alignItems: 'center',
        flex: 1,
    },
    flowIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    flowText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#4B5563',
        textAlign: 'center',
    },
    actionButton: {
        backgroundColor: '#375EE9',
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    actionButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: 8,
    }
});
