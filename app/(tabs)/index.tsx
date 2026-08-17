import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';

const { width, height } = Dimensions.get('window');

// Types for backend integration
interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  suggestion: string;
  isPinned: boolean;
}

interface Event {
  id: string;
  name: string;
  location: string;
  cost: string;
  compatibility: string;
  imageUrl: string;
}

interface PerformanceData {
  id: string;
  period: string;
  stockAvailable: number;
  productsSold: number;
  performance: number;
  progressPercentage: number;
  progressLabel: string;
}

interface PerformanceUpdate {
  period: string;
  category: 'postingan' | 'chat' | 'penjualan';
  instagram: string;
  facebook: string;
  tiktok: string;
}

// Mock data - to be replaced with API calls
const user = {
  id: 'user_001',
  storeName: 'Why Donuts',
  businessType: 'Kuliner',
  greeting: 'Good Morning',
};

const performanceData: PerformanceData = {
  id: 'perf_001',
  period: 'Minggu ini',
  stockAvailable: 27,
  productsSold: 10,
  performance: 43,
  progressPercentage: 85,
  progressLabel: '15% menuju peluang',
};

const recommendations: Recommendation[] = [
  {
    id: 'ig_organic',
    title: 'Instagram Organic',
    subtitle: 'Strategi paling sesuai berdasarkan analisis kondisi usahamu.',
    suggestion: 'Rekomendasi #1 dari Sistem Pendukung Keputusan',
    isPinned: true,
  },
];

const events: Event[] = [
  {
    id: 'event_001',
    name: 'Indonesian Food Center',
    location: 'Kuningan, Jakarta Selatan',
    cost: '1,5 - 3 jt',
    compatibility: 'Sangat Sesuai',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  },
  {
    id: 'event_002',
    name: 'Lokal Brand Festival',
    location: 'Kuningan, Jakarta Selatan',
    cost: '1,5 - 3 jt',
    compatibility: 'Sangat Sesuai',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  },
];

const periodOptions = ['Hari Ini', 'Minggu Ini', 'Bulan Ini'];

export default function HomeScreen() {
  const router = useRouter();
  const { performanceMetrics, setPerformanceMetrics, sawResult } = useAppContext();
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [periodPickerVisible, setPeriodPickerVisible] = useState(false);
  const [performancePeriodPickerVisible, setPerformancePeriodPickerVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Minggu Ini');
  const [performancePeriod, setPerformancePeriod] = useState('Minggu ini');
  const [selectedCategory, setSelectedCategory] = useState<'postingan' | 'chat' | 'penjualan'>('postingan');
  const topStrategy = sawResult?.recommendations[0];
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>(
    topStrategy ? [topStrategy.id] : []
  );
  
  // Calculate stats from performanceMetrics
  const productsSold = performanceMetrics.penjualan.instagram + performanceMetrics.penjualan.facebook + performanceMetrics.penjualan.tiktok;
  const totalPosts = performanceMetrics.postingan.instagram + performanceMetrics.postingan.facebook + performanceMetrics.postingan.tiktok;
  const totalChats = performanceMetrics.chat.instagram + performanceMetrics.chat.facebook + performanceMetrics.chat.tiktok;
  
  const displayStats = {
    stockAvailable: 100 - productsSold, // Dummy logic
    productsSold: productsSold,
    performance: Math.min(100, Math.round((totalPosts + totalChats + productsSold) * 1.5)) || 0,
    progressPercentage: Math.min(100, Math.round((productsSold / 100) * 100)) || 0,
    progressLabel: productsSold < 50 ? 'Masih butuh promosi' : 'Penjualan sudah membaik',
  };

  const [formData, setFormData] = useState({
    instagram: '',
    facebook: '',
    tiktok: '',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat malam';
  };

  const getUnitLabel = () => {
    switch (selectedCategory) {
      case 'postingan':
        return 'post';
      case 'chat':
        return 'chat';
      case 'penjualan':
        return 'sales';
      default:
        return 'post';
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowStickyHeader(offsetY > 50);
      },
    }
  );

  const handleSavePerformance = () => {
    setPerformanceMetrics(prev => ({
      ...prev,
      [selectedCategory]: {
        instagram: Number(formData.instagram) || 0,
        facebook: Number(formData.facebook) || 0,
        tiktok: Number(formData.tiktok) || 0,
      }
    }));
    
    // Reset form
    setFormData({ instagram: '', facebook: '', tiktok: '' });
    setModalVisible(false);
  };

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setPeriodPickerVisible(false);
  };

  const handlePerformancePeriodSelect = (period: string) => {
    setPerformancePeriod(period);
    setPerformancePeriodPickerVisible(false);
    // TODO: Fetch data for selected period from backend
    console.log('Performance period changed to:', period);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
    // TODO: Save bookmark state to backend
    console.log('Bookmark toggled for:', id);
  };

  const navigateToTasks = () => {
    router.push('/tasks');
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      {showStickyHeader && (
        <SafeAreaView edges={['top']} style={styles.stickyHeader}>
          <View style={styles.stickyHeaderContent}>
            <View style={styles.stickyHeaderLeft}>
              <View style={styles.greetingRow}>
                <Text style={styles.stickyGreetingText}>{getGreeting()}</Text>
                <Ionicons name="sunny" size={16} color="#FCD34D" style={styles.sunIcon} />
              </View>
              <View style={styles.storeInfoRow}>
                <Text style={styles.stickyStoreName}>{user.storeName}</Text>
                <View style={styles.stickyBusinessTypeBadge}>
                  <Text style={styles.stickyBusinessTypeText}>{user.businessType}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.stickyNotificationButton}>
              <Ionicons name="notifications" size={20} color="#FFFFFF" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}

      {/* Main Header - Hidden when sticky header appears */}
      {!showStickyHeader && (
        <SafeAreaView edges={['top']} style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingText}>{getGreeting()}</Text>
                <Ionicons name="sunny" size={20} color="#FCD34D" style={styles.sunIcon} />
              </View>
              <View style={styles.storeInfoRow}>
                <Text style={styles.storeName}>{user.storeName}</Text>
                <View style={styles.businessTypeBadge}>
                  <Text style={styles.businessTypeText}>{user.businessType}</Text>
                </View>
              </View>
              <Text style={styles.subtitle}>Bagaimana Usahamu Hari Ini?</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color="#FFFFFF" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Alert Notification */}
        {showAlert && (
          <View style={styles.alertContainer}>
            <View style={styles.alertContent}>
              <Ionicons name="warning" size={20} color="#EF4444" />
              <Text style={styles.alertText}>Yuk Perkuat Promosinya!</Text>
            </View>
            <TouchableOpacity onPress={() => setShowAlert(false)}>
              <Ionicons name="close" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        )}

        {/* Performance Banner */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kondisi Usaha Saat Ini</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <TouchableOpacity
                style={styles.periodSelector}
                onPress={() => setPerformancePeriodPickerVisible(!performancePeriodPickerVisible)}
              >
                <Text style={styles.periodText}>{performancePeriod}</Text>
                <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.ownerBadge}>
                <Ionicons name="person" size={14} color="#FFFFFF" />
                <Text style={styles.ownerText}>Pemula</Text>
              </View>
            </View>

            {/* Performance Period Picker */}
            {performancePeriodPickerVisible && (
              <View style={styles.performancePeriodPicker}>
                {periodOptions.map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={styles.performancePeriodOption}
                    onPress={() => handlePerformancePeriodSelect(period)}
                  >
                    <Text style={[
                      styles.performancePeriodOptionText,
                      performancePeriod === period && styles.performancePeriodOptionTextActive
                    ]}>
                      {period}
                    </Text>
                    {performancePeriod === period && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{displayStats.stockAvailable}</Text>
                <Text style={styles.statLabel}>Stok tersedia</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{displayStats.productsSold}</Text>
                <Text style={styles.statLabel}>Produk Terjual</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{displayStats.performance}%</Text>
                <Text style={styles.statLabel}>Performa</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${displayStats.progressPercentage}%` }]} />
              </View>
              <Text style={styles.progressText}>{displayStats.progressPercentage}%</Text>
            </View>
            <Text style={styles.progressLabel}>{displayStats.progressLabel}</Text>

            <TouchableOpacity style={styles.targetButton}>
              <Text style={styles.targetButtonText}>Buat target baru</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rekomendasi Utama (DSS SAW) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rekomendasi Utama</Text>
          {topStrategy ? (
            <View style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <Ionicons name={topStrategy.mainIcon as any} size={24} color={topStrategy.mainColor} style={{ marginRight: 8 }} />
                <Text style={styles.recommendationTitle}>{topStrategy.name}</Text>
              </View>
              <Text style={styles.recommendationSubtitle}>{topStrategy.description}</Text>
              
              <TouchableOpacity 
                style={styles.recomDetailButton}
                onPress={() => router.push('/strategy')}
              >
                <Text style={styles.recomDetailButtonText}>Lihat Detail Strategi</Text>
                <Ionicons name="arrow-forward" size={16} color="#375EE9" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationSubtitle}>Anda belum melakukan analisis kondisi usaha.</Text>
            </View>
          )}
        </View>

        {/* Lihat Task Minggu Ini Button */}
        <TouchableOpacity style={styles.taskButton} onPress={navigateToTasks}>
          <Text style={styles.taskButtonText}>Lihat Task Minggu Ini (Berdasarkan Strategi)</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.reanalyzeButton} 
          onPress={() => router.push('/analysis')}
        >
          <Ionicons name="refresh" size={20} color="#375EE9" style={{ marginRight: 8 }} />
          <Text style={styles.reanalyzeButtonText}>Analisis Ulang Kondisi Usaha</Text>
        </TouchableOpacity>

        {/* Event Rekomendasi - Horizontal Scroll */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Rekomendasi</Text>
          <Text style={styles.sectionSubtitle}>Event yang cocok untuk usahamu</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScroll}
          >
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Image
                  source={{ uri: event.imageUrl }}
                  style={styles.eventImage}
                  contentFit="cover"
                />
                <View style={styles.eventLocationBadge}>
                  <Ionicons name="location" size={12} color="#FFFFFF" />
                  <Text style={styles.eventLocationText}>{event.location}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <View style={styles.eventDetails}>
                    <View style={styles.eventDetailRow}>
                      <Text style={styles.eventDetailLabel}>Biaya : </Text>
                      <Text style={styles.eventDetailValue}>{event.cost}</Text>
                    </View>
                    <View style={styles.eventDetailRow}>
                      <Text style={styles.eventDetailLabel}>Kesesuaian : </Text>
                      <Text style={styles.eventDetailValue}>{event.compatibility}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Floating Action Button - Closer to navbar */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Performance Update Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Performa Usaha</Text>

            {/* Period Selector */}
            <View style={styles.periodRow}>
              <Text style={styles.periodLabel}>Periode</Text>
              <TouchableOpacity
                style={styles.periodDropdown}
                onPress={() => setPeriodPickerVisible(!periodPickerVisible)}
              >
                <Text style={styles.periodDropdownText}>{selectedPeriod}</Text>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Period Picker Dropdown */}
            {periodPickerVisible && (
              <View style={styles.periodPickerContainer}>
                {periodOptions.map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={styles.periodOption}
                    onPress={() => handlePeriodSelect(period)}
                  >
                    <Text style={[
                      styles.periodOptionText,
                      selectedPeriod === period && styles.periodOptionTextActive
                    ]}>
                      {period}
                    </Text>
                    {selectedPeriod === period && (
                      <Ionicons name="checkmark" size={20} color="#4E74F9" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Category Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, selectedCategory === 'postingan' && styles.activeTab]}
                onPress={() => setSelectedCategory('postingan')}
              >
                <Text style={[styles.tabText, selectedCategory === 'postingan' && styles.activeTabText]}>
                  Postingan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedCategory === 'chat' && styles.activeTab]}
                onPress={() => setSelectedCategory('chat')}
              >
                <Text style={[styles.tabText, selectedCategory === 'chat' && styles.activeTabText]}>
                  Chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedCategory === 'penjualan' && styles.activeTab]}
                onPress={() => setSelectedCategory('penjualan')}
              >
                <Text style={[styles.tabText, selectedCategory === 'penjualan' && styles.activeTabText]}>
                  Penjualan
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Instagram</Text>
                <TextInput
                  style={styles.input}
                  value={formData.instagram}
                  onChangeText={(text) => setFormData({ ...formData, instagram: text })}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
                <Text style={styles.inputUnit}>{getUnitLabel()}</Text>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Facebook</Text>
                <TextInput
                  style={styles.input}
                  value={formData.facebook}
                  onChangeText={(text) => setFormData({ ...formData, facebook: text })}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
                <Text style={styles.inputUnit}>{getUnitLabel()}</Text>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Tiktok</Text>
                <TextInput
                  style={styles.input}
                  value={formData.tiktok}
                  onChangeText={(text) => setFormData({ ...formData, tiktok: text })}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
                <Text style={styles.inputUnit}>{getUnitLabel()}</Text>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePerformance}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#375EE9',
  },
  header: {
    backgroundColor: '#375EE9',
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.6,
  },
  sunIcon: {
    marginLeft: 6,
  },
  storeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 26,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  businessTypeBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  businessTypeText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: 'hsla(0, 0%, 38%, 1.00)',
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 14,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 8,
    right: 8,
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
  },
  stickyHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  stickyHeaderLeft: {
    flex: 1,
  },
  stickyGreetingText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.6,
  },
  stickyStoreName: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  stickyBusinessTypeBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stickyBusinessTypeText: {
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: 'hsla(0, 0%, 38%, 1.00)',
  },
  stickyNotificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  alertContainer: {
    backgroundColor: 'rgba(255, 239, 239, 1)',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#6B7280',
    marginTop: -8,
    marginBottom: 16,
  },
  performanceCard: {
    backgroundColor: '#375EE9',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    marginRight: 14,
  },
  ownerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ownerText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  performancePeriodPicker: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  performancePeriodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  performancePeriodOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#6B7280',
  },
  performancePeriodOptionTextActive: {
    color: '#4E74F9',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.6,
    textAlign: 'left',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#33E65A',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFFFFF',
    minWidth: 40,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.6,
    marginBottom: 16,
  },
  targetButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  targetButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#4E74F9',
  },
  recommendationsScroll: {
    paddingRight: 20,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: width - 80,
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
    fontWeight: '500',
    color: '#EF4444',
  },
  recomDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  recomDetailButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#375EE9',
    marginRight: 4,
  },
  reanalyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#375EE9',
  },
  reanalyzeButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#375EE9',
  },
  taskButton: {
    backgroundColor: '#4E74F9',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventsScroll: {
    paddingRight: 20,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    width: width - 80,
    borderWidth: 1,
    borderColor: 'rgba(238, 238, 238, 1)',
  },
  eventImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E5E7EB',
  },
  eventLocationBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#4E74F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  eventLocationText: {
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  eventContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  eventDetails: {
    gap: 1,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#6B7280',
  },
  eventDetailValue: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
  },
  // Floating Action Button - Closer to navbar (bottom: 20)
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  periodLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#1F2937',
    marginRight: 16,
  },
  periodDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  periodDropdownText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#1F2937',
    marginRight: 8,
  },
  periodPickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    overflow: 'hidden',
  },
  periodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  periodOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#6B7280',
  },
  periodOptionTextActive: {
    color: '#4E74F9',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#4E74F9',
    borderColor: '#4E74F9',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#1F2937',
    flex: 1,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'right',
    marginRight: 8,
    minWidth: 60,
  },
  inputUnit: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#4E74F9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
