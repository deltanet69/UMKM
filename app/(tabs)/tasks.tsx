import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { Task, TaskTip } from '../../utils/saw';

const { width, height } = Dimensions.get('window');

export default function TasksScreen() {
    const router = useRouter();
    const { sawResult } = useAppContext();
    const params = useLocalSearchParams();
    
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);
    
    const [selectedTip, setSelectedTip] = useState<TaskTip | null>(null);
    const [isTipModalVisible, setTipModalVisible] = useState(false);

    const topStrategy = sawResult?.recommendations[0];
    const taskList = topStrategy?.tasks || [];
    const additionalTaskList = topStrategy?.additionalTasks || [];

    const getProgressColor = (achieved: number, target: number) => {
        const percentage = (achieved / target) * 100;
        if (percentage <= 40) return '#EF4444'; // Red
        if (percentage <= 80) return '#F59E0B'; // Orange
        return '#22C55E'; // Green
    };

    const getProgressPercentage = (achieved: number, target: number) => {
        return Math.min((achieved / target) * 100, 100);
    };

    const handleNavigateToSaved = () => {
        console.log('Navigate to saved recommendations');
    };

    const handleCreateNewTask = () => {
        router.push('/create-task');
    };

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (width - 40));
        setCurrentRecommendationIndex(index);
    };

    const openTip = (tip?: TaskTip) => {
        if (tip) {
            setSelectedTip(tip);
            setTipModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.headerLeft} />
                    <Text style={styles.headerTitle}>Tugas UMKM</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={handleNavigateToSaved}>
                            <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {topStrategy ? (
                    <>
                        <View style={styles.alertSection}>
                            <Text style={styles.alertTitle}>Perlu diperhatikan!</Text>
                            <View style={styles.recommendationsScroll}>
                                <View style={styles.recommendationCard}>
                                    <View style={styles.recommendationHeader}>
                                        <Text style={styles.recommendationTitle}>{topStrategy.name}</Text>
                                        <Ionicons name="bookmark" size={20} color="#000000" />
                                    </View>
                                    <Text style={styles.recommendationSubtitle}>Strategi paling sesuai berdasarkan analisis kondisi usahamu.</Text>
                                    <Text style={styles.recommendationSuggestion}>Rekomendasi #1 dari Sistem Pendukung Keputusan</Text>
                                    <TouchableOpacity onPress={() => router.push('/strategy')}>
                                        <Text style={styles.detailLink}>Lihat Detail Action Plan</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.paginationDots}>
                                <View style={[styles.dot, styles.activeDot]} />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Task Utama</Text>
                            {taskList.map((task) => (
                                <View key={task.id} style={styles.taskCard}>
                                    <View style={styles.taskHeader}>
                                        <Text style={styles.taskName}>{task.name}</Text>
                                        <Text style={styles.taskProgress}>{task.achieved}/{task.target}</Text>
                                    </View>
                                    <View style={styles.progressBarContainer}>
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    width: `${getProgressPercentage(task.achieved, task.target)}%`,
                                                    backgroundColor: getProgressColor(task.achieved, task.target),
                                                },
                                            ]}
                                        />
                                    </View>
                                    {task.tip && (
                                        <TouchableOpacity onPress={() => openTip(task.tip)}>
                                            <Text style={styles.tipsLink}>Lihat tips</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>

                        {additionalTaskList.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Tugas Tambahan</Text>
                                {additionalTaskList.map((task) => (
                                    <View key={task.id} style={styles.taskCard}>
                                        <Text style={styles.taskName}>{task.name}</Text>
                                        {task.tip && (
                                            <TouchableOpacity onPress={() => openTip(task.tip)}>
                                                <Text style={styles.tipsLink}>Lihat tips evaluasi</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Silakan lakukan Analisis Usaha terlebih dahulu untuk melihat Tugas yang sesuai.</Text>
                        <TouchableOpacity style={styles.analyzeButton} onPress={() => router.push('/analysis')}>
                            <Text style={styles.analyzeButtonText}>Mulai Analisis</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={{ height: 100 }} />
            </ScrollView>

            <TouchableOpacity style={styles.floatingButton} onPress={handleCreateNewTask} activeOpacity={0.8}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Tip Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isTipModalVisible}
                onRequestClose={() => setTipModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setTipModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedTip?.title}</Text>
                            <TouchableOpacity onPress={() => setTipModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#1F2937" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalBody}>{selectedTip?.content}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setTipModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Mengerti</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#375EE9',
    },
    header: {
        backgroundColor: '#375EE9',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 36,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        width: 24,
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    headerRight: {
        width: 24,
        alignItems: 'flex-end',
    },
    alertSection: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    alertTitle: {
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#EF4444',
        marginBottom: 12,
        paddingLeft: 20,
    },
    recommendationsScroll: {
        paddingHorizontal: 20,
    },
    recommendationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        paddingHorizontal: 20,
        width: width - 40,
        borderWidth: 1,
        borderColor: '#E14B5A',
    },
    recommendationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    recommendationTitle: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    recommendationSubtitle: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#6B7280',
        marginBottom: 12,
        lineHeight: 20,
    },
    recommendationSuggestion: {
        fontSize: 13,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#6B7280',
        marginBottom: 12,
    },
    detailLink: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#4E74F9',
    },
    paginationDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
    },
    activeDot: {
        backgroundColor: '#4E74F9',
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    taskCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    taskName: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#1F2937',
        flex: 1,
    },
    taskProgress: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#6B7280',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    tipsLink: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#4E74F9',
        marginTop: 4,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4E74F9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 20,
    },
    analyzeButton: {
        backgroundColor: '#375EE9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    analyzeButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    modalBody: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#4B5563',
        lineHeight: 22,
        marginBottom: 24,
    },
    modalButton: {
        backgroundColor: '#375EE9',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 14,
    }
});
