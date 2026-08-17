export interface AssessmentAnswers {
  budget: string;
  hr: string;
  contentReadiness: string;
  goals: string;
  target: string;
  reach: string;
  digitalReadiness: string;
  productType: string;
}

export interface TaskTip {
  title: string;
  content: string;
}

export interface Task {
  id: string;
  name: string;
  achieved: number;
  target: number;
  tip?: TaskTip;
}

export interface StrategyFlow {
  icon: string; // Ionicons name
  text: string;
}

export interface RecommendationResult {
  id: string;
  name: string;
  score: number;
  compatibility: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Rendah';
  description: string;
  mainIcon: string;
  mainColor: string;
  flow: StrategyFlow[];
  tasks: Task[];
  additionalTasks: Task[];
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// Predefined strategies with their detailed flow and tasks
const strategyProfiles: Record<string, Omit<RecommendationResult, 'score' | 'compatibility'>> = {
  ig_organic: {
    id: 'ig_organic',
    name: 'Instagram Organic',
    description: 'Produk memiliki karakter visual yang kuat dan sesuai untuk dipromosikan melalui konten foto/video. Strategi organik juga lebih sesuai dengan kondisi anggaran saat ini.',
    mainIcon: 'logo-instagram',
    mainColor: '#E1306C',
    flow: [
      { icon: 'eye', text: 'Awareness' },
      { icon: 'heart', text: 'Engagement' },
      { icon: 'cart', text: 'Order' },
    ],
    tasks: [
      {
        id: 'ig_t1', name: 'Buat 3 konten Reels', achieved: 0, target: 3,
        tip: { title: 'Tips Reels', content: 'Gunakan audio trending dan pastikan pencahayaan terang. Durasi ideal 15-30 detik.' }
      },
      {
        id: 'ig_t2', name: 'Upload Story produk berkala', achieved: 0, target: 5,
        tip: { title: 'Tips Story', content: 'Gunakan fitur stiker interaktif (polling/question) untuk memancing interaksi.' }
      }
    ],
    additionalTasks: [
      {
        id: 'ig_a1', name: 'Evaluasi konten dengan engagement tertinggi', achieved: 0, target: 1,
        tip: { title: 'Tips Evaluasi', content: 'Cek insight post setelah 3 hari. Perhatikan metrik Shares dan Saves.' }
      }
    ]
  },
  wa_business: {
    id: 'wa_business',
    name: 'WhatsApp Business',
    description: 'Sangat cocok untuk membangun retensi pelanggan (repeat order) dan komunikasi yang lebih personal.',
    mainIcon: 'logo-whatsapp',
    mainColor: '#25D366',
    flow: [
      { icon: 'chatbubbles', text: 'Broadcast' },
      { icon: 'people', text: 'Follow up' },
      { icon: 'cart', text: 'Repeat Order' },
    ],
    tasks: [
      {
        id: 'wa_t1', name: 'Update Katalog WhatsApp', achieved: 0, target: 1,
        tip: { title: 'Tips Katalog', content: 'Pastikan foto produk menarik dan harga tercantum dengan jelas.' }
      },
      {
        id: 'wa_t2', name: 'Broadcast promo ke pelanggan setia', achieved: 0, target: 1,
        tip: { title: 'Tips Broadcast', content: 'Gunakan sapaan personal dan jangan terlalu sering agar pelanggan tidak terganggu (maks 1x seminggu).' }
      }
    ],
    additionalTasks: [
      {
        id: 'wa_a1', name: 'Balas chat di bawah 10 menit', achieved: 0, target: 10,
        tip: { title: 'Tips Balas Cepat', content: 'Gunakan fitur Quick Replies untuk FAQ (Frequently Asked Questions).' }
      }
    ]
  },
  food_delivery: {
    id: 'food_delivery',
    name: 'Food Delivery Platform',
    description: 'Anda sudah siap untuk memperluas jangkauan delivery. Platform seperti GoFood/GrabFood dapat meningkatkan penjualan harian.',
    mainIcon: 'fast-food',
    mainColor: '#F59E0B',
    flow: [
      { icon: 'restaurant', text: 'Listing' },
      { icon: 'pricetag', text: 'Promo Platform' },
      { icon: 'bicycle', text: 'Delivery' },
    ],
    tasks: [
      {
        id: 'fd_t1', name: 'Ikut serta kampanye promo (Flash Sale/Diskon)', achieved: 0, target: 1,
        tip: { title: 'Tips Promo Platform', content: 'Pilih produk best-seller untuk dijadikan magnet penarik pelanggan baru.' }
      },
      {
        id: 'fd_t2', name: 'Pastikan rating di atas 4.5', achieved: 0, target: 5,
        tip: { title: 'Tips Rating', content: 'Berikan note kecil/ucapan terima kasih di setiap pesanan untuk memancing rating bintang 5.' }
      }
    ],
    additionalTasks: [
      {
        id: 'fd_a1', name: 'Update stok ketersediaan secara real-time', achieved: 0, target: 1,
        tip: { title: 'Tips Operasional', content: 'Segera matikan menu jika bahan baku habis untuk menghindari pesanan dibatalkan (mempengaruhi rating restoran).' }
      }
    ]
  }
};

export function calculateSAW(answers: Partial<AssessmentAnswers>): {
  recommendations: RecommendationResult[];
  swot: SWOTAnalysis;
} {
  // Simple logic to make it dynamic based on answers
  let topStrategyId = 'ig_organic';
  
  if (answers.goals === 'Repeat order') {
    topStrategyId = 'wa_business';
  } else if (answers.productType === 'Fungsional' || answers.reach === 'Nasional') {
    topStrategyId = 'wa_business';
  } else if (answers.digitalReadiness === 'Baru mulai') {
    topStrategyId = 'wa_business';
  } else if (answers.goals === 'Meningkatkan penjualan' && answers.reach === 'Lokal') {
    topStrategyId = 'food_delivery';
  }

  // Create a sorted list based on the chosen top strategy
  const otherStrategies = Object.keys(strategyProfiles).filter(id => id !== topStrategyId);
  
  const recommendations: RecommendationResult[] = [
    { ...strategyProfiles[topStrategyId], score: 0.95, compatibility: 'Sangat Tinggi' },
    { ...strategyProfiles[otherStrategies[0]], score: 0.82, compatibility: 'Tinggi' },
    { ...strategyProfiles[otherStrategies[1]], score: 0.70, compatibility: 'Sedang' }
  ];

  // Dynamic SWOT based on answers
  const swot: SWOTAnalysis = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };

  if (answers.contentReadiness === 'Sangat siap') {
    swot.strengths.push('Kesiapan konten sudah sangat baik, memudahkan eksekusi digital marketing rutin.');
  } else {
    swot.weaknesses.push('Kesiapan konten masih kurang, perlu dijadwalkan agar lebih konsisten.');
  }

  if (answers.budget === 'Terbatas') {
    swot.threats.push('Anggaran terbatas mengharuskan fokus pada strategi organik (gratis) ketimbang paid ads.');
    swot.strengths.push('Potensi ROI yang tinggi karena minim modal iklan.');
  } else {
    swot.opportunities.push('Anggaran yang tersedia memungkinkan untuk melakukan ekspansi dengan iklan berbayar.');
  }

  if (answers.hr === 'Pemilik sendiri') {
    swot.weaknesses.push('Pengelolaan pemasaran masih dilakukan sendiri, rentan kehabisan waktu operasional.');
  } else {
    swot.strengths.push('Adanya tim pengelola (admin/agensi) membuat eksekusi pemasaran bisa lebih terukur.');
  }

  if (answers.productType === 'Visual menarik') {
    swot.opportunities.push('Karakter produk sangat cocok dipasarkan di media sosial berbasis visual seperti Instagram/TikTok.');
  }

  // Fallbacks if empty
  if (swot.strengths.length === 0) swot.strengths.push('Produk sudah berjalan dan siap dipasarkan lebih luas.');
  if (swot.weaknesses.length === 0) swot.weaknesses.push('Perlu evaluasi berkala untuk menemukan winning campaign.');
  if (swot.opportunities.length === 0) swot.opportunities.push('Pergeseran pasar ke arah digital sangat menguntungkan.');
  if (swot.threats.length === 0) swot.threats.push('Persaingan yang semakin ketat di ranah online.');

  return { recommendations, swot };
}
