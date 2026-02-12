import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { height } = Dimensions.get('window');

const categories = [
    { id: 'fashion', name: 'Fashion', icon: 'shirt-outline' as const },
    { id: 'kuliner', name: 'Kuliner', icon: 'restaurant-outline' as const },
    { id: 'craft', name: 'Craft', icon: 'hammer-outline' as const },
    { id: 'jasa', name: 'Jasa', icon: 'hand-left-outline' as const },
    { id: 'lainnya', name: 'Lainnya', icon: 'apps-outline' as const },
];

export default function RegisterCategorySelection() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleNext = () => {
        if (selectedCategory) {
            router.push('/(auth)/register/owner-info');
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
                {/* Header with back button */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.title}>Pilih Kategori Usaha</Text>

                    {/* Categories Grid */}
                    <View style={styles.categoriesContainer}>
                        <View style={styles.row}>
                            {/* Fashion */}
                            <TouchableOpacity
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === 'fashion' && styles.categoryCardSelected,
                                    { opacity: selectedCategory && selectedCategory !== 'fashion' ? 0.5 : 1 }
                                ]}
                                onPress={() => setSelectedCategory('fashion')}
                            >
                                <Ionicons name="shirt-outline" size={40} color="#6B7280" />
                                <Text style={styles.categoryText}>Fashion</Text>
                            </TouchableOpacity>

                            {/* Kuliner */}
                            <TouchableOpacity
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === 'kuliner' && styles.categoryCardSelected,
                                    { opacity: selectedCategory && selectedCategory !== 'kuliner' ? 0.5 : 1 }
                                ]}
                                onPress={() => setSelectedCategory('kuliner')}
                            >
                                <Ionicons name="restaurant-outline" size={40} color="#6B7280" />
                                <Text style={styles.categoryText}>Kuliner</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            {/* Craft */}
                            <TouchableOpacity
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === 'craft' && styles.categoryCardSelected,
                                    { opacity: selectedCategory && selectedCategory !== 'craft' ? 0.5 : 1 }
                                ]}
                                onPress={() => setSelectedCategory('craft')}
                            >
                                <Ionicons name="hammer-outline" size={40} color="#6B7280" />
                                <Text style={styles.categoryText}>Craft</Text>
                            </TouchableOpacity>

                            {/* Jasa */}
                            <TouchableOpacity
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === 'jasa' && styles.categoryCardSelected,
                                    { opacity: selectedCategory && selectedCategory !== 'jasa' ? 0.5 : 1 }
                                ]}
                                onPress={() => setSelectedCategory('jasa')}
                            >
                                <Ionicons name="hand-left-outline" size={40} color="#6B7280" />
                                <Text style={styles.categoryText}>Jasa</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            {/* Lainnya - full width */}
                            <TouchableOpacity
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === 'lainnya' && styles.categoryCardSelected,
                                    { opacity: selectedCategory && selectedCategory !== 'lainnya' ? 0.5 : 1 }
                                ]}
                                onPress={() => setSelectedCategory('lainnya')}
                            >
                                <Ionicons name="apps-outline" size={40} color="#6B7280" />
                                <Text style={styles.categoryText}>Lainnya</Text>
                            </TouchableOpacity>

                            {/* Empty space for grid balance */}
                            <View style={styles.categoryCard} />
                        </View>
                    </View>

                    {/* Spacer */}
                    <View style={styles.spacer} />

                    {/* Next Button */}
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            !selectedCategory && styles.nextButtonDisabled
                        ]}
                        onPress={handleNext}
                        disabled={!selectedCategory}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrow}>›</Text>
                        </View>
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
    header: {
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#000000',
        marginBottom: 32,
    },
    categoriesContainer: {
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    categoryCard: {
        flex: 1,
        aspectRatio: 1.5,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    categoryCardSelected: {
        borderColor: '#4E74F9',
        borderWidth: 2,
    },
    categoryText: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: '#6B7280',
    },
    spacer: {
        flex: 1,
    },
    nextButton: {
        backgroundColor: '#4E74F9',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    nextButtonDisabled: {
        backgroundColor: '#D1D5DB',
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
        bottom: height * 0.4,
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
