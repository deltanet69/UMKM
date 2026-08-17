import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const userProfile = {
    name: 'Monica Zulkarnain',
    businessName: 'Why Donuts',
    category: 'Kuliner',
    productType: 'Donat/Bakery',
    salesModel: 'Online & Offline',
    marketingArea: 'Lokal',
    delivery: 'Tersedia',
    location: 'Kuningan, Jakarta Selatan',
    profileImage: require('../../assets/images/umkm/toko.jpg'),
};

const businessStats = {
    stock: 27,
    sold: 10,
    performance: '43%',
    levelProgress: 0.75, // 75%
};

const connectedPlatforms = [
    { id: 'fb', name: 'Facebook', icon: 'logo-facebook', color: '#000000', connected: true },
    { id: 'ig', name: 'Instagram', icon: 'logo-instagram', color: '#000000', connected: true },
    { id: 'tt', name: 'Tiktok', icon: 'logo-tiktok', color: '#000000', connected: true },
    { id: 'wa', name: 'WhatsApp', icon: 'logo-whatsapp', color: '#000000', connected: true },
];

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const router = useRouter();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event: any) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setShowStickyHeader(offsetY > 50); // Show sticky header after 50px scroll
            },
        }
    );

    return (
        <View style={styles.container}>
            {/* Sticky Header */}
            {showStickyHeader && (
                <SafeAreaView edges={['top']} style={styles.stickyHeader}>
                    <View style={styles.stickyHeaderContent}>
                        <View>
                            <Text style={styles.stickyGreetingText}>Selamat Pagi ☀️</Text>
                            <Text style={styles.stickyUserNameText}>{userProfile.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.push('/settings')}>
                            <Ionicons name="options-outline" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )}

            <Animated.ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >

                {/* 1. Header Section (Default) */}
                <View style={[styles.headerBackground, { opacity: showStickyHeader ? 0 : 1 }]}>
                    <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
                        <View style={styles.headerContent}>
                            <View>
                                <Text style={styles.greetingText}>Selamat Pagi ☀️</Text>
                                <Text style={styles.userNameText}>{userProfile.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => router.push('/settings')}>
                                <Ionicons name="options-outline" size={36} color="#FFFFFF" style={styles.settingsIcon} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* 2. Profile Card (Overlapping Image) */}
                <View style={styles.profileCardContainer}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImageWrapper}>
                            <Image
                                source={userProfile.profileImage}
                                style={styles.profileImage}
                                contentFit="cover"
                            />
                        </View>
                    </View>

                    <Text style={styles.businessName}>{userProfile.businessName}</Text>

                    <View style={styles.tagsContainer}>
                        <View style={styles.tagWrapper}>
                            <Text style={styles.tagText}>{userProfile.category}</Text>
                        </View>
                        <View style={styles.locationWrapper}>
                            <Ionicons name="location-sharp" size={14} color="#FFFFFF" />
                            <Text style={styles.locationText}>{userProfile.location}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.updateButton}>
                        <Ionicons name="document-text-outline" size={16} color="#FFFFFF" />
                        <Text style={styles.updateButtonText}>Update Detail Usaha</Text>
                    </TouchableOpacity>
                </View>

                {/* 3. Business Stats Card (Matching Home Style) */}
                <View style={styles.statsCardWrapper}>
                    <View style={styles.statsCard}>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{businessStats.stock}</Text>
                                <Text style={styles.statLabel}>Stok tersedia</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{businessStats.sold}</Text>
                                <Text style={styles.statLabel}>Produk Terjual</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{businessStats.performance}</Text>
                                <Text style={styles.statLabel}>Performa</Text>
                            </View>
                        </View>

                        <View style={styles.progressContainer}>
                            <View style={styles.progressBarBackground}>
                                <View style={[styles.progressBarFill, { width: `${businessStats.levelProgress * 100}%` }]} />
                                <Text style={styles.progressText}>25% menuju level pejuang</Text>
                                <Text style={styles.progressPercentageText}>75%</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Business Details (Culinary) */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Informasi Usaha</Text>
                    <View style={styles.detailsCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Kategori</Text>
                            <Text style={styles.detailValue}>{userProfile.category}</Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Jenis Produk</Text>
                            <Text style={styles.detailValue}>{userProfile.productType}</Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Model Penjualan</Text>
                            <Text style={styles.detailValue}>{userProfile.salesModel}</Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Area Pemasaran</Text>
                            <Text style={styles.detailValue}>{userProfile.marketingArea}</Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Delivery</Text>
                            <Text style={styles.detailValue}>{userProfile.delivery}</Text>
                        </View>
                    </View>
                </View>

                {/* 4. Connected Platforms */}
                <View style={styles.platformsSection}>
                    <Text style={styles.sectionTitle}>Platform Terhubung</Text>
                    <View style={styles.platformList}>
                        {connectedPlatforms.map((platform) => (
                            <View key={platform.id} style={styles.platformItem}>
                                <View style={styles.platformLeft}>
                                    <Ionicons name={platform.icon as any} size={24} color={platform.color} />
                                    <Text style={styles.platformName}>{platform.name}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons name="link-outline" size={20} color="#4E74F9" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.addAccountButton}>
                        <Text style={styles.addAccountText}>+ Tambah Akun</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollView: {
        flex: 1,
    },
    // Header
    headerBackground: {
        backgroundColor: '#375EE9',
        paddingBottom: 10,
        paddingTop: 20,
    },
    safeAreaHeader: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 10,
    },
    greetingText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#FFFFFF',
        opacity: 0.6,
    },
    userNameText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
    },
    settingsIcon: {
        marginTop: 4,
    },

    // Sticky Header Styles
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#375EE9',
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingBottom: 10, // Maintain padding
    },
    stickyHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    stickyGreetingText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#FFFFFF',
        opacity: 0.8,
    },
    stickyUserNameText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
    },

    // Profile Card (Updated Layout)
    profileCardContainer: {
        backgroundColor: '#375EE9',
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 80, // Space for overlapping image
        paddingTop: 70, // Push content down
        paddingBottom: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
        shadowColor: '#375EE9',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        position: 'relative', // Context for absolute image
    },
    profileImageContainer: {
        position: 'absolute',
        top: -60, // Overlap upwards
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    profileImageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    profileImage: {
        width: '97%',
        height: '97%',
        borderRadius: 60,
    },
    businessName: {
        fontSize: 22,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    tagWrapper: {
        backgroundColor: '#FCD34D',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#1F2937',
    },
    locationWrapper: {
        backgroundColor: 'rgba(25, 179, 226, 0.98)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#FFFFFF',
    },
    updateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    updateButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },

    // Stats Card (Home Style)
    statsCardWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    statsCard: {
        backgroundColor: '#375EE9', // Dark Blue like Header/Home
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 28,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#BFDBFE',
    },
    progressContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 28,
        borderRadius: 14,
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
    },
    progressBarBackground: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    progressBarFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#33E65A', // Green
        borderRadius: 12,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: '#1F2937',
        zIndex: 2,
        flex: 1,
    },
    progressPercentageText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        fontWeight: '600',
        zIndex: 2,
    },

    // Platforms Section
    platformsSection: {
        marginHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    platformList: {
        gap: 12,
        marginBottom: 16,
    },
    platformItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    platformLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    platformName: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#1F2937',
    },
    addAccountButton: {
        borderWidth: 1,
        borderColor: '#4E74F9',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    addAccountText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#4E74F9',
    },
    
    // Details Section
    detailsSection: {
        marginHorizontal: 20,
        marginTop: 24,
    },
    detailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    detailLabel: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#1F2937',
    },
    detailDivider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
});
