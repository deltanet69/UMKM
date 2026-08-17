import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RecommendationResult, SWOTAnalysis, AssessmentAnswers } from '../utils/saw';

export interface PerformanceMetrics {
  postingan: { instagram: number; facebook: number; tiktok: number };
  chat: { instagram: number; facebook: number; tiktok: number };
  penjualan: { instagram: number; facebook: number; tiktok: number };
}

interface AppContextType {
  performanceMetrics: PerformanceMetrics;
  setPerformanceMetrics: React.Dispatch<React.SetStateAction<PerformanceMetrics>>;
  sawResult: { recommendations: RecommendationResult[]; swot: SWOTAnalysis } | null;
  setSawResult: React.Dispatch<React.SetStateAction<{ recommendations: RecommendationResult[]; swot: SWOTAnalysis } | null>>;
  assessmentAnswers: Partial<AssessmentAnswers>;
  setAssessmentAnswers: React.Dispatch<React.SetStateAction<Partial<AssessmentAnswers>>>;
}

const defaultPerformance: PerformanceMetrics = {
  postingan: { instagram: 0, facebook: 0, tiktok: 0 },
  chat: { instagram: 0, facebook: 0, tiktok: 0 },
  penjualan: { instagram: 0, facebook: 0, tiktok: 0 }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>(defaultPerformance);
  const [sawResult, setSawResult] = useState<{ recommendations: RecommendationResult[]; swot: SWOTAnalysis } | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Partial<AssessmentAnswers>>({});

  return (
    <AppContext.Provider value={{
      performanceMetrics, setPerformanceMetrics,
      sawResult, setSawResult,
      assessmentAnswers, setAssessmentAnswers
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
