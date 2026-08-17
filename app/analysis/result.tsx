import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { calculateSAW, AssessmentAnswers } from '../../utils/saw';
import { useAppContext } from '../../context/AppContext';

export default function AnalysisResultScreen() {
  const router = useRouter();
  const { setSawResult, setAssessmentAnswers } = useAppContext();
  const params = useLocalSearchParams();
  
  let answers: AssessmentAnswers = {} as AssessmentAnswers;
  try {
    if (params.answers) {
      answers = JSON.parse(params.answers as string);
    }
  } catch (e) {
    console.error("Failed to parse answers", e);
  }

  const { recommendations, swot } = calculateSAW(answers);

  const getCompatibilityColor = (compatibility: string) => {
    switch(compatibility) {
      case 'Sangat Tinggi': return '#10B981'; // Green
      case 'Tinggi': return '#3B82F6'; // Blue
      case 'Sedang': return '#F59E0B'; // Orange
      case 'Rendah': return '#EF4444'; // Red
      default: return '#6B7280';
    }
  };

  const handleApplyStrategy = () => {
    // Save to Global State
    setAssessmentAnswers(answers);
    setSawResult({ recommendations, swot });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hasil Analisis SPK</Text>
      </View>
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Strategi Terbaik untuk Usahamu</Text>
        <Text style={styles.subtitle}>Berdasarkan kondisi usahamu saat ini, GrowUMKM menemukan beberapa strategi yang paling sesuai.</Text>

        {recommendations.slice(0, 3).map((rec, index) => (
          <View key={rec.id} style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <Text style={styles.recommendationName}>{rec.name}</Text>
            </View>
            <View style={[styles.compatibilityBadge, { backgroundColor: getCompatibilityColor(rec.compatibility) + '20' }]}>
              <Text style={[styles.compatibilityText, { color: getCompatibilityColor(rec.compatibility) }]}>
                {rec.compatibility}
              </Text>
            </View>
            <Text style={styles.recommendationDesc}>{rec.description}</Text>
          </View>
        ))}

        <View style={styles.swotSection}>
          <Text style={styles.swotTitle}>Kondisi Usaha Saat Ini</Text>
          
          <View style={styles.swotCard}>
            <View style={styles.swotHeader}>
              <Ionicons name="trending-up" size={20} color="#10B981" />
              <Text style={styles.swotLabel}>Kekuatan Usahamu</Text>
            </View>
            {swot.strengths.map((item, i) => (
              <Text key={i} style={styles.swotText}>• {item}</Text>
            ))}
          </View>

          <View style={styles.swotCard}>
            <View style={styles.swotHeader}>
              <Ionicons name="construct-outline" size={20} color="#F59E0B" />
              <Text style={styles.swotLabel}>Yang Perlu Ditingkatkan</Text>
            </View>
            {swot.weaknesses.map((item, i) => (
              <Text key={i} style={styles.swotText}>• {item}</Text>
            ))}
          </View>

          <View style={styles.swotCard}>
            <View style={styles.swotHeader}>
              <Ionicons name="bulb-outline" size={20} color="#3B82F6" />
              <Text style={styles.swotLabel}>Peluang yang Bisa Dimanfaatkan</Text>
            </View>
            {swot.opportunities.map((item, i) => (
              <Text key={i} style={styles.swotText}>• {item}</Text>
            ))}
          </View>

          <View style={styles.swotCard}>
            <View style={styles.swotHeader}>
              <Ionicons name="warning-outline" size={20} color="#EF4444" />
              <Text style={styles.swotLabel}>Hal yang Perlu Diantisipasi</Text>
            </View>
            {swot.threats.map((item, i) => (
              <Text key={i} style={styles.swotText}>• {item}</Text>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={handleApplyStrategy}>
          <Text style={styles.applyButtonText}>Terapkan Strategi Ini</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#6B7280',
    marginBottom: 24,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankBadge: {
    backgroundColor: '#375EE9',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  recommendationName: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  compatibilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 12,
  },
  compatibilityText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  recommendationDesc: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#4B5563',
    lineHeight: 20,
  },
  swotSection: {
    marginTop: 24,
  },
  swotTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  swotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#375EE9',
  },
  swotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  swotLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  swotText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#4B5563',
    marginLeft: 28,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: '#375EE9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
  }
});
