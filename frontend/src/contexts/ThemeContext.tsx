import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  surfaceSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Border and divider colors
  border: string;
  divider: string;
  
  // Card and modal colors
  card: string;
  modal: string;
  overlay: string;
  
  // Button colors
  buttonPrimary: string;
  buttonSecondary: string;
  buttonText: string;
  buttonTextSecondary: string;
  
  // Input colors
  input: string;
  inputBorder: string;
  inputPlaceholder: string;
  
  // Navigation colors
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
  
  // Badge colors
  badge: string;
  badgeText: string;
}

export const lightTheme: ThemeColors = {
  // Background colors
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  
  // Text colors
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Primary colors
  primary: '#3B82F6',
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Border and divider colors
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Card and modal colors
  card: '#FFFFFF',
  modal: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Button colors
  buttonPrimary: '#3B82F6',
  buttonSecondary: '#F3F4F6',
  buttonText: '#FFFFFF',
  buttonTextSecondary: '#6B7280',
  
  // Input colors
  input: '#F9FAFB',
  inputBorder: '#D1D5DB',
  inputPlaceholder: '#6B7280',
  
  // Navigation colors
  tabBar: '#FFFFFF',
  tabBarActive: '#3B82F6',
  tabBarInactive: '#6B7280',
  
  // Badge colors
  badge: '#3B82F6',
  badgeText: '#FFFFFF',
};

export const darkTheme: ThemeColors = {
  // Background colors
  background: '#111827',
  surface: '#1F2937',
  surfaceSecondary: '#374151',
  
  // Text colors
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  
  // Primary colors
  primary: '#60A5FA',
  primaryLight: '#1E3A8A',
  primaryDark: '#93C5FD',
  
  // Status colors
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',
  
  // Border and divider colors
  border: '#374151',
  divider: '#4B5563',
  
  // Card and modal colors
  card: '#1F2937',
  modal: '#1F2937',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Button colors
  buttonPrimary: '#60A5FA',
  buttonSecondary: '#374151',
  buttonText: '#111827',
  buttonTextSecondary: '#D1D5DB',
  
  // Input colors
  input: '#374151',
  inputBorder: '#4B5563',
  inputPlaceholder: '#9CA3AF',
  
  // Navigation colors
  tabBar: '#1F2937',
  tabBarActive: '#60A5FA',
  tabBarInactive: '#9CA3AF',
  
  // Badge colors
  badge: '#60A5FA',
  badgeText: '#111827',
};

interface ThemeContextType {
  isDarkMode: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = '@locado_theme_mode';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from storage on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    saveThemePreference(newTheme);
  };

  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    saveThemePreference(isDark);
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    isDarkMode,
    colors,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;