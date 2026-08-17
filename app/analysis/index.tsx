import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AssessmentAnswers } from '../../utils/saw';

const questions = [
  {
    id: 'budget',
    question: 'Berapa anggaran pemasaran digital yang tersedia?',
    options: ['Terbatas', 'Cukup', 'Besar']
  },
  {
    id: 'hr',
    question: 'Siapa yang mengelola pemasaran digital?',
    options: ['Pemilik sendiri', 'Ada admin', 'Agensi']
  },
  {
    id: 'contentReadiness',
    question: 'Seberapa siap membuat foto/video secara rutin?',
    options: ['Kurang', 'Cukup siap', 'Sangat siap']
  },
  {
    id: 'goals',
    question: 'Apa tujuan pemasaran utama?',
    options: ['Meningkatkan penjualan', 'Awareness', 'Repeat order']
  },
  {
    id: 'target',
    question: 'Siapa target konsumen utama?',
    options: ['Remaja', 'Dewasa', 'Semua kalangan']
  },
  {
    id: 'reach',
    question: 'Seberapa luas jangkauan penjualan?',
    options: ['Lokal', 'Nasional']
  },
  {
    id: 'digitalReadiness',
    question: 'Seberapa aktif menggunakan digital marketing?',
    options: ['Baru mulai', 'Cukup aktif', 'Sangat aktif']
  },
  {
    id: 'productType',
    question: 'Bagaimana karakter produk?',
    options: ['Visual menarik', 'Biasa saja', 'Fungsional']
  }
];

export default function AnalysisScreen() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    router.push({
      pathname: '/analysis/result',
      params: { answers: JSON.stringify(answers) }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analisis Kondisi Usaha</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Cari Strategi yang Cocok untuk Usahamu</Text>
        <Text style={styles.subtitle}>Jawab beberapa pertanyaan berikut agar GrowUMKM dapat merekomendasikan strategi terbaik.</Text>

        {questions.map((q, index) => (
          <View key={q.id} style={styles.questionCard}>
            <Text style={styles.questionText}>{index + 1}. {q.question}</Text>
            {q.options.map(option => {
              const isSelected = answers[q.id as keyof AssessmentAnswers] === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                  onPress={() => handleSelectOption(q.id, option)}
                >
                  <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.submitButton, Object.keys(answers).length < questions.length && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
        >
          <Text style={styles.submitButtonText}>Lihat Rekomendasi</Text>
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
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  optionButtonSelected: {
    borderColor: '#375EE9',
    backgroundColor: '#EEF2FF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#375EE9',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#375EE9',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#4B5563',
  },
  optionTextSelected: {
    color: '#375EE9',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#375EE9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
  }
});
